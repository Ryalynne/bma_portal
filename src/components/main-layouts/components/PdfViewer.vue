<template>
    <pdf :src="pdfUrl">
        <slot name="loading">
            loading content here...
        </slot>
    </pdf>
</template>
<script>
import pdf from 'pdfvuer'
import 'pdfjs-dist/build/pdf.worker.entry' // not needed since v1.9.1

export default {
    components: {
        pdf
    },
    props: { pdfUrl: String }
}
</script>