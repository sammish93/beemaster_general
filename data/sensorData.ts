import { BeeCountMeasurement, HumidityMeasurement, PrecipitationMeasurement, TemperatureMeasurement, WeightMeasurement } from "@/constants/Measurements";
import { SensorDataList } from "@/models/sensor";

export const weightSensorData: SensorDataList = {
    sensorData: [
        { timestamp: "2024-03-03T06:00:00Z", value: 55000 },
        { timestamp: "2024-03-03T12:00:00Z", value: 55000.5 },
        { timestamp: "2024-03-03T18:00:00Z", value: 56000.1 },
        { timestamp: "2024-03-03T24:00:00Z", value: 56000.8 },
        { timestamp: "2024-03-04T06:00:00Z", value: 58000.4 },
        { timestamp: "2024-03-04T12:00:00Z", value: 59000.6 },
        { timestamp: "2024-03-04T18:00:00Z", value: 60000.9 },
        { timestamp: "2024-03-04T24:00:00Z", value: 61000.2 },
        { timestamp: "2024-03-05T06:00:00Z", value: 59000.4 },
        { timestamp: "2024-03-05T12:00:00Z", value: 56000.2 },
        { timestamp: "2024-03-05T18:00:00Z", value: 54000.1 },
        { timestamp: "2024-03-05T24:00:00Z", value: 55000.4 },
  
    ],
    measurement: WeightMeasurement.Grams
};

export const humiditySensorData: SensorDataList = {
    sensorData: [
        { timestamp: "2024-03-03T06:00:00Z", value: 56 },
        { timestamp: "2024-03-03T12:00:00Z", value: 57.2 },
        { timestamp: "2024-03-03T18:00:00Z", value: 61 },
        { timestamp: "2024-03-03T24:00:00Z", value: 62.3 },
        { timestamp: "2024-03-04T06:00:00Z", value: 61.5 },
        { timestamp: "2024-03-04T12:00:00Z", value: 67.3 },
        { timestamp: "2024-03-04T18:00:00Z", value: 70.6 },
        { timestamp: "2024-03-04T24:00:00Z", value: 73.1 },
        { timestamp: "2024-03-05T06:00:00Z", value: 69 },
        { timestamp: "2024-03-05T12:00:00Z", value: 67 },
        { timestamp: "2024-03-05T18:00:00Z", value: 62.5 },
        { timestamp: "2024-03-05T24:00:00Z", value: 58 },
  
    ],
    measurement: HumidityMeasurement.Percent
};

export const temperatureSensorData: SensorDataList = {
    sensorData: [
        { timestamp: "2024-03-03T06:00:00Z", value: 31 },
        { timestamp: "2024-03-03T12:00:00Z", value: 31.4 },
        { timestamp: "2024-03-03T18:00:00Z", value: 31.5 },
        { timestamp: "2024-03-03T24:00:00Z", value: 32.4 },
        { timestamp: "2024-03-04T06:00:00Z", value: 31.7 },
        { timestamp: "2024-03-04T12:00:00Z", value: 31.8 },
        { timestamp: "2024-03-04T18:00:00Z", value: 32.5 },
        { timestamp: "2024-03-04T24:00:00Z", value: 33.2 },
        { timestamp: "2024-03-05T06:00:00Z", value: 32.8 },
        { timestamp: "2024-03-05T12:00:00Z", value: 31.3 },
        { timestamp: "2024-03-05T18:00:00Z", value: 31.4 },
        { timestamp: "2024-03-05T24:00:00Z", value: 32.1 },
  
    ],
    measurement: TemperatureMeasurement.Celsius
};

export const beeCountSensorData: SensorDataList = {
    sensorData: [
        { timestamp: "2024-03-03T06:00:00Z", value: 12 },
        { timestamp: "2024-03-03T12:00:00Z", value: 24 },
        { timestamp: "2024-03-03T18:00:00Z", value: 22 },
        { timestamp: "2024-03-03T24:00:00Z", value: 51 },
        { timestamp: "2024-03-04T06:00:00Z", value: 31 },
        { timestamp: "2024-03-04T12:00:00Z", value: 55 },
        { timestamp: "2024-03-04T18:00:00Z", value: 54 },
        { timestamp: "2024-03-04T24:00:00Z", value: 18 },
        { timestamp: "2024-03-05T06:00:00Z", value: 32 },
        { timestamp: "2024-03-05T12:00:00Z", value: 44 },
        { timestamp: "2024-03-05T18:00:00Z", value: 12 },
        { timestamp: "2024-03-05T24:00:00Z", value: 5 },
  
    ],
    measurement: BeeCountMeasurement.PerSecond
};

export const weightSensorDataExpanded: SensorDataList = {
    sensorData: [
        { timestamp: "2024-02-26T06:00:00Z", value: 55000 },
        { timestamp: "2024-02-26T12:00:00Z", value: 55000.5 },
        { timestamp: "2024-02-26T18:00:00Z", value: 56000.1 },
        { timestamp: "2024-02-26T24:00:00Z", value: 56000.8 },
        { timestamp: "2024-02-27T06:00:00Z", value: 55000 },
        { timestamp: "2024-02-27T12:00:00Z", value: 55000.5 },
        { timestamp: "2024-02-27T18:00:00Z", value: 56000.1 },
        { timestamp: "2024-02-27T24:00:00Z", value: 56000.8 },
        { timestamp: "2024-02-28T06:00:00Z", value: 55000 },
        { timestamp: "2024-02-28T12:00:00Z", value: 55000.5 },
        { timestamp: "2024-02-28T18:00:00Z", value: 56000.1 },
        { timestamp: "2024-02-28T24:00:00Z", value: 56000.8 },
        { timestamp: "2024-02-29T06:00:00Z", value: 55000 },
        { timestamp: "2024-02-29T12:00:00Z", value: 55000.5 },
        { timestamp: "2024-02-29T18:00:00Z", value: 56000.1 },
        { timestamp: "2024-02-29T24:00:00Z", value: 56000.8 },
        { timestamp: "2024-03-01T06:00:00Z", value: 55000 },
        { timestamp: "2024-03-01T12:00:00Z", value: 55000.5 },
        { timestamp: "2024-03-01T18:00:00Z", value: 56000.1 },
        { timestamp: "2024-03-01T24:00:00Z", value: 56000.8 },
        { timestamp: "2024-02-03T06:00:00Z", value: 55000 },
        { timestamp: "2024-02-03T12:00:00Z", value: 55000.5 },
        { timestamp: "2024-02-03T18:00:00Z", value: 56000.1 },
        { timestamp: "2024-02-03T24:00:00Z", value: 56000.8 },
        { timestamp: "2024-03-03T06:00:00Z", value: 55000 },
        { timestamp: "2024-03-03T12:00:00Z", value: 55000.5 },
        { timestamp: "2024-03-03T18:00:00Z", value: 56000.1 },
        { timestamp: "2024-03-03T24:00:00Z", value: 56000.8 },
        { timestamp: "2024-03-04T06:00:00Z", value: 58000.4 },
        { timestamp: "2024-03-04T12:00:00Z", value: 59000.6 },
        { timestamp: "2024-03-04T18:00:00Z", value: 60000.9 },
        { timestamp: "2024-03-04T24:00:00Z", value: 61000.2 },
        { timestamp: "2024-03-05T06:00:00Z", value: 59000.4 },
        { timestamp: "2024-03-05T12:00:00Z", value: 56000.2 },
        { timestamp: "2024-03-05T18:00:00Z", value: 54000.1 },
        { timestamp: "2024-03-05T24:00:00Z", value: 55000.4 },
  
    ],
    measurement: WeightMeasurement.Grams
};