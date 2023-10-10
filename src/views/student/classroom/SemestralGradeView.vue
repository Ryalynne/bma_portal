<template>
  <div v-if='isLoading'>
    <h3 class='text-primary'>LOADING</h3>
  </div>
  <div v-else>
    <p class='display-6 fw-bolder text-primary'>SEMESTRAL GRADE</p>
    <nav class='nav nav-underline bg-soft-primary pb-0 text-center' aria-label='Secondary navigation'>
      <div class='dropdown m-3 w-100'>
        <a class='dropdown-toggle' data-bs-toggle='dropdown' href='#' role='button' aria-haspopup='false'
          aria-expanded='false'>
          <span class='text-muted'>Academic Year : </span>
          <span class='fw-bolder'>{{ currentAcademic }}</span>
        </a>
        <ul class='dropdown-menu w-100' data-popper-placement='bottom-start'>
          <li v-for='item in enrollmentHistory' :key='item' :value='item.id'>
            <router-link @click='changeGrade(encrypt(item.id))' class='dropdown-item' :to="{
              name: 'student-layout.semestral-grade-view',
              query: { key: encrypt(item.id) },
            }">{{ academicName(item.academic) }}</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class='card shadow mt-3'>
      <div class='card-header'>
        <span class='fw-bolder text-primary'>LIST OF SUBJECTS</span>
      </div>
      <div class='card-body'>
        <div class='table-responsive'>
          <table class='table table-striped mb-0'>
            <thead>
              <tr class='fw-bolder'>
                <th>SUBJECT AND INSTRUCTOR</th>
                <th>UNITS</th>
                <th>GRADE</th>
                <th>REMARKS</th>
              </tr>
            </thead>
            <tbody v-if="subjectList.length > 0">
              <tr v-for='item in subjectList' :key='item' :value='item.id'>
                <td>
                  <p class='fw-bolder text-primary m-0 p-0 h4'>
                    {{ item.curriculum_subjects.subject.subject_code }}
                  </p>
                  <span class='fw-bolder text-secondary'>{{
                    teacherName(item.staff)
                  }}</span><br />
                  <span class='text-secondary'>{{
                    item.curriculum_subjects.subject.subject_name
                  }}</span>
                </td>
                <td>
                  <p class='fw-bolder text-secondary h5'>
                    {{ item.curriculum_subjects.subject.units }}
                  </p>
                </td>
                <td>
                  <div v-if='isPublish'>
                    <span class='fw-bolder h4 text-primary'>{{
                      convertGrade(item.student_semestral_subject_grade)
                    }}</span>
                  </div>
                </td>
                <td>
                  <div v-if='isPublish'>
                    <span class='fw-bolder h4 text-primary'>
                      {{
                        gradeRemarks(convertGrade(item.student_semestral_subject_grade))
                      }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td>NO SUBJECT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'Semestral Grade',
  data() {
    return {
      isLoading: true,
      section: [],
      subjectList: [],
      currentAcademic: '',
      enrollmentHistory: [],
      isPublish: false,
      gradePercent: []
    }
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN,
      isAuth: IS_USER_AUTHENTICATE_GETTER
    })
  },
  mounted() {
    const parameter = this.$route.query.key // Get the Parameter Value in Link
    console.log(parameter)
    let link = 'student/semestral-grade'
    link = parameter != null ? link + '?key=' + parameter : link
    axios
      .get(link, {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      })
      .then((response) => {
        this.data = response.data.data
        this.enrollmentHistory = response.data.enrollmentHistory
        this.gradePercent = response.data.percent
        this.currentAcademic = this.academicName(response.data.enrollment.academic)
        if (this.data) {
          if (this.data.student_section) {
            this.section = this.data.student_section
            if (this.section.subject_details) {
              this.subjectList = this.section.subject_details
            }
          }
        }
        if (response.data.gradePublish) {
          this.isPublish = true
        }
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
    teacherName(data) {
      const name = data.first_name + ' ' + data.last_name
      return name.toUpperCase()
    },
    academicName(data) {
      const name = data.semester + ' | ' + data.school_year
      return name.toUpperCase()
    },
    encrypt(data) {
      return btoa(data)
    },
    convertGrade(data) {
      let grade = 0
      if (this.isPublish) {
        grade = atob(data.final_grade)
      }
      let percent = 0
      this.gradePercent.forEach(function (index) {
        percent = grade >= index[0] && grade <= index[1] ? index[2] : percent
      })
      return percent
    },
    gradeRemarks(data) {
      return data >= 5 ? 'FAILED' : 'PASSED'
    },
    changeGrade(data) {
      this.isLoading = true
      this.isPublish = false
      this.subjectList = []
      const link = 'student/semestral-grade?key=' + data
      axios
        .get(link, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
        .then((response) => {
          this.data = response.data.data
          this.enrollmentHistory = response.data.enrollmentHistory
          this.gradePercent = response.data.percent
          this.currentAcademic = this.academicName(response.data.enrollment.academic)
          if (this.data) {
            if (this.data.student_section) {
              this.section = this.data.student_section
              if (this.section.subject_details) {
                this.subjectList = this.section.subject_details
              }
            }
          }
          if (response.data.gradePublish) {
            this.isPublish = true
          }
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
