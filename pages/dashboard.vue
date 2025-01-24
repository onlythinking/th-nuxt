<template>
  <NuxtParticles
    id="tsparticles"
    :options="options"
    @load="onLoad"
  />
</template>

<script setup lang="ts">
  import type { Container } from 'tsparticles-engine';

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
  #tsparticles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
</style>
