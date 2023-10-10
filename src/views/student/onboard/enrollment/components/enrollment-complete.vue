<template>
    <div v-if="deployment">
        <div v-if="deployment.is_approved">
            <div v-if="enrollment.application">
                <div v-if="enrollment.application.is_approved">
                    <div v-if="tuitionDetails.tuition_assessment">
                        <div v-if="tuitionDetails.payment_transaction">
                            <stepper :value="viewName" :isActive="true" :isFinish="true" />
                            <div class="d-inline-block w-100">
                                <p class="mb-3">
                                    Your payment transaction complete. You can now Proceed to MOPM.
                                </p>
                            </div>
                        </div>
                        <div v-else>
                            <stepper :value="viewName" :isActive="false" />
                        </div>
                    </div>
                    <div v-else>
                        <stepper :value="viewName" :isActive="false" />
                    </div>
                </div>
                <div v-else>
                    <stepper :value="viewName" :isActive="false" />
                </div>
            </div>
            <div v-else>
                <stepper :value="viewName" :isActive="false" />
            </div>
        </div>
        <div v-else>
            <stepper :value="viewName" :isActive="false" />
        </div>
    </div>
    <div v-else>
        <stepper :value="viewName" :isActive="false" />
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
export default {
    name: 'EnrollmentComplete',
    components: {
        stepper
    },
    data() {
        const formData = new FormData()
        return {
            viewName: 'STEP 5: ENROLLMENT COMPLETE',
            errors: []
        }
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        })
    },
    props: {
        deployment: Object, enrollment: Object, tuitionDetails: Object, token: Object
    }
}
</script>