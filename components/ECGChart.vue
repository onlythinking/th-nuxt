<template>
  <div ref="chart" style="width: 100%; height: 600px;" />
</template>

<script>
  import * as echarts from 'echarts';

  export default {
    name: 'ECG3LeadChart',
    data() {
      return {
        leadData: [[], [], []], // 三个导联的数据
        chartInstance: null,
        dataLength: 200, // 每导联显示的数据点数
        leads: ['I', 'II', 'III'], // 导联名称
        colors: ['#FF0000', '#00FF00', '#0000FF'], // 导联颜色
      };
    },
    mounted() {
      this.initChart();
      this.startDataGeneration(); // 启动数据生成
    },
    methods: {
      initChart() {
        this.chartInstance = echarts.init(this.$refs.chart);

        const option = {
          title: { text: '3-Lead ECG Waveform' },
          grid: [
            { left: '5%', right: '5%', top: '5%', height: '20%' }, // I
            { left: '5%', right: '5%', top: '30%', height: '20%' }, // II
            { left: '5%', right: '5%', top: '55%', height: '20%' }, // III
          ],
          xAxis: this.leads.map(() => ({
            type: 'category',
            boundaryGap: false,
            show: false, // 隐藏X轴
          })),
          yAxis: this.leads.map((lead, _) => ({
            type: 'value',
            min: -1,
            max: 1,
            position: 'left',
            name: lead,
            splitLine: { show: false },
          })),
          series: this.leads.map((lead, idx) => ({
            name: lead,
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: this.leadData[idx], // 每导联的数据
            xAxisIndex: idx,
            yAxisIndex: idx,
            lineStyle: {
              width: 2,
              color: this.colors[idx], // 不同颜色
            },
          })),
        };

        this.chartInstance.setOption(option);
      },
      startDataGeneration() {
        let packetIndex = 0; // 模拟数据包的索引
        setInterval(() => {
          this.updateChart(packetIndex);
          packetIndex++;
        }, 1000); // 每秒200数据包
      },
      updateChart(packetIndex) {
        this.leadData.forEach((data, idx) => {
          // 模拟新ECG数据
          const newDataPoint = Math.sin((2 * Math.PI * (packetIndex + idx)) / 200) + (Math.random() - 0.5) * 0.1;

          data.push(newDataPoint); // 添加新数据点
          if (data.length > this.dataLength) {
            data.shift(); // 移除旧数据点，保持数据窗口长度不变
          }

          // 更新该导联的图表数据
          this.chartInstance.setOption({
            series: [{
              data,
            }],
          }, false); // 使用false避免重绘整个图表
        });
      },
    },
  };
</script>

<style scoped>
  /* 自定义样式 */
</style>
