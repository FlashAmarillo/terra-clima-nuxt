// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'



export default defineNuxtConfig({
  imports: {
    autoImport: true
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-vuefire'
  ],
  runtimeConfig: {
    // WEATHER API KEYS
    openWeatherApiKey: process.env.NUXT_OPEN_WEATHER_API_KEY,
    freeWeatherApiKey: process.env.NUXT_WEATHER_API_KEY,
    
    public: {
    }
  },
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: false
    },
    config: {
      //...firebaseConfig
        apiKey: process.env.NUXT_FIREBASE_API_KEY ?? '',
        authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN ?? '',
        projectId: process.env.NUXT_FIREBASE_PROJECT_ID ?? '',
        storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET ?? '',
        messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID ?? '',
        appId: process.env.NUXT_FIREBASE_APP_ID ?? '',
        measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID ?? ''
    }
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),      
    ],
    build: {
      sourcemap: false
    }
  },
  shadcn: {
    prefix: '',
     /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
     componentDir: './components/ui'
  },
  ssr: false,
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  }

})