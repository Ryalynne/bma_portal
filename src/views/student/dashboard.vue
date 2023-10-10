<template>
    <div v-if="isLoading">
        <h3>LOADING</h3>
    </div>
    <div v-else>
        <div class="row">
            <div class="col-lg-12">
                <ProfileCard :details="profileDetails" />
            </div>
            <div class="col-lg-12">
                <ProfileInformation :details="profileDetails" />
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
import ProfileCard from './profile/ProfileCard.vue'
import ProfileInformation from './profile/ProfileInformation.vue'
export default {
    name: 'StudentDashboard',
    components: {
        ProfileCard,
        ProfileInformation
    },
    data() {
        return {
            isLoading: true,
            profileDetails: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.profileDetails = response.data
            console.log(response)
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            console.log(error.response)
        })
    }
}
</script>