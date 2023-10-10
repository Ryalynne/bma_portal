<template>
    <div class=" row align-items-center">

        <div class="col-lg-5">
            <div class="card-body">
                <h2 class="mb-2 text-center"><b>APPLICANT PORTAL</b></h2>
                <p class="text-center">SIGN IN</p>
                <div v-if="networkError.code" class="alert alert-left alert-danger alert-dismissible fade show mt-5"
                    role="alert">
                    <span class="fw-bolder">{{ networkError.code }}</span>
                    <p class="mt-3">
                        {{ networkError.message }}
                    </p>
                </div>
                <form @submit.prevent="onLogin" class="row g-3">
                    <div class="passed message">
                        <span class="badge bg-primary mt-2" v-if="passedMessage">{{
                            passedMessage }}</span>
                    </div>
                    <div class="">
                        <div class="col-lg-12">
                            <input-component-v2 type="email" label="email" v-model:value="formData.email"
                                :error="errors.email" />
                        </div>
                        <div class="col-lg-12">
                            <input-component-v2 type="password" label="password" v-model:value="formData.password"
                                :error="errors.password" />
                        </div>
                        <span class="badge bg-danger mt-2" v-if="errorMessage">{{ errorMessage }}</span>

                        <div class="col-lg-12 d-flex justify-content-between">
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input" id="customCheck1" v-model="rememberMe">
                                <label class="form-check-label" for="customCheck1">Remember Me</label>
                            </div>
                            <!--  <a href="recoverpw.html">Forgot Password?</a> -->
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary w-100" type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="res-hide col-lg-7 d-md-block d-none p-0">
            <img src="@/assets/resources/banner/bma-building.png" class="img-fluid gradient-main vh-100" alt="images">
        </div>
    </div>
</template>
<script>
import LoginValidation from '@/services/validation/LoginValidation'
import { APPLICANT_LOGIN_ACTION, SHOW_LOADING_MUTATION } from '@/store/storeConstants.js'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, DECRYPT_DATA } from '@/store/storeAlertConstants.js'
import { mapActions, mapMutations } from 'vuex'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
export default {
    name: 'ApplicantLoginPage',
    components: { inputComponentV2 },
    data() {
        const formData = {
            email: '',
            password: ''
        }
        return {
            formData,
            rememberMe: '',
            errors: [],
            message: [],
            networkError: [],
            errorMessage: '',
            backMessage: null
        }
    },
    mounted() {
        if (this.$route.query._m) {
            const dataMessage = atob(this.$route.query._m)
            const data = { message: dataMessage }
            this.infoAlert(data)
        }
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        ...mapActions('auth', {
            login: APPLICANT_LOGIN_ACTION
        }),
        ...mapActions('alert', {
            successAlert: SUCCESS_ALERT,
            infoAlert: INFO_ALERT,
            errorAlert: ERROR_ALERT,
            decrypt: DECRYPT_DATA
        }),
        async onLogin() {
            console.log(this.formData)
            const validation = new LoginValidation(this.formData.email, this.formData.password)
            this.errors = validation.checkValidations()
            if ('email' in this.errors || 'password' in this.errors) {
                return false
            }
            this.errorMessage = ''
            this.showLoading(true)
            try {
                await this.login(this.formData)
                this.$router.push('/applicant/dashboard')
            } catch (error) {
                this.errorMessage = error
                this.showLoading(false)
            }
            this.showLoading(false)
            /*  axios.post('applicant/login', this.formData).then((response) => {
                 console.log(response)
             }).catch((error) => {
                 if (error.code === 'ERR_NETWORK') {
                     this.networkError = error
                 } else {
                     if (error.response.status === 422) {
                         this.errors = error.response.data.errors
                         console.log(this.errors)
                     }
                 }
                 this.showLoading(false)
             }) */
        }
    }
}

</script>