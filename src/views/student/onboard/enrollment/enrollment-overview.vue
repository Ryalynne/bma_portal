<template>
    <div v-if="isLoading">
        <LoadingView />
    </div>
    <div v-else>
        <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
            data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
            <div class="card-header">
                <div class="header-title">
                    <h4 class="card-title fw-bold text-primary">SHIPBOARD ENROLLMENT OVERVIEW</h4>
                </div>
            </div>
            <div class="card-body">
                <div class="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                    <ul class="list-inline p-0 m-0">
                        <li>
                            <DocumentRequirments :propsCompany="company" :propsDocuments="documents"
                                :deployment="deployment" :vesselType="vesselType" :token="token" />
                        </li>
                        <li>
                            <EnrollmentApplication :deployment="deployment" :enrollment="enrollment" :token="token" />
                        </li>
                        <li>
                            <TuitionFeeAssesment :deployment="deployment" :enrollment="enrollment"
                                :tuitionDetails="tuitionDetails" :token="token" />
                        </li>
                        <li>
                            <PaymentTransaction :deployment="deployment" :enrollment="enrollment"
                                :tuitionDetails="tuitionDetails" :token="token" />
                        </li>
                        <li>
                            <EnrollmentComplete :deployment="deployment" :enrollment="enrollment"
                                :tuitionDetails="tuitionDetails" :token="token" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LoadingView from './view/loading-view.vue'
import DocumentRequirments from './components/document-requirments.vue'
import EnrollmentApplication from './components/enrollment_application.vue'
import TuitionFeeAssesment from './components/tuitionfee_assessment.vue'
import PaymentTransaction from './components/payment-transaction.vue'
import EnrollmentComplete from './components/enrollment-complete.vue'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'ShipboardEnrollmentOverview',
    components: {
        LoadingView,
        DocumentRequirments,
        EnrollmentApplication,
        TuitionFeeAssesment,
        PaymentTransaction,
        EnrollmentComplete
    },
    data() {
        return {
            isLoading: true,
            data: [],
            company: [],
            document: [],
            enrollment: [],
            deployment: [],
            vesselType: [],
            tuitionDetails: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/onboard/enrollment', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data.data
            this.company = this.data.application_details.shipping_company
            this.documents = this.data.application_details.document_requirements
            this.vesselType = this.data.application_details.vessel_type
            this.deployment = this.data.shipboard_application
            this.enrollment = this.data.enrollment
            this.tuitionDetails = this.data.tuition
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            this.isLoading = false
        })
    }
}
</script>