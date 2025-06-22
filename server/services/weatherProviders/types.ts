
export interface HumidityReport {
  date: string
  humidity: string
  message: string
}

export interface WeatherProvider {
  getHumidityReport: (lat: number, lon: number, date: string) => Promise<HumidityReport>
}
