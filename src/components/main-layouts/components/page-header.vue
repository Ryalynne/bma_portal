<template>
    <div class="sticky-top">
        <nav class="nav navbar navbar-expand-lg navbar-light iq-navbar py-lg-0 ">
            <div class="container-fluid navbar-inner">
                <router-link :to="{ name: 'app-layout.home' }" class="navbar-brand">
                    <img src="@/assets/resources/image/bma-logo-1.png" alt="image"
                        class="img-fluid rounded-circle avatar-70 me-2">
                    <h2 class="logo-title me-3">BALIWAG MARITIME ACADEMY, INC.</h2>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedConten  t" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <span class="navbar-toggler-bar bar1 mt-2"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto top-menu navbar-nav align-items-center navbar-list mb-3 mb-lg-0">
                        <li class="dropdown nav-item mobile-menu">
                            <a class="nav-link dropdown-toggle " data-bs-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="true">
                                Login Account
                            </a>
                            <ul class="dropdown-menu " data-popper-placement="bottom-start">
                                <li><router-link
                                        :class="`dropdown-item ${checkActive('app-layout.student-login') ? 'active' : ''}`"
                                        :to="{ name: 'app-layout.student-login' }">Student Login </router-link></li>
                                <li><!-- <router-link
                                    :class="`dropdown-item ${checkActive('app-layout.applicant-login') ? 'active' : ''}`"
                                    :to="{ name: 'app-layout.applicant-login' }">Applicant Login</router-link> -->
                                    <a href="http://bma.edu.ph/bma/login" class="dropdown-item">Applicant Login</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="nav-scroller ">
            <nav class="nav nav-underline bg-soft-primary pb-0" aria-label="Secondary navigation">
                <div class="d-flex" id="head-check">
                    <router-link :to="{ name: 'app-layout.home' }" :class="name == 'Home' ? 'nav-link active' : 'nav-link'"
                        id="Home" data-title="Home" @click="changename('Home')">About Us</router-link>
                    <a class="nav-link" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                        aria-expanded="true">
                        Academics
                    </a>
                    <ul class="dropdown-menu " data-popper-placement="bottom-start">
                        <!-- item-->
                        <li> <router-link :to="{ name: 'app-layout.Facilities' }"
                                :class="name == 'Facilities' ? 'nav-link active' : 'nav-link'" id="Facilities"
                                data-title="Facilities" @click="changename('Facilities')">Facilities</router-link></li>
                        <li><router-link :to="{ name: 'app-layout.admission' }"
                                :class="name == 'Admission' ? 'nav-link active' : 'nav-link'" id="Admission"
                                data-title="Admission" @click="changename('Admission')">Admission</router-link></li>

                        <li><router-link :to="{ name: 'app-layout.GraduateSchool' }"
                                :class="name == 'GraduateSchool' ? 'nav-link active' : 'nav-link'" id="GraduateSchool"
                                data-title="GraduateSchool" @click="changename('GraduateSchool')">Graduate
                                School</router-link></li>
                        <hr>
                        <li><router-link :to="{ name: 'app-layout.Registrar' }"
                                :class="name == 'Registrar' ? 'nav-link active' : 'nav-link'" id="Registrar"
                                data-title="Registrar" @click="changename('Registrar')">Registrar</router-link></li>
                    </ul>
                    <router-link :to="{ name: 'app-layout.Contact' }"
                        :class="name == 'Contact' ? 'nav-link active' : 'nav-link'" id="Contact" data-title="Contact"
                        @click="changename('Contact')">Contact Us</router-link>
                </div>
            </nav>
        </div>
    </div>
</template>
<style>
.logo-title {
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(90deg, #d3d3d3, #ccc, #d3d3d3);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
}
</style>
<script>
import { mapActions/* , mapGetters */ } from 'vuex'
export default {
    name: 'PageHeader',
    /* computed: {
        ...mapGetters({
            name: 'name'
        })
    }, */
    methods: {
        ...mapActions({
            changenameaction: 'changenameaction'
        }
        ),
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
        },
        changename(name) {
            console.log(name)
            switch (name) {
                case 'Home':
                    this.changenameaction(name)
                    break
                case 'Admission':
                    this.changenameaction(name)
                    break
            }
        }
    }
}
</script>
