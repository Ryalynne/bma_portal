export default class validation {
    static checkEmail(email) {
        /* eslint-disable-next-line */
        const url = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (url.test(email)) {
            return true
        } return false
    }

    static minLength(name, minLength) {
        if (name.length > minLength) {
            return false
        } return true
    }

    static inputRequired(input) {
        if (input === '') {
            return false
        } return true
    }
}