import { Platform } from 'react-native';
import { GoogleAuthProvider, signInWithCredential, signInWithPopup, signInWithRedirect, getAuth } from "firebase/auth";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import {auth} from "@/firebaseConfig";
import { initializeApp } from 'firebase/app';

import { 
  WEB_CLIENT_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID, 
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,} from '@env';

export const signInWithGoogleAsync = async () => {
  if (Platform.OS === 'web') {
    // Web logic
    const provider = new GoogleAuthProvider();
    try {
      let result;
      if (window.innerWidth < 768) {
        result = await signInWithRedirect(auth, provider);
      } else {
        result = await signInWithPopup(auth, provider);
      }
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return { user, token };
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(error);
      return { error: errorMessage };
    }
  } else {
    // Native logic
    const config = {
      androidClientId: ANDROID_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      scopes: ['profile', 'email'],
      permissions: ['public_profile', 'email'],
    };

    const { response, promptAsync } = Google.useIdTokenAuthRequest(config);

    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      try {
        const result = await signInWithCredential(auth, credential);
        // The signed-in user info.
        const user = result.user;
        return { user };
      } catch (error) {
        console.error(error);
        return { error: error.message };
      }
    } else {
      promptAsync().catch((error) => {
        console.error(error);
        return { error: error.message };
      });
    }
  }
};
