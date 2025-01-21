<template>
  <div>
    <NuxtLoadingIndicator />
    <div h-full w-full of-hidden font-sans transition duration-0>
      <div of-x-hidden of-y-auto>
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
