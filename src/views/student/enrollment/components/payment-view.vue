<template>
    <div v-if="enrollment.application">
        <div v-if="enrollment.application.is_approved">
            <div v-if="tuitionDetails.tuition_assessment">
                <div v-if="tuitionDetails.payment_transaction" class="complete">
                    <stepper :value="viewName" :isActive="true" :isFinish="true" />
                    <div class="d-inline-block w-100">
                        <p class="mb-3">
                            Your payment transaction complete.
                        </p>
                    </div>
                </div>
                <div v-else class="upload-payment">
                    <stepper :value="viewName" :isActive="true" />
                    <div class="d-inline-block w-100">
                        <div class="row">
                            <div class="col-lg-6 col-md-12">
                                <h6 class="text-info mb-1 fw-bolder">PAYMENT INSTRUCTION</h6>
                                <p>For bank deposit or online fund transfer, please use the bank details
                                    below:
                                </p>
                                <div v-if="enrollment.course_id === 3">
                                    <p class="fw-bolder text-info h5 mb-1">SENIOR HIGH SCHOOL</p>
                                    <p class="mb-1">
                                        <small class="text-muted">BANK:</small> <br>
                                        <span class="fw-bolder text-secondary mt-0">LANDBANK OF THE
                                            PHILLIPINES</span>
                                    </p>
                                    <p class="mb-1">
                                        <small class="text-muted">ACCOUNT NAME:</small> <br>
                                        <span class="fw-bolder text-secondary mt-0">BALIWAG MARITIME
                                            FOUNDATION,INC.</span>
                                    </p>
                                    <p class="mb-1">
                                        <small class="text-muted">ACCOUNT NUMBER:</small> <br>
                                        <span class="fw-bolder text-secondary mt-0">0102112822</span>
                                    </p>
                                </div>
                                <div v-else>
                                    <p class="fw-bolder text-info h5 mb-1">COLLEGE</p>
                                    <p class="mb-1">
                                        <small class="text-muted">BANK:</small> <br>
                                        <span class="fw-bolder text-secondary mt-0">BANK OF COMMERCE</span>
                                    </p>
                                    <p class="mb-1">
                                        <small class="text-muted">ACCOUNT NAME:</small> <br>
                                        <span class="fw-bolder text-secondary mt-0">BALIWAG MARITIME
                                            ACADEMY INC</span>
                                    </p>
                                    <p class="mb-1">
                                        <small class="text-muted">ACCOUNT NUMBER:</small> <br>
                                        <span class="fw-bolder text-secondary mt-0">062000001037</span>
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <div v-if="tuitionDetails.online_transaction">
                                    <h6 class="text-info mb-1 fw-bolder">PAYMENT TRANSACTION DETAILS</h6>
                                    <div class="row">
                                        <div class="col-lg-8 col-md-12">
                                            <labelComponent label="transaciton date"
                                                :value="getFormatDate(tuitionDetails.online_transaction.updated_at)" />
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <!--  <labelComponent label="SBT BATCH" :value="deployment.sbt_batch" /> -->
                                        </div>
                                        <div class="col-lg-8 col-md-12">
                                            <labelComponent label="reference no."
                                                :value="tuitionDetails.online_transaction.reference_number" />
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <labelComponent label="paid amount"
                                                :value="currencyFormat(tuitionDetails.online_transaction.amount_paid)" />
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between mt-2">
                                        <div v-if="tuitionDetails.online_transaction.is_approved === null">
                                            <span class="text-info">This payment is under verification of Accounting
                                                Office's</span>
                                        </div>
                                        <div v-else-if="tuitionDetails.online_transaction.is_approved === 0">
                                            <span class="text-info">This payment was
                                                disapproved because of this Remarks: </span>
                                            <span class="text-danger">
                                                {{ tuitionDetails.online_transaction.comment_remarks }}
                                            </span>
                                        </div>
                                        <div v-else>
                                            <span class="text-info">This payment was Verified</span>
                                        </div>
                                    </div>
                                    <div v-if="tuitionDetails.online_transaction.is_approved === 0" class="form-payment">
                                        <h6 class="text-info mb-1 fw-bolder">RE-UPLOAD PAYMENT TRANSACTION</h6>
                                        <form @submit.prevent="submitPaymentTransaction" method="post"
                                            enctype="multipart/form-data">
                                            <inputComponentV2 type="text" label="Reference Number"
                                                v-model:value="reference_number" :error="errors.reference_number" />
                                            <inputComponentV2 type="date" label="Transaction Date"
                                                v-model:value="transactionDate" :error="errors.transaction_date" />
                                            <inputComponentV2 type="text" label="Payment Amount" v-model:value="amountPaid"
                                                :error="errors.amount_paid" />
                                            <div class="form-group">
                                                <label for="example-text-input" class="form-control-label fw-bolder">
                                                    <small>ATTACH PAYMENT RECEIPT<span class="text-danger">*</span></small>
                                                </label>
                                                <input type="file"
                                                    v-on:change="fileReAttachment($event, tuitionDetails.online_transaction.id)"
                                                    class="form-control border border-primary" />
                                                <span class="badge bg-danger mt-2" v-if="errors.file">{{
                                                    errors.file[0] }}</span>
                                            </div>
                                            <button class="btn btn-primary w-100" type="submit">SUBMIT</button>
                                        </form>
                                    </div>
                                </div>
                                <div v-else class="form-payment">
                                    <h6 class="text-info mb-1 fw-bolder">FILL-UP PAYMENT TRANSACTION</h6>
                                    <form @submit.prevent="submitPaymentTransaction" method="post"
                                        enctype="multipart/form-data">
                                        <inputComponentV2 type="text" label="Reference Number"
                                            v-model:value="reference_number" :error="errors.reference_number" />
                                        <inputComponentV2 type="date" label="Transaction Date"
                                            v-model:value="transactionDate" :error="errors.transaction_date" />
                                        <inputComponentV2 type="text" label="Payment Amount" v-model:value="amountPaid"
                                            :error="errors.amount_paid" />
                                        <div class="form-group">
                                            <label for="example-text-input" class="form-control-label fw-bolder">
                                                <small>ATTACH PAYMENT RECEIPT<span class="text-danger">*</span></small>
                                            </label>
                                            <input type="file" v-on:change="fileAttachment"
                                                class="form-control border border-primary" />
                                            <span class="badge bg-danger mt-2" v-if="errors.file">{{
                                                errors.file[0] }}</span>
                                        </div>
                                        <button class="btn btn-primary w-100" type="submit">SUBMIT</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <stepper :value="viewName" :isActive="false" />
            </div>
        </div>
        <div v-else>
            <stepper :value="viewName" :isActive="false" />
        </div>
    </div>
    <div v-else>
        <stepper :value="viewName" :isActive="false" />
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapMutations } from 'vuex'
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
import labelComponent from '@/components/main-layouts/components/widgets/label-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
export default {
    name: 'PaymentTransaction',
    components: {
        stepper,
        inputComponentV2,
        labelComponent
    },
    data() {
        const formData = new FormData()
        return {
            viewName: 'STEP 4: PAYMENT TRANSACTION',
            errors: [],
            transactionDate: '',
            amountPaid: '',
            reference_number: '',
            formData
        }
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        currencyFormat(number) {
            return Intl.NumberFormat('hi-IN', { style: 'currency', currency: 'PHP' }).format(number)
        },
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
        fileAttachment(event) {
            const file = event.target.files[0] // Get the Files in Event
            this.formData.append('file', file) // Set the File on FormData
        },
        fileReAttachment(event, document) {
            const file = event.target.files[0] // Get the Files in Event
            this.formData.append('file', file) // Set the File on FormData
            this.formData.append('document', document) // Set the File on FormData
        },
        async submitPaymentTransaction() {
            this.showLoading(true)
            this.formData.append('transaction_date', this.transactionDate)
            this.formData.append('amount_paid', this.amountPaid)
            this.formData.append('reference_number', this.reference_number)
            this.errors = []
            axios.post('/student/onboard/enrollment-payment', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                console.log(response.data)
                if (response.status === 200) {
                    this.showAlert(response.data)
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
                title: error.message,
                text: error.response.data.error,
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
    props: {
        deployment: Object, enrollment: Object, tuitionDetails: Object, token: Object
    }
}
</script>