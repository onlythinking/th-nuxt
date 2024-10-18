<template>
  <div class="home">
    {{ data.name }}
  </div>
</template>

<script setup lang="ts">
  const data = reactive({ name: 'test' });
</script>

<style></style>
