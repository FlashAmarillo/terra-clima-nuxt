
import {
  openWeatherProvider,
  weatherApiProvider 
} from '../index'
import type { WeatherProvider } from './types'

export function getWeatherProvider(name: string): WeatherProvider {
  switch (name) {
    case 'openweather':
      return openWeatherProvider
    case 'weatherapi': 
      return weatherApiProvider
    default:
      throw createError({
        statusCode: 400,
        message: `Proveedor climático no reconocido: ${name}`
      })
  }
}