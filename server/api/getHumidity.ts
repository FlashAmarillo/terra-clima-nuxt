
import { getQuery } from 'h3'
import { getWeatherProvider } from '../services/weatherProviders'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { lat, lon, date, provider } = query

  if (!lat || !lon || !date || !provider) {
    throw createError({ statusCode: 400, message: 'Faltan parámetros en la consulta' })
  }

  const weather = getWeatherProvider(provider as string)
  return await weather.getHumidityReport(Number(lat), Number(lon), String(date))
})