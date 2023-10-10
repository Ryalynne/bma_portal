<template>
  <component :is="tag" :class="`swiper-slide ${slideClass}`" :style="style">
    <slot />
  </component>
</template>
<script>
export default {
  name: 'SwiperSlide',
  props: {
    tag: { type: String, default: 'div' },
    slideClass: { type: String, default: '' },
    style: { type: String, default: '' }
  }
}
</script>
