<template>
  <center>
    <div class="loader ">
      <div class="loader-body word-spacing">
        <h1 class="loader-title fw-bold">BALIWAG MARITIME ACADEMY, INC.</h1>
      </div>
    </div>
  </center>
</template>
<script>
export default {
  name: 'Loader',
  props: {
    dark: { type: Boolean, default: false }
  },
  mounted() {
    const loader = document.querySelector('.loader')
    setTimeout(() => {
      loader.classList.add('animate__animated', 'animate__fadeOut')
      setTimeout(() => {
        loader.classList.add('d-none')
      }, 500)
    }, 500)
  }
}
</script>
