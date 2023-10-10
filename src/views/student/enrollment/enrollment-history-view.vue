<template>
    <div v-if="isLoading" class="card-loading">
        <h2 class="fw-bolder text-primary">LOADING</h2>
    </div>
    <div v-else>
        <div v-for="item in data" :key="item" class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-xs-12">
                        <small class="fw-bolder text-secondary">
                            ACADEMIC YEAR
                        </small> <br>
                        <label class="fw-bolder text-primary h4">
                            {{item.academic.semester}} - {{item.academic.school_year}}
                        </label>
                    </div>
                    <div class="col-lg-6 col-md-12 col-xs-12">
                        <small class="fw-bolder text-secondary">
                            REPORTS
                        </small> <br>
                        <a href="" class="badge bg-primary">CERTIFICATE OF ENROLLMENT</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-12 col-xs-12">
                        <small class="fw-bolder text-secondary">
                            COURSE / STRAND
                        </small> <br>
                        <label class="fw-bolder text-primary h4">
                            {{item.course.course_name}}
                        </label>
                    </div>
                    <div class="col-lg-4 col-md-12 col-xs-12">
                        <small class="fw-bolder text-secondary">
                            LEVEL
                        </small> <br>
                        <label class="fw-bolder text-primary h4">
                            {{convert_year_level(item.year_level.toString())}}
                        </label>
                    </div>
                    <div class="col-lg-4 col-md-12 col-xs-12">
                        <small class="fw-bolder text-secondary">
                            CURRICULUM
                        </small> <br>
                        <label class="fw-bolder text-primary h4">
                            {{item.curriculum.curriculum_name}}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'EnrollmentHistory',
    data() {
        return {
            isLoading: true,
            data: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/enrollment-history', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data.data
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            console.log(error.response.status)
        })
    },
    methods: {
        convert_year_level(data) {
            let level = ''
            if (data === '4') {
                level = '4th Class'
            } else if (data === '3') {
                level = '3rd Class'
            } else if (data === '2') {
                level = '2nd Class'
            } else if (data === '1') {
                level = '1st Class'
            } else if (data === '11') {
                level = 'Grade 11'
            } else if (data === '12') {
                level = 'Grade 12'
            }
            return level
        }
    }
}
</script>