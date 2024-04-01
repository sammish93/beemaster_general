import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "beemaster_general",
  slug: "beemaster-general",
  ios: { ...config.ios,
    config: {
      googleMapsApiKey: process.env.IOS,
    },
  },
  android: { ...config.android,
    config: {
      googleMaps: {
        apiKey: process.env.MAPS_ANDROID_API_KEY,
      },
    },
  },
});