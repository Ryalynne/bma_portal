<template>
    <div v-if="isLoading">
        <label for="" class="h4 text-info">PERFORMANCE REPORT</label>
    </div>
    <div v-else>
        <div class="card mt-2">
            <div class="card-header">
                <label for="" class="h4 text-primary fw-bolder">PERFORMANCE REPORT DETAILS</label>
            </div>
            <div class="card-body">
                <div v-if="isEdit">
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
                                <inputComponentV2 label="Inputted to Daily Journal" v-model:value="inputDailyJournal"
                                    :error="errors.input" />
                            </div>
                            <div class="col-md-12 col-lg-6">
                                <inputComponentV2 label="Signed by Officer/Master" v-model:value="signed"
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
                </div>
                <div v-else>
                    <div class="row">
                        <div class="col-lg-8 col-md-12">
                            <label-component label="Month" :value="performanceReport.month" />
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <label-component label="Inputted to Daily Journal"
                                :value="convertToText(performanceReport.daily_journal)" />
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <label-component label="Signed by Officer/Master" :value="convertToText(performanceReport.have_signature)
                                " />
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <label-component label="Trb Code" :value="performanceReport.trb_code" />
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <label-component label="task as per trb" :value="performanceReport.task_trb" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(task, item) in tasks" :key="item" class="card">
            <div class="card-body">
                <div v-if="forms.loading[item]">
                    <div class="form-group">
                        <p class="document-title"></p>
                        <div class="document-form">
                            <div v-if="task.length > 2">
                                <div class="mb-">
                                    <label for="" class="document-remarks"></label>
                                    <div class="document-remarks-text form-control"></div>
                                </div>
                            </div>
                            <label for="" class="document-remarks"></label>
                            <div class="document-remarks-file form-control"></div>
                        </div>

                    </div>
                </div>
                <div v-else>
                    <div v-if="performanceReport.document_attachments.length > 0">
                        <div v-for="(report, item) in performanceReport.document_attachments" :key="item">
                            <div v-if="report.journal_type == task[0]">
                                <div class="form-group">
                                    <p class="h6">
                                        <b>{{ task[0].toUpperCase() }}</b>
                                    </p>
                                    <div v-if="task.length > 2">
                                        <small class="form-label"><b>REMARKS<sup class="text-danger">*</sup></b></small>
                                        <label for="" class="form-control">{{ report.remark }}</label>
                                    </div>
                                    <div class="form-group">
                                        <small class="form-label"> <b> ATTACH FILES <sup
                                                    class="text-danger">*</sup></b></small>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td v-for="(document, index) in JSON.parse(report.file_links)"
                                                        :key="index">
                                                        <label for="" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                            @click="documentViewer(document)">
                                                            <iconComponent :fileType="getFileType(document)" />
                                                        </label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="document-status">
                                        <div class="mt-2">
                                            <div v-if="report.is_approved">
                                                <div class="row">
                                                    <div class="col-lg-4 col-md-12">
                                                        <small class="fw-bolder text-muted">DOCUMENT STATUS</small><br>
                                                        <div v-if="report.is_approved === 1">
                                                            <p class="badge bg-primary h5">APPROVED DOCUMENTS</p>
                                                        </div>
                                                        <div v-else>
                                                            <p class="badge bg-danger h5">DISAPPROVED DOCUMENTS</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-12">
                                                        <small class="fw-bolder text-muted">DOCUMENT VERIFIER:</small><br>
                                                        <p class="badge bg-info h5">{{ staffName(report.staff) }}</p>
                                                    </div>
                                                    <div class="col-lg-4 col-md-12">
                                                        <small class="fw-bolder text-muted">DATE VERIFIED:</small><br>
                                                        <p class="badge bg-info h5">{{ getFormatDate(report.updated_at)
                                                        }}
                                                        </p>
                                                    </div>
                                                    <div v-if="report.feedback != null" class="col-lg-12 col-md-12">
                                                        <small class="fw-bolder text-muted">REMARKS:</small><br>
                                                        <label for="" class="form-control">{{ report.feedback }}</label>
                                                    </div>


                                                    <div v-if="report.is_approved === 2">
                                                        <form @submit.prevent="submitForm(item, task[0])" method="post"
                                                            id="form_{{ task[1] }}" enctype="multipart/form-data">
                                                            <div class="form-group">
                                                                <p class="h6">
                                                                    <b>{{ task[0].toUpperCase() }}</b>
                                                                </p>

                                                                <div class="form-group">
                                                                    <small class="form-label"><b>ATTACH FILES<sup
                                                                                class="text-danger">*</sup></b></small>
                                                                    <div class="form-group">
                                                                        <input type="file" class="form-control"
                                                                            ref="fileInput" multiple
                                                                            v-on:change="handleFileUpload($event, item)">
                                                                        <div v-if="forms.errors[item]">
                                                                            <span class="badge bg-danger mt-2"
                                                                                v-if="forms.errors[item].files">{{
                                                                                    forms.errors[item].files[0] }}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div v-if="task.length > 2">
                                                                    <div class="form-group">
                                                                        <small class="form-label"><b>REMARKS<sup
                                                                                    class="text-danger">*</sup></b></small>
                                                                        <textarea class="form-control"
                                                                            v-model="forms.remarks[item]" cols="30"
                                                                            rows="3"></textarea>
                                                                        <div v-if="forms.errors[item]">
                                                                            <span class="badge bg-danger mt-2"
                                                                                v-if="forms.errors[item].remarks">{{
                                                                                    forms.errors[item].remarks[0] }}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="float-end">
                                                                    <button class="btn btn-primary"
                                                                        type="submit">SUBMIT</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <div v-if="forms.errors[item].message">
                                                            <span class="badge bg-danger mt-2"
                                                                v-if="forms.errors[item].remarks">{{
                                                                    forms.errors[item].message }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <p class="badge bg-info h5">DOCUMENTS IS UNDER VERIFICATION OF OBT OFFICER
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="checkDocument(task[0])">
                            <form @submit.prevent="submitForm(item, task[0])" method="post" id="form_{{ task[1] }}"
                                enctype="multipart/form-data">
                                <div class="form-group">
                                    <p class="h6">
                                        <b>{{ task[0].toUpperCase() }}</b>
                                    </p>

                                    <div class="form-group">
                                        <small class="form-label"><b>ATTACH FILES<sup
                                                    class="text-danger">*</sup></b></small>
                                        <div class="form-group">
                                            <input type="file" class="form-control" ref="fileInput" multiple
                                                v-on:change="handleFileUpload($event, item)">
                                            <div v-if="forms.errors[item]">
                                                <div v-for="(data, index) in forms.errors[item]" :key="index">
                                                    <span class="badge bg-danger mt-2">{{
                                                        data[0] }}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="task.length > 2">
                                        <div class="form-group">
                                            <small class="form-label"><b>REMARKS<sup class="text-danger">*</sup></b></small>
                                            <textarea class="form-control" v-model="forms.remarks[item]" cols="30"
                                                rows="3"></textarea>
                                            <div v-if="forms.errors[item]">
                                                <span class="badge bg-danger mt-2" v-if="forms.errors[item].message">{{
                                                    forms.errors[item].remarks[0] }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="float-end">
                                        <button class="btn btn-primary" type="submit">SUBMIT</button>
                                    </div>
                                </div>
                            </form>
                            <div v-if="forms.errors[item]">
                                <span class="badge bg-danger mt-2" v-if="forms.errors[item].message">{{
                                    forms.errors[item].message }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <form @submit.prevent="submitForm(item, task[0])" method="post" id="form_{{ task[1] }}"
                            enctype="multipart/form-data">
                            <div class="form-group">
                                <p class="h6">
                                    <b>{{ task[0].toUpperCase() }}</b>
                                </p>
                                <div class="form-group">
                                    <small class="form-label"><b>ATTACH FILES<sup class="text-danger">*</sup></b></small>
                                    <div class="form-group">
                                        <input type="file" class="form-control" ref="fileInput" multiple
                                            v-on:change="handleFileUpload($event, item)">
                                        <div v-if="forms.errors[item]">
                                            <span class="badge bg-danger mt-2" v-if="forms.errors[item].files">{{
                                                forms.errors[item].files[0] }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="task.length > 2">
                                    <div class="form-group">
                                        <small class="form-label"><b>REMARKS<sup class="text-danger">*</sup></b></small>
                                        <textarea class="form-control" v-model="forms.remarks[item]" cols="30"
                                            rows="3"></textarea>
                                        <div v-if="forms.errors[item]">
                                            <span class="badge bg-danger mt-2" v-if="forms.errors[item].remarks">{{
                                                forms.errors[item].remarks[0] }}</span>
                                        </div>

                                    </div>
                                </div>
                                <div class="float-end">
                                    <button class="btn btn-primary" type="submit">SUBMIT</button>
                                </div>
                            </div>
                        </form>
                        <div v-if="forms.errors[item]">
                            <span class="badge bg-danger mt-2" v-if="forms.errors[item].message">{{
                                forms.errors[item].message }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <modal id="exampleModal" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xlg" ariaLabelled="exampleModalLabel"
        :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">DOCUMENT VIEWER
            </h5>
        </model-header>
        <model-body>
            <iframe class="iframe-container form-view" width="100%" height="70%" :scr="this.link">
            </iframe>
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>

    </modal>
</template>
<style scoped>
.document-title {
    width: 20%;
    height: 25px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.document-remarks {
    width: 15%;
    height: 20px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.document-remarks-text {
    width: 100%;
    height: 100px;
}

.document-remarks-file {
    width: 100%;
    height: 50px;
}

@keyframes pulse-bg {
    0% {
        background-color: #ddd;
    }

    50% {
        background-color: #d0d0d0;
    }

    100% {
        background-color: #ddd;
    }
}
</style>
<script>
import modal from '@/components/bootstrap/modal/modal.vue'
import iconComponent from '@/components/main-layouts/components/widgets/file-icon.vue'
import labelComponent from '@/components/main-layouts/components/widgets/label-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import textAreaComponent from '@/components/main-layouts/components/widgets/text-area-component.vue'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    name: 'ShipboardMonitoringOverview',
    data() {
        return {
            isLoading: true,
            isEdit: false,
            errors: [],
            performanceReport: [],
            documents: [],
            tasks: [],
            formLoading: '',
            forms: {
                remarks: [],
                files: [],
                loading: [],
                errors: []
            },
            link: ''
        }
    },
    components: {
        modal,
        labelComponent,
        inputComponentV2,
        textAreaComponent,
        iconComponent
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        const link = this.$route.query.v // Get the Parameter Value in Link
        // Call out the Shipboard Performance in Server Side
        axios.get('/student/onboard/performance/view?id=' + link, {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.performanceReport = response.data.data // Set the Performance Report Information
            this.documents = this.performanceReport.document_attachments
            this.tasks = response.data.documents // Set the Document of Performance Report
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
        handleFileUpload(event, index) {
            const files = Array.from(event.target.files)
            /* this.forms.files[index] = this.$refs.fileInput.files */
            this.forms.files[index] = files
            console.log(files)
            /* const files = this.$refs.fileInput.files */
        },
        async submitForm(form, document) {
            const formData = new FormData()
            const file = this.forms.files[form] ? this.forms.files[form] : ''
            const remarks = this.forms.remarks[form] ? this.forms.remarks[form] : ''
            // Set the input Data
            formData.append('document', document)
            console.log(this.forms.files[form])
            if (this.forms.files[form]) {
                this.forms.files[form].forEach(file => {
                    formData.append('files[]', file)
                })
            } else {
                formData.append('files', '')
            }
            formData.append('remarks', remarks)
            formData.append('shipboard', this.$route.query.v)
            // Enable the loading layout
            this.forms.loading[form] = true
            // Set the Error Message into null
            this.forms.errors[form] = null
            // Send data to Server
            axios.post('/student/onboard/performance/view', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.forms.loading[form] = false
                console.log(response.data)
                if (response.status === 200) {
                    this.showAlert(response.data.data)
                    window.location.reload()
                }
            }).catch((error) => {
                this.forms.loading[form] = false
                console.log(error)
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.forms.errors[form] = error.response.data.errors
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
        },
        getFileType(data) {
            const extension = data.split('.').pop()
            return 'icon-' + extension.toLowerCase()
        },
        documentViewer(file) {
            this.link = ''
            this.link = file
        },
        checkDocument(data) {
            let status = true
            this.documents.forEach((item, index) => {
                if (item.journal_type === data) {
                    status = false
                }
            })
            return status
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
        staffName(data) {
            const name = data.first_name + ' ' + data.last_name
            return name.toUpperCase()
        },
        convertToText(data) {
            return data === 1 ? 'Yes' : 'No'
        }
    }
}
</script>