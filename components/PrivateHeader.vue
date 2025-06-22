<template>
  <header class="grid grid-cols-2 p-4 border-b w-full">
    <div className="flex gap-2 items-center">
      
      <Button variant="ghost" class="border-0" size="icon" @click="toggleSidebar"> 
        <Transition name="icon-fade" mode="out-in">
          <PanelLeftClose v-if="state === 'expanded'" />
          <PanelLeftOpen v-else />
        </Transition>
      </Button>
      
      <Separator orientation="vertical" class="mr-2 h-full" />
      
      <!--TODO: Añadir un componente breadcrumb escalable para las rutas hijas y anidadas de la seccion privada-->
      <!-- <Breadcrumb>
        <BreadcrumbList>
        
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink>
              <NuxtLink to="/dashboard">
                Dashboard
              </NuxtLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
        
          <BreadcrumbSeparator class="hidden md:block" />
          
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        
        </BreadcrumbList>
      </Breadcrumb> -->
    </div>

    <div>
      <p>Terra App Dashboard</p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next'
import { useSidebar } from "@/components/ui/sidebar"
const { toggleSidebar, state } = useSidebar()
</script>

<style lang="css" scoped>
.icon-fade-enter-active, .icon-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.icon-fade-enter-from, .icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.icon-fade-enter-to, .icon-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>