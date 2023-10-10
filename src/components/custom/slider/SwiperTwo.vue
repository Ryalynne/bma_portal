<template>
<div :class="`swiper-container ${className}`">
      <!-- Additional required wrapper -->
    <div class="swiper-wrapper" :id="id" :aria-live="ariaLive">
        <!-- Slides -->
    <slot />
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination" v-if="pagination">
    <slot name="pagination" />
    </div>
    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar" v-if="scrollbar">
    <slot name="scrollbar" />
    </div>
</div>
</template>
<script>
import Swiper, { Navigation, Pagination, Parallax, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
Swiper.use([Navigation, Pagination, Parallax, Autoplay])
let swiper
export default {
  name: 'SwiperTwo',
  props: {
    className: { type: String, default: '' },
    id: { type: String, default: '' },
    ariaLive: { type: String, default: '' },
    options: {
      type: Object,
      default: () => {
      }
    },
    navTop: { type: Boolean, default: false },
    pagination: { type: Boolean, default: false },
    scrollbar: { type: Boolean, default: false }
  },
  data() {
    return {
      swiper: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      setTimeout(() => {
        swiper = new Swiper('.swiper-container', this.options)
      }, 700)
    },
    reInit() {
      swiper.destroy(true, true)
      setTimeout(() => {
        this.init()
      }, 500)
    }
  }
}
</script>
