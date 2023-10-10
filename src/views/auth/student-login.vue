<template>
    <div class="row m-0 align-items-center vh-100">

        <div class="col-lg-5 col-md-12">
            <div class="card-body">
                <center>
                    <img src="@/assets/resources/image/bma-logo-1.png"
                        class="center img-fluid avatar avatar-100 rounded-circle" alt="logo">
                </center>
                <h2 class="mb-2 text-center"><b>STUDENT PORTAL</b></h2>
                <p class="text-center">SIGN IN</p>
                <!-- <span class="badge bg-secondary mt-2">version 1.0.1</span> <br/>
                <span class="badge bg-secondary mt-2">{{ url }}</span> <br/>
                <span class="badge bg-secondary mt-2">{{ crsf }}</span> <br/> -->
                <form @submit.prevent="onLogin" class="row">
                    <div class="">
                        <div class="col-lg-12">
                            <input-component-v2 type="email" label="email" v-model:value="username" :error="errors.email" />
                        </div>
                        <div class="col-lg-12">
                            <input-component-v2 type="password" label="password" v-model:value="password"
                                :error="errors.password" />
                        </div>
                        <span class="badge bg-danger mt-2" v-if="errorMessage">{{ errorMessage }}</span>

                        <div class="col-lg-12 d-flex justify-content-between">
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input" id="customCheck1" v-model="rememberMe">
                                <label class="form-check-label" for="customCheck1">Remember Me</label>
                            </div>
                            <router-link :to="{ name: 'app-layout.student-forget-password' }" class="">Forgot
                                Password?</router-link>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary w-100" type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="res-hide col-lg-7 col-md-0 d-md-block d-none p-0">
            <img src="@/assets/resources/banner/bma-building.png" class="img-fluid gradient-main vh-100" alt="images">
        </div>
    </div>
</template>
<script>
import LoginValidation from '@/services/validation/LoginValidation'
import { LOGIN_ACTION, SHOW_LOADING_MUTATION, TESTING_ACTION } from '@/store/storeConstants.js'
import { mapActions, mapMutations } from 'vuex'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import axios from 'axios'
export default {
    name: 'StudentLoginPage',
    components: { inputComponentV2 },
    data() {
        return {
            username: '',
            password: '',
            rememberMe: '',
            errors: [],
            message: [],
            errorMessage: '',
            url: '',
            crsf: ''
        }
    },
    mounted() {
        this.url = axios.defaults.baseURL
        this.crsf = axios.defaults.xsrfHeaderName
    },
    methods: {
        ...mapActions('auth', {
            login: LOGIN_ACTION
        }),
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        async onLogin() {
            const validation = new LoginValidation(this.username, this.password)
            this.errors = validation.checkValidations()
            if ('email' in this.errors || 'password' in this.errors) {
                return false
            }
            this.errorMessage = ''
            this.showLoading(true)
            const data = {
                email: this.username,
                password: this.password,
                remember_me: this.rememberMe
            }
            try {
                await this.login(data)
                this.$router.push('/student/dashboard')
            } catch (error) {
                this.errorMessage = error
                this.showLoading(false)
            }
            this.showLoading(false)
        }
    }
}

</script>