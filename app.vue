<template>
  <div>
    <!-- <NuxtLoadingIndicator /> -->
    <div h-full w-full of-hidden font-sans transition duration-0>
      <div of-x-hidden of-y-auto>
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
  import '@unocss/reset/tailwind.css';

  useHead({
    htmlAttrs: {
      lang: 'zh-CN',
    },
    charset: 'utf-8',
    title: 'Hello Nuxt',
    titleTemplate: title => (title !== 'Hello Nuxt' ? `${title} · Hello Nuxt` : title),
    meta: [
      {
        name: 'description',
        content: 'Nuxt3 学习例子✨',
      },
    ],
  });
</script>

<style>
</style>
