<template>
    <div class="d-flex">
        <img :src="custumerImage" class="img-fluid avatar-rounded avatar-40" alt="profile-image">
        <div class="ms-2 w-100">
            <div class="d-flex justify-content-between ">
                <h6 class="mb-1 heading-title fw-bolder">{{custumerTitle}}</h6>
                <small class="text-dark">{{custumersubTitle}}</small>
            </div>
            <div class="d-flex mb-2">
                <div class="card-rating stars-ratings">
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
        <span v-for="n in 5" :key="n">
            <ratingstars v-if="rating >= n" :fill="true"/>
            <ratingstars v-else/>
        </span>
    </div>
            </div>
            <small class="text-dark">{{custumerText}}</small>
        </div>
    </div>
</template>
<script>
export default {
  name: 'customerreview',
  props: {
    custumerImage: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    custumerTitle: { type: String, default: '' },
    custumersubTitle: { type: String, default: '' },
    custumerText: { type: String, default: '' }
  }
}
</script>
