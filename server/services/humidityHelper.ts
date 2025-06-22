// server/services/humidityHelper.ts
export function interpretHumidity(humidity: number, date: string): { humidity: string; message: string; date: string } {
  let message = 'Niveles adecuados de humedad para el cultivo'
  if (humidity < 30) {
    message = 'Peligro, la humedad es demasiado baja para el cultivo'
  } else if (humidity > 80) {
    message = 'Cuidado, exceso de humedad puede dañar algunas cosechas'
  }

  return {
    humidity: `${humidity}%`,
    message,
    date,
  }
}