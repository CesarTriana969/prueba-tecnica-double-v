<template>
    <div class="loader-section">

        <hollow-dots-spinner v-if="type=='hollow-dots-spinner'" :animation-duration="1000" :dot-size="30" :dots-num="3" :color="color" v-bind="settings" />
        <scaling-squares-spinner v-else-if="type == 'scaling-squares-spinner'" :animation-duration="1250" :size="65" :color="color" v-bind="settings"/>
    </div>
</template>

<script setup lang="ts">
    import { ScalingSquaresSpinner } from "epic-spinners";
    import { HollowDotsSpinner } from 'epic-spinners'

    const props = defineProps({
        type:{
            required: false,
            default: 'hollow-dots-spinner'
        },
        duration:{
            required: false,
            default: 1250
        },
        color: {
            required: false,
            default: '#006aff'
        },
        settings: {
            required: false,
            default: {}
        }
    })

    /* 
        Docs: https://epic-spinners.vuestic.dev/
    */
    
    
</script>