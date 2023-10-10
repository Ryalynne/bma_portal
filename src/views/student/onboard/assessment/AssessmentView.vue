<template>
  <div v-if="isLoading">
    <span class="text-primary fw-bolder h4">LOADING...</span>
  </div>
  <div v-else>
    <p class="display-6 fw-bolder text-primary">ASSESSMENT</p>
    <div v-if="examinationCode" class="examination">
      <div class="card" v-if="examinationCode.is_finish !== 1">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <span class="card-title h5 fw-bolder text-primary">Online Assessment</span>
          </div>
        </div>
        <div class="card-body">
          <p class="m-0"> <span class="fw-bolder m-0">INSTRUCTION</span></p>
          <p class="m-0">1. Ensure that you have a strong internet connection.</p>
          <p class="m-0">2. Once you are logged in, read carefully and understand the guidelines
            prior
            to
            and
            after the Examination</p>
          <p class="m-0">3. Upon completion of the Examination, click the Submit or Back button at
            the
            system.</p>
          <p class="m-0">4.Once you enter the Examination Code it will be start your Examination
          </p>
          <p>5.We recommend using Laptop/Desktop running atleast Windows 7 or higher to take the
            examination.
            We also recommend to use Google Chrome as browser in taking the examination.</p>
          <br>

          <div>
            <p class="mb-0 text-primary h5"><b>EXAMINATION CATEGORIES</b></p>
            <ul>
              <li>TRB - 20 items</li>
              <li>GENERAL QUESTION - 10 items</li>
              <li>{{ shipboardInformation.vessel_type }} - 10 items</li>
            </ul>
          </div>
          <form @submit.prevent="startExamination" method="post">
            <div class="form-group">
              <small class="fw-bolder">EXAMINATION CODE</small> <br>
              <label for="" class="form-label text-primary fw-bolder">
                {{ examinationCode.examination_code }}
              </label>
              <div class="row">
                <div class="col-md">
                  <inputComponentV2 label="Enter the Examination Code" v-model:value="examCode"
                    :error="errors.examination_code" />
                  <div v-if="errors.data">
                    <span class="badge bg-danger">{{ errors.data[0] }}</span>
                  </div>
                </div>
                <div class="col-md">
                  <button type="submit" class="btn btn-primary btn-sm mt-4">Take Examination</button>
                </div>

              </div>
            </div>

          </form>

        </div>
      </div>
      <div v-else class="card shadow">
        <div class="card-body">
          <div class="row">

            <div v-if="assessmentDetails" class="row">
              <div class="col-lg-6 col-md-12">
                <label for="" class="fw-bolder text-secondary">ONLINE ASSESSMENT</label>
                <p class="h4 fw-bolder text-primary">{{ examinationCode.result.length }} points</p>
              </div>
              <div class="col-lg-6 col-md-12">
                <label for="" class="fw-bolder text-secondary">PRACTICAL ASSESSMENT</label>
                <p class="h4 fw-bolder text-primary">{{ assessmentDetails.practical_score }} points</p>
              </div>
              <div class="col-lg-6 col-md-12">
                <label for="" class="fw-bolder text-secondary">ORAL ASSESSMENT</label>
                <p class="h4 fw-bolder text-primary">{{ assessmentDetails.oral_score }} points</p>
              </div>
            </div>
            <div v-else class="row">
              <div class="col-lg-6 col-md-12">
                <label for="" class="fw-bolder text-secondary">ONLINE ASSESSMENT</label>
                <p class="h4 fw-bolder text-primary">{{ examinationCode.result.length }} point/s</p>
              </div>
              <div class="col-lg-12 col-md-12 mt-3">
                <p><span class="text-warning fw-bolder">NOTE: </span><span class="text-info fw-bolder">Your Written /
                    Online Assessment is Complete, kindly proceed to the Onboard Training Office for your Practical and
                    Oral Assessment.</span></p>
              </div>
              <div class="col-lg-6 col-md-12">
                <label for="" class="fw-bolder text-secondary">PRACTICAL ASSESSMENT</label>
                <p class="h4 fw-bolder text-secondary">0 point/s</p>
              </div>
              <div class="col-lg-6 col-md-12">
                <label for="" class="fw-bolder text-secondary">ORAL ASSESSMENT</label>
                <p class="h4 fw-bolder text-secondary">0 point/s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card">
        <div class="card-body">
          <p class="h4 fw-bolder text-primary">Kindly proceed to the Onboard Training Officer to have your assessment
            approved
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import { mapGetters, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  name: 'Assessment View',
  data() {
    return {
      isLoading: true,
      errors: [],
      data: [],
      examinationCode: [],
      shipboardInformation: [],
      assessmentDetails: [],
      examCode: ''
    }
  },
  components: {
    inputComponentV2
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN,
      isAuth: IS_USER_AUTHENTICATE_GETTER
    })
  },
  mounted() {
    const link = 'student/onboard/assessment'
    axios.get(link, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    })
      .then((response) => {
        this.data = response.data
        this.examinationCode = this.data.assessment
        this.shipboardInformation = this.data.shipboardInformation
        this.assessmentDetails = this.data.examinationDetails
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
    async startExamination() {
      this.showLoading(true)
      axios.post('/student/onboard/assessment', { examination_code: this.examCode }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + this.token
        }
      }).then((response) => {
        this.showLoading(false)
        console.log(response.data)
        if (response.status === 200) {
          this.showAlert(response.data.data)
          this.$router.push('/student/onboard/assessment/questioner')
        }
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
