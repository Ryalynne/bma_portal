<template>
    <div class="form-group">
        <label for="example-text-input" class="form-control-label fw-bolder">
            <small>{{ label.toUpperCase() }}<span class="text-danger">*</span></small>
        </label>
        <textarea class="form-control  border border-primary" :cols="column" :rows="row" :value="value"
            @input="$emit('update:value', $event.target.value)"></textarea>

        <span class="badge bg-danger mt-2" v-if="error">{{
            error[0] }}</span>
    </div>
</template>
<script>

export default {
    props: {
        column: {
            type: String,
            default: '10'
        },
        row: {
            type: String,
            default: '5'
        },
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