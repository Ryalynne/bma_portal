import { SET_USER_TOKEN_MUTATION } from '@/store/storeConstants'

export default {
    [SET_USER_TOKEN_MUTATION](state, payload) {
        state.email = payload.email
        state.name = payload.name
        state.token = payload.token
        state.image = payload.image
        state.userId = payload.userId
    }
}