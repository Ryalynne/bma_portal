<template>
    <div v-if="isLoading">
        <loadingPage />
    </div>
    <div v-else>
        <div v-if="shipboardInformation">
            <div v-for="(data, index) in shipboardInformation" :key="index" class="card ms-5 me-5" data-iq-gsap="onStart"
                data-iq-position-y="70" data-iq-rotate="0" data-iq-trigger="scroll" data-iq-ease="power.out"
                data-iq-opacity="0">
                <div class="card-header">
                    <div class="header-title">
                        <h4 class="card-title fw-bold text-primary">SHIPBOARD INFORMATION</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-8 col-md-12">
                            <label-component label="COMPANY NAME" :value="data.company_name" />
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <label-component label="SBT BATCH" :value="data.sbt_batch" />
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <label-component label="VESSEL NAME" :value="data.vessel_name" />
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <label-component label="VESSEL TYPE" :value="data.vessel_type" />
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <label-component label="SEA EXPERIENCE" :value="data.shipping_company" />
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <label-component label="STATUS" :value="data.shipboard_status" />
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <label-component label="DATE OF EMBARKING" :value="data.embarked" />
                        </div>
                    </div>
                    <br>
                    <label for="" class="fw-bolder text-primary h4">MONTHLY OBT PERFORMANCE MONITORING</label>
                    <label class=" btn btn-sm btn-primary float-end" data-bs-toggle="modal" data-bs-target="#MOPM"
                        :data-id="data.id" @click="setData">
                        CREATE MOPM
                    </label>
                    <div class="table-responsive mt-4">
                        <table id="basic-table" class="table table-striped mb-0" role="grid" data-toggle="data-table">
                            <thead>
                                <tr>
                                    <th>Narrative Report</th>
                                    <th>Progress</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="data.performance_report">
                                <tr v-for="(data2, index2) in data.performance_report" :key="index2">
                                    <td>{{ data2.month }}</td>
                                    <td></td>
                                    <td>
                                        <router-link class="btn btn-sm btn-outline-primary"
                                            :to="{ name: 'student-layout.onboard-mopm-view', query: { v: encrypt(data2.id) } }">view</router-link>
                                        <button class="btn btn-sm btn-outline-info">report</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <th colspan="3">No Data</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
        </div>
        <modal id="MOPM" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xlg" dialogClass="modal-lg"
            ariaLabelled="MOPMLabel" :ariaHidden="true" contentrole="document">
            <model-header :dismissable="true">
                <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">CREATE PERFORMANCE
                    MONITORING REPORT
                </h5>
            </model-header>
            <model-body>
                <form @submit.prevent="submitForm" method="post">
                    <div class="row">
                        <div class="col-md-12 col-lg-12">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                PERIOD COVERED
                            </label>
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <inputComponentV2 type="Date" label="Date Start" v-model:value="startDate"
                                :error="errors.start_date" />
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <inputComponentV2 label="Date End" type="date" v-model:value="endDate"
                                :error="errors.end_date" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12">
                            <inputComponentV2 label="Date Preferred" v-model:value="datePreferred"
                                :error="errors.date_preferred" />
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <selectComponent label="Inputted to Daily Journal" :data="yesOrNo"
                                v-model:value="inputDailyJournal" :error="errors.input" />
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <selectComponent label="Signed by Officer/Master" :data="yesOrNo" v-model:value="signed"
                                :error="errors.signed" />
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <inputComponentV2 label="Trb Code" v-model:value="trbCode" :error="errors.trb_code" />
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <textAreaComponent label="task as per trb" v-model:value="trbTask" :error="errors.trb_tasks"
                                row="6" />
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <textAreaComponent label="remarks us learning acquired" v-model:value="remarks"
                                :error="errors.remarks" row="6" />
                        </div>
                    </div>
                    <div class="form-group float-right">
                        <button class="btn btn-primary" type="submit">SUBMIT</button>
                    </div>
                </form>
            </model-body>
            <model-footer>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </model-footer>
        </modal>
    </div>
</template>
<script>
import loadingPage from './mopm-loading-view.vue'
import labelComponent from '@/components/main-layouts/components/widgets/label-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import textAreaComponent from '@/components/main-layouts/components/widgets/text-area-component.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component.vue'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
import { getData, putData } from '@/store/database/model.js'

export default {
    name: 'ShipboardMonitoringOverview',
    data() {
        return {
            yesOrNo: ['Yes', 'No'],
            isLoading: true,
            shipboardInformation: [],
            errors: [],
            shipboardId: '',
            startDate: '',
            endDate: '',
            trbTask: '',
            trbCode: '',
            inputDailyJournal: '',
            signed: '',
            remarks: '',
            datePreferred: ''
        }
    },
    components: {
        labelComponent,
        inputComponentV2,
        textAreaComponent,
        loadingPage,
        selectComponent
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('/student/onboard/performance', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then(async (response) => {
            const data = response.data.data
            console.log(data)
            this.shipboardInformation = data.shipboard_information
            await putData('myKey', data.shipboard_information)
            console.log(this.shipboardInformation)
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            this.isLoading = false
        })
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        setData(event) {
            this.shipboardId = event.target.getAttribute('data-id')
        },
        encrypt(data) {
            return btoa(data)
        },
        async submitForm() {
            this.showLoading(true)
            const formData = new FormData()
            formData.append('shipboard_id', this.shipboardId)
            formData.append('start_date', this.startDate)
            formData.append('end_date', this.endDate)
            formData.append('date_preferred', this.datePreferred)
            formData.append('input', this.inputDailyJournal)
            formData.append('trb_tasks', this.trbTask)
            formData.append('trb_code', this.trbCode)
            formData.append('signed', this.signed)
            formData.append('remarks', this.remarks)
            axios.post('/student/onboard/performance', formData, {
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
    }
}
</script>