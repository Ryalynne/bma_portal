<template>
    <div class="loader ">
        <div class="loader-body word-spacing">
            <h1 class="loader-title fw-bold">STUDENT PORTAL</h1>
        </div>
    </div>
</template>
<script>
export default {
    name: 'StudentLoader',
    props: {
        dark: { type: Boolean, default: false }
    },
    mounted() {
        const loader = document.querySelector('.loader')
        setTimeout(() => {
            loader.classList.add('animate__animated', 'animate__fadeOut')
            setTimeout(() => {
                loader.classList.add('d-none')
            }, 500)
        }, 500)
    }
}
</script>
