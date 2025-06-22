<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          Dashboard del Clima
        </h1>
        <p class="text-gray-600">
          Consulta información meteorológica utilizando OpenWeather API
        </p>
      </div>

      <Card class="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader class="pb-6">
          <CardTitle class="text-2xl text-center text-gray-800">
            Consulta del Clima
          </CardTitle>
          <CardDescription class="text-center text-gray-600">
            Ingresa las coordenadas y fecha para obtener datos meteorológicos
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form class="space-y-6" @submit="onSubmit">
            
            <!-- Latitud -->
            <FormField name="latitude" class="space-y-2">
              <FormItem>
                <FormLabel for="latitude" class="text-sm font-medium text-gray-700">
                  Latitud
                </FormLabel>
                <div class="relative">
                  <MapPin class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="latitude"
                    v-bind="latitudeAttrs"
                    v-model="latitude"
                    type="number"
                    step="0.0001"
                    min="-90"
                    max="90"
                    placeholder="Ej: 19.4326"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 ring-offset-background file:border-0"
                  />
                </div>
                <p v-if="errors.latitude" class="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle class="h-3 w-3" />
                  <FormMessage />
                </p>
              </FormItem>
            </FormField>

            <!-- Longitud -->
            <FormField name="longitude" class="space-y-2">
              <FormItem>
                <FormLabel for="longitude" class="text-sm font-medium text-gray-700">
                  Longitud
                </FormLabel>
                <div class="relative">
                  <MapPin class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="longitude"
                    v-bind="longitudeAttrs"
                    v-model="longitude"
                    type="number"
                    step="0.0001"
                    min="-180"
                    max="180"
                    placeholder="Ej: -99.1332"
                    class="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm pl-10"
                  />
                </div>
                <p v-if="errors.longitude" class="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle class="h-3 w-3" />
                  <FormMessage />
                </p>
              </FormItem>
            </FormField>

            <!-- Fecha -->
            <FormField name="selectedDate" class="space-y-2">
              <FormItem>
                <FormLabel class="text-sm font-medium text-gray-700">
                  Fecha de consulta
                </FormLabel>
                
                <Popover>
                  <PopoverTrigger as-child>
                    <FormControl>
                      <Button
                        variant="secondary"
                        :class="[
                          'w-full ps-3 text-start font-normal transition-all duration-200',
                          !selectedDate && 'text-muted-foreground',
                          errors.date && 'border-red-500 focus:ring-red-500'
                        ]"
                      >
                         <span>{{ selectedDate ? df.format(toDate(selectedDate)) : "Pick a date" }}</span>
                        <CalendarIcon class="mr-2 h-4 w-4" />
                        <!-- {{ selectedDate ? format(selectedDate, 'PPP', { locale: es }) : 'Selecciona una fecha' }} -->
                      </Button>
                      <input hidden>
                    </FormControl>
                  </PopoverTrigger>
                  
                  <PopoverContent class="w-auto p-0" align="start">
                    <Calendar
                      v-model:placeholder="placeholder"
                      :model-value="selectedDate"
                      calendar-label="Date of selection"
                      initial-focus
                      @update:model-value="(v) => {
                        if (v) {
                          setFieldValue('date', v.toString())
                        }
                        else {
                          setFieldValue('date', undefined)
                        }

                      }"
                    />
                  </PopoverContent>
                </Popover>
                <p v-if="errors.longitude" class="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle class="h-3 w-3" />
                  <FormMessage />
                </p>
              </FormItem>
            </FormField>

            <!-- Botón de envío -->
            <Button 
              type="submit" 
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :disabled="isLoading"
            >
              <div v-if="isLoading" class="flex items-center gap-2">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Consultando...
              </div>
              <div v-else class="flex items-center gap-2">
                <Search class="h-4 w-4" />
                Consultar Clima
              </div>
            </Button>
          

            <!-- Resultado -->
            <!-- <div v-if="weatherData" class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CloudSun class="h-5 w-5 text-blue-600" />
                Datos Meteorológicos
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div class="space-y-2">
                  <p><span class="font-medium">Ubicación:</span> {{ weatherData.name }}</p>
                  <p><span class="font-medium">Temperatura:</span> {{ weatherData.main.temp }}°C</p>
                  <p><span class="font-medium">Sensación térmica:</span> {{ weatherData.main.feels_like }}°C</p>
                  <p><span class="font-medium">Humedad:</span> {{ weatherData.main.humidity }}%</p>
                </div>
                <div class="space-y-2">
                  <p><span class="font-medium">Descripción:</span> {{ weatherData.weather[0].description }}</p>
                  <p><span class="font-medium">Presión:</span> {{ weatherData.main.pressure }} hPa</p>
                  <p><span class="font-medium">Viento:</span> {{ weatherData.wind.speed }} m/s</p>
                  <p><span class="font-medium">Visibilidad:</span> {{ weatherData.visibility / 1000 }} km</p>
                </div>
              </div>
            </div> -->

            <!-- Error -->
            <div v-if="apiError" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-red-700 flex items-center gap-2">
                <AlertCircle class="h-4 w-4" />
                {{ apiError }}
              </p>
            </div>

          </form>

        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateFormatter, parseDate } from '@internationalized/date'
import { toDate } from 'reka-ui/date'
import { ref, computed } from 'vue'
import { 
  MapPin, 
  CalendarIcon, 
  Search, 
  AlertCircle, 
  CloudSun,
  Loader2
} from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

definePageMeta({
  layout: 'private',
  //middleware: ['auth'] // Asumiendo que implementarás un middleware de autenticación
})

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const formSchema = toTypedSchema(z.object({
  latitude: z
    .number()
    .min(-90, 'La latitud debe estar entre -90 y 90')
    .max(90, 'La latitud debe estar entre -90 y 90')
    .refine(val => Number.isFinite(val) && Number(val.toFixed(4)) === val, {
      message: 'La latitud debe tener como máximo 4 decimales',
    }),
  longitude: z
    .number()
    .min(-180, 'La longitud debe estar entre -180 y 180')
    .max(180, 'La longitud debe estar entre -180 y 180')
    .refine(val => Number.isFinite(val) && Number(val.toFixed(4)) === val, {
      message: 'La longitud debe tener como máximo 4 decimales',
    }),
  date: z
    .string()
    .refine(v => v, { message: 'A date of birth is required.' }),
}))

const { handleSubmit, defineField, errors, values, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    latitude: undefined,
    longitude: undefined,
    date: undefined
  }
})

const [latitude, latitudeAttrs] = defineField('latitude')
const [longitude, longitudeAttrs] = defineField('longitude')
//const [selectedDate, dateAttrs] = defineField('date')

const selectedDate = computed({
  get: () => values.date ? parseDate(values.date) : undefined,
  set: val => val,
})

// estados reactivos
const isLoading = ref(false)
const weatherData = ref(null)
const apiError = ref('')
const placeholder = ref()

// funcion para manejar el envio del formulario
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  
  setTimeout(() => {
    toast.success('Consultando datos meteorológicos...',{
      description: JSON.stringify({
        latitude: values.latitude,
        longitude: values.longitude,
        date: values.date
      })
    }) 
    
    isLoading.value = false
  }, 3000)

  //console.log('Valores del formulario:', values)


})

</script> 