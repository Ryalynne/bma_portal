<template>
    <component :is="tag" :class="contentClass" :aria-disabled="ariaDisable">
        <slot/>
    </component>
</template>
<script>
export default {
  name: 'list-content',
  props: {
    tag: { type: String, default: 'li' },
    contentClass: { type: String, default: '' },
    ariaDisable: { type: Boolean, default: false }
  }
}
</script>
