<template>
<h2 class="text-primary text-center home-title">Home / <span id="head-data">{{name}}</span></h2>
</template>
<script>
export default {
  name: 'breadcrumb',
  props: {
    name: { type: String, default: 'Digital marketing' }
  }
}
</script>
