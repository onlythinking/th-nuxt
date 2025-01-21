export default defineEventHandler(async (_) => {
  return {
    code: 0,
    message: 'ok',
    data: 'Server is live.',
  };
});
