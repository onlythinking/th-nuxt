<template>
  <div bg-black p-20>
    <canvas ref="canvas" width="1000" height="600" />
  </div>
</template>

<script>
  export default {
    name: 'ECG3LeadCanvas',
    data() {
      return {
        leadData: [[], [], []], // 三个导联的数据
        dataLength: 200, // 每导联显示的数据点数
        colors: ['#FF0000', '#00FF00', '#0000FF'], // 导联颜色
        ctx: null, // canvas 上下文
        height: 150, // 每个导联的高度
        interval: null, // 定时器
        frequency: 1, // 心率频率，单位为Hz
        leads: ['I', 'II', 'III'], // 导联名称
      };
    },
    mounted() {
      this.ctx = this.$refs.canvas.getContext('2d');
      this.startDataGeneration(); // 启动数据生成
    },
    beforeUnmount() {
      clearInterval(this.interval); // 清理定时器
    },
    methods: {
      startDataGeneration() {
        let packetIndex = 0; // 模拟数据包的索引
        // 调整速度，通过减慢数据更新间隔降低心电图的绘制速度
        this.interval = setInterval(() => {
          this.updateChart(packetIndex);
          packetIndex++;
        }, 200); // 调整到每秒100数据包（更慢）
      },
      updateChart(packetIndex) {
        // 生成新数据点
        this.leadData.forEach((data, idx) => {
          const newDataPoint = this.generateECGWave(packetIndex + idx);
          data.push(newDataPoint); // 添加新数据点
          if (data.length > this.dataLength) {
            data.shift(); // 移除旧数据点，保持数据窗口长度不变
          }
        });
        this.drawChart(); // 绘制图表
      },
      generateECGWave(packetIndex) {
        const samplingRate = 100; // 采样率降低到100，以控制速度
        const heartRate = this.frequency; // 心率，单位为Hz
        const time = (packetIndex % samplingRate) / samplingRate; // 正常化时间

        // 模拟更加真实的ECG波形，组合P波、QRS复合波和T波
        const pWave = Math.sin(2 * Math.PI * heartRate * time) * 0.1; // P波
        const qrsComplex = (time < 0.1 ? Math.sin(2 * Math.PI * heartRate * time) : 0) * 0.6; // QRS复合波，幅值更大
        const tWave = (time > 0.2 && time < 0.3) ? Math.sin(2 * Math.PI * heartRate * (time - 0.2)) * 0.2 : 0; // T波

        // 加入噪声，模拟生理波动
        const noise = (Math.random() - 0.5) * 0.03;

        return pWave + qrsComplex + tWave + noise; // 组合波形
      },
      drawChart() {
        // 清除画布
        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

        // 绘制每个导联
        this.leadData.forEach((data, idx) => {
          this.drawLead(data, idx);
        });
      },
      drawLead(data, idx) {
        const width = this.$refs.canvas.width;
        const leadHeight = this.height; // 每个导联的高度
        const offsetY = idx * leadHeight + leadHeight / 2; // 导联的垂直偏移（添加基准线）

        // 绘制基准线
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#fff'; // 基准线颜色为黑色
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(0, offsetY);
        this.ctx.lineTo(width, offsetY);
        this.ctx.stroke();
        this.ctx.closePath();

        // 绘制导联名称
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = '#fff'; // 导联名称颜色为黑色
        this.ctx.fillText(this.leads[idx], 10, offsetY - 10); // 标注导联名称

        // 绘制波形
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.colors[idx]; // 设置颜色
        this.ctx.lineWidth = 2;

        // 绘制线条
        data.forEach((point, i) => {
          const x = (i / this.dataLength) * width; // x坐标
          const y = offsetY + (1 - point) * (leadHeight / 2); // y坐标（相对于基准线上下波动）
          if (i === 0) {
            this.ctx.moveTo(x, y); // 移动到起点
          }
          else {
            this.ctx.lineTo(x, y); // 连接线条
          }
        });

        this.ctx.stroke(); // 绘制线条
        this.ctx.closePath();
      },
    },
  };
</script>

<style scoped>
  /* 自定义样式 */
</style>
