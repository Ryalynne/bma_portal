import Vue from 'vue'
import Vuex from 'vuex'

/* Vue.use(Vuex) */
const state = {
    student: null
}
const store = new Vuex.Store({
    state,
    getters: {
        student: (state) => {
            return state.student
        }
    },
    actions: {
        student(context, student) {
            context.commit('student', student)
        }
    },
    mutations: {
        student(state, student) {
            state.student = student
        }
    }
})

export default store