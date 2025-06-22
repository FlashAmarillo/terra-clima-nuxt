<template>
  <Button variant="ghost" class="p-2 rounded border hover:bg-muted transition" @click="toggleDark()">
    <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  </Button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const mode = useColorMode()
//const isDark = () => mode.value === 'dark'
const toggleDark = () => {
  mode.preference = mode.preference === 'dark' ? 'light' : 'dark'
}
</script>
