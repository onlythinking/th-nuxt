<template>
  <div class="h-screen w-screen">
    <div class="index-bg max-h-250px text-white" :style="jobImg">
      <div class="h-250px flex items-end px-sm md:px-[100px]">
        <div class="flex-1 py-sm">
          <div>
            <div class="text-xl md:text-xxl">
              {{ job.jobName }}
            </div>
          </div>

          <div class="py-sm text-xs">
            <div>
              <div class="i-mdi:company inline-block wh-[20px] py-xs" /> {{ job.company }}
            </div>
            <div>
              <div class="i-carbon:location inline-block wh-[20px] py-xs" />
              {{ job.base }}
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <VanButton type="primary" @click="toVisit">
              Visit now
            </VanButton>
            <NuxtLink to="/">
              <van-button plain>
                Back
              </van-button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="px-sm md:px-[100px]">
      <div class="mt-sm rounded-md th-card p-sm">
        <div class="flex justify-between py-xs text-xl th-title">
          <div>Job Description</div>
          <div class="px-md text-center text-red">
            {{ job.salary }}
          </div>
        </div>
        <div v-if="job.tags && job.tags.length > 0" class="flex flex-wrap items-center justify-start gap-1 py-xs">
          <div v-for="(tag, i) in job.tags" :key="i" class="">
            <div class="rounded bg-gray-100 p-xs text-center text-xs">
              {{ tag }}
            </div>
          </div>
        </div>

        <div class="py-sm text-lg th-secondary">
          Job Responsibilities:
        </div>
        <div v-if="job.responsibilities">
          <div v-html="job.responsibilities" />
        </div>

        <div class="py-sm text-lg th-secondary">
          Job Requirements:
        </div>

        <div v-if="job.requirements">
          <div v-html="job.requirements" />
        </div>

        <div class="py-sm text-xl th-title">
          Job Benefits:
        </div>
        <div v-if="job.benefits">
          <div v-html="job.benefits" />
        </div>

        <div class="mx-auto w-full p-md md:w-[300px]">
          <VanButton type="primary" round block @click="toVisit">
            Visit now
          </VanButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();

  definePageMeta({
    validate: async (route) => {
      // Check if the id is made up of digits
      return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id);
    },
  });

  const job = ref<Record<string, any>>({ });

  async function findJobDetail() {
    const { data } = await $fetch(`/api/jobs/detail/${route.params.id}`);
    job.value = data as Record<string, any>;
  }

  const jobImg = computed(() => ({
    backgroundImage: job.value.img
      ? `url(${job.value.img.startsWith('http') ? job.value.img : new URL(job.value.img, location.origin).href})`
      : 'url(/assets/images/default_bg.jpg)',
  }));

  function toVisit() {
    if (job.value.url) {
      window.open(job.value.url, '_blank');
    }
    else {
      console.warn('No URL provided for this job.');
    }
  }
  onMounted(() => {
    findJobDetail();
  });
</script>

<style scoped>
  .index-bg {
    width: 100%;

    /* 宽度100% */
    height: 100%;

    /* 高度100% */
    background-repeat: no-repeat;

    /* 防止背景图片重复 */
    background-position: center;

    /* 背景图片居中 */
    background-size: cover;

    /* 背景图片铺满 */
  }
</style>
