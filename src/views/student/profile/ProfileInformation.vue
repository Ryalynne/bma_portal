<template>
    <div class="card shadow">
        <div class="card-header">
            <div class="header-title">
                <label for="" class="fw-bolder text-primary h4">STUDENT INFORMATION</label>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md">
                    <small class="fw-bolder text-muted">FIRST NAME</small>
                    <p class="fw-bolder text-primary">{{ details.account.first_name }}</p>
                </div>
                <div class="col-md">
                    <small class="fw-bolder text-muted">LAST NAME</small>
                    <p class="fw-bolder text-primary">{{ details.account.last_name }}</p>
                </div>
                <div class="col-md">
                    <small class="fw-bolder text-muted">MIDDLE NAME</small>
                    <p class="fw-bolder text-primary">{{ details.account.middle_name }}</p>
                </div>
                <div class="col-md">
                    <small class="fw-bolder text-muted">EXTENSION NAME</small>
                    <p class="fw-bolder text-primary">{{ details.account.extention_name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile Information',
    methods: {
        displayName(data) {
            const extensionName = data.extention_name.toUpperCase() !== 'N/A' ? ' ' + data.extention_name : ''
            const fullName = data.last_name + extensionName + ', ' + data.first_name + ' ' + data.middle_initial
            return fullName.toUpperCase()
        }
    },
    props: {
        details: Object
    }
}
</script>