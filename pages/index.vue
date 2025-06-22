<template>
  <div class="flex flex-col items-center container max-w-7xl m-auto">
    <!-- Hero Section -->
    <section class="w-full py-12 md:py-24 lg:py-32 relative">
      <div class="container px-4 md:px-6 relative z-10">
        <div class="flex flex-col items-center space-y-4 text-center">
          <div class="flex items-center justify-center h-20 w-20 rounded-full border-2 border-primary bg-background/30 backdrop-blur-sm mb-4">
            <DropletIcon class="h-10 w-10 text-primary" />
          </div>
          <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl font-mono">
            Terra<span class="text-primary">Clima</span>
          </h1>
          <p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Finding moisture in a dying world. Our last hope for survival.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mt-8">
            <NuxtLink to="/signup" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 font-mono">
              Join the Resistance
            </NuxtLink>
            <NuxtLink to="/login" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 font-mono">
              Access System
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="absolute inset-0 bg-[url('https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10 dark:opacity-5"/>
    </section>

    <!-- Info Section -->
    <section class="w-full py-12 md:py-24 bg-muted/40">
      <div class="px-4 md:px-6">
        <div class="flex flex-row flex-wrap justify-center gap-6">
          
          <div class="flex flex-col items-center p-6 flex-grow basis-48">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary/20 mb-4">
              <SatelliteIcon class="h-6 w-6 text-primary" />
            </div>
            <h3 class="font-mono text-lg font-semibold mb-2 text-balance">Satellite Connectivity</h3>
            <p class="text-sm text-muted-foreground text-balance">
              Advanced algorithms to intercept legacy satellite data
            </p>
          </div>
          
          <div class="flex flex-col items-center p-6 flex-grow basis-48">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary/20 mb-4">
              <CloudRainIcon class="h-6 w-6 text-primary" />
            </div>
            <h3 class="font-mono text-lg font-semibold mb-2 text-balance">Moisture Prediction</h3>
            <p class="text-sm text-muted-foreground text-balance">
              Calculate the probability of water presence
            </p>
          </div>
          
          <div class="flex flex-col items-center p-6 flex-grow basis-48">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary/20 mb-4">
              <MapIcon class="h-6 w-6 text-primary" />
            </div>
            <h3 class="font-mono text-lg font-semibold mb-2 text-balance">Global Coverage</h3>
            <p class="text-sm text-muted-foreground text-balance">
              Worldwide data for the remaining habitable regions
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="w-full py-12 md:py-24">
      <div class="container px-4 md:px-6">
        <div class="flex flex-col items-center justify-center space-y-4 text-center">
          <div class="flex items-center space-x-2">
            <div class="h-px w-8 bg-primary"/>
            <div class="font-mono uppercase text-primary text-sm tracking-wider">Join us</div>
            <div class="h-px w-8 bg-primary"/>
          </div>
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-mono">Rebuild Civilization Together</h2>
          <p class="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Every drop of water counts. Every prediction saves lives.
          </p>
          <NuxtLink to="/signup" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 mt-8 font-mono">
            Create Engineer Account
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { DropletIcon, SatelliteIcon, CloudRainIcon, MapIcon } from 'lucide-vue-next'
definePageMeta({
  layout: 'public'
})
</script> 