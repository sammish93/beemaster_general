import { BeeCountMeasurement, HumidityMeasurement, PrecipitationMeasurement, TemperatureMeasurement, WeightMeasurement, WindSpeedMeasurement } from "@/constants/Measurements";

export interface SensorDataList {
    sensorData: SensorInterval[]
    measurement: WeightMeasurement | TemperatureMeasurement | HumidityMeasurement | BeeCountMeasurement
}

export interface SensorInterval {
    timestamp: string
    value: number
}