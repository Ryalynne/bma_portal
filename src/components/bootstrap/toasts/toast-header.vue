<template>
<div :class="`toast-header ${headerClass}`">
     <slot/>
    <button v-if="dismissable" type="button" :class="`btn-close ${buttonClass}`" data-bs-dismiss="toast" aria-label="Close"></button>
</div>
</template>
<script>
export default {
  name: 'toast-header',
  props: {
    headerClass: {
      type: String, default: ''
    },
    buttonClass: {
      type: String, default: ''
    },
    dismissable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
