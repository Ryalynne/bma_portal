import { createStore } from 'vuex'
import auth from './module/auth'
import alert from '@/store/module/alert'
import applicant from '@/store/module/applicants'
import { SHOW_LOADING_MUTATION } from './storeConstants'
const store = createStore({
  modules: {
    auth, alert, applicant
  },
  state() {
    return {
      showLoading: false
    }
  },
  mutations: {
    [SHOW_LOADING_MUTATION](state, payload) {
      state.showLoading = payload
    }
  }
})
export default store
