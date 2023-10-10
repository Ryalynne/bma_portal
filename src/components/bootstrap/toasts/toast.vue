<template>
  <div :id="id" :class="`toast ${className} ${extraClass}`" :role="role" :aria-live="arialive" :aria-atomic="ariaatomic" :data-bs-autohide="autohide">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'toast',
  props: {
    id: {
      type: String
    },
    className: {
      type: String,
      default: 'fade show'
    },
    extraClass: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'alert'
    },
    arialive: {
      type: String,
      default: 'assertive'
    },
    ariaatomic: {
      type: Boolean,
      default: false
    },
    autohide: {
      type: Boolean,
      default: false
    }
  }
}
</script>
