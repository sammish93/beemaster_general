interface LatLng {
    lat: number;
    lng: number;
  }
  
  interface SensorTypes {
    isWeightSensor: boolean;
  }
  
  interface NotificationTypePreference {
    possibleSwarm: boolean;
    considerFeeding: boolean;
    honeyHarvest: boolean;
    checkHive: boolean;
    considerExpanding: boolean;
    weather: boolean;
    maintenance: boolean;
  }
  
  interface Queen {
    name: string;
    dateOfBirth: {
      seconds: number;
      nanoseconds: number;
    };
  }
  
  export interface Hive {
    id: string;
    hiveName: string;
    sensorId: string;
    latLng: LatLng;
    sensorTypes: SensorTypes;
    notificationTypePreference: NotificationTypePreference;
    currentQueen: Queen;
    hiveFilter: string[];
  }