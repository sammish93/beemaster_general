import { HiveModel } from "@/models/hiveModel";

export const hiveListData: HiveModel[] = [
    { id: "hive-1234-1234-abc", name: "Hooney Beast" },
    { id: "hive-1235-1235-abc", name: "Hooney Warrior" }
];

// Dummy sensor data.
export const sensorData = [
    { label: 'Weather', value: "Sunny" },
    { label: 'Wind', value: `4 km/h` },
    { label: 'Temperature', value: `21 °C` },
    { label: 'Rain', value: `0.0mm 0%` },
    { label: 'Weight', value: `57.6 kg` },
    { label: 'Hive Temp', value: `34.2 °C` }, 
    { label: 'Humidity', value: `54%` },
    { label: 'Counter', value: '421 p/h' },
];