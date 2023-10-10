<template>
    <ul class="navbar-nav iq-main-menu" id="sidebar-menu">

        <li>
            <hr class="hr-horizontal">
        </li>
        <li class="nav-item" v-for="items in navItem" :key="items">
            <a :class="`nav-link ${checkActive(items.child) ? 'active' : ''}`" data-bs-toggle="collapse"
                :href="`#sidebar-${items.name}`" role="button" aria-expanded="false"
                :aria-controls="'sidebar-${items.name}'">
                <i class="icon">
                    <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" :d="`${items.icon}`" fill="currentColor"></path>
                    </svg>
                </i>
                <span class="item-name">{{ items.name }}</span>
                <i class="right-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </i>
            </a>
            <ul class="sub-nav collapse" :id="`sidebar-${items.name}`" data-bs-parent="#sidebar-menu">
                <li class="nav-item" v-for="childItem in items.child" :key="childItem">
                    <router-link :class="`nav-link ${checkActive(childItem.url) ? 'active' : ''}`" aria-current="page"
                        :to="{ name: childItem.url }">
                        <i class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                <g>
                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                </g>
                            </svg>
                        </i>
                        <i class="sidenav-mini-icon"> CE </i>
                        <span class="item-name">{{ childItem.name }} </span>
                    </router-link>
                </li>
            </ul>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'Verticalnav',
    data() {
        const dashboard = [
            { name: 'Profile', url: 'student-layout.dashboard' }
        ]
        const items = [
            { name: 'Dashboard', child: dashboard, icon: 'M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z' }
        ]
        return {
            navItem: items
        }
    },
    methods: {
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
            if (route.includes(this.$route.name)) {
                return true
            }
        }
    }
}
</script>
