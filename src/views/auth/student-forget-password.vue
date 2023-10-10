<template>
    <div class="row m-0 align-items-center vh-100">

        <div class="col-lg-5 col-md-12">
            <div class="card-body">
                <center>
                    <img src="@/assets/resources/image/bma-logo-1.png"
                        class="center img-fluid avatar avatar-100 rounded-circle" alt="logo">
                </center>
                <h2 class="mb-2 text-center"><b>STUDENT PORTAL</b></h2>
                <p class="text-center">FORGET PASSWORD</p>
                <p>Enter your email address and we'll send you an email with instructions to reset your password.
                </p>
                <form @submit.prevent="forgetPassword" method="POST">
                    <div class="row">
                        <div class="col-xl-12 col-md-12">
                            <input-component-v2 label="email" type="text" v-model:value="email" :error="errors.email" />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-sm float-end">RESET</button>
                </form>
            </div>
        </div>
        <div class="res-hide col-lg-7 col-md-0 d-md-block d-none p-0">
            <img src="@/assets/resources/banner/bma-building.png" class="img-fluid gradient-main vh-100" alt="images">
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants.js'
import { mapMutations } from 'vuex'
import axios from 'axios'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
export default {
    name: 'StudentForgertPage',
    data() {
        const formData = new FormData()
        return {
            email: '',
            errors: [],
            formData
        }
    },
    components: {
        inputComponentV2
    },
    mounted() {
        this.url = axios.defaults.baseURL
        this.crsf = axios.defaults.xsrfHeaderName
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        async forgetPassword() {
            this.showLoading(true)
            this.formData.append('email', this.email)
            this.errors = []
            axios.post('student/forget-password', this.formData)
            .then((response) => {
                this.showLoading(false)
                console.log(response.data)
                if (response.status === 200) {
                    this.showAlert(response.data)
                    this.$router.push('/student/login')
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
                title: error.message,
                text: error.response.data.error,
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