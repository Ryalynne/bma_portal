<template>
  <span class="screen-darken"></span>
  <!-- loader Start -->
  <div id="loading">
    <loader />
  </div>
  <server-loader v-if="showLoading"></server-loader>
  <!-- loader END -->
  <main class="main-content">
    <!--Nav Start-->
    <PageHeader />
    <!--Nav End-->
    <div class="container">
      <router-view />
    </div>
    <PageFooter />
  </main>
</template>
<script>
import loader from '@/components/custom/loader/loader'
import PageHeader from '@/components/main-layouts/components/page-header.vue'
import PageFooter from '@/components/main-layouts/components/page-footer.vue'
import serverLoader from '@/components/main-layouts/components/server-loader.vue'
import { mapState } from 'vuex'
export default {
  name: 'app-layout',
  computed: {
    ...mapState({
      showLoading: state => state.showLoading
    })
  },
  components: {
    PageHeader,
    loader,
    PageFooter,
    serverLoader
  }
}
</script>