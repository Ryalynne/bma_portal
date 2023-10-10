<template>
   <div class="card-profile-progress mb-4">
    <CircleProgress :id="`circle-progress-${id}`" :color="color" :value="value" :className="circle-progress-basic" data-min-value="0" data-max-value="100" data-type="percent"></CircleProgress>
    <img :src="image" :class="`img-fluid rounded-circle card-img ${imgClass}`" alt="image">
</div>
<div class="text-center">
    <p class="mb-2">{{progressPercent}}</p>
    <h6 class="heading-title mb-2">{{progresssTitle}}</h6>
    <p class="mb-0">
       {{progressText}}
    </p>
</div>
</template>
<script>
import CircleProgress from '@/components/custom/progressbar/Circleprogressbar'
export default {
  name: 'circleprogressbar',
  components: {
    CircleProgress
  },
  props: {
    id: { type: Number, default: 0 },
    progressPercent: { type: String, default: '' },
    image: { type: String, default: '' },
    progresssTitle: { type: String, default: '' },
    imgClass: { type: String, default: '' },
    color: { type: String, default: '' },
    progressText: { type: String, default: '' },
    value: { type: Number, default: 0 }
  }
}
</script>
