import { HiveModel } from "@/models/hiveModel";

export const hiveListData: HiveModel[] = [
    { id: "hive-1234-1234-abc", name: "Hooney Beast" },
    { id: "hive-1235-1235-abc", name: "Hooney Warrior" }
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