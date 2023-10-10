<template>
    <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0" data-iq-trigger="scroll"
        data-iq-ease="power.out" data-iq-opacity="0">
        <div class="card-header p-3">
            <div class="header-title">
                <label for="" class="fw-bolder text-primary h4">STUDENT INFORMATION</label>
                <br>
                <label for="" class="text-danger">
                    Kindly double check you Student Details and update. <br>
                    NOTE: All data field is required to fill in,
                    type/choose N / A if not applicable
                </label>
            </div>
        </div>
        <div class="card-body">
            <form @submit.prevent="updateDetails" method="post">
                <label for="" class="text-primary fw-bolder h4">STUDENT DETAILS</label>
                <div class="row">
                    <div class="col-xl col-md">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>LAST NAME <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" v-model="lastName">
                            <span class="badge bg-danger mt-2" v-if="errors.last_name">{{ errors.last_name[0] }}</span>
                        </div>
                    </div>
                    <div class="col-xl col-md">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>FIRST NAME <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" v-model="firstName">
                            <span class="badge bg-danger mt-2" v-if="errors.first_name">{{ errors.first_name[0] }}</span>
                        </div>
                    </div>
                    <div class="col-xl col-md">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>MIDDLE NAME <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" v-model="middleName">
                            <div class="form-check">
                                <input class="form-check-input input-middle-name" type="checkbox" value="n/a"
                                    v-model="middleName" id="flexCheckDefault1">
                                <small class="form-check-label validate-checkbox" data-input="input-middle-name"
                                    for="flexCheckDefault1">
                                    I don't have Middle name
                                </small>
                            </div>
                            <span class="badge bg-danger mt-2" v-if="errors.middle_name">{{ errors.middle_name[0] }}</span>

                        </div>
                    </div>
                    <div class="col-xl-2 col-md">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>MIDDLE INITIAL <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" v-model="middleInitial">
                            <span class="badge bg-danger mt-2" v-if="errors.middle_initial">{{ errors.middle_initial[0]
                            }}</span>
                        </div>
                    </div>
                    <div class="col-xl-2 col-md">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>EXTENSION <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" v-model="extensionName">
                            <span class="badge bg-danger mt-2" v-if="errors.extension_name">{{ errors.extension_name[0]
                            }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4 col-md">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>GENDER <span class="text-danger">*</span></small>
                            </label>
                            <select name="gender" v-model="gender" id="" class="form-select border border-primary">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-xl col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>HEIGHT - CM <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="height">
                            <span class="badge bg-danger mt-2" v-if="errors.height">{{ errors.height[0] }}</span>
                        </div>
                    </div>
                    <div class="col-xl col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>WEIGHT - LBS <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="weight">
                            <span class="badge bg-danger mt-2" v-if="errors.weight">{{ errors.weight[0] }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl col-md-4 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>BIRTH DATE <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="date" v-model="birthDate">
                            <span class="badge bg-danger mt-2" v-if="errors.birth_date">{{ errors.birth_date[0] }}</span>
                        </div>
                    </div>
                    <div class="col-xl-9 col-md-8 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>BIRTH PLACE <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="birthPlace">
                            <span class="badge bg-danger mt-2" v-if="errors.birth_place">{{ errors.birth_place[0] }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>CIVIL STATUS <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="civilStatus">
                            <span class="badge bg-danger mt-2" v-if="errors.civil_status">{{ errors.civil_status[0]
                            }}</span>
                        </div>
                    </div>
                    <div class="col-xl col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>NATIONALITY <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="nationalty">
                            <span class="badge bg-danger mt-2" v-if="errors.nationalty">{{ errors.nationalty[0] }}</span>
                        </div>
                    </div>
                    <div class="col-xl col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>RELIGION <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="religion">
                            <span class="badge bg-danger mt-2" v-if="errors.religion">{{ errors.religion[0] }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>CONTACT NUMBER <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="contactNumber">
                            <span class="badge bg-danger mt-2" v-if="errors.contact_number">{{ errors.contact_number[0]
                            }}</span>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>EMAIL <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="personalEmail">
                            <span class="badge bg-danger mt-2" v-if="errors.personal_email">{{ errors.personal_email[0]
                            }}</span>
                        </div>
                    </div>
                </div>
                <label for="" class="text-primary fw-bolder h4">ADDRESS</label>
                <div class="row">
                    <div class="col-xl-5 col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>HOUSE NO. / STREET / BLDG NO <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="street">
                            <span class="badge bg-danger mt-2" v-if="errors.street">{{ errors.street[0] }}</span>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>BARANGAY <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="barangay">
                            <span class="badge bg-danger mt-2" v-if="errors.barangay">{{ errors.barangay[0] }}</span>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>ZIP CODE <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="zip_code">
                            <span class="badge bg-danger mt-2" v-if="errors.zip_code">{{ errors.zip_code[0] }}</span>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>MUNICIPALITY <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="municipality">
                            <span class="badge bg-danger mt-2" v-if="errors.municipality">{{ errors.municipality[0]
                            }}</span>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 mb-xl-0">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>PROVINCE <span class="text-danger">*</span></small>
                            </label>
                            <input class="form-control border border-primary" type="text" v-model="province">
                            <span class="badge bg-danger mt-2" v-if="errors.province">{{ errors.province[0] }}</span>
                        </div>
                    </div>
                </div>
                <label for="" class="text-primary fw-bolder h4">EDUCATIONAL DETAILS</label>
                <div class="" v-for="item in educationaldetails" :key="item">
                    <label for="" class="text-info fw-bolder">{{ item.school_level.toUpperCase() }}</label>
                    <div class="row">
                        <div class="col-xl col-md-6 ">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>SCHOOL NAME <span class="text-danger">*</span></small>
                                </label>
                                <input class="form-control border border-primary" type="text" v-model="schoolName">
                                <span class="badge bg-danger mt-2" v-if="errors.street">{{ errors.street[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl col-md-6 ">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>SCHOOL ADDRESS <span class="text-danger">*</span></small>
                                </label>
                                <input class="form-control">

                            </div>
                        </div>
                        <div class="col-xl col-md-6 ">
                            <div class="form-group">
                                <div v-if="course == 3">
                                    <label for="example-text-input" class="form-control-label fw-bolder">
                                        <small>DATE GRADUATED <span class="text-danger">*</span></small>
                                    </label>
                                    <input class="form-control" type="date">
                                </div>
                                <div else>
                                    <label for="example-text-input" class="form-control-label fw-bolder">
                                        <small>YEAR GRADUATED <span class="text-danger">*</span></small>
                                    </label>
                                    <input class="form-control" type="month">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <label for="" class="text-primary fw-bolder h4">PARENT DETAILS</label>
                <div class="father-information">
                    <label for="example-text-input" class="form-control-label text-info"><b>Father's Information</b></label>
                    <div class="row">
                        <div class="col-xl-4 col-md-6 ">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>LAST NAME <span class="text-danger">*</span></small>
                                </label>
                                <input class="form-control border border-primary" type="text" v-model="fatherLastName">
                                <span class="badge bg-danger mt-2" v-if="errors.father_last_name">{{
                                    errors.father_last_name[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-4 col-md-6 ">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>FIRST NAME <span class="text-danger">*</span></small>
                                </label>
                                <input class="form-control border border-primary" type="text" v-model="fatherFirstName">
                                <span class="badge bg-danger mt-2" v-if="errors.father_first_name">{{
                                    errors.father_first_name[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-4 col-md-6 ">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>MIDDLE NAME <span class="text-danger">*</span></small>
                                </label>
                                <input class="form-control border border-primary" type="text" v-model="fatherMiddleName">
                                <span class="badge bg-danger mt-2" v-if="errors.father_middle_name">{{
                                    errors.father_middle_name[0] }}</span>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-xl-3 col-md-6 ">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>CONTACT NUMBER <span class="text-danger">*</span></small>
                                </label>
                                <input class="form-control border border-primary" type="text" v-model="fatherContactNumber">
                                <span class="badge bg-danger mt-2" v-if="errors.father_contact_number">{{
                                    errors.father_contact_number[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-9 col-md-6">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>HIGHEST EDUCATIONAL ATTAINMENT <span class="text-danger">*</span></small>
                                </label>
                                <select v-model="fatherEducational" class="form-select">
                                    <option value="">Select Educational Attainment</option>
                                    <option v-for="educational in educationalAttainment" :key="educational">
                                        {{ educational }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>EMPLOYMENT STATUS <span class="text-danger">*</span></small>
                                </label>
                                <select v-model="fatherEmployeeStatus" class="form-select">
                                    <option value="">Select Employment Status</option>
                                    <option v-for="status in employmentStatus" :key="status">
                                        {{ status }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>WORKING ARRANGEMENT ? <span class="text-danger">*</span></small>
                            </label>
                            <select v-model="fatherArrangement" class="form-select">
                                <option value="">Select Working Arrangement</option>
                                <option v-for="status in  arrangement" :key="status">
                                    {{ status }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="mother-maiden">
                    <label for="example-text-input" class="form-control-label text-info"><b>Mother Maiden's
                            Information</b></label>
                    <div class="row">
                        <div class="col-md">
                            <form-input label="LAST NAME" v-model="motherLastName" :error="errors.mother_last_name" />
                        </div>
                        <div class="col-md">
                            <FormInput label="FIRST NAME" :error="errors.mother_last_name" v-model="motherFirstName" />
                        </div>
                    </div>
                </div>
                <div class="guardian-informtion">
                    <label for="example-text-input" class="form-control-label text-info"><b>Guardian
                            Information</b></label>
                    <div class="row">
                        <div class="col-md">
                            <form-input label="LAST NAME" v-model="motherLastName" :error="errors.mother_last_name" />
                        </div>
                        <div class="col-md">
                            <FormInput label="FIRST NAME" :error="errors.mother_last_name" v-model="motherFirstName" />
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-2 w-100">Submit Student Information</button>
            </form>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
import FormInput from '@/components/main-layouts/components/widgets/form-input.vue'
export default {
    name: 'EnrollmentRegistrationForm',
    components: {
        FormInput
    },
    data() {
        const inputValidation = {
            errors: [],
            educationaldetails: [],
            educationalAttainment: ['Elementary Graduate', 'High School Graduate', 'College', 'Vocational', "Master's / Doctorate Degree", 'Did not attend school', 'N/A'],
            employmentStatus: ['Full Time', 'Part Time', 'Self-employed (i.e. Family Business)', 'Unemployed due to community quarantine', 'Field Work', 'None', 'N/A'],
            arrangement: ['WFH', 'Office', 'Field Work', 'None', 'N/A'],
            course: '',
            firstName: '',
            lastName: '',
            middleName: '',
            middleInitial: '',
            extensionName: '',
            gender: '',
            birthDate: '',
            birthPlace: '',
            hieght: '',
            weight: '',
            contactNumber: '',
            personalEmail: '',
            civilStatus: '',
            nationalty: '',
            religion: '',
            street: '',
            barangay: '',
            municipality: '',
            province: '',
            zip_code: '',
            fatherLastName: '',
            fatherFirstName: '',
            fatherMiddleName: '',
            fatherContactNumber: '',
            fatherEducational: '',
            fatherEmployeeStatus: '',
            fatherArrangement: '',
            motherLastName: '',
            motherFirstName: '',
            motherMiddleName: '',
            motherContactNumber: '',
            motherEducational: '',
            motherEmployeeStatus: '',
            motherArrangement: '',
            guardianLastName: '',
            guardianFirstName: '',
            guardianMiddleName: '',
            guardianContactNumber: '',
            guardianEducational: '',
            guardianEmployeeStatus: '',
            guardianArrangement: ''

        }
        return inputValidation
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN
        })
    },
    mounted() {
        axios.get('student/information', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            const data = response.data.student
            this.firstName = data.first_name
            this.lastName = data.last_name
            this.middleName = data.middle_name
            this.middleInitial = data.middle_initial
            this.extensionName = data.extention_name
            this.birthDate = data.birth_date
            this.birthPlace = data.birth_place
            this.gender = data.gender
            this.weight = data.weight
            this.height = data.height
            this.personalEmail = data.personal_email
            this.civilStatus = data.civil_status
            this.nationalty = data.nationalty
            this.religion = data.religion
            this.street = data.street
            this.barangay = data.barangay
            this.municipality = data.municipality
            this.province = data.province
            this.zip_code = data.zip_code
            this.educationaldetails = data.educational_background
            if (data.current_enrollment) {
                this.course = data.current_enrollment.course
            }
            console.log(data.parent_details)
            if (data.parent_details) {
                this.fatherLastName = data.parent_details.father_last_name
                this.fatherFirstName = data.parent_details.father_first_name
                this.fatherMiddleName = data.parent_details.father_middle_name
                this.fatherContactNumber = data.parent_details.father_contact_number
                this.fatherEducational = data.parent_details.father_educational_attainment
                this.fatherEmployeeStatus = data.parent_details.father_employment_status
                this.fatherArrangement = data.parent_details.father_working_arrangement
                this.motherLastName = data.parent_details.mother_last_name
                this.motherFirstName = data.parent_details.mother_first_name
                this.motherMiddleName = data.parent_details.mother_middle_name
                console.log(data.parent_details.mother_last_name)
            }
        }).catch((error) => {
            console.log(error)
            console.log(error.response)
        })
    },
    methods: {
        async updateDetails() {
            const formData = {
                first_name: this.firstName,
                last_name: this.lastName,
                middle_name: this.middleName,
                middle_initial: this.middleInitial,
                extension_name: this.extensionName,
                birth_date: this.birthDate,
                birth_place: this.birthPlace,
                gender: this.gender,
                weight: this.weight,
                height: this.height,
                personal_email: this.personalEmail,
                civil_stats: this.civilStatus,
                nationalty: this.nationalty,
                religion: this.religion,
                street: this.street,
                barangay: this.barangay,
                municipality: this.municipality,
                province: this.province,
                zip_code: this.zip_code,
                mother_last_name: this.motherLastName,
                mother_first_name: this.motherFirstName
            }
            console.log(formData)
            /*  axios.post('student/enrollment/registration', {
             }, {
                 headers: {
                     Authorization: 'Bearer ' + this.token
                 }
             }).then((response) => {
                 console.log(response)
             }).catch((error) => {
                 if (error.response.status === 422) {
                     this.errors = error.response.data.errors
                     console.log(this.errors)
                 }
                 console.log(error)
             }) */
        }
    }
}
</script>
