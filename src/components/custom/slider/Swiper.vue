<template>
  <div :id="id">
    <slot name="nav" v-if="navTop" />
    <div  v-if="tag == 'div'" :dir="dir == 'rtl' ? 'rtl' : ''">
      <!-- Additional required wrapper -->
      <div class="">
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
    <ul :class="`swiper-container ${className}`"  v-else-if="tag == 'ul'" :dir="dir == 'rtl' ? 'rtl' : ''">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
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
    </ul>
    <slot name="nav" v-if="!navTop" />
  </div>
</template>
<script>
import Swiper, { Navigation, Pagination, Parallax, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
Swiper.use([Navigation, Pagination, Parallax, Autoplay])
let swiper
export default {
  name: 'Swiper',
  props: {
    className: { type: String, default: '' },
    id: { type: String, default: '' },
    tag: { type: String, default: 'ul' },
    // tag: {type: String, default: 'li'},
    options: {
      type: Object,
      default: () => {
        return {
          centeredSlides: false,
          loop: false,
          slidesPerView: 6,
          autoplay: false,
          spaceBetween: 32,
          breakpoints: {
            320: { slidesPerView: 1 },
            550: { slidesPerView: 2 },
            991: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
            1500: { slidesPerView: 5 },
            1920: { slidesPerView: 6 },
            2040: { slidesPerView: 7 },
            2440: { slidesPerView: 8 },
            2800: { slidesPerView: 9 }
          },
          pagination: {
            el: '.swiper-pagination'
          },
          // navigation: {
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev'
          // },

          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar'
          }
        }
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
  watch: {
    dir: function () {
      const dirMode = sessionStorage.getItem('dir-mode')
      if (dirMode !== null) {
        this.init()
      } else {
        this.reInit()
      }
    }
  },
  methods: {
    init() {
      setTimeout(() => {
        swiper = new Swiper('.swiper-container', this.options)
      }, 500)
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
