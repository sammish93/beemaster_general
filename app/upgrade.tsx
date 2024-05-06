import { useNavigation } from "expo-router";
import { ScrollView, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useState, useContext } from "react";
import { Button, useTheme, Text, TextInput } from "react-native-paper";
import styles from "@/assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import * as React from "react";
import { VerticalSpacer } from "@/components/Spacers";
import { ScreenWidth } from "@/constants/Dimensions";

const UpgradeScreen = observer(() => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (email: string) => {
    setEmail(email);
    if (emailError) setEmailError("");
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    if (passwordError) setPasswordError("");
  };

  const handleUpgrade = () => {
    if (!email.trim()) {
      setEmailError(userViewModel.i18n.t("please enter your email"));
      return;
    }
    if (!password.trim()) {
      setPasswordError(userViewModel.i18n.t("please enter your password"));
      return;
    }

    userViewModel.upgradeAccountWithEmail(email, password);
  };

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
          Upgrade
        </Text>
        <TextInput
          label={userViewModel.i18n.t("email")}
          placeholder={userViewModel.i18n.t("enter your email")}
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
          label={userViewModel.i18n.t("password")}
          placeholder={userViewModel.i18n.t("enter your password")}
          value={password}
          secureTextEntry
          onChangeText={handlePasswordChange}
          mode="outlined"
          style={{
            ...theme.fonts.bodyLarge,
            backgroundColor: theme.colors.primaryContainer,
          }}
        />
        <VerticalSpacer size={4} />
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
        <VerticalSpacer size={16} />
        <Button icon="lock-open" mode="contained" onPress={handleUpgrade}>
          {userViewModel.i18n.t("upgrade")}
        </Button>
        <VerticalSpacer size={16} />
      </ScrollView>
    </SafeAreaView>
  );
});

export default UpgradeScreen;
