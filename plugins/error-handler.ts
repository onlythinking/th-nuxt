export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, _, info) => {
    // handle error, e.g. report to a service
    console.error(error, info);
  };

  // Also possible
  nuxtApp.hook('vue:error', (error, _, info) => {
    // handle error, e.g. report to a service
    console.error(error, info);
  });
});
