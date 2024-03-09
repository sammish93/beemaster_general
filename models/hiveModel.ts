export interface HiveModel {
    id: string
    name: string
    filters: string[],
    weather?: string
    wind?: string
    temperature?: number
    weight?: number
    humidity?: number
    precipitation?: number
    currentTemp: number;
}