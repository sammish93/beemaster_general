import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import * as React from "react";
import DialogGDPR from "@/components/modals/DialogGDPR";
//import React from "react";

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const [showDialog, setShowDialog] = React.useState(false);

  const handleLoginPress = () => {
    setShowDialog(true); //Viser gdpr-dialogen
  };
  const hideDialog = () => {
    setShowDialog(false); // Hides the GDPR dialog
  };

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.displayLarge}>Login Display</Text>
        <Text style={theme.fonts.titleLarge}>Login Title</Text>
        <Text style={theme.fonts.bodyLarge}>Login Body</Text>
        <Text style={theme.fonts.labelLarge}>Login Label</Text>

        <Button
          mode="contained"
          onPress={() => {
            userViewModel.setUserId("exampleId");
          }}
        >
          Navigate to Home Screen
        </Button>
        <Button mode="contained" onPress={handleLoginPress}>
          Click to see GDPR
        </Button>
        {showDialog && <DialogGDPR hideDialog={hideDialog} />}
      </View>
    </SafeAreaView>
  );
};

export default observer(LoginScreen);
