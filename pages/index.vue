<template>
  <div class="h-screen w-screen">
    <div class="index-bg relative max-h-250px">
      <div class="absolute bottom-xs left-md right-md">
        <van-search
          v-model="keyword" placeholder="Search jobs, companies" shape="round" background="none"
          action-text="Cancel" @search="onSearch" @cancel="onCancel"
        />
      </div>
    </div>

    <div class="mt-lg px-md">
      <div>
        <div class="text-center text-xxl">
          Hot Jobs
        </div>
        <div class="flex flex-wrap cursor-pointer items-center justify-center py-lg text-center">
          <div
            v-for="(job, index) in hotJobs" :key="index" class="flex-1/2 p-xs md:flex-1/3"
            @click="handleHotJob(job)"
          >
            <div class="rounded th-card p-xs shadow-md">
              {{ job }}
            </div>
          </div>
        </div>
      </div>

      <div class="text-center text-xxl">
        Featured Jobs
      </div>
      <div class="flex flex-wrap justify-center">
        <div v-for="(job, index) in featuredJobs" :key="index" class="flex-1 p-sm md:flex-1/2">
          <div class="rounded th-card p-md shadow-md">
            <div class="flex items-center justify-between font-bold th-title">
              <div>{{ job.jobName }}</div>
              <div class="text-red-400">
                {{ job.salary }}
              </div>
            </div>
            <div class="py-xs th-tip">
              <div>
                <div class="i-mdi:company inline-block wh-[20px]" /> {{ job.company }}
              </div>
              <div>
                <div class="i-carbon:location inline-block wh-[20px]" />
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
              <div class="mt-sm text-sm th-secondary">
                {{ job.employer }}
              </div>
              <div class="text-center">
                <NuxtLink :to="`/jobs/${job.id}`">
                  <van-button round type="primary">
                    View now
                  </van-button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="featuredJobs.length !== total" class="p-md text-center th-tip">
      <button class="th-btn" @click="loadMore">
        load more
      </button>
    </div>
    <div v-else class="p-md text-center th-tip">
      No more
    </div>
  </div>
</template>

<script setup lang="ts">
  const keyword = ref('');

  const hotJobs = ref<string[]>(['Sale', 'Java', 'PHP', 'Safety Engineer', 'Financial Analyst', 'Data Analyst']);

  const featuredJobs = ref<any>([]);

  const page = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  function loadMore() {
    page.value++;
    findJobs(true);
  }

  async function findJobs(append: boolean) {
    const { data } = await $fetch('/api/jobs/list', {
      method: 'POST',
      body: { page: page.value, pageSize: pageSize.value, keyword: keyword.value },
    });
    if (append) {
      if (Array.isArray(featuredJobs.value) && Array.isArray(data.content)) {
        featuredJobs.value = [...featuredJobs.value, ...data.content];
      }
      else {
        console.error('Either featuredJobs or data.content is not an array.');
      }
    }
    else {
      // 如果不是追加模式，则直接覆盖
      featuredJobs.value = Array.isArray(data.content) ? data.content : [];
    }
    total.value = data.total;
  }

  function onSearch(val: string) {
    page.value = 1;
    keyword.value = val;
    findJobs(false);
  }
  function onCancel() {
    keyword.value = '';
  }
  function handleHotJob(job: string) {
    keyword.value = job;
    onSearch(job);
  }

  onMounted(() => {
    findJobs(false);
  });
</script>

<style scoped>
  .index-bg {
    width: 100%;

    /* 宽度100% */
    height: 100%;

    /* 高度100% */
    background-image: url('/assets/images/index_search_bg.jpg');
    background-repeat: no-repeat;

    /* 防止背景图片重复 */
    background-position: center;

    /* 背景图片居中 */
    background-size: cover;

    /* 背景图片铺满 */
  }
</style>
