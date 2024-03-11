import { HiveModel } from "@/models/hiveModel";
import { HiveNote } from "@/models/note";

export const hiveListData: HiveModel[] = [
    { id: "hive-1234-1234-abc", name: "Honey Beast", filters: ["fredrikstad"], latLng: {lat: 59.9139, lng: 10.7522} },
    { id: "hive-1235-1235-abc", name: "Honey Warrior", filters: ["harvested"], latLng: {lat: 59.9139, lng: 10.7522} },
    { id: "hive-1235-1236-abc", name: "Honey Queen", filters: ["oslo"], latLng: {lat: 59.9139, lng: 10.7522} },
    { id: "hive-1235-1237-abc", name: "Honey Egg", filters: [], latLng: {lat: 59.9139, lng: 10.7522} },
    { id: "hive-1235-1238-abc", name: "Honey Turnip", filters: ["fredrikstad", "harvested"], latLng: {lat: 59.9139, lng: 10.7522} },
    { id: "hive-1235-1239-abc", name: "Honey Grass", filters: ["oslo", "harvested"], latLng: {lat: 59.9139, lng: 10.7522} },
    { id: "hive-1235-1240-abc", name: "Honey Mate", filters: ["fredrikstad"], latLng: {lat: 59.9139, lng: 10.7522} },
    { id: "hive-1235-1241-abc", name: "Honey Lad", filters: ["oslo"], latLng: {lat: 59.9139, lng: 10.7522} },
    { id: "hive-1235-1242-abc", name: "Honey Lump", filters: ["fredrikstad", "diseased"], latLng: {lat: 59.9139, lng: 10.7522} },
    { id: "hive-1235-1243-abc", name: "Honey Grape", filters: [], latLng: {lat: 59.9139, lng: 10.7522} },
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

export const notes: HiveNote[] = [
    { id: 'abc-123', note: 'Hive is lovely. Simply perfect', isSticky: true },
    { id: 'abc-1234', note: 'Checked on Sunday 15th', isSticky: false },
    { id: 'abc-12345', note: 'Queen bee born in 2023', isSticky: true },
    { id: 'abc-123456', note: 'No signs of those pesky varroas - February 2024', isSticky: false },
    { id: 'abc-1234567', note: 'They\'re here. The varroa have returned. Please tell Jane that I l....', isSticky: false },
];