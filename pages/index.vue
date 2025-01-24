<template>
  <div class="index-container">
    <NuxtParticles
      id="tsparticles"
      :options="options"
      @load="onLoad"
    />
    <div class="absolute inset-0 z-10">
      <div class="absolute relative left-0 right-0 top-[80px] max-h-250px">
        <div class="absolute bottom-xs left-md right-md">
          <van-search
            v-model="keyword" placeholder="Search jobs, companies" shape="round" background="none"
            action-text="Cancel" @search="onSearch" @cancel="onCancel"
          />
        </div>
      </div>

      <div class="mt-[80px] px-md">
        <div>
          <div class="py-md text-center text-xxl text-white">
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

        <div class="py-md text-center text-xxl text-white">
          Featured Jobs
        </div>
        <div class="flex flex-wrap justify-center">
          <div v-for="(job, index) in featuredJobs" :key="index" class="flex-1 p-sm md:flex-1/2">
            <div class="rounded th-card p-md shadow-md">
              <div class="flex items-center justify-between th-title font-bold">
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
  </div>
</template>

<script setup lang="ts">
  import type { Container } from 'tsparticles-engine';

  const keyword = ref('');

  const hotJobs = ref<string[]>(['Marketing', 'Sale', 'Safety Engineer', 'Financial Analyst', 'Data Analyst', 'Design']);

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

  // 科技感的粒子背景配置
  const options = {
    fullScreen: {
      enable: true,
      zIndex: -1, // 使背景处于最底层
    },
    background: {
      color: {
        value: '#0e0b16', // 深色背景
      },
      image: 'url(/assets/images/yz_bg.jpg)', // 可根据需要设置背景图片
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
    },
    particles: {
      color: {
        value: '#00b5e2', // 粒子颜色
      },
      links: {
        color: '#00b5e2',
        distance: 150, // 粒子链接的距离
        enable: true, // 启用粒子之间的连接线
        opacity: 0.5, // 链接线的透明度
        width: 1, // 链接线的宽度
      },
      move: {
        enable: true,
        speed: 1, // 粒子移动的速度
        direction: 'none',
        random: true, // 粒子移动随机化
        straight: false,
        outModes: {
          default: 'out', // 粒子移动到屏幕外时的行为
          top: 'out',
        },
      },
      number: {
        value: 100, // 粒子数量
        density: {
          enable: true, // 启用密度模式
          area: 800, // 影响范围
        },
      },
      opacity: {
        value: 0.6, // 粒子的透明度
        random: true, // 随机透明度
        animation: {
          enable: true,
          speed: 1, // 透明度动画的速度
          minimumValue: 0.3, // 透明度动画的最小值
        },
      },
      shape: {
        type: 'circle', // 粒子形状为圆形
      },
      size: {
        value: 3, // 粒子大小
        random: true, // 粒子大小随机化
        animation: {
          enable: true,
          speed: 4, // 粒子大小变化的速度
          minimumValue: 1, // 最小粒子大小
        },
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true, // 点击时粒子产生反应
          mode: 'push',
        },
      },
      modes: {
        push: {
          particles_nb: 4, // 点击时增加粒子数量
        },
      },
    },
  };

  function onLoad(container: Container) {
    container.pause(); // 初始化时暂停动画
    setTimeout(() => container.play(), 2000); // 延迟2秒后播放动画
  }
</script>

<style scoped>
  /* 使页面内容居中显示 */
  .index-container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh; /* 视口高度 */
  }

  #tsparticles {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100vh;
  }
</style>
