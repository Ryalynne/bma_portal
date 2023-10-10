<template>
    <router-link :to="{ name: 'app-layout.home' }" class="navbar-brandms-5">
        <img src="@/assets/resources/image/bma-logo-1.png" alt="image" class="img-fluid rounded-circle avatar-70 me-2">
        <span class="ms-1 font-weight-bold text-primary"><b>BMA StudentPortal</b></span>
    </router-link>
</template>
<script>
export default {
    name: 'PageLogo'
}
</script>
