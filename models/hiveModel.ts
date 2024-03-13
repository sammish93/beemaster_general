import { HiveNote } from "./note"

export interface HiveModel {
    id: string
    name: string
    filters: string[],
    latLng: { lat: number, lng: number },
    weather?: string
    wind?: string
    temperature?: number
    weight?: number
    humidity?: number
    precipitation?: number
    currentTemp: number;
    notes: HiveNote[]
}