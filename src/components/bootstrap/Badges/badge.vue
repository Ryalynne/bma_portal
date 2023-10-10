<template>
    <component :is="tag" :class="`badge ${badgeClass}`">
        <slot/>
    </component>
</template>
<script>
export default {
  name: 'badge',
  props: {
    tag: { type: String, default: '' },
    badgeClass: { type: String, default: '' }
  }
}
</script>
