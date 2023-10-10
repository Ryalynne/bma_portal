<template>
    <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0" data-iq-trigger="scroll"
        data-iq-ease="power.out" data-iq-opacity="0">
        <div class="card-header">
            <div class="header-title">
                <h4 class="card-title fw-bold text-primary">SHIPBOARD INFORMATION</h4>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-8 col-md-12">
                    <label for="example-text-input" class="text-header">
                    </label>
                    <br>
                    <label for="" class="text-content"></label>
                </div>
                <div class="col-lg-4 col-md-12">
                    <label for="example-text-input" class="text-header">
                    </label>
                    <br>
                    <label for="" class="text-content"></label>
                </div>
                <div class="col-lg-6 col-md-12">
                    <label for="example-text-input" class="text-header">
                    </label>
                    <br>
                    <label for="" class="text-content"></label>
                </div>
                <div class="col-lg-6 col-md-12">
                    <label for="example-text-input" class="text-header">
                    </label>
                    <br>
                    <label for="" class="text-content"></label>
                </div>
                <div class="col-lg-4 col-md-12">
                    <label for="example-text-input" class="text-header">
                    </label>
                    <br>
                    <label for="" class="text-content"></label>
                </div>
                <div class="col-lg-4 col-md-12">
                    <label for="example-text-input" class="text-header">
                    </label>
                    <br>
                    <label for="" class="text-content"></label>
                </div>
                <div class="col-lg-4 col-md-12">
                    <label for="example-text-input" class="text-header">
                    </label>
                    <br>
                    <label for="" class="text-content"></label>
                </div>
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

.text-content {
    width: 400px;
    height: 28px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.text-header {
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
    name: 'MOPMLoadingView'
}
</script>