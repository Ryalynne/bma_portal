<template>
    <label for="example-text-input" class="form-control-label fw-bolder">
        <small>{{ label.toUpperCase() }}</small>
    </label>
    <br>
    <label for="" class="text-primary fw-bolder">{{ value }}</label>
</template>
<script>

export default {
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }
}
</script>