import {
    GET_APPLICANT_DETAILS
} from '@/store/storeApplicantConstants.js'
export default {
    name: 'ApplicantDetails',
    namespaced: true,
    state() {
        return {
            firstName: '',
            lastName: '',
            middleName: '',
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
            guardianEmployeeStatus: ''
        }
    },
    actions: {
    }
}