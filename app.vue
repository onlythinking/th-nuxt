<template>
  <div>
    <div class="h-screen w-screen of-hidden th-page font-sans transition duration-0">
      <div of-x-hidden of-y-auto>
        <NuxtLoadingIndicator />
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<script setup>
  import '@unocss/reset/tailwind.css';

  useHead({
    htmlAttrs: {
      lang: 'en',
    },
    charset: 'utf-8',
    title: 'Recruitment',
    titleTemplate: title => (title !== 'Recruitment Website✨' ? `${title} · Recruitment Website✨` : title),
    meta: [
      {
        name: 'description',
        content: 'Recruitment Website✨',
      },
    ],
  });
</script>

<style>
</style>
