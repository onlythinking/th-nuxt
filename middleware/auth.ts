function isAuthenticated(): boolean {
  return false;
}
// ---cut---
export default defineNuxtRouteMiddleware((_, __) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isAuthenticated() === false) {
    return navigateTo('/login');
  }
});
