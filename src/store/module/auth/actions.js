import LoginValidation from '@/services/validation/LoginValidation'
import { LOGIN_ACTION, SET_USER_TOKEN_MUTATION, TESTING_ACTION } from '@/store/storeConstants'
import axios from 'axios'
export default {
    async [LOGIN_ACTION](context, payload) {
        const response = ''
        try {
            const response = await axios.post('student/login', {
                email: payload.email,
                password: payload.password
            })
            console.log(response)
        } catch (error) {
            console.log(error)
            const errorMessage = LoginValidation.serverError(error)
            console.log(errorMessage)
            throw errorMessage
        }
        if (response.status === 200) {
            context.commit(SET_USER_TOKEN_MUTATION, {
                userId: response.data.student.student_id,
                email: response.data.student.account.email,
                name: response.data.student.account.name,
                token: response.data.token,
                image: response.data.student.profile_picture
            })
        }
    },

    [TESTING_ACTION](context, payload) {
        console.log('working')
    }
}