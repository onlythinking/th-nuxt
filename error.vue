<template>
  <NuxtLayout>
    <div flex="~ col" h-screen items-center justify-center gap4 text-center>
      <div text-3xl>
        {{ is404 ? 'This page could not be found' : 'An error occurred' }}
      </div>
      <div text-xl op50>
        Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
      </div>
      <pre v-if="isDev">{{ error }}</pre>
      <button n-link border rounded px4 py1 @click="handleError">
        Go Back
      </button>
    </div>
  </NuxtLayout>
</template>

<script setup>
  const props = defineProps({
    error: Object,
  });

  const message = computed(() => String(props.error?.message || ''));
  const is404 = computed(() => props.error?.statusCode === 404 || message.value?.includes('404'));
  const isDev = import.meta.dev;

  function handleError() {
    return clearError({ redirect: '/' });
  }
</script>
