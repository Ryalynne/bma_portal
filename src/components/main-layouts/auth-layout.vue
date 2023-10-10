<template>
  <!-- loader Start -->
  <div id="loading">
    <loader />
  </div>
  <server-loader v-if="showLoading"></server-loader>
  <!-- loader END -->
  <div class="wrapper">
    <router-view/>
  </div>
</template>
<script>
import loader from '@/components/custom/loader/loader'
import PageHeader from '@/components/main-layouts/components/page-header.vue'
import PageFooter from '@/components/main-layouts/components/page-footer.vue'
import serverLoader from '@/components/main-layouts/components/server-loader.vue'
import { mapState } from 'vuex'
export default {
  name: 'auth-layout',
  computed: {
    ...mapState({
      showLoading: state => state.showLoading
    })
  },
  components: {
    loader,
    serverLoader
  }
}
</script>