<template>
    <div v-if="isLoading">
        <SubjectLoading />
    </div>
    <div v-else>
        <p class='display-6 fw-bolder text-primary'>SUBJECT LIST</p>
        <div class="row">
            <div class="col-lg-4 col-md-6 col-xs-12" v-for="(data, index) in subjectLists" :key="index">
                <router-link :to="{ name: 'student-layout.subject-view-lesson', params: { subject: encrypt(data.id) } }">
                    <div class="card bg-primary">
                        <div class="card-header d-flex align-items-center justify-content-between pb-4">
                            <div class="header-title">
                                <div class="d-flex flex-wrap">
                                    <div class="media-support-user-img me-3">
                                        <img :src="teacherImage(data.staff)" alt="teacher-image"
                                            class="img-fluid avatar avatar-70 rounded-circle">
                                    </div>
                                    <div class="media-support-info mt-2">
                                        <h5 class="mb-0 fw-bolder text-white">{{
                                            data.curriculum_subjects.subject.subject_code
                                        }}</h5>
                                        <p class="mb-0 text-white">{{ data.staff.first_name + " " + data.staff.last_name }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0">
                        </div>
                    </div>
                </router-link>

            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import { LOGOUT_ACTION, GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import SubjectLoading from './loading-view/SubjectsLoading.vue'
import axios from 'axios'
export default {
    name: 'SUBJECT LIST',
    components: {
        SubjectLoading
    },
    data() {
        const formData = new FormData()
        return {
            isLoading: true,
            subjectLists: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/subject-lists', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data.data
            console.log(this.data)
            if (this.data) {
                if (this.data.student_section) {
                    this.subjectLists = this.data.student_section.subject_details
                }
            }
            console.log(this.subjectLists)
            this.isLoading = false
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    this.logout()
                }
            }
            console.log(error.response)
        })
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }),
        teacherImage(staff) {
            /* const teacherImage = 'http://one.bma.edu.ph/assets/img/staff/percival_banting.jpg' */
            let teacherImage = 'http://one.bma.edu.ph/assets/img/staff/'
            let name = staff.user.name
            name = name.toLowerCase()
            name = name.replace(/\s+/g, '_')
            console.log(name)
            teacherImage = teacherImage + name + '.jpg'
            return teacherImage
        },
        encrypt(data) {
            return btoa(data)
        }
    }
}
</script>