<template>
  <router-view/>
</template>
<script setup lang="ts">
  defineOptions({
      name: 'App'
  })

  document.title = "Double"
</script>