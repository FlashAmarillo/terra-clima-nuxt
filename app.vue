

<template>
  <Toaster />
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 requires this import

const user = useCurrentUser()
const router = useRouter()

// TODO: revisar si este codigo se cumple al hacer un log out y me redirige al login
onMounted(() => {
  watch(user, (currentUser, prevUser) => {
    if(prevUser && !currentUser) {
      return router.replace('/login')
    }
  })
})
</script>
