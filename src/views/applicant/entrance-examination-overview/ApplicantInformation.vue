<template>
    <stepper value="" :isActive="className.stepperStatus" :isFinish="className.stepperFinish" />
    <div :class="`card ${className.cardClass}`" @click="showContent">
        <div class="card-body m-2 p-2">
            <span :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>
            <div v-if="content">
                <div v-if="className.contentBody" class="content-active">
                    <p class="mb-3">
                        Kindly Fill-up the Form for your Additional Information,
                        <router-link class="badge bg-primary" :to="{ name: 'applicant-layout.applicant-information' }">Go to
                            Applicant Information Form</router-link>
                    </p>
                </div>
                <div v-else>
                    <div class="row">
                        <div class="col-md-8">
                            Application Completed, you may now proceed to uploading of Documentary Requirements
                        </div>
                        <div class="col-md">
                            <router-link class="badge bg-primary w-100"
                                :to="{ name: 'applicant-layout.applicant-information' }">Update Application
                                Form</router-link>
                            <label for="" class="badge border border-primary text-primary w-100" @click="applicantForm"
                                data-bs-toggle="modal" data-bs-target="#exampleModal">View
                                Application Form</label>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
    <modal id="exampleModal" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xl" ariaLabelled="exampleModalLabel"
        :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">APPLICATION FORM
            </h5>
        </model-header>
        <model-body>
            <div v-if="pdfUrl">
                <PdfViewer :pdfUrl="pdfUrl" />
                <!-- <pdf :src="pdfUrl"></pdf> -->
            </div>
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>

    </modal>
</template>
<script>
import modal from '@/components/bootstrap/modal/modal.vue'
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
import PdfViewer from '@/components/main-layouts/components/PdfViewer.vue'
/* import { pdf } from 'vue-pdf' */
import axios from 'axios'
export default {
    name: 'ApplicantInformation',
    components: {
        stepper, modal, PdfViewer
    },
    data() {
        let className = { status: 'Progress', cardClass: 'bg-soft-info', textClass: 'text-info', stepperStatus: true, stepperFinish: false, badgeColor: 'bg-info', contentBody: true, contentShow: true }
        if (this.propsApplicantDetails.applicant) {
            className = { status: 'Complete', cardClass: 'bg-soft-primary', textClass: 'text-primary', stepperStatus: true, stepperFinish: true, badgeColor: 'bg-primary', contentBody: false, contentShow: false }
        }
        return {
            titleName: "APPLICANT'S INFORMATION",
            progressName: 'STEP 1',
            status: className.status,
            className,
            content: className.contentShow,
            pdfUrl: null
        }
    },
    methods: {
        showContent() {
            this.content = !this.content
        },
        applicantForm() {
            axios.get('applicant/registration-form', {
                headers: {
                    Authorization: 'Bearer ' + this.token
                },
                responseType: 'blob'
            })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/pdf' })
                    const url = window.URL.createObjectURL(blob)
                    this.pdfUrl = url
                    /*  window.open(url, '_blank') */
                })
                .catch(error => {
                    console.error('Error fetching PDF:', error)
                })
        }
    },
    props: { propsApplicantDetails: Object, token: String }
}
</script>