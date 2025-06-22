<template>
  <div class="container m-auto flex h-full flex-col items-center justify-center py-12">
    <div class="absolute inset-0 bg-[url('https://images.pexels.com/photos/6160232/pexels-photo-6160232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-5"/>
    
    <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] z-10">
      <div class="card p-6">
        
        <div class="mb-8 text-center">
          <h2 class="text-2xl font-mono">ENGINEER REGISTRATION</h2>
          <p class="text-sm text-muted-foreground font-mono">Join the resistance to rebuild Earth</p>
        </div>

        <form class="space-y-6" @submit="onSubmit">
          
          <!-- <FormField v-slot="{ componentField }" name="username" class="space-y-2">
            <FormItem>
              <FormLabel class="text-sm font-medium leading-none font-mono">CREATE YOUR USERNAME</FormLabel>
              <div class="relative">
                <UserIcon class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Choose username"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 font-mono"
                  v-bind="componentField"
                  />
              </div>
              <FormMessage />
            </FormItem>
          </FormField> -->

          <FormField name="email" class="space-y-2">
            <FormItem>
              <FormLabel class="text-sm font-medium leading-none font-mono">EMAIL</FormLabel>
              <div class="relative">
                <MailIcon class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="Enter email"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 font-mono"
                  v-bind="emailAttrs"
                >
              </div>
              <FormMessage />
              <FormDescription class="text-xs text-muted-foreground font-mono">Used for encrypted communication</FormDescription>
            </FormItem>
          </FormField>

          <FormField name="password" class="space-y-2">
            <FormItem>
              <FormLabel class="text-sm font-medium leading-none font-mono">PASSWORD</FormLabel>
              <div class="relative">
                <LockIcon class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  v-model="password"
                  type="password"
                  placeholder="Create password"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 font-mono"
                  v-bind="passwordAttrs"
                >
              </div>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="confirmPassword" class="space-y-2">
            <FormItem>
              <FormLabel class="text-sm font-medium leading-none font-mono">CONFIRM PASSWORD</FormLabel>
              <div class="relative">
                <LockIcon class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 font-mono"
                  v-bind="confirmPasswordAttrs"
                >
              </div>
              <FormMessage />
            </FormItem>
          </FormField>
          
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full font-mono"
            :disabled="isLoading"
          >
            <Loader2Icon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{ isLoading ? 'PROCESSING' : 'REGISTER' }}
          </button>

          <div class="mt-4 text-center text-sm">
            <span class="text-muted-foreground font-mono">Already have access?</span>
            <NuxtLink to="/login" class="text-primary hover:underline font-mono ml-1">
              Login here
            </NuxtLink>
          </div>
          
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MailIcon,
  LockIcon,
  Loader2Icon,
} from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

definePageMeta({
  layout: 'public'
})

const formSchema = toTypedSchema(z.object({
  //username: z.string().min(5, 'Username must be at least 5 characters').max(50),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters').max(50),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters').max(50)
}).refine((data) => (data.password === data.confirmPassword), {
  message: "Both passwords must be the same",
  path: ["confirmPassword"]
}))

const { handleSubmit, defineField } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
    confirmPassword: ''
  }
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const isLoading = ref(false)

const router = useRouter()
const auth = getAuth()

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  
  // TODO: revisar esta creacion, funciona, pero automaticamente crea sesion activa

  if(auth) {
    
    await createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(() => {
      
        toast('Congrats! you have successfully registered', {
          description: 'You can now login to your account',
          class: 'bg-green-500 text-white',
          //type: "success",
          duration: 4000
        })
  
        router.push('/login')
        setTimeout(() => {
        }, 4000)
      })
      .catch((error) => {
        console.error('Se ha presentado el siguiente error: ', error.message)
        toast(error.message, {
          description: 'An error has occurred',
          class: 'bg-red-500 text-white',
          //type: 'error'
        })
      })

  }

  isLoading.value = false

})

</script> 