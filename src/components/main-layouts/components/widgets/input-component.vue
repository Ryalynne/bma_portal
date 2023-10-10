<template>
    <div class="form-group">
        <label for="example-text-input" class="form-control-label fw-bolder">
            <small>{{ label.toUpperCase() }}<span class="text-danger">*</span></small>
        </label>
        <input type="text" class="form-control form-control-sm border border-primary" :value="value"
            @input="$emit('update:value', $event.target.value)" />
        <span class="badge bg-danger mt-2" v-if="error">{{
            error[0] }}</span>
    </div>
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
        },
        error: Object
    },
    emits: ['update:value']
}
</script>