import { HiveModel } from "@/models/hiveModel";

export const hiveListData: HiveModel[] = [
    { id: "hive-1234-1234-abc", name: "Honey Beast", filters: ["fredrikstad"] },
    { id: "hive-1235-1235-abc", name: "Honey Warrior", filters: ["harvested"] },
    { id: "hive-1235-1236-abc", name: "Honey Queen", filters: ["oslo"] },
    { id: "hive-1235-1237-abc", name: "Honey Egg", filters: [] },
    { id: "hive-1235-1238-abc", name: "Honey Turnip", filters: ["fredrikstad", "harvested"] },
    { id: "hive-1235-1239-abc", name: "Honey Grass", filters: ["oslo", "harvested"] },
    { id: "hive-1235-1240-abc", name: "Honey Mate", filters: ["fredrikstad"] },
    { id: "hive-1235-1241-abc", name: "Honey Lad", filters: ["oslo"] },
    { id: "hive-1235-1242-abc", name: "Honey Lump", filters: ["fredrikstad", "diseased"] },
    { id: "hive-1235-1243-abc", name: "Honey Grape", filters: [] },
];

// Dummy sensor data.
export const sensorData = [
    { label: 'Weather', weatherIcon: 'clearsky_day', value: '' },
    { label: 'Wind', icon: 'weather-windy', value: `4 km/h` },
    { label: 'Temperature', icon: 'thermometer', value: `21 °C` },
    { label: 'Rain', icon: 'water-outline', value: `0.0mm` },
    { label: 'Weight', icon: 'weight', value: `57.6 kg` },
    { label: 'Hive Temp', icon: 'home-thermometer', value: `34.2 °C` }, 
    { label: 'Humidity', icon: 'air-humidifier', value: `54%` },
    { label: 'Counter', icon: 'bee', value: '421 p/h' },
];

export const filterData = ["fredrikstad", "oslo", "diseased", "harvested"]