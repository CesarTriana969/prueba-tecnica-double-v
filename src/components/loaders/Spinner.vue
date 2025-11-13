<template>
  <div class="spinner-border spinner-border-sm" role="status" v-if="type == 'bootstrap'">
      <span class="visually-hidden">Loading...</span>
  </div>
  <half-circle-spinner v-else-if="type == 'epic' " :animation-duration="1000" :size="20" color="currentColor" class="d-inline-block me-2"  style="margin-bottom: -4px;" />
  
</template>
<script setup lang="ts">
  defineOptions({
    name: 'LoadersSpinner'
  })

  import { defineProps } from 'vue';
  import { HalfCircleSpinner } from 'epic-spinners'

  const props =  defineProps({
    type:{
      required: false,
      default: 'epic'
    },
  })

</script>