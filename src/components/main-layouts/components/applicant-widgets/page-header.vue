<template>
    <nav class="nav navbar navbar-expand-lg navbar-light iq-navbar py-lg-0">
        <div class="container-fluid navbar-inner">
            <router-link :to="{ name: 'applicant-layout.dashboard' }" class="navbar-brand ms-3">

                <span class="ms-1 font-weight-bold text-primary"><b>Applicant Portal</b></span>
            </router-link>
            <div class="sidebar-toggle" data-toggle="sidebar" data-active="true" @click="opensidebar">
                <i class="icon">
                    <svg width="20px" height="20px" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                    </svg>
                </i>
            </div>
            <div class="input-group search-input">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mt-2">
                        {{ pageTitle }}
                    </ol>
                </nav>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon">
                    <span class="navbar-toggler-bar bar1 mt-2"></span>
                    <span class="navbar-toggler-bar bar2"></span>
                    <span class="navbar-toggler-bar bar3"></span>
                </span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto top-menu navbar-nav align-items-center navbar-list mb-3 mb-lg-0">
                    <li>
                        <ul class="m-0 d-flex align-items-center navbar-list list-unstyled px-3 px-md-0">
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul
                                    class="navbar-nav ms-auto top-menu navbar-nav align-items-center navbar-list mb-3 mb-lg-0">
                                    <li>
                                        <ul class="m-0 d-flex align-items-center navbar-list list-unstyled px-3 px-md-0">
                                            <li class="dropdown">
                                                <a class="nav-link py-0 d-flex align-items-center" href="#"
                                                    id="navbarDropdown3" role="button" data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                                    <img :src="profilePicture" alt="User-Profile"
                                                        class="img-fluid avatar avatar-50 avatar-rounded ">
                                                    {{ name }}
                                                </a>
                                                <ul class="dropdown-menu  dropdown-menu-lg-end"
                                                    aria-labelledby="navbarDropdown3">
                                                    <li><a class="dropdown-item" href="{{ route('home') }}">My
                                                            Profile</a></li>
                                                 <!--    <li><a class="dropdown-item"
                                                            href="{{ route('student.accounts') }}">Accounts</a></li> -->
                                                    <li>
                                                        <hr class="dropdown-divider">
                                                    </li>
                                                    <li>
                                                        <a  class="dropdown-item"
                                                            @click="logOut">Logout</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>


                        </ul>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { LOGOUT_ACTION, GET_USER_TOKEN, GET_USER_IMAGE, GET_USER_NAME } from '@/store/storeConstants'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'PageHeader',
    props: {
        fullsidebar: { type: Boolean, default: false },
        pageTitle: { type: String }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            profilePicture: GET_USER_IMAGE,
            name: GET_USER_NAME
        })
    },
    methods: {
        ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }),
        logOut() {
            this.logout()
            this.$router.replace('/')
        },
        opensidebar() {
            this.$emit('makefullsidebar', !this.fullsidebar)
        },
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
        }
    }
}
</script>