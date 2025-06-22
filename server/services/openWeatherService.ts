import { interpretHumidity } from './humidityHelper'
import type { WeatherProvider } from './weatherProviders/types'
const apiKey = useRuntimeConfig().openWeatherApiKey

export const openWeatherProvider: WeatherProvider = {
  async getHumidityReport(lat, lon, date) {
    const url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${date}&appid=${apiKey}&units=metric`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Error fetching OpenWeather data')
    const data = await res.json()
    const humidity =  data.main.humidity
    return interpretHumidity(humidity, date)
  }
}
