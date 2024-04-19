import { useNavigation } from "expo-router"
import { View, ScrollView, Pressable } from "react-native"
import { observer, MobXProviderContext } from "mobx-react"
import { useEffect, useState, useContext } from "react"
import { Button, useTheme, Text, TextInput } from "react-native-paper"
import styles from "@/assets/styles"
import { SafeAreaView } from "react-native-safe-area-context"
import StatusBarCustom from "@/components/StatusBarCustom"
import * as React from "react"
import DialogGDPR from "@/components/modals/DialogGDPR"
import DialogCountry from "@/components/modals/DialogCountry"
//import React from "react";
import { Platform } from "react-native"
import { VerticalSpacer } from "@/components/Spacers"
import { ScreenWidth } from "@/constants/Dimensions"

// TODO add the GDPR and cleanup code
// TODO add strings to localisation
// The login loop should be show GDPR agreement, if agree then they can click login buttons.
// authenticate username and password, if new account then allow them to select a country.
// Write default params based on country. Write default language based on device language.
// Write default light/dark mode based on device theme.
const LoginScreen = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const { userViewModel } = useContext(MobXProviderContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const { signUpError } = userViewModel
  const [showGDPRDialog, setShowGDPRDialog] = useState(false)
  const [currentAuthMethod, setCurrentAuthMethod] = useState("")

  const handleEmailChange = (email: string) => {
    setEmail(email)
    if (emailError) setEmailError("")
    userViewModel.clearSignUpError()
  }

  const handlePasswordChange = (password: string) => {
    setPassword(password)
    if (passwordError) setPasswordError("")
    userViewModel.clearSignUpError()
  }

  useEffect(() => {
    setEmailError("")
    setPasswordError("")
    userViewModel.clearSignUpError()
    setShowGDPRDialog(false)
  }, [isSignUp, userViewModel])

  console.log(`Platform.OS: ${Platform.OS}`)
  const handleGoogleSignIn = () => {
    if (Platform.OS === "web") {
      console.log("web signin")
      userViewModel.signInWithGoogleWeb()
    } else {
      console.log("native sign in started log")

      userViewModel.signInWithGoogleNative()
    }
  }

  const handleEmailSignIn = () => {
    if (!email.trim()) {
      setEmailError("Please enter your email")
      return
    }
    if (!password.trim()) {
      setPasswordError("Please enter your password")
      return
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long")
      return
    }

    if (isSignUp) {
      userViewModel.signUpWithEmail(email, password)
    } else {
      userViewModel.signInWithEmail(email, password)
    }
  }

  const handleAnonymousSignIn = () => {
    userViewModel.signInAnonymously()
  }

  const handleAuthProcess = (method: string) => {
    setCurrentAuthMethod(method)
    console.log("sign in method: ", method)
    console.log("gdpr ", userViewModel.gdprConsent)
    if (!userViewModel.gdprConsent || !userViewModel.userId) {
      setShowGDPRDialog(true)
    } else {
      proceedWithAuthentication(method)
    }
  }

  const proceedWithAuthentication = (method: string) => {
    switch (method) {
      case "email":
        handleEmailSignIn()
        break
      case "google":
        handleGoogleSignIn()
        break
      case "anonymous":
        handleAnonymousSignIn()
        break
      default:
        console.error("Invalid authentication method")
    }
  }

  const handleGdprConsent = (consent: boolean) => {
    setShowGDPRDialog(false)
    if (consent) {
      userViewModel.setGdprConsent(true)
      proceedWithAuthentication(currentAuthMethod)
    } else {
      console.log("GDPR consent was not given.")
    }
  }

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <ScrollView
        contentContainerStyle={{
          ...styles(theme).main,
          maxWidth: ScreenWidth.Compact,
        }}
      >
        <Text
          style={{
            ...theme.fonts.headlineLarge,
            textAlign: "center",
            padding: 5,
          }}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </Text>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
          mode="outlined"
          style={{
            ...theme.fonts.bodyLarge,
            backgroundColor: theme.colors.primaryContainer,
          }}
        />
        <VerticalSpacer size={4} />
        {emailError ? (
          <Text
            style={{
              ...theme.fonts.bodyLarge,
              color: theme.colors.error,
              textAlign: "center",
            }}
          >
            {emailError}
          </Text>
        ) : null}
        <TextInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          secureTextEntry
          onChangeText={handlePasswordChange}
          mode="outlined"
          style={{
            ...theme.fonts.bodyLarge,
            backgroundColor: theme.colors.primaryContainer,
          }}
        />
        <VerticalSpacer size={12} />
        {passwordError ? (
          <Text
            style={{
              ...theme.fonts.bodyLarge,
              color: theme.colors.error,
              textAlign: "center",
            }}
          >
            {passwordError}
          </Text>
        ) : null}
        {signUpError && (
          <Text
            style={{
              ...theme.fonts.bodyLarge,
              color: theme.colors.error,
              textAlign: "center",
            }}
          >
            {signUpError}
          </Text>
        )}
        {isSignUp ? (
          <>
            <Button
              icon="email"
              mode="contained"
              onPress={() => handleAuthProcess("email")}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button icon="email" mode="contained" onPress={handleEmailSignIn}>
              Login with Email
            </Button>
            <VerticalSpacer size={4} />
            <Text
              style={{
                ...theme.fonts.bodyLarge,
                textAlign: "center",
              }}
            >
              OR
            </Text>
            <VerticalSpacer size={4} />
            <Button
              icon="google"
              mode="contained"
              onPress={() => handleAuthProcess("google")}
            >
              Login with Google
            </Button>
            <VerticalSpacer size={8} />
            <Button
              icon="incognito"
              mode="contained"
              onPress={() => handleAuthProcess("anonymous")}
            >
              Login Anonymously
            </Button>
          </>
        )}
        <VerticalSpacer size={8} />
        <Pressable onPress={() => setIsSignUp(!isSignUp)}>
          <Text
            style={{
              ...theme.fonts.bodyLarge,
              textDecorationLine: "underline",
              color: theme.colors.primary,
              textAlign: "center",
            }}
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </Text>
        </Pressable>
        {showGDPRDialog && (
          <DialogGDPR
            hideDialog={() => setShowGDPRDialog(false)}
            onConsent={handleGdprConsent}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default observer(LoginScreen)
