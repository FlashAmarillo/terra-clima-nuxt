
// server/actions/getHumidity.ts
// import { getWeatherProvider } from '../services/weatherProviders'

// export default defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const lat = Number(query.lat)
//   const lon = Number(query.lon)

//   if (isNaN(lat) || isNaN(lon)) {
//     throw createError({ statusCode: 400, message: 'Lat/lon inválidos' })
//   }

//   const providerName = getRouterParam(event, 'provider') || 'openweather'
//   const provider = getWeatherProvider(providerName as any)

//   try {
//     const humidity = await provider?.getHumidityReport(lat, lon, date)
//     return { humidity }
//   } catch (err) {
//     console.error(err)
//     throw createError({ statusCode: 500, message: 'No se pudo obtener la humedad' })
//   }
// })