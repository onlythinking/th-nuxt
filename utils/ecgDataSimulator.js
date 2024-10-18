// src/utils/ecgDataSimulator.js
export function generateECGData() {
  // 模拟ECG数据
  const data = [];
  const amplitude = 1.2; // 振幅
  const frequency = 60; // 心率
  for (let i = 0; i < 500; i++) {
    const t = i / 100;
    data.push(amplitude * Math.sin(2 * Math.PI * frequency * t));
  }
  return data;
}
