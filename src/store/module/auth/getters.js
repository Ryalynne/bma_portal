import { GET_USER_IMAGE } from '@/store/storeConstants'

export default {
    [GET_USER_IMAGE]: (state) => {
        return state.image
    }
}