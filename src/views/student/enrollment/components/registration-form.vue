<template>
    <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0" data-iq-trigger="scroll"
        data-iq-ease="power.out" data-iq-opacity="0">
        <div class="card-header p-3">
            <div class="header-title">
                <label for="" class="fw-bolder text-primary h4">STUDENT INFORMATION</label>
                <br>
                <small for="" class="text-danger">
                    Kindly double check you Student Details and update. <br>
                    NOTE: All data field is required to fill in,
                    type/choose N / A if not applicable
                </small>
            </div>
        </div>
        <div class="card-body">
            <div v-if="isLoading">
                <h2 class="fw-bolder text-info">LOADING</h2>
            </div>
            <div v-else>
                <form @submit.prevent="updateDetails" method="post">
                    <label for="" class="text-primary fw-bolder h4">STUDENT DETAILS</label>
                    <div class="row">
                        <div class="col-xl col-md">
                            <input-component label="LAST NAME" v-model:value="lastName" :error="errors.last_name" />
                        </div>
                        <div class="col-xl col-md">
                            <input-component label="FIRST NAME" v-model:value="firstName" :error="errors.first_name" />
                        </div>
                        <div class="col-xl col-md">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>MIDDLE NAME <span class="text-danger">*</span></small>
                                </label>
                                <input class="form-control form-control-sm border border-primary" v-model="middleName">
                                <div class="form-check">
                                    <input class="form-check-input input-middle-name" type="checkbox" value="n/a"
                                        v-model="middleName" id="flexCheckDefault1">
                                    <small class="form-check-label validate-checkbox" data-input="input-middle-name"
                                        for="flexCheckDefault1">
                                        I don't have Middle name
                                    </small>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.middle_name">{{ errors.middle_name[0]
                                }}</span>

                            </div>
                        </div>
                        <div class="col-xl-2 col-md">
                            <input-component label="MIDDLE INITIAL" v-model:value="middleInitial"
                                :error="errors.middle_initial" />
                        </div>
                        <div class="col-xl-2 col-md">
                            <input-component label="EXTENSION" v-model:value="extensionName"
                                :error="errors.extension_name" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4 col-md">
                            <select-component label="Gender" v-model:value="gender" :error="errors.gender"
                                :data="genderi" />
                        </div>

                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="HEIGHT - CM" v-model:value="height" :error="errors.height" />
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="WEIGHT - LBS" v-model:value="weight" :error="errors.weight" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl col-md-4 mb-xl-0">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>BIRTH DATE <span class="text-danger">*</span></small>
                                </label>
                                <input class="form-control form-control-sm border border-primary" type="date"
                                    v-model="birthDate">
                                <span class="badge bg-danger mt-2" v-if="errors.birth_date">{{ errors.birth_date[0]
                                }}</span>
                            </div>
                        </div>
                        <div class="col-xl-9 col-md-8 mb-xl-0">
                            <input-component label="BIRTH PLACE" v-model:value="birthPlace" :error="errors.birthPlace" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="CIVIL STATUS" v-model:value="civilStatus"
                                :error="errors.civil_status" />
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="NATIONALITY" v-model:value="nationality" :error="errors.nationality" />
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="RELIGION" v-model:value="religion" :error="errors.religion" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-md-6 mb-xl-0">
                            <input-component label="CONTACT NUMBER" v-model:value="contactNumber"
                                :error="errors.contact_number" />
                        </div>
                        <div class="col-xl-6 col-md-6 mb-xl-0">
                            <input-component label="EMAIL" v-model:value="personalEmail" :error="errors.personal_email" />

                        </div>
                    </div>
                    <label for="" class="text-primary fw-bolder h4">ADDRESS</label>
                    <div class="row">
                        <div class="col-xl-6 col-md-6 mb-xl-0">
                            <input-component label="HOUSE NO. / STREET / BLDG NO" v-model:value="street"
                                :error="errors.street" />
                        </div>
                        <div class="col-xl-6 col-md-6 mb-xl-0">
                            <input-component label="BARANGAY" v-model:value="barangay" :error="errors.barangay" />
                        </div>
                        <div class="col-xl-4 col-md-6 mb-xl-0">
                            <input-component label="MUNICIPALITY" v-model:value="municipality"
                                :error="errors.municipality" />
                        </div>
                        <div class="col-xl-4 col-md-6 mb-xl-0">
                            <input-component label="PROVINCE" v-model:value="province" :error="errors.province" />
                        </div>
                        <div class="col-xl-4 col-md-6 mb-xl-0">
                            <input-component label="ZIP CODE" v-model:value="zip_code" :error="errors.zip_code" />
                        </div>
                    </div>
                    <label for="" class="text-primary fw-bolder h4">EDUCATIONAL DETAILS</label>
                    <div v-if="educationaldetails" class="educational-details">
                        <div class="Elementary School">
                            <label for="" class="text-muted fw-bolder h6">Elementary School</label>
                            <div class="row">
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school name" v-model:value="elementarySchoolName"
                                        :error="errors.elementary_school_name" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school address" v-model:value="elementarySchoolAddress"
                                        :error="errors.elementary_school_address" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component-v2 label="YEAR GRADUATED" type="month"
                                        v-model:value="elementarySchoolYear" :error="errors.elementary_school_year" />
                                </div>
                            </div>
                        </div>
                        <div class="Junior High School">
                            <label for="" class="text-muted fw-bolder h6">Junior High School</label>
                            <div class="row">
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school name" v-model:value="juniorHighSchoolName"
                                        :error="errors.junior_high_school_name" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school address" v-model:value="juniorHighSchoolAddress"
                                        :error="errors.junior_high_school_address" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component-v2 label="YEAR GRADUATED" type="month"
                                        v-model:value="juniorHighSchoolYear" :error="errors.junior_high_school_year" />
                                </div>
                            </div>
                        </div>
                        <div v-if="educationalAttainment.length > 3">
                            <div class="Junior High School">
                                <label for="" class="text-muted fw-bolder h6">Senior High School</label>
                                <div class="row">
                                    <div class="col-xl-4 col-md-6 ">
                                        <input-component label="school name" v-model:value="seniorHighSchoolName"
                                            :error="errors.senior_high_school_name" />
                                    </div>
                                    <div class="col-xl-4 col-md-6 ">
                                        <input-component label="school address" v-model:value="seniorHighSchoolAddress"
                                            :error="errors.senior_high_school_address" />
                                    </div>
                                    <div class="col-xl-4 col-md-6 ">
                                        <input-component-v2 label="YEAR GRADUATED" type="month"
                                            v-model:value="seniorHighSchoolYear" :error="errors.junior_high_school_year" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <label for="" class="text-primary fw-bolder h4">PARENT DETAILS</label>
                    <div class="father-information">
                        <label for="example-text-input" class="form-control-label text-info"><b>Father's
                                Information</b></label>
                        <div class="row">
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="LAST NAME" v-model:value="fatherLastName"
                                    :error="errors.father_last_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="FIRST NAME" v-model:value="fatherFirstName"
                                    :error="errors.father_first_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="MIDDLE NAME" v-model:value="fatherMiddleName"
                                    :error="errors.father_middle_name" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-3 col-md-6 ">
                                <input-component label="CONTACT NUMBER" v-model:value="fatherContactNumber"
                                    :error="errors.father_contact_number" />
                            </div>
                            <div class="col-xl-9 col-md-6">
                                <select-component label="Highest Educational Attainment" v-model:value="fatherEducational"
                                    :error="errors.father_educational_attainment" :data="educationalAttainment" />
                            </div>
                            <div class="col-md">
                                <select-component label="Employment Status" v-model:value="fatherEmployeeStatus"
                                    :error="errors.father_employee_status" :data="employmentStatus" />
                            </div>
                            <div class="col-md">
                                <select-component label="Working Arrangement" v-model:value="fatherArrangement"
                                    :error="errors.father_arrangment" :data="arrangement" />
                            </div>
                        </div>
                    </div>
                    <div class="mother-maiden">
                        <label for="example-text-input" class="form-control-label text-info"><b>Mother Maiden's
                                Information</b></label>
                        <div class="row">
                            <div class="col-xl-4 col-md-6F">
                                <input-component label="LAST  NAME" v-model:value="motherLastName"
                                    :error="errors.mother_last_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="FIRST NAME" v-model:value="motherFirstName"
                                    :error="errors.mother_first_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="MIDDLE NAME" v-model:value="motherMiddleName"
                                    :error="errors.mother_middle_name" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-3 col-md-6 ">
                                <input-component label="CONTACT NUMBER" v-model:value="motherContactNumber"
                                    :error="errors.mother_contact_number" />

                            </div>
                            <div class="col-xl-9 col-md-6">
                                <select-component label="Highest Educational Attainment" v-model:value="motherEducational"
                                    :error="errors.mother_educational_attainment" :data="educationalAttainment" />
                            </div>
                            <div class="col-md">
                                <select-component label="Employment Status" v-model:value="motherEmployeeStatus"
                                    :error="errors.mother_employee_status" :data="employmentStatus" />
                            </div>
                            <div class="col-md">
                                <select-component label="Working Arrangement" v-model:value="motherArrangement"
                                    :error="errors.mother_arrangment" :data="arrangement" />
                            </div>
                        </div>
                    </div>
                    <div class="guardian-informtion">
                        <label for="example-text-input" class="form-control-label text-info"><b>Guardian
                                Information</b></label>
                        <div class="row">
                            <div class="col-xl-4 col-md-6F">
                                <input-component label="LAST  NAME" v-model:value="guardianLastName"
                                    :error="errors.guardian_last_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="FIRST NAME" v-model:value="guardianFirstName"
                                    :error="errors.guardian_first_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="MIDDLE NAME" v-model:value="guardianMiddleName"
                                    :error="errors.guardian_middle_name" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-3 col-md-6 ">
                                <input-component label="CONTACT NUMBER" v-model:value="guardianContactNumber"
                                    :error="errors.guardian_contact_number" />

                            </div>
                            <div class="col-xl-9 col-md-6">
                                <select-component label="Highest Educational Attainment" v-model:value="guardianEducational"
                                    :error="errors.guardian_educational_attainment" :data="educationalAttainment" />
                            </div>
                            <div class="col-md">
                                <select-component label="Employment Status" v-model:value="guardianEmployeeStatus"
                                    :error="errors.guardian_employee_status" :data="employmentStatus" />
                            </div>
                            <div class="col-md">
                                <select-component label="Working Arrangement" v-model:value="guardianArrangement"
                                    :error="errors.guardian_arrangment" :data="arrangement" />
                            </div>
                            <div class="col-xl-12 col-md-6 ">
                                <input-component label="Guardian Address" v-model:value="guardianAddress"
                                    :error="errors.guardian_address" />
                            </div>
                        </div>
                    </div>
                    <label for="" class="text-primary fw-bolder h4">ADDITIONAL DETAILS</label>
                    <div class="additional">
                        <div class="row">
                            <div class="col-xl-4 col-md-12">
                                <select-component label="HOUSEHOLD INCOME" v-model:value="householdIncome"
                                    :error="errors.household_income" :data="incomeList" />
                            </div>
                            <div class="col-xl-8 col-md-12">
                                <select-component label="Is your family Beneficiary of DSWD Listahan / 4P's ? "
                                    v-model:value="beneficiary" :error="errors.dswd_beneficiary" :data="beneficiaryList" />
                            </div>
                            <div class="col-xl-6 col-md-12">
                                <select-component label="HOMEOWNERSHIP" v-model:value="homeOwnership"
                                    :error="errors.home_ownership" :data="homeOwnershipList" />
                            </div>
                            <div class="col-xl-6 col-md-12">
                                <select-component label="CAR OWNERSHIP" v-model:value="carOwnership"
                                    :error="errors.car_ownership" :data="carOwnershipList" />
                            </div>
                        </div>
                    </div>
                    <div class="additional-info">
                        <label for="example-text-input" class="form-control-label text-info fw-bolder">
                            ACCESS TO DISTANCE LEARNING
                        </label>
                        <div class="col-xl-12 col-md-12">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>What devices are available at home that the student can use for learning?<span
                                            class="text-danger">*</span> <small class="text-warning"> Check all that
                                            applies</small></small>
                                </label>
                                <div class="row me-3 ms-3">
                                    <div v-for="(item, index) in deviceList" :key="index" class="form-check col-md-4">
                                        <input class="form-check-input" type="checkbox" v-model="deviceSelected"
                                            :id="`check_box_device_` + index" :value="item">
                                        <label class="form-check-label" :for="`check_box_device_` + index">
                                            {{ item }}
                                        </label>
                                    </div>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.available_device">{{
                                    errors.available_device[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-12 col-md-12">
                            <select-component label="Do you have a way to connect to the internet? "
                                v-model:value="internetConnection" :error="errors.available_connection"
                                :data="beneficiaryList" />
                        </div>
                        <div class="col-xl-12 col-md-12">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>How do you connect to the Internet?<span class="text-danger">*</span> <small
                                            class="text-warning"> Check all that
                                            applies</small></small>
                                </label>
                                <div class="row me-3 ms-3">
                                    <div v-for="(item, index1) in providerList" :key="index1" class="form-check col-md-12">
                                        <input class="form-check-input" type="checkbox" :id="`check_box_provider_` + index1"
                                            :value="item" v-model="providerAvailable">
                                        <label class="form-check-label" :for="`check_box_provider_` + index1">
                                            {{ item }}
                                        </label>
                                    </div>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.available_provider">{{
                                    errors.available_provider[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-12 col-md-12">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>What Learning Modality do you prefer?<span class="text-danger">*</span> <small
                                            class="text-warning"> Check all that
                                            applies</small></small>
                                </label>
                                <div class="row me-3 ms-3">
                                    <div v-for="(item, index2) in learningModalityList" :key="index2"
                                        class="form-check col-md-12">
                                        <input class="form-check-input" type="checkbox" :id="`check_box_modality_` + index2"
                                            :value="item" v-model="learningModality">
                                        <label class="form-check-label" :for="`check_box_modality_` + index2">
                                            {{ item }}
                                        </label>
                                    </div>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.learning_modality">{{
                                    errors.learning_modality[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-12 col-md-12">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>What are the challenges that may affect your learning process through distance
                                        education?<span class="text-danger">*</span> <small class="text-warning"> Check all
                                            that
                                            applies</small></small>
                                </label>
                                <div class="row me-3 ms-3">
                                    <div v-for="(item, index3) in inputsList" :key="index3" class="form-check col-md-12">
                                        <input class="form-check-input" type="checkbox" :id="`check_box_learning_` + index3"
                                            :value="item" v-model="distanceLearning">
                                        <label class="form-check-label" :for="`check_box_learning_` + index3">
                                            {{ item }}
                                        </label>
                                    </div>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.distance_learning_effect">{{
                                    errors.distance_learning_effect[0] }}</span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary mt-2 w-100">Submit Student Information</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import inputComponent from '@/components/main-layouts/components/widgets/input-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component.vue'
export default {
    name: 'EnrollmentRegistrationForm',
    components: {
        inputComponent,
        selectComponent,
        inputComponentV2
    },
    data() {
        const inputValidation = {
            isLoading: true,
            errors: [],
            educationaldetails: [],
            genderi: ['Male', 'Female'],
            educationalAttainment: ['Elementary Graduate', 'High School Graduate', 'College', 'Vocational', "Master's / Doctorate Degree", 'Did not attend school', 'N/A'],
            employmentStatus: ['Full Time', 'Part Time', 'Self-employed (i.e. Family Business)', 'Unemployed due to community quarantine', 'Field Work', 'None', 'N/A'],
            arrangement: ['WFH', 'Office', 'Field Work', 'None', 'N/A'],
            incomeList: ['Below 10,000', '10,000-20,000', '20,000-40,000', '40,000-60,000', '60,000 Above', 'N/A'],
            beneficiaryList: ['Yes', 'No'],
            homeOwnershipList: ['Owned', 'Mortgaged', 'Rented'],
            carOwnershipList: ['0', '1', '2', '3', 'up to 4'],
            deviceList: ['Cable TV', 'Non-Cable TV', 'Basic Cellphone', 'Smartphone', 'Tablet', 'Radio', 'Desktop Computer', 'Laptop', 'None'],
            providerList: ['own mobile data', 'own broadband (DSL, Wireless Fiber, Satellite)', 'computer shop', 'other places outside the home with internet connection (library, barangay, neighbor, relatives)', 'none'],
            learningModalityList: ['online learning', 'Blended', 'Face-to-Face'],
            inputsList: ['lack of available gadgets / equipment', 'insufficient load/data allowance', 'existing health condition/s', 'difficulty in independent learning', 'conflict with other activities (i.e. house chores)', 'none or lack of available space for studying', 'distractions (i.e. social media, noise from community/ neighbor)', 'none'],
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
            nationality: '',
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
            guardianArrangement: '',
            guardianAddress: '',
            elementarySchoolName: '',
            elementarySchoolAddress: '',
            elementarySchoolYear: '',
            juniorHighSchoolName: '',
            juniorHighSchoolAddress: '',
            juniorHighSchoolYear: '',
            seniorHighSchoolName: '',
            seniorHighSchoolAddress: '',
            seniorHighSchoolYear: '',
            householdIncome: '',
            beneficiary: '',
            homeOwnership: '',
            carOwnership: '',
            deviceSelected: [],
            internetConnection: '',
            providerAvailable: [],
            distanceLearning: [],
            learningModality: [],
            link: ''
        }
        return inputValidation
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN
        })
    },
    mounted() {
        console.log(this.$route)
        this.link = this.$route.path === '/student/update-information' ? 'student/update-information' : 'student/enrollment/registration'
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
            this.birthDate = data.birthday
            this.birthPlace = data.birth_place
            this.gender = data.sex
            this.weight = data.weight
            this.height = data.height
            this.personalEmail = data.account.personal_email
            this.civilStatus = data.civil_status
            this.nationality = data.nationality
            this.religion = data.religion
            this.street = data.street
            this.barangay = data.barangay
            this.municipality = data.municipality
            this.province = data.province
            this.zip_code = data.zip_code.toString()
            this.contactNumber = data.contact_number
            this.educationaldetails = data.educational_background
            this.educationaldetails.forEach(element => {
                switch (element.school_level) {
                    case 'Elementary School':
                        this.elementarySchoolName = element.school_name
                        this.elementarySchoolAddress = element.school_address
                        this.elementarySchoolYear = element.graduated_year
                        break
                    case 'Junior High School':
                        this.juniorHighSchoolName = element.school_name
                        this.juniorHighSchoolAddress = element.school_address
                        this.juniorHighSchoolYear = element.graduated_year
                        break
                    case 'Senior High School':
                        this.seniorHighSchoolName = element.school_name
                        this.seniorHighSchoolAddress = element.school_address
                        this.seniorHighSchoolYear = element.graduated_year
                        break
                    default:
                        break
                }
            })
            if (data.enrollment_assessment) {
                this.course = data.enrollment_assessment.course_id
            }
            if (data.parent_details) {
                /* Father */
                this.fatherLastName = data.parent_details.father_last_name
                this.fatherFirstName = data.parent_details.father_first_name
                this.fatherMiddleName = data.parent_details.father_middle_name
                this.fatherContactNumber = data.parent_details.father_contact_number
                this.fatherEducational = data.parent_details.father_educational_attainment
                this.fatherEmployeeStatus = data.parent_details.father_employment_status
                this.fatherArrangement = data.parent_details.father_working_arrangement
                /* Mother Maiden */
                this.motherLastName = data.parent_details.mother_last_name
                this.motherFirstName = data.parent_details.mother_first_name
                this.motherMiddleName = data.parent_details.mother_middle_name
                this.motherContactNumber = data.parent_details.mother_contact_number
                this.motherEducational = data.parent_details.mother_educational_attainment
                this.motherEmployeeStatus = data.parent_details.mother_employment_status
                this.motherArrangement = data.parent_details.mother_working_arrangement
                /* Guardian */
                this.guardianLastName = data.parent_details.guardian_last_name
                this.guardianFirstName = data.parent_details.guardian_first_name
                this.guardianMiddleName = data.parent_details.guardian_middle_name
                this.guardianContactNumber = data.parent_details.guardian_contact_number
                this.guardianEducational = data.parent_details.guardian_educational_attainment
                this.guardianEmployeeStatus = data.parent_details.guardian_employment_status
                this.guardianArrangement = data.parent_details.guardian_working_arrangement
                this.guardianAddress = data.parent_details.guardian_address
                /* Additional Details */
                this.householdIncome = data.parent_details.household_income
                this.beneficiary = data.parent_details.dswd_listahan
                this.homeOwnership = data.parent_details.homeownership
                this.carOwnership = data.parent_details.car_ownership
                /* this.device = data.parent_details.available_devices */
            }
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            console.log(error.response)
        })
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        async updateDetails() {
            this.showLoading(true)
            const formData = {
                course: this.course,
                first_name: this.firstName,
                last_name: this.lastName,
                middle_name: this.middleName,
                middle_initial: this.middleInitial,
                extension_name: this.extensionName,
                gender: this.gender,
                height: this.height,
                weight: this.weight,
                birth_date: this.birthDate,
                birth_place: this.birthPlace,
                civil_status: this.civilStatus,
                nationality: this.nationality,
                religion: this.religion,
                street: this.street,
                barangay: this.barangay,
                municipality: this.municipality,
                province: this.province,
                zip_code: this.zip_code,
                personal_email: this.personalEmail,
                contact_number: this.contactNumber,
                /* Parents */
                father_last_name: this.fatherLastName,
                father_first_name: this.fatherFirstName,
                father_middle_name: this.fatherMiddleName,
                father_contact_number: this.fatherContactNumber,
                father_educational_attainment: this.fatherEducational,
                father_employment_status: this.fatherEmployeeStatus,
                father_working_arrangement: this.fatherArrangement,
                mother_last_name: this.motherLastName,
                mother_first_name: this.motherFirstName,
                mother_middle_name: this.motherMiddleName,
                mother_contact_number: this.motherContactNumber,
                mother_educational_attainment: this.motherEducational,
                mother_employment_status: this.motherEmployeeStatus,
                mother_working_arrangement: this.motherArrangement,
                guardian_last_name: this.guardianLastName,
                guardian_first_name: this.guardianFirstName,
                guardian_middle_name: this.guardianMiddleName,
                guardian_contact_number: this.guardianContactNumber,
                guardian_educational_attainment: this.guardianEducational,
                guardian_employment_status: this.guardianEmployeeStatus,
                guardian_working_arrangement: this.guardianArrangement,
                guardian_address: this.guardianAddress,
                /* Educational Background */
                elementary_school_name: this.elementarySchoolName,
                elementary_school_address: this.elementarySchoolAddress,
                elementary_school_year: this.elementarySchoolName,
                junior_high_school_name: this.juniorHighSchoolName,
                junior_high_school_address: this.juniorHighSchoolAddress,
                junior_high_school_year: this.juniorHighSchoolYear,
                senior_high_school_name: this.seniorHighSchoolName,
                senior_high_school_address: this.seniorHighSchoolAddress,
                senior_high_school_year: this.seniorHighSchoolYear,
                /* additional information */
                household_income: this.householdIncome,
                dswd_beneficiary: this.beneficiary,
                home_ownership: this.homeOwnership,
                car_ownership: this.carOwnership,
                available_device: this.deviceSelected,
                available_connection: this.internetConnection,
                available_provider: this.providerAvailable,
                learning_modality: this.learningModality,
                distance_learning_effect: this.distanceLearning

            }
            axios.post(this.link, formData, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                this.$router.push('/student/dashboard')
                console.log(response)
            }).catch((error) => {
                this.showLoading(false)
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                    console.log(this.errors)
                }
                console.error(error)
            })
        }
    }
}
</script>