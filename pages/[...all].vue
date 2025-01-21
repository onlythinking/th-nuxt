<template>
  <main p="x4 y10" text="center color-primary th-page">
    <div class="text-4xl">
      <div i-carbon:information inline-block />
    </div>
    <div class="text-xl">
      Not found
    </div>
    <div>
      <button class="th-btn mt-8" @click="router.back()">
        Back
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
  const router = useRouter();
</script>
