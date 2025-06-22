
<template>
  <header class="top-0 z-40 w-full p-4 bg-black/5 backdrop-blur">
    <nav class="flex items-center max-w-7xl m-auto justify-between">
      <div class="flex space-x-4">
        <NuxtLink to="/">
          <h1 class="text-3xl font-bold">terraClima</h1>
        </NuxtLink>
        <NuxtLink to="/"/>
      </div>

      <div class="flex space-x-4">

        <DarkToggle />

        <NuxtLink to="/login">
          <Button variant="link">Login</Button>
        </NuxtLink>
        <NuxtLink to="/signup">
          <Button variant="link">Sign Up</Button>
        </NuxtLink>
      </div>

    </nav>
  </header>
</template>
