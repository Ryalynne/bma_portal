<template>
    <stepper value="" :isActive="className.stepperStatus" />
    <div :class="`card ${className.cardClass}`">
        <div class="card-body m-2 p-2">
            <span :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>
            <!-- Documents List -->
            <div class="document-content p-3 row">
                <div class="col-lg-4 col-md-4 mb-4" v-for="(data, index) in documents.listOfDocuments" :key="index">
                    <h5 class="text-primary fw-bolder">
                        {{ data.document_name }}
                    </h5>
                    <div class="check" v-if="checkFileUpload(data.id, index)">
                        <div v-if="form.documentDetails[index].is_approved === null">
                            <label for="" class="text-info">This Documents is under Verification</label> <br>
                            <span class="badge bg-primary">File Uploaded Date: {{
                                getFormatDate(form.documentDetails[index].created_at) }}</span>
                        </div>
                        <div v-else>
                            <div v-if="form.documentDetails[index].is_approved === 1">
                                <div class="row">
                                    <div class="col-md-12">
                                        <span class="text-primary fw-bolder">APPROVED DOCUMENT</span>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-group">
                                            <small for="" class="form-label">
                                                VERIFIED BY:
                                            </small>
                                            <span class="text-muted fw-bolder">{{
                                                form.documentDetails[index].staff_id }}</span><br>
                                            <small for="" class="form-label">VERIFIED
                                                DATE:</small>
                                            <span class="text-muted fw-bolder">
                                                {{ getFormatDate(form.documentDetails[index].updated_at)
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>

                            </div>
                        </div>
                    </div>
                    <div v-else class="file-content">
                        <div v-if="form.fileUploaded[index]" class="form-file">
                            <label for="" class="text-info">This Documents is under Verification</label>
                            <br>
                            <span class="text-primary fw-bolder" v-if="form.uploadLoading[index]">
                                FILE UPLOADED
                            </span>
                        </div>
                        <div v-else>
                            <input type="file" class="form-control form-control-sm border border-primary" required
                                v-on:change="handleFileChange($event, data.id, index)" />
                            <span class="text-info fw-bolder" v-if="form.uploadLoading[index]">Uploading
                                Files....</span>
                            <small v-if="form.fileError[index]" class="badge bg-danger">{{ form.fileError[index]
                            }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
import axios from 'axios'
export default {
    name: 'DocumentsRequirements',
    components: {
        stepper
    },
    data() {
        let className = { status: 'Pending', cardClass: '', textClass: 'text-muted', stepperStatus: false, badgeColor: 'bg-secondary', contentShow: false }
        if (this.propsApplicantDetails.applicant) {
            className = { status: 'Progress', cardClass: 'bg-soft-info', textClass: 'text-info', stepperStatus: true, badgeColor: 'bg-info', contentShow: false }
        }
        return {
            titleName: 'DOCUMENTARY REQUIREMENTS',
            progressName: 'STEP 2',
            status: className.status,
            className,
            content: false,
            form: {
                uploadLoading: [],
                fileError: [],
                fileUploaded: [],
                documentDetails: []
            }
        }
    },
    methods: {
        showContent() {
            this.content = !this.content
        },
        handleFileChange(event, documentValue, index) {
            this.form.uploadLoading[index] = true
            this.form.fileError[index] = null
            const fileUpload = event.target.files[0] // Get the Files in Event
            const formData = {
                document: documentValue,
                file: fileUpload
            }
            console.log(formData)
            axios.post('applicant/document-requirement-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                console.log(response)
                this.form.fileUploaded[index] = true
            }).catch((error) => {
                console.log(error)
                if (error.response.status === 422) {
                    const err = error.response.data
                    this.form.fileError[index] = err.errors.file[0]
                } else {
                    const err = error.response.data
                    this.form.fileError[index] = err.message
                }
                this.form.uploadLoading[index] = false
            })
        },
        checkFileUpload(id, index) {
            let value = false
            /*  console.log(id) */
            this.documents.documents.forEach(element => {
                if (element.document_id === id) {
                    this.form.documentDetails[index] = element
                    value = true
                }
                /* console.log(element) */
            })
            return value
        },
        getFormatDate(inputDate) {
            // create a new Date object with the input date string
            const date = new Date(inputDate)
            // define an array of month names
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]
            // get the day, month, and year values from the date object
            const day = date.getDate()
            const month = monthNames[date.getMonth()] // add 1 to adjust for 0-indexed months
            const year = date.getFullYear()
            // format the date as 'dd/mm/yyyy'
            const formattedDate = month + ' ' + day + ', ' + year
            return formattedDate
        }
    },
    props: { propsApplicantDetails: Object, documents: Object, token: String }
}
</script>