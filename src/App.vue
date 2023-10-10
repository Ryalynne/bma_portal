<template>
  <router-view/>
</template>

<script>
import { AUTO_LOGIN_ACTION } from '@/store/storeConstants'
export default {
  name: 'App',
  created() {
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
  }
}
</script>
<style lang="scss">
  @import "@/assets/scss/gigz.scss";
  @import "@/assets/scss/custom.scss";
  @import url("./assets/plugins/Leaflet/leaflet.css");
  @import url("./assets/plugins/icons/@fortawesome/fontawesome-free/css/all.min.css");
</style>
