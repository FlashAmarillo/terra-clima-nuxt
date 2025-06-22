
<template>
  <div class="grid grid-rows-[auto_1fr_auto] min-h-screen bg-background text-foreground m-auto">
    <AppHeader />
    
    <main>
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>
