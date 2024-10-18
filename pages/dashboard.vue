<template>
  <div>
    <!-- <ECGChart /> -->
    <ECGCanvas />
  </div>
</template>

<script setup lang="ts">
  import ECGCanvas from '~/components/ECGCanvas.vue';

  definePageMeta({
    middleware: 'auth',
  });
</script>

<style scoped>
  .log {
    color: red;
  }
</style>
