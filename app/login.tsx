import { useNavigation } from "expo-router";
import { View, ScrollView, Pressable } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useEffect, useState, useContext } from "react";
import { Button, useTheme, Text, TextInput } from "react-native-paper";
import styles from "@/assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import { GoogleAuthProvider, signInWithCredential, signInWithPopup} from "firebase/auth";
import { auth } from "@/firebaseConfig"; // Your Firebase auth import
import userViewModel from '@/viewModels/UserViewModel'; // Your MobX store
import * as Google from 'expo-auth-session/providers/google';

import { Platform } from 'react-native';

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

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    expoClientId: WEB_CLIENT_ID,
    scopes: ['profile',
    'email',
    'openid',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile']

  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((result) => {
          userViewModel.setUserId(result.user.uid); // Update MobX store
        })
        .catch((error) => {
          console.error("Error signing in with Google: ", error);
        });
    }
  }, [response]);


  const handleGoogleSignIn = () => {
    if (Platform.OS === 'web') {
      console.log("web signin")
      userViewModel.signInWithGoogleWeb()
    } else {
      console.log("native sign in started")
     
      userViewModel.signInWithGoogleNative()
    }
  };

  const handleEmailSignIn = () => {
    if (isSignUp) {
      
      userViewModel.signUpWithEmail(email, password);
    } else {
     
      userViewModel.signInWithEmail(email, password);
    }
  };

  const handleAnonymousSignIn = () => {
    userViewModel.signInAnonymously();
  };

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <ScrollView contentContainerStyle={styles(theme).main}>
        <Text style={{ textAlign: 'center', padding: 5, marginBottom: 5}}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1, 
            borderColor: 'gray', 
            padding: 5, 
            borderRadius: 5,
            marginBottom: 5 
          }}  
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={{
            borderWidth: 1, 
            borderColor: 'gray', 
            padding: 5, 
            borderRadius: 5,
            marginBottom: 5 
          }}  
          
        />
        {isSignUp ? (
          <>
            
            <Button icon="email" mode="contained"  onPress={handleEmailSignIn}>
              Sign Up 
            </Button>
          </>
        ) : (
          <>
            <Button icon="email" mode="contained" style = {{marginBottom: 10}} onPress={handleEmailSignIn}>
              Login with Email
            </Button>
            <Text style={{ textAlign: 'center'}}>{"OR"}</Text>
            <Button icon="google" mode="contained" style = {{marginBottom: 10}} onPress={handleGoogleSignIn}>
              Login with Google
            </Button>
            <Button icon="incognito" mode="contained" style = {{marginBottom: 10}} onPress={handleAnonymousSignIn}>
              Login Anonymously
            </Button>
          </>
        )}
        <Pressable onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={{ textDecorationLine: 'underline', color: theme.colors.primary, textAlign: 'center' }}>
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(LoginScreen);
