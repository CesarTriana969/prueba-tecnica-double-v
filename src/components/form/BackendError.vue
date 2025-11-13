<template>
    <div class="alert alert-danger">
        {{  getMessageError(backendErrors.code)  }}
    </div>
</template>

<script setup>
    defineOptions({
        name: "FormBackendError"
    })

    import {defineProps, onMounted, computed, ref} from 'vue'
    import { getMessageError, handleError } from '@/helpers/handleErrors';

    const props = defineProps({
        backendErrors: {
            required: true
        },
        variant: {
            required: false,
            type: String,
            default: 'danger'
        }
    })

    console.error(props.backendErrors)
    handleError(props.backendErrors.code)
</script>
