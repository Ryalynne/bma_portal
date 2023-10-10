<template>
    <div class="card">
    <router-link :to="{name: 'landing.productdetail'}">
        <div class="iq-image position-relative">
            <div class="img">
                <img :src="productImage1" alt="image" class="img-fluid height1 radius-our w-100">
            </div>
            <span class="app badge-5 ">
                <img :src="profile1" alt="image" class="img-fluid rounded-circle avatar-100">
            </span>
        </div>
        <div class="card-body pb-3">
            <div class="name-title d-flex justify-content-between pb-2">
                <h6 class="mb-3">{{name1}}</h6>
                <p>Pro Verified</p>
            </div>
            <div class="d-flex justify-content-between flex-wrap pb-2">
                <h5>{{description1}}</h5>
                <div class="d-flex justify-content-between">
                    <h4 class="me-4">$270</h4>
                    <span class="d-flex">
                        <svg width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.00390625" width="24" height="24" rx="12" fill="#18995B"/>
                            <rect x="11.166" y="7.00391" width="1.66667" height="10" rx="0.833333" fill="white"/>
                            <rect x="7" y="12.8369" width="1.66666" height="10" rx="0.833332" transform="rotate(-90 7 12.8369)" fill="white"/>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </router-link>
</div>
</template>
<script>
export default {
  name: 'detailcards',
  props: {
    name1: { type: String, default: '' },
    description1: { type: String, default: '' },
    productImage1: { type: String, default: '' },
    profile1: { type: String, default: '' }
  }
}
</script>
