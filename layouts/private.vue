<template>
  <SidebarProvider>
    
    <AppSidebar />
    
    <main class="grid grid-rows-[auto_1fr_auto] min-h-screen bg-background text-foreground w-full">
      <PrivateHeader />
      
      <div>
        <slot />
      </div>
    </main>
    
  </SidebarProvider>
</template>

<script setup lang="ts">

</script>