<template>
    <div class="timeline-dots1 border-primary text-primary">
        <svg width="20" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.091C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.091V7.92C2 4.38 4.28 2 7.67 2ZM11.43 14.99L16.18 10.24C16.52 9.9 16.52 9.35 16.18 9C15.84 8.66 15.28 8.66 14.94 9L10.81 13.13L9.06 11.38C8.72 11.04 8.16 11.04 7.82 11.38C7.48 11.72 7.48 12.27 7.82 12.62L10.2 14.99C10.37 15.16 10.59 15.24 10.81 15.24C11.04 15.24 11.26 15.16 11.43 14.99Z"
                fill="currentColor"></path>
        </svg>
    </div>
    <div class="card bg-soft-primary" @click="showContent">
        <div class="card-body m-2 p-2">
            <span class="badge bg-primary float-end">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 class="mb-1 fw-bolder text-primary">{{ titleName }}</h5>
            <div v-if="content" class="row">
                <div class="col-lg-6 col-md-12">
                    <small class="fw-bolder text-muted">APPLICANT'S NAME:</small>
                    <br>
                    <label for="" class="text-primary fw-bolder h5">{{ propsApplicantDetails.name }}</label>
                </div>
                <div class="col-lg-6 col-md-12">
                    <small class="fw-bolder text-muted">APPLICANT'S EMAIL:</small>
                    <br>
                    <label for="" class="text-primary fw-bolder h5">{{ propsApplicantDetails.email }}</label>
                </div>
                <div class="col-lg-6 col-md-12">
                    <small class="fw-bolder text-muted">COURSE:</small>
                    <br>
                    <label for="" class="text-primary fw-bolder h5">{{ propsApplicantDetails.course.course_name }}</label>
                </div>
                <div class="col-lg-6 col-md-12">
                    <small class="fw-bolder text-muted">ACADEMIC YEAR:</small>
                    <br>
                    <label for="" class="text-primary fw-bolder h5">FIRST SEMESTER - {{ propsApplicantDetails.academic.school_year }}</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PreRegistration',
    data() {
        return {
            titleName: 'APPLICATION ACCOUNT',
            progressName: 'PRE-REGISTRATION',
            status: 'Complete',
            content: false
        }
    },
    methods: {
        showContent() {
            this.content = !this.content
        }
    },
    props: { propsApplicantDetails: Object }
}
</script>