<template>
  <div class="th-page h-screen w-screen">
    <div class="index-bg relative max-h-250px">
      <div class="left-md right-md absolute bottom-xs">
        <van-search
          v-model="keyword" placeholder="Search jobs, companies" shape="round" background="none"
          action-text="Cancel" @search="onSearch" @cancel="onCancel"
        />
      </div>
    </div>

    <div class="px-md mt-lg">
      <div>
        <div class="text-xxl text-center">
          Hot Jobs
        </div>
        <div class="flex flex-wrap cursor-pointer items-center justify-center py-lg text-center">
          <div v-for="(job, index) in hotJobs" :key="index" class="flex-1/2 p-xs md:flex-1/3" @click="handleHotJob(job)">
            <div class="th-card rounded p-xs shadow-md">
              {{ job }}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="text-xxl text-center">
          Featured Jobs
        </div>
        <div class="flex flex-wrap justify-center">
          <div v-for="(job, index) in featuredJobs" :key="index" class="flex-1 p-sm md:flex-1/2">
            <div class="th-card p-md rounded shadow-md">
              <div class="th-title flex items-center justify-between font-bold">
                <div>{{ job.jobName }}</div> <div class="text-red-400">
                  {{ job.salary }}
                </div>
              </div>
              <div class="th-tip py-xs">
                <div>  <div class="i-mdi:company wh-[20px] inline-block" />     {{ job.company }}</div>
                <div>
                  <div class="i-carbon:location wh-[20px] inline-block" />
                  {{ job.base }}
                </div>
              </div>
              <div v-if="job.tags && job.tags.length > 0" class="flex flex-wrap items-center justify-start gap-1">
                <div v-for="(tag, i) in job.tags" :key="i" class="">
                  <div class="rounded bg-gray-100 p-xs text-center text-xs">
                    {{ tag }}
                  </div>
                </div>
              </div>

              <div class="flex justify-between">
                <div class="th-secondary mt-sm text-sm">
                  {{ job.employer }}
                </div>
                <div>
                  <NuxtLink :to="`/jobs/${job.id}`">
                    <van-button round type="primary">
                      View Now
                    </van-button>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { showToast } from 'vant';

  const keyword = ref('');

  const hotJobs = ref<string[]>(['Sale', 'Java', 'PHP', 'Safety Engineer', 'Financial Analyst', 'Data Analyst']);

  const featuredJobs = ref<any>([]);

  async function findJobs() {
    const { data } = await $fetch('/api/jobs');
    featuredJobs.value = data;
  }
  const onSearch = (val: string) => showToast(val);
  function onCancel() {
    keyword.value = '';
  }
  function handleHotJob(job: string) {
    keyword.value = job;
    onSearch(job);
  }

  onMounted(() => {
    findJobs();
  });
</script>

<style scoped>
  .index-bg {
    width: 100%;

    /* 宽度100% */
    height: 100%;

    /* 高度100% */
    background-image: url('/assets/images/index_bg.jpg');
    background-repeat: no-repeat;

    /* 防止背景图片重复 */
    background-position: center;

    /* 背景图片居中 */
    background-size: cover;

    /* 背景图片铺满 */
  }
</style>
