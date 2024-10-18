<template>
  <div
    :class="{
      dark: theme.dark,
      compact: theme.compact,
    }" class="h-screen w-screen flex flex-col items-center bg-container px-2 font-sans"
  >
    <div class="mt-40 w-full flex flex-col border-2 border-color-border rounded-md px-xl py-lg sm:w-md">
      <div class="flex gap-x-4">
        <button
          class="border-1 border-color-border rounded-md px-base py-xs text-base text-text hover:border-primary-border hover:text-primary"
          @click="onTheme"
        >
          {{ theme.dark ? 'light' : 'dark' }}
        </button>
        <button
          class="border-1 border-color-border rounded-md px-base py-xs text-base text-text hover:border-primary-border hover:text-primary"
          @click="onCompact"
        >
          {{ theme.compact ? 'loose' : 'compact' }}
        </button>
      </div>

      <div class="mt-10 flex flex-col">
        <h1 class="mb-sm text-xl text-text font-bold">
          Preview
        </h1>
        <p class="text-base text-text">
          This is a long text
        </p>
        <p class="bg-container/20 text-base text-primary/50">
          The color opacity is 0.5
        </p>
      </div>
      <p class="text-text">
        You can see all the css in <span class="font-bold">Devtools</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const theme = reactive({
    dark: false,
    compact: false,
  });

  const onTheme: any = () => {
    theme.dark = !theme.dark;
  };
  const onCompact: any = () => {
    theme.compact = !theme.compact;
  };
</script>

<style scoped></style>
