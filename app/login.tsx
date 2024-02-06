import { Link, router, useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme, Text } from "react-native-paper";
import TopBar from "@/components/TopBar";
import styles from "@/assets/styles";

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const canOpenDrawer = !!navigation.openDrawer;
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <View style={styles(theme).container}>
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
      </View>
    </View>
  );
};

export default observer(LoginScreen);
