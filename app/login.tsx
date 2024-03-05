import { useNavigation } from "expo-router";
import { View, ScrollView, Pressable } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useEffect, useState, useContext } from "react";
import { Button, useTheme, Text, TextInput } from "react-native-paper";
import styles from "@/assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import * as React from 'react';
import DialogGDPR from "@/components/modals/DialogGDPR";
//import React from "react";
import { Platform } from 'react-native';

//TODO add the GDPR and cleanup code
const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signUpError } = userViewModel;
  
  const handleEmailChange = (email: string) => {
    setEmail(email)
    if(emailError) setEmailError('')
    userViewModel.clearSignUpError()
  } 

  const handlePasswordChange = (password: string) => {
    setPassword(password)
    if(passwordError) setPasswordError('')
    userViewModel.clearSignUpError()
  }

  
  useEffect(() => {
    setEmailError('')
    setPasswordError('')
    userViewModel.clearSignUpError()
  }, [isSignUp, userViewModel])




  console.log(`Platform.OS: ${Platform.OS}`);
  const handleGoogleSignIn = () => {
    if (Platform.OS === 'web') {
      console.log("web signin")
      userViewModel.signInWithGoogleWeb()
    } else {
      console.log("native sign in started log")
     
      userViewModel.signInWithGoogleNative()
    }
  };

  const handleEmailSignIn = () => {
    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Please enter your password');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    if (isSignUp) {
      userViewModel.signUpWithEmail(email, password);
    } else {
      userViewModel.signInWithEmail(email, password);
    }
  };

  const handleAnonymousSignIn = () => {
    userViewModel.signInAnonymously();
  };
  const [showDialog, setShowDialog] = React.useState(false)



  const handleLoginPress = () => {
    setShowDialog(true);  //Viser gdpr-dialogen

  }
  const hideDialog = () => {
    setShowDialog(false); // Hides the GDPR dialog
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
          onChangeText={handleEmailChange}
          style={{
            borderWidth: 1, 
            borderColor: 'gray', 
            padding: 5, 
            borderRadius: 5,
            marginBottom: 5 
          }}  
        />
        {emailError ? <Text style={{ color: 'red', textAlign: 'center' }}>{emailError}</Text> : null}
        <TextInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          secureTextEntry
          onChangeText={handlePasswordChange}
          style={{
            borderWidth: 1, 
            borderColor: 'gray', 
            padding: 5, 
            borderRadius: 5,
            marginBottom: 5 
          }}  
          
        />
         {passwordError ? <Text style={{ color: 'red', textAlign: 'center' }}>{passwordError}</Text> : null}
         {signUpError && <Text style={{ color: 'red', textAlign: 'center'}}>{signUpError}</Text>}
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
