import { jobs } from '../../service/jobs';

export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  const page = Number(requestBody.page) || 1;
  const pageSize = Number(requestBody.pageSize) || 10;
  const keyword = requestBody.keyword || '';

  let filteredJobs = jobs;
  if (keyword) {
     filteredJobs = jobs.filter((job) => {
      return job.jobName.toLowerCase().includes(keyword) || job.type.toLowerCase().includes(keyword);
    });
  }

  // 分页计算
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // 获取当前页数据
  const paginatedData = filteredJobs.slice(startIndex, endIndex);

  // 返回结果
  return {
    code: 0,
    message: 'ok',
    data: {
      total: filteredJobs.length, // 搜索结果的总记录数
      content: paginatedData, // 当前页的数据
    },
  };
});
