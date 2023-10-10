import validation from './index'
export default class LoginValidation {
    constructor(email, password) {
        this.email = email
        this.password = password
    }

    checkValidations() {
        const errors = []
        /* if (!validation.checkEmail(this.email)) {
            errors.email = 'Invalid Email'
        } */
        if (!validation.inputRequired(this.email)) {
            errors.email = ['The email field is required.']
        }
        if (!validation.inputRequired(this.email)) {
            errors.email = ['The email field is required.']
        }
        if (!validation.inputRequired(this.password)) {
            errors.password = ['The password field is required.']
        }
        return errors
    }

    static serverError(errorValue) {
        return errorValue.data.message + ' (' + errorValue.status + ')'
    }
}