export interface User {
    email: string;
    filters: string[];
    id: string;
    isAnonymous: boolean;
    mobileNr: string | null;
    notificationPreference: {
      email: boolean;
      mobile: boolean;
      sms: boolean;
    };
    notificationTypePreference: {
      checkHive: boolean;
      considerExpanding: boolean;
      considerFeeding: boolean;
      customReminder: boolean;
      honeyHarvest: boolean;
      maintenance: boolean;
      possibleSwarm: boolean;
      weather: boolean;
    };
    preferences: {
      country: string;
      isDarkMode: boolean;
      language: string;
    };
    simplifiedView: boolean;
  }
  