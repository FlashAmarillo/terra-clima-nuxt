// server/services/weatherProviders/index.ts
import {
  openWeatherProvider,
  weatherApiProvider 
} from '../index'
import type { WeatherProvider } from './types'

export function getWeatherProvider(name: 'openweather' | 'weatherapi'): WeatherProvider {
  switch (name) {
    case 'openweather':
      return openWeatherProvider
    case 'weatherapi': 
      return weatherApiProvider
    default:
      throw new Error(`Unknown provider: ${name}`)
  }
}