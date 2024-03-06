export interface HiveModel {
    id: string
    name: string
    filters: string[],
    latLng: {lat: number, lng: number},
    weather?: string
    wind?: string 
    temprature?: number
    weight?: number
    humidity?: number
    precipitation?: number 
}