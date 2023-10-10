<template>
<nav class="nav navbar navbar-expand-lg navbar-light iq-navbar py-lg-0">
   <div class="container-fluid navbar-inner">
      <router-link :to="{name: 'default.dashboard'}" class="navbar-brand">
         <logo/>
         <!-- {{!-- <h4 class="logo-title">{{ appName }}</h4> --}} -->
      </router-link>
      <div class="sidebar-toggle" data-toggle="sidebar" data-active="true" @click="opensidebar">
         <i class="icon">
            <svg width="20px" height="20px" viewBox="0 0 24 24">
               <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
            </svg>
         </i>
      </div>
      <div class="input-group search-input">
         <span class="input-group-text" id="search-input">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
               <ellipse rx="9.10146" ry="8.88476" transform="matrix(-1 0 0 1 10.8985 9.88498)" stroke="#8A93AD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M4.56836 16.5259L1.00007 20.0002" stroke="#8A93AD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
         </span>
         <input type="search" class="form-control" placeholder="Search...">
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon">
      <span class="navbar-toggler-bar bar1 mt-2"></span>
      <span class="navbar-toggler-bar bar2"></span>
      <span class="navbar-toggler-bar bar3"></span>
      </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
         <ul class="navbar-nav ms-auto top-menu navbar-nav align-items-center navbar-list mb-3 mb-lg-0">
            <li class="nav-item">
               <router-link :to="{name:'default.dashboard'}" class="nav-link ">Home</router-link>
            </li>
            <li class="dropdown nav-item mobile-menu">
                <a class="nav-link dropdown-toggle " data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="true">
                    Other pages
                </a>
                <ul class="dropdown-menu " data-popper-placement="bottom-start" >
                    <!-- item-->
                      <li><router-link :class="`dropdown-item ${checkActive('landing.pricing1') ? 'active' : ''}`" :to="{name:'landing.pricing1'}">Pricing 1</router-link></li>
                    <!-- item-->
                    <li><router-link :class="`dropdown-item ${checkActive('landing.pricing2') ? 'active' : ''}`" :to="{name:'landing.pricing2'}">Pricing 2</router-link></li>
                    <!-- item-->
                    <li><router-link :class="`dropdown-item ${checkActive('landing.timeline') ? 'active' : ''}`" :to="{name:'landing.timeline'}">Timeline</router-link></li>
                </ul>
            </li>
            <li class="nav-item">
               <router-link :to="{name:'landing.invoice'}" :class="`nav-link ${checkActive('landing.invoice') ? 'active' : ''}`">Orders</router-link>
            </li>
            <li>
            <ul class="m-0 d-flex align-items-center navbar-list list-unstyled px-3 px-md-0">
               <li class="nav-item dropdown ms-0 ms-md-5">
                  <a href="#" class="nav-link" id="mail-drop" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     <svg width="24" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.8705 8.80127L16.9461 13.6187C15.8267 14.5067 14.2519 14.5067 13.1326 13.6187L7.1582 8.80127" stroke="#8A93AD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5445 24.9999C25.5996 25.0112 28.3327 21.6794 28.3327 17.5845V8.42668C28.3327 4.33177 25.5996 1 21.5445 1H8.4542C4.39906 1 1.66602 4.33177 1.66602 8.42668V17.5845C1.66602 21.6794 4.39906 25.0112 8.4542 24.9999H21.5445Z" stroke="#8A93AD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                     <span class="bg-primary count-mail"></span>
                  </a>
                  <div class="sub-drop dropdown-menu dropdown-menu-end p-0" aria-labelledby="mail-drop">
                     <div class="card shadow-none m-0">
                        <div class="card-header d-flex justify-content-between bg-primary py-3 rounded">
                           <div class="header-title">
                           <h5 class="mb-0 text-white">All Message</h5>
                           </div>
                        </div>
                        <div class="card-body p-0 ">
                           <a href="#" class="iq-sub-card">
                              <div class="d-flex  align-items-center">
                                 <div class="">
                                    <img class="avatar-40 rounded-pill bg-soft-primary p-1" src="~@/assets/images/icons/03.png" alt="">
                                 </div>
                                 <div class="ms-3">
                                    <h6 class="mb-0 ">Bni Emma Watson</h6>
                                    <small class="float-start font-size-12">13 Jun</small>
                                 </div>
                              </div>
                           </a>
                           <a href="#" class="iq-sub-card">
                              <div class="d-flex align-items-center">
                                 <div class="">
                                    <img class="avatar-40 rounded-pill bg-soft-primary p-1" src="~@/assets/images/avatars/02.png" alt="">
                                 </div>
                                 <div class="ms-3">
                                    <h6 class="mb-0 ">Lorem Ipsum Watson</h6>
                                    <small class="float-start font-size-12">20 Apr</small>
                                 </div>
                              </div>
                           </a>
                           <a href="#" class="iq-sub-card">
                              <div class="d-flex align-items-center">
                                 <div class="">
                                    <img class="avatar-40 rounded-pill bg-soft-primary p-1" src="~@/assets/images/avatars/03.png" alt="">
                                 </div>
                                 <div class="ms-3">
                                    <h6 class="mb-0 ">Why do we use it?</h6>
                                    <small class="float-start font-size-12">30 Jun</small>
                                 </div>
                              </div>
                           </a>
                           <a href="#" class="iq-sub-card">
                              <div class="d-flex align-items-center">
                                 <div class="">
                                    <img class="avatar-40 rounded-pill bg-soft-primary p-1" src="~@/assets/images/avatars/04.png" alt="">
                                 </div>
                                 <div class="ms-3">
                                    <h6 class="mb-0 ">Variations Passages</h6>
                                    <small class="float-start font-size-12">12 Sep</small>
                                 </div>
                              </div>
                           </a>
                           <a href="#" class="iq-sub-card">
                              <div class="d-flex align-items-center">
                                 <div class="">
                                    <img class="avatar-40 rounded-pill bg-soft-primary p-1" src="~@/assets/images/icons/02.png" alt="">
                                 </div>
                                 <div class="ms-3">
                                    <h6 class="mb-0 ">Lorem Ipsum generators</h6>
                                    <small class="float-start font-size-12">5 Dec</small>
                                 </div>
                              </div>
                           </a>
                        </div>
                     </div>
                  </div>
               </li>
               <li class="dropdown">
                  <a class="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="@/assets/images/avatars/01.png" alt="User-Profile" class="img-fluid avatar avatar-50 avatar-rounded">
                  </a>
                  <ul class="dropdown-menu  dropdown-menu-lg-end" aria-labelledby="navbarDropdown3">
                     <li><router-link class="dropdown-item" :to="{name:('landing.UserProfile')}">My Profile</router-link></li>
                     <li><router-link class="dropdown-item" :to="{name:('default.UserPrivacySetting')}">Privacy Setting</router-link></li>
                     <li><hr class="dropdown-divider"></li>
                     <li><router-link class="dropdown-item" :to="{name:('auth.signin')}">Logout</router-link></li>
                  </ul>
               </li>
            </ul>
            </li>
         </ul>
      </div>
   </div>
</nav>
</template>
<script>
import logo from '@/components/custom/Logo/logo'
export default {
  name: 'HeaderStyle',
  components: {
    logo
  },
  props: {
    fullsidebar: { type: Boolean, default: false }
  },
  methods: {
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
