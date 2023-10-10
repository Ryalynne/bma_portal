<template>
    <div class="card bg-white iq-service-card">
    <router-link :to="{name: 'landing.productdetail'}">
        <div class="iq-image position-relative">
            <div class="img">
                <img :src="editorsImage" alt="image" class="img-fluid height1 radius-our w-100">
            </div>
            <div class="app badge-2 btn btn-sm btn-primary">$2000</div>
            <div class="app badge-1 btn btn-sm btn-primary">App Design</div>
            <div class="app badge-3 ms-3 btn btn-sm text-white btn-info">Ui/Ux Design</div>
            <span class="app heart">
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24.5208" cy="24" r="24" fill="white"/>
                    <path opacity="0.4" d="M24.2967 33.8374C22.0136 32.4273 19.8913 30.7645 17.9686 28.8796C16.6112 27.5338 15.5746 25.8905 14.9379 24.0753C13.8002 20.5352 15.1245 16.4895 18.8218 15.2884C20.7733 14.6755 22.8957 15.0518 24.5277 16.2998C26.1603 15.0532 28.2821 14.677 30.2337 15.2884C33.931 16.4895 35.2641 20.5352 34.1265 24.0753C33.495 25.8888 32.4645 27.5319 31.1136 28.8796C29.1891 30.7625 27.067 32.4251 24.7855 33.8374L24.5366 34L24.2967 33.8374Z" fill="#FF0101"/>
                    <path d="M24.5317 34L24.2967 33.8374C22.0109 32.4274 19.8856 30.7647 17.9598 28.8796C16.596 27.5356 15.5531 25.8922 14.9113 24.0752C13.7825 20.5352 15.1068 16.4894 18.8041 15.2884C20.7556 14.6755 22.906 15.052 24.5317 16.3105V34Z" fill="#FF0101"/>
                    <path d="M30.7512 21.9992C30.5503 21.9863 30.3633 21.8859 30.2338 21.7216C30.1044 21.5572 30.0439 21.3434 30.0667 21.1302C30.0884 20.4278 29.6888 19.7885 29.0725 19.5398C28.6817 19.4331 28.445 19.0099 28.5428 18.5925C28.6355 18.1818 29.0201 17.9265 29.4066 18.0189C29.4554 18.027 29.5024 18.0447 29.5451 18.071C30.7808 18.5466 31.5809 19.8264 31.5172 21.2258C31.5152 21.4379 31.4325 21.64 31.2881 21.7858C31.1437 21.9316 30.9499 22.0087 30.7512 21.9992Z" fill="#FF0101"/>
                </svg>
            </span>
        </div>
        <div class="card-body pb-3">
            <div class="border-bottom mt-3">
                <h5 class=" mb-3">{{title}}</h5>
            </div>
            <div class="d-flex justify-content-between flex-wrap mt-3">
                <div>
                    <img :src="footerImage" alt="image" class="img-fluid avatar-32 rounded-circle">
                    <span class="text-dark ms-2">{{footerName}}</span>
                </div>
                <div class="iq-rating mt-2">
                    <div class="d-flex align-items-center text-primary">
                        <span v-for="n in 5" :key="n">
                        <ratingstars v-if="rating >= n" :fill="true"/>
                        <ratingstars v-else/>
                        </span>
                        <!-- {{#if @partial-block}}
                        {{> @partial-block }}
                    {{else}}
                        {{#for 6}}
                            {{#compare ../rating '>=' this}}
                                {{> partials/components/rating-star fill="true" }}
                            {{else}}
                                {{> partials/components/rating-star }}
                            {{/compare}}
                        {{/for}}
                    {{/if}} -->
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</div>
</template>
<script>
export default {
  name: 'editorscard',
  props: {
    footerName: { type: String, default: '' },
    title: { type: String, default: '' },
    editorsImage: { type: String, default: '' },
    footerImage: { type: String, default: '' },
    rating: { type: Number, default: 0 }
  }

}
</script>
