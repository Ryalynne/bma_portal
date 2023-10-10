<template>
    <div>
        <p class='display-6 fw-bolder text-primary text-header'></p>
        <div class="row">
            <div class="col-lg-4 col-md-6 col-xs-12" v-for="n in 5" :key="n">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between pb-4">
                        <div class="header-title">
                            <div class="d-flex flex-wrap">
                                <div class="media-support-info mt-2">
                                    <h5 class="mb-0 fw-bolder text-white stepper-header-text"></h5>
                                    <p class="mb-0 text-white stepper-content">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
.text-header {
    width: 500px;
    height: 50px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.stepper-header-text {
    width: 300px;
    height: 20px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.stepper-content {
    width: 200px;
    height: 12px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}


@keyframes pulse-bg {
    0% {
        background-color: #ddd;
    }

    50% {
        background-color: #d0d0d0;
    }

    100% {
        background-color: #ddd;
    }
}
</style>
<script>
export default {
    name: 'Subjects Loading'
}
</script>