import { jobs } from '../../../service/jobs';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id')) || 1;

  const jobDetail = jobs.find(job => job.id === id);

  // 判断是否找到数据
  if (!jobDetail) {
    return {
      code: 404,
      message: `Job with ID ${id} not found.`,
      data: null,
    };
  }

  // 返回找到的详情
  return {
    code: 0,
    message: 'ok',
    data: jobDetail,
  };
});
