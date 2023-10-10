<template>
    <div v-if="deployment">
        <div v-if="deployment.is_approved">
            <div class="timeline-dots1 border-primary text-primary">
                <svg width="20" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.091C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.091V7.92C2 4.38 4.28 2 7.67 2ZM11.43 14.99L16.18 10.24C16.52 9.9 16.52 9.35 16.18 9C15.84 8.66 15.28 8.66 14.94 9L10.81 13.13L9.06 11.38C8.72 11.04 8.16 11.04 7.82 11.38C7.48 11.72 7.48 12.27 7.82 12.62L10.2 14.99C10.37 15.16 10.59 15.24 10.81 15.24C11.04 15.24 11.26 15.16 11.43 14.99Z"
                        fill="currentColor"></path>
                </svg>
            </div>
            <h5 class="float-left mb-1 text-primary fw-bolder">
                {{ viewName }}

            </h5>
            <div class="d-inline-block w-100">
                <p class="mb-3">
                    You can now proceed to Enrollment Procedure
                </p>
            </div>
        </div>
        <div v-else>
            <div class="timeline-dots1 border-info text-info">
                <svg width="20" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.09C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.09V7.92C2 4.38 4.28 2 7.67 2ZM7.52 13.2C6.86 13.2 6.32 12.66 6.32 12C6.32 11.34 6.86 10.801 7.52 10.801C8.18 10.801 8.72 11.34 8.72 12C8.72 12.66 8.18 13.2 7.52 13.2ZM10.8 12C10.8 12.66 11.34 13.2 12 13.2C12.66 13.2 13.2 12.66 13.2 12C13.2 11.34 12.66 10.801 12 10.801C11.34 10.801 10.8 11.34 10.8 12ZM15.28 12C15.28 12.66 15.82 13.2 16.48 13.2C17.14 13.2 17.67 12.66 17.67 12C17.67 11.34 17.14 10.801 16.48 10.801C15.82 10.801 15.28 11.34 15.28 12Z"
                        fill="currentColor"></path>
                </svg>
            </div>
            <h5 class="float-left mb-1 text-info fw-bolder">
                {{ viewName }}
            </h5>
            <div class="d-inline-block w-100">
                <div class="row">
                    <div class="col-lg-8 col-md-12">
                        <labelComponent label="COMPANY NAME" :value="deployment.company_name" />
                     </div>
                    <div class="col-lg-4 col-md-12">
                        <labelComponent label="SBT BATCH" :value="deployment.sbt_batch" />
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <labelComponent label="VESSEL NAME" :value="deployment.vessel_name" />
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <labelComponent label="VESSEL TYPE" :value="deployment.vessel_type" />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <labelComponent label="SEA EXPERIENCE" :value="deployment.shipping_company" />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <labelComponent label="STATUS" :value="deployment.shipboard_status" />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <labelComponent label="DATE OF EMBARKING" :value="deployment.embarked" />
                    </div>

                </div>
                <label for="" class="form-label h5 text-primary fw-bolder mt-5">DOCUMENT REQUIREMENTS</label>
                <div class="row">
                    <div class="col-lg-6 col-md-12" v-for="(item, index) in deployment.document_requirements" :key="index">
                        <label for="example-text-input" class="h5 fw-bolder text-primary">
                            <small>{{ (item.documents.document_name).toUpperCase() }}</small>
                        </label>
                        <div class="document-status">
                            <div v-if="item.document_status === null || item.document_status == 0"
                                class="document-under-verification">
                                <span class="text-info fw-bolder">This Document is under
                                    verification</span>
                            </div>
                            <div v-else>
                                <div v-if="item.document_status == 1" class="document-approved">
                                    <p class="m-0 p-0">
                                        <small>DOCUMENT STATUS: </small>
                                        <small for="" class="form-small text-primary fw-bolder">APPROVED
                                            DOCUMENT</small>
                                    </p>
                                    <p class="m-0 p-0"><small>VERIFIED BY: </small>
                                        <small for="" class="text-muted fw-bolder">
                                            {{ item.staff ?
                                                (item.staff.first_name + ' ' +
                                                    item.staff.last_name).toUpperCase() : '' }}
                                        </small>
                                    </p>
                                    <p class="m-0 p-0"><small>VERIFIED DATE: </small>
                                        <small for="" class="text-muted fw-bolder">
                                            {{ getFormatDate(item.updated_at) }}
                                        </small>
                                    </p>

                                </div>
                                <div v-else class="document-disapproved">
                                    <p class="m-0 p-0">
                                        <small>DOCUMENT STATUS: </small>
                                        <small for="" class="form-small text-danger fw-bolder">DISAPPROVED
                                            DOCUMENT</small>
                                    </p>
                                    <p class="m-0 p-0">
                                        <small>REMARKS: </small>
                                        <small for="" class="form-small text-info fw-bolder">{{
                                            item.document_comment }}</small>
                                    </p>
                                    <form @submit.prevent="reuploadDocument" method="post" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <label for="example-text-input" class="form-control-label fw-bolder">
                                                <small>RE-UPLOAD DOCUMENT<span class="text-danger">*</span></small>
                                            </label>
                                            <div class="row">
                                                <div class="col-lg-8 col-md-10">
                                                    <input type="file"
                                                        class="form-control form-control-sm border border-primary" required
                                                        v-on:change="handleFileChange($event, item.id, deployment.id)" />
                                                </div>
                                                <div class="col-lg-4 col-md-2">
                                                    <button type="submit"
                                                        class="btn btn-sm btn-primary w100">UPLOAD</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="timeline-dots1 border-info text-info">
            <svg width="20" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.09C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.09V7.92C2 4.38 4.28 2 7.67 2ZM7.52 13.2C6.86 13.2 6.32 12.66 6.32 12C6.32 11.34 6.86 10.801 7.52 10.801C8.18 10.801 8.72 11.34 8.72 12C8.72 12.66 8.18 13.2 7.52 13.2ZM10.8 12C10.8 12.66 11.34 13.2 12 13.2C12.66 13.2 13.2 12.66 13.2 12C13.2 11.34 12.66 10.801 12 10.801C11.34 10.801 10.8 11.34 10.8 12ZM15.28 12C15.28 12.66 15.82 13.2 16.48 13.2C17.14 13.2 17.67 12.66 17.67 12C17.67 11.34 17.14 10.801 16.48 10.801C15.82 10.801 15.28 11.34 15.28 12Z"
                    fill="currentColor"></path>
            </svg>
        </div>
        <h5 class="float-left mb-1 text-info fw-bolder">
            {{ viewName }}
        </h5>
        <div class="d-inline-block w-100">
            <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-lg-12">
                        <selectComponent label="Shipping Company" :data="propsCompany" v-model:value="agency"
                            :error="errors.agency" />
                        <div class="form-check mt-0">
                            <input class="form-check-input" type="checkbox" value="0" v-model="otherShipping">
                            <small class="form-check-label validate-checkbox" for="flexCheckDefault1">
                                Other Shipping Company
                            </small>
                        </div>
                    </div>
                    <div v-if="otherShipping" class="col-lg-6 col-md-12">
                        <inputComponent label="Shipping Company" v-model:value="shippingCompany"
                            :error="errors.shipping_company" />
                    </div>
                    <div v-if="otherShipping" class="col-lg-6 col-md-12">
                        <inputComponent label="Company Address" v-model:value="companyAddress"
                            :error="errors.company_address" />
                    </div>
                    <div class="col-lg-12">
                        <inputComponent label="Vessel Name" v-model:value="vessleName" :error="errors.vessel_name" />
                    </div>
                    <div class="col-lg-12">
                        <selectComponentV2 label="Vessel Type" :data="vesselType" v-model:value="vessel"
                            :error="errors.vessel_type" />
                    </div>
                    <div class="col-lg-12">
                        <selectComponentV2 label="Sea Experience" :data="ship" v-model:value="seaExperience"
                            :error="errors.sea_experience" />
                    </div>
                    <div class="col-lg-12">
                        <inputComponentV2 type="Date" label="Date of Embarkation" v-model:value="embarked"
                            :error="errors.embarked" />
                    </div>
                </div>
                <label class="text-primary fw-bolder">DOCUMENT REQUIREMENTS</label>
                <div class="row">
                    <div class="col-lg-6 col-md-12" v-for="(item, index) in propsDocuments" :key="index">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>{{ item.document_name }}<span class="text-danger">*</span></small>
                            </label>
                            <input type="hidden" :value="item.id" name="documents">
                            <input type="file" class="form-control border border-primary" :name="`file${index}`" ref="files"
                                @change="onFileChange(index, item.document_name.replaceAll(' ', '_').toLowerCase())" />
                            <span class="badge bg-danger mt-2"
                                v-if="errors[item.document_name.toLowerCase().replaceAll(' ', '_')]">{{
                                    errors[item.document_name.toLowerCase().replaceAll(' ', '_')][0] }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group float-right">
                    <button class="btn btn-primary w-100" type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapMutations } from 'vuex'
import inputComponent from '@/components/main-layouts/components/widgets/input-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component-v2.vue'
import selectComponentV2 from '@/components/main-layouts/components/widgets/select-component.vue'
import labelComponent from '@/components/main-layouts/components/widgets/label-component.vue'
import Swal from 'sweetalert2'

export default {
    name: 'DocumentRequirments',
    components: {
        inputComponent,
        selectComponent,
        selectComponentV2,
        inputComponentV2,
        labelComponent
    },
    data() {
        const formData = new FormData()
        var shippingCompany = ''
        if (this.deployment) {
            if (this.deployment.shipboard_companies) {
                shippingCompany = this.deployment.shipboard_companies.agency_name
                console.log(shippingCompany)
            }
        }
        return {
            viewName: 'STEP 1 : DOCUMENT REQUIREMENTS',
            ship: ['Foreign Ship', 'Domestic Ship'],
            files: [],
            errors: [],
            error: '',
            agency: '',
            vessel: '',
            vessleName: '',
            seaExperience: '',
            embarked: '',
            formData,
            otherShipping: false,
            shippingCompany,
            companyAddress: ''
        }
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        getFormatDate(inputDate) {
            // create a new Date object with the input date string
            var date = new Date(inputDate)
            // define an array of month names
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]
            // get the day, month, and year values from the date object
            var day = date.getDate()
            var month = monthNames[date.getMonth()] // add 1 to adjust for 0-indexed months
            var year = date.getFullYear()
            // format the date as 'dd/mm/yyyy'
            const formattedDate = month + ' ' + day + ', ' + year
            return formattedDate
        },
        onFileChange(index, id) {
            const file = this.$refs.files[index].files[0]
            this.formData.append(id.toString(), file)
        },
        handleFileChange(event, document, deployment) {
            const file = event.target.files[0] // Get the Files in Event
            this.formData.append('file', file) // Set the File on FormData
            this.formData.append('document', document) // Set the Document on FormData
            this.formData.append('deployment', deployment)
        },
        async submitForm() {
            if (this.otherShipping === false) {
                this.formData.append('agency', this.agency)
            } else {
                this.agency = 'NA'
                this.formData.append('agency', 'NA')
                this.formData.append('shipping_company', this.shippingCompany)
                this.formData.append('company_address', this.companyAddress)
            }
            this.formData.append('vessel_name', this.vessleName)
            this.formData.append('vessel_type', this.vessel)
            this.formData.append('sea_experience', this.seaExperience)
            this.formData.append('embarked', this.embarked)
            this.showLoading(true)
            this.errors = []
            axios.post('/student/onboard/enrollment', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                this.showAlert(response.data.data)
                window.location.reload()
                console.log(response)
            }).catch((error) => {
                this.showLoading(false)
                console.log(error)
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.errors = error.response.data.errors
                } else {
                    this.showAlertError(error)
                }
            })
        },
        async reuploadDocument() {
            console.log('Reupload')
            this.showLoading(true)
            axios.post('/student/onboard/document-reupload', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                console.log(response.data)
                if (response.status === 200) {
                    this.showAlert(response.data.data)
                    window.location.reload()
                }
            }).catch((error) => {
                this.showLoading(false)
                console.log(error)
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.errors = error.response.data.errors
                } else {
                    this.showAlertError(error)
                }
            })
        },
        showAlertError(error) {
            Swal.fire({
                icon: 'error',
                title: error.code,
                text: error.message,
                confirmButtonText: 'OK'
            })
        },
        showAlert(data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: data.message,
                confirmButtonText: 'OK'
            })
        }
    },
    props: { propsCompany: Object, propsDocuments: Object, deployment: Object, vesselType: Object, token: String }
}
</script>