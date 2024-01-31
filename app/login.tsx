import { Link, router, useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme } from "react-native-paper";
import TopBar from "@/components/TopBar";

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const canOpenDrawer = !!navigation.openDrawer;
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.myOwnColor }}
    >
      {/* Shows the drawer navigation bar if the draw layout is used*/}
      {canOpenDrawer && (
        <TopBar
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      )}
      <View style={styles.main}>
        <Text style={theme.fonts.titleLarge}>Login</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
