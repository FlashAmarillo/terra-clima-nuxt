import { interpretHumidity } from './humidityHelper'
import type { WeatherProvider } from './weatherProviders/types'
const apiKey = useRuntimeConfig().freeWeatherApiKey

export const weatherApiProvider: WeatherProvider = {
  async getHumidityReport(lat, lon, date) {
    // NOTA: Date on or after 1st Jan, 2010 in yyyy-MM-dd format 
    const url = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${lat},${lon},${lon}&dt=${date}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Error fetching Weather api data')
    const data = await res.json()
    const humidity = data.forecast.forecastday[0].day.avghumidity
    return interpretHumidity(humidity, date)
  }
}
