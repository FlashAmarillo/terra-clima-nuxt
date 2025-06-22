
export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser()

  // cuando el usuario se ha autenticado
  if(user && (to.name === 'login' || to.name === 'signup' || to.name === 'index')) {
    return navigateTo('/dashboard')
  }

  if(!user && to.name !== 'login' && to.name !== 'signup' && to.name !== 'index') {
    return navigateTo('/login')
  }
}) 