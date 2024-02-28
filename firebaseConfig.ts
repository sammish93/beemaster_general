import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, Auth, initializeAuth, getReactNativePersistence,  browserSessionPersistence, setPersistence} from "firebase/auth";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";


//The getReactNativePersistence seems to work fine. All the solution to take the red line away created other issues. If you wanna look at the issue here it is  https://github.com/firebase/firebase-js-sdk/issues/7615#issuecomment-1711926216

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initializes Firebase
const app = initializeApp(firebaseConfig);

// Initializes Firestore
const db = getFirestore(app);

// Initializes Firebase Auth
let auth;
if (Platform.OS === 'web') {
  // Web environment
  auth = getAuth(app);
  setPersistence(auth, browserSessionPersistence)
    .catch((error) => {
      console.log(error);
    });
} else {
  // React Native environment
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}
export { db, auth };
