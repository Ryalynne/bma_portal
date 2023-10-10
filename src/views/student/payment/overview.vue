<template>
    <div v-if="isLoading">
        <h3>LOADING</h3>
    </div>
    <div v-else>
        <p class="display-6 fw-bolder text-primary">PAYMENT OVERVIEW</p>
        <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-12">
                <div class="table-container" style="max-height: 300px; overflow-y: scroll;">
                    <table class="nav nav-underline bg-soft-primary p-0 text-center mb-5" aria-label="Secondary navigation">
                        <thead class="d-flex">
                            <tr>
                                <td :class="onActiveCard('overview')" @click="onChangeActive('overview')">OVERVIEW</td>
                            </tr>
                            <tr>
                                <td :class="onActiveCard('payments')" @click="onChangeActive('payments')">PAYMENT</td>
                            </tr>
                            <tr>
                                <td :class="onActiveCard('payment-histories')" @click="onChangeActive('payment-histories')">
                                    PAYMENT HISTORY
                                </td>
                            </tr>
                            <tr>
                                <td :class="onActiveCard('online-payment')" @click="onChangeActive('online-payment')">ONLINE
                                    PAYMENT</td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div v-if="cardStatus == 'overview'" class="card shadow">
                    <div class="card-body">
                        <label for="" class="text-info h4">
                            <span class="fw-bolder">{{ semester.semester.toUpperCase() }} </span> <small
                                class="text-primary"> {{ semester.school_year }}</small>
                        </label>
                        <div class=" row mt-2">
                            <div class="col-lg-3 col-md-6">
                                <div class="form-group">
                                    <small class="form-label">MODE OF PAYMENT</small>
                                    <br>
                                    <label class="h5 text-info form-label">
                                        {{ tuitionDetails.payment_mode === 1 ? 'INSTALLMENT' : 'FULL-PAYMENT' }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="form-group">
                                    <small class="form-label">TOTAL PAYABLE:</small>
                                    <br>
                                    <label class="h5 text-primary form-label">
                                        {{ currencyFormat(tuitionDetails.total_payment) }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="form-group">
                                    <small class="form-label">TOTAL PAID:</small>
                                    <br>
                                    <label class="h5 text-primary form-label">
                                        {{ currencyFormat(tuitionDetails.total_paid_amount_sum_payment_amount) }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="form-group">
                                    <small class="form-label">BALANCE:</small>
                                    <br>
                                    <label class="h5 text-danger form-label">
                                        {{
                                            currencyFormat(tuitionDetails.total_payment -
                                                tuitionDetails.total_paid_amount_sum_payment_amount)
                                        }}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <label class="h5 text-primary fw-bolder">
                            ADDTIONAL FEES
                        </label>
                        <div v-if="tuitionDetails" class="additional-fees mt-3">
                            <div v-for="item in tuitionDetails.additional_fees" :key="item" :value="item.id"
                                class="row p-0 mt-0 mb-0">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <small class="form-label">FEE NAME</small>
                                        <br>
                                        <label class="h5 text-info form-label">
                                            {{ item.fee_details.particular.particular_name }}
                                        </label>

                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="form-group">
                                        <small class="form-label">FEE AMOUNT</small>
                                        <br>
                                        <label class="h5 text-primary form-label">
                                            {{ numberFormat(item.fee_details.amount) }}
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="form-group">
                                        <small class="form-label">TOTAL PAID:</small>
                                        <br>
                                        <label class="h5 text-primary form-label">
                                            {{ numberFormat(item.status) }}
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="form-group">
                                        <small class="form-label">BALANCE:</small>
                                        <br>
                                        <label class="h5 text-danger form-label">
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <span class="h6 text-muted">NO ADDITIONAL FEES</span>
                        </div>
                    </div>
                </div>
                <div v-if="cardStatus == 'payments'" class="card shadow">
                    <div class="card-body">
                        <div class="form">
                            <h6 class="text-info mb-1 fw-bolder">BANK TRANSFER</h6>
                            <p>For bank deposit or online fund transfer, please use the bank details
                                below:
                            </p>
                            <div v-if="course.id === 3">
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
                                <div class="row">
                                    <div class="col-lg-12 col-md-6 col-xs-12">
                                        <small class="text-muted">BANK:</small> <br>
                                        <span class="fw-bolder text-primary mt-0">BANK OF COMMERCE</span>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-xs-12">
                                        <small class="text-muted">ACCOUNT NAME:</small> <br>
                                        <span class="fw-bolder text-primary mt-0">BALIWAG MARITIME
                                            ACADEMY INC</span>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-xs-12">
                                        <small class="text-muted">ACCOUNT NUMBER:</small> <br>
                                        <span class="fw-bolder text-primary mt-0">062000001037</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>

                        <h6 class="text-primary mb-1 fw-bolder">ADD TRANSACTION</h6>
                        <form @submit.prevent="submitPaymentTransaction" method="post" enctype="multipart/form-data">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-xs-12">
                                    <select-component label="Remarks" v-model:value="transactionRemarks"
                                        :error="errors.remarks" :data="remarks" />
                                </div>
                                <div class="col-lg-6 col-md-6 col-xs-12">
                                    <select-component label="Payment Mode" v-model:value="transactionPaymentMode"
                                        :error="errors.payment_mode" :data="paymentMode" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-xs-12">
                                    <inputComponentV2 type="text" label="Reference Number" v-model:value="reference_number"
                                        :error="errors.reference_number" />
                                </div>
                                <div class="col-lg-4 col-md-6 col-xs-12">
                                    <inputComponentV2 type="date" label="Transaction Date" v-model:value="transactionDate"
                                        :error="errors.transaction_date" />
                                </div>
                                <div class="col-lg-4 col-md-6 col-xs-12">
                                    <inputComponentV2 type="text" label="Payment Amount" v-model:value="amountPaid"
                                        :error="errors.amount_paid" />
                                </div>
                            </div>
                            <a class="badge bg-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">View
                                Sample Valid Attachment</a>
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>ATTACH PAYMENT RECEIPT<span class="text-danger">*</span></small>
                                </label>
                                <input type="file" v-on:change="fileAttachment"
                                    class="form-control form-control-sm border border-primary" />
                                <span class="badge bg-danger mt-2" v-if="errors.file">{{
                                    errors.file[0] }}</span>
                            </div>
                            <button class="btn btn-primary btn-sm w-100" type="submit">SUBMIT</button>
                        </form>
                    </div>
                </div>
                <div v-if="cardStatus == 'payment-histories'" class="card shadow">
                    <div class="card-header p-3">
                        <h5 class="text-primary fw-bolder">PAYMENT HISTORY</h5>
                    </div>
                    <div class="card-body">
                        <div v-if="tuitionDetails.payment_transaction.length" class="additional-fees">
                            <div v-for="item in tuitionDetails.payment_transaction" :key="item" :value="item.id"
                                class="row p-0 mt-0 mb-0">
                                <div class="d-flex justify-content-between align-items-center flex-wrap mb-2">
                                    <div>
                                        <small>PARTIAL: </small> <br>
                                        <a href="{{ item.reciept_attach_path }}" target="_blank">
                                            <h5><span class="text-primary fw-bolder">{{ item.remarks }}</span>
                                            </h5>
                                        </a>

                                    </div>
                                    <div>
                                        <small>AMOUNT: </small> <br>
                                        <h5>
                                            <span class="text-secondary fw-bolder">{{ currencyFormat(item.payment_amount)
                                            }}</span>
                                        </h5>
                                    </div>
                                    <div>
                                        <small>OR NUMBER: </small> <br>
                                        <h5>
                                            <span class="text-secondary fw-bolder">{{ item.or_number }}</span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <span class="h6 text-muted">NO TRANSACTION</span>
                        </div>
                    </div>
                </div>
                <div v-if="cardStatus == 'online-payment'" class="card shadow">
                    <div class="card-header p-3">
                        <h5 class="text-primary fw-bolder">ONLINE PAYMENT TRANSACTION</h5>
                    </div>
                    <div class="card-body">
                        <div v-if="tuitionDetails.online_payment_transaction.length" class="additional-fees">
                            <div v-for="item in tuitionDetails.online_payment_transaction" :key="item" :value="item.id"
                                class="row p-0 ">
                                <div class="d-flex justify-content-between align-items-center flex-wrap">
                                    <div>
                                        <small>TRANSACTION TYPE</small> <br>
                                        <span class="text-secondary fw-bolder">{{ item.transaction_type }}</span>
                                    </div>
                                    <div>
                                        <small>AMOUNT: </small> <br>
                                        <span class="text-secondary fw-bolder">
                                            {{ item.amount_paid }}
                                        </span>
                                    </div>
                                    <div>
                                        <small>REFERENCE NO: </small> <br>
                                        <span class="text-secondary fw-bolder">
                                            {{ item.reference_number }}
                                        </span>

                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap mb-2">
                                    <div>
                                        <small>TRANSACTION DATE: </small> <br>
                                        <span class="text-secondary fw-bolder">
                                            {{ convertDate(item.created_at) }}
                                        </span>
                                    </div>
                                    <div>
                                        <small>PROOF OF PAYMENT: </small> <br>
                                        <a class="badge bg-primary btn-form-document w-100 mt-2" data-bs-toggle="modal"
                                            data-bs-target=".document-view-modal"
                                            data-document-url="{{ item.reciept_attach_path }}">
                                            VIEW</a>
                                    </div>
                                    <div>
                                        <div v-if="item.is_approved !== null" class="">
                                            <div v-if="item.is_approved === 1">
                                                <span class="text-primary fw-bolder">
                                                    APPROVED PAYMENT
                                                </span>
                                            </div>
                                            <div v-if="item.is_approved === 0">
                                                <span class="text-danger fw-bolder">
                                                    DISAPPROVED PAYMENT
                                                </span>
                                            </div>
                                        </div>
                                        <div v-else class="">
                                            <span class="text-secondary fw-bolder">
                                                FOR VERIFICATION
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                            </div>
                        </div>
                        <div v-else>
                            <span class="h6 text-muted">NO TRANSACTION</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <modal id="exampleModal" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xlg" dialogClass="modal-lg"
        ariaLabelled="exampleModalLabel" :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">SAMPLE OF VALID PAYMENT
                ATTACHMENT AND INVALID
            </h5>
        </model-header>
        <model-body>
            <img src="@/assets/resources/accounting/Instruction.png" class="img-fluid gradient-main vh-100" alt="images">
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>
    </modal>
    <!--  <modal id="exampleModal" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xlg" ariaLabelled="exampleModalLabel"
        :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">SAMPLE OF VALID PAYMENT
                ATTACHMENT AND INVALID
            </h5>
        </model-header>
        <model-body>
            <img src="@/assets/resources/accounting/Instruction.png" class="img-fluid gradient-main vh-100" alt="images">
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>

    </modal> -->
</template>
<script>
import Swal from 'sweetalert2'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component.vue'
/* import labelComponent from '@/components/main-layouts/components/widgets/label-component.vue' */
import axios from 'axios'
export default {
    name: 'Payment Overview',
    components: {
        inputComponentV2,
        selectComponent/* ,
        labelComponent */
    },
    data() {
        const formData = new FormData()
        return {
            isLoading: true,
            cardStatus: 'payments',
            remarks: ['Upon Enrollment', '1st Monthly', '2nd Monthly', '3rd Monthly', '4th Monthly'],
            paymentMode: ['GCASH', 'DEPOSIT SLIP'],
            data: [],
            semester: [],
            course: [],
            tuition: [],
            tuitionDetails: [],
            errors: [],
            transactionDate: '',
            amountPaid: '',
            reference_number: '',
            transactionRemarks: '',
            transactionPaymentMode: '',
            formData
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/payment-overview', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data.data
            this.semester = this.data.currently_enrolled.academic
            this.tuitionDetails = this.data.currently_enrolled.payment_assessment_details_with_transactions
            this.course = this.data.currently_enrolled.course
            if (this.tuitionDetails) {
                this.tuitionDetails.additional_fees.forEach(element => {
                    this.remarks.push(element.fee_details.particular.particular_name)
                    console.log(element.fee_details.particular.particular_name)
                })
            }
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
        })
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        onActiveCard(item) {
            return this.cardStatus === item ? 'nav-link active' : 'nav-link text-secondary'
        },
        onChangeActive(item) {
            this.cardStatus = item
        },
        currencyFormat(number) {
            return Intl.NumberFormat('hi-IN', { style: 'currency', currency: 'PHP' }).format(number)
        },
        numberFormat(number) {
            return Intl.NumberFormat('hi-IN').format(number)
        },
        fileAttachment(event) {
            const file = event.target.files[0] // Get the Files in Event
            this.formData.append('file', file) // Set the File on FormData
        },
        async submitPaymentTransaction() {
            this.showLoading(true)
            this.formData.append('transaction_date', this.transactionDate)
            this.formData.append('amount_paid', this.amountPaid)
            this.formData.append('reference_number', this.reference_number)
            this.formData.append('remarks', this.transactionRemarks)
            this.formData.append('payment_mode', this.transactionPaymentMode)
            this.formData.append('payment', this.tuitionDetails.id)
            this.errors = []
            axios.post('/student/payment-transaction', this.formData, {
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
        },
        convertDate(dateTimeString) {
            const dateObj = new Date(dateTimeString)
            return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        }
    }
}
</script>