<template>
    <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0" data-iq-trigger="scroll"
        data-iq-ease="power.out" data-iq-opacity="0">
        <div class="card-header">
            <div class="header-title">
                <h4 class="card-title fw-bold text-primary text-header"></h4>
            </div>
        </div>
        <div class="card-body">
            <div class="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                <ul class="list-inline p-0 m-0">
                    <li>
                        <div class="timeline-dots timeline-dot1 border-secondary  text-success"></div>
                        <h5 class="float-left mb-1 stepper-header-text"></h5>
                        <h5 class="float-left mb-1 stepper-content"></h5>
                    </li>
                    <li>
                        <div class="timeline-dots timeline-dot1 border-secondary  text-success"></div>
                        <h5 class="float-left mb-1 stepper-header-text"></h5>
                        <h5 class="float-left mb-1 stepper-content"></h5>
                    </li>
                    <li>
                        <div class="timeline-dots timeline-dot1 border-secondary  text-success"></div>
                        <h5 class="float-left mb-1 stepper-header-text"></h5>
                        <h5 class="float-left mb-1 stepper-content"></h5>
                    </li>
                    <li>
                        <div class="timeline-dots timeline-dot1 border-secondary  text-success"></div>
                        <h5 class="float-left mb-1 stepper-header-text"></h5>
                        <h5 class="float-left mb-1 stepper-content"></h5>
                    </li>
                    <li>
                        <div class="timeline-dots timeline-dot1 border-secondary  text-success"></div>
                        <h5 class="float-left mb-1 stepper-header-text"></h5>
                        <h5 class="float-left mb-1 stepper-content"></h5>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
.text-header {
    width: 500px;
    height: 30px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.stepper-header-text {
    width: 400px;
    height: 28px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.stepper-content {
    width: 300px;
    height: 30px;
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
    name: 'LoadingView'
}
</script>