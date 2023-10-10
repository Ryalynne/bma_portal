<template>
  <div v-if="isLoading">
    <span class="text-primary fw-bolder h4">LOADING...</span>
  </div>
  <div v-else>
    <p class="display-6 fw-bolder text-primary">ASSESSMENT FOR INCOMING 1ST CLASS</p>
    <div class="card shadow mt-2">
      <div class="card-header">
        <span class="fw-bolder text-primary h4">TOTAL OF {{ questionNumber }} QUESTIONS </span>
        <div class="float-end">
          <TimerLayout :startingTime="startTime" :finishFunction="finishExamination" />
        </div>
      </div>
      <div class="card-body">
        <div class="questioner" v-if="currentQuestion < questionList.length">
          <div class="">
            <div class="row">
              <div class="col-lg-8 col-md-6">
                <span class="badge bg-primary">QUESTION {{ currentQuestion + 1 }}</span>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="float-end mb-2">
                  <button class="btn btn-outline-info me-3 btn-sm" @click="previousQuestion()"
                    v-if="currentQuestion > 0">PREVIOUS</button>
                  <button class="btn btn-info text-white btn-sm" @click="nextQuestion()">NEXT</button>
                </div>
              </div>
            </div>
            <p class="text-primary fw-bolder h5">{{ questionList[currentQuestion].question.question }}</p>
            <div class="question-choices row">
              <div class="col-lg-6 col-md-12" v-for="(item, index) in questionList[currentQuestion].question.choices_v2"
                :key="index">
                <button :class="btnStyle(item.id)" @click="choiceAswer(item.id)">
                  {{ item.choice_name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="h4 text-secondary text-center fw-bolder">Do you want to Submit your Examination?</div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-info mt-3 text-white me-3" @click="finishExamination()" v-if="currentQuestion > 1">YES
              (SUBMIT)</button>
            <br>
            <button class="btn btn-outline-info mt-3" @click="previousQuestion()"
              v-if="currentQuestion > 1">PREVIOUS</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import TimerLayout from './component/TimerLayout.vue'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  name: 'Assessment View',
  data() {
    return {
      isLoading: true,
      errors: [],
      questionList: [],
      questionNumber: [],
      currentQuestion: 0,
      duration: 60 * 60 * 1000, // 1 hour in milliseconds
      timerInterval: null,
      startTime: null,
      answerActive: [],
      selectedChoices: []
    }
  },
  components: {
    TimerLayout
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN,
      isAuth: IS_USER_AUTHENTICATE_GETTER
    })
  },
  mounted() {
    const link = 'student/onboard/assessment/questioner'
    axios.get(link, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    })
      .then((response) => {
        this.data = response.data
        this.questionList = this.data.questions
        this.questionNumber = this.questionList.length
        this.startTime = this.data.details.examination_start
        this.isLoading = false
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    ...mapMutations({
      showLoading: SHOW_LOADING_MUTATION
    }),
    findQuestionIndex(array, questionId) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].question === questionId) {
          return i // Return the index if found
        }
      }
      return -1 // Return -1 if not found
    },
    btnStyle(choiceIndex) {
      const currentQuestion = this.questionList[this.currentQuestion].id
      const index = this.findQuestionIndex(this.selectedChoices, currentQuestion)
      let style = 'btn btn-outline-primary w-100 mt-4'
      if (index !== -1) {
        if (this.selectedChoices[index].choices === choiceIndex) {
          style = 'btn btn-primary w-100 mt-4'
        }
      }
      return style
    },
    selectChoice(questionIndex, choiceIndex) {
      const currentQuestion = this.questionList[this.currentQuestion].id
      const data = {
        question: currentQuestion,
        choices: choiceIndex
      }
      const index = this.findQuestionIndex(this.selectedChoices, currentQuestion)
      if (index !== -1) {
        this.selectedChoices[index].choices = choiceIndex
      } else {
        this.selectedChoices.push(data)
      }
    },
    choiceAswer(choice) {
      const currentQuestion = this.questionList[this.currentQuestion].id
      const data = {
        question: currentQuestion,
        choices: choice
      }
      const index = this.findQuestionIndex(this.selectedChoices, currentQuestion)
      if (index !== -1) {
        this.selectedChoices[index].choices = choice
      } else {
        this.selectedChoices.push(data)
      }
      axios.post('/student/onboard/assessment/questioner', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + this.token
        }
      }).then((response) => {
        /* console.log(response) */
      }).catch((error) => {
        this.showLoading(false)
        console.log(error)
        if (error.response.status === 422) {
          console.log(error.response.data)
          this.errors = error.response.data.errors
        } else {
          this.showAlertError(error)
        }
      })
      console.log(data)
    },
    nextQuestion() {
      this.currentQuestion += 1
    },
    previousQuestion() {
      this.currentQuestion -= 1
    },
    finishExamination() {
      this.showLoading(true)
      axios.post('/student/onboard/assessment/finish', { examination: this.data.details.id }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + this.token
        }
      }).then((response) => {
        this.showLoading(false)
        this.showAlert(response.data.data)
        setInterval(() => {
          this.$router.push('/student/onboard/assessment/view')
        }, 1000)
      }).catch((error) => {
        this.showLoading(false)
        console.log(error)
        if (error.response.status === 422) {
          console.log(error.response.data)
          this.errors = error.response.data.errors
          this.showAlertError(error)
        } else {
          this.showAlertError(error)
        }
      })
    },
    showAlertError(error) {
      Swal.fire({
        icon: 'error',
        title: error.code,
        text: error.message,
        confirmButtonText: 'OK'
      })
    },
    showAlert(data) {
      // Use sweetalert2
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: data.message,
        confirmButtonText: 'OK'
      })
    }
  }
}
</script>
