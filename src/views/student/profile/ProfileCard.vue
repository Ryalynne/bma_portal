<template>
    <!-- <div class="card shadow">
        <div class="card-body">
            <div class="row ">
                <div class="col-lg-4 col-md-4">
                    <div class="profile-img-edit position-relative">
                        <img :src="details.profile_picture" alt="" class="profile-pic rounded avatar-120">
                    </div>
                </div>
                <div class="col-lg-8 col-md-8">
                    <label for="" class="fw-bolder display-4 6576^ mt-3">
                        {{ displayName(details.account) }}
                    </label>
                    <router-link class="btn btn-sm btn-primary rounded-pill float-end" aria-current="page"
                        :to="{ name: 'student-layout.enrollment-registration' }">
                        UPDATE PROFILE
                    </router-link>
                </div>
            </div>
        </div>
    </div> -->
    <div class="mt-6">
        <div class="card shadow ">
            <div class="row  mx-3 my-3">
                <div class="col-lg-2 col-md-12">
                    <div class="profile-img me-3 mb-3 mb-lg-0">
                        <img :src="details.profile_picture" class="img-fluid avatar avatar-120 rounded-circle"
                            alt="profile-image">
                    </div>
                </div>
                <div class="col-lg-8 col-md-12">
                    <div class="row">
                        <div class="col-md">
                            <h4 class="me-2 text-primary fw-bolder">{{ displayName(details.account) }}</h4>
                            <span>{{ details.account.account.email }}</span>
                            <router-link class="btn btn-sm btn-primary rounded-pill float-end" aria-current="page"
                                :to="{ name: 'student-layout.update-information' }">
                                UPDATE PROFILE
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile Card',
    methods: {
        displayName(data) {
            const extensionName = data.extention_name.toUpperCase() !== 'N/A' ? ' ' + data.extention_name : ''
            const fullName = data.last_name + extensionName + ', ' + data.first_name + ' ' + data.middle_initial
            return fullName.toUpperCase()
        }
    },
    props: {
        details: Object
    }
}
</script>