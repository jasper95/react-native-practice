export interface ItemResponse {
  dt_txt: 'string'
  dt: number
  main: {
    humidity: number
    pressure: number
    temp: number
  }
  weather: {
    description: string
    main: string
  }[]
}
export interface WeatherResponse {
  list: ItemResponse[]
}