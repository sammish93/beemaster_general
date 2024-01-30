import { router, useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button } from "react-native-paper";
import TopBar from "@/components/TopBar";

const HomeScreen = () => {
  const navigation = useNavigation();
  const canOpenDrawer = !!navigation.openDrawer;
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <View style={styles.container}>
      {canOpenDrawer && (
        <TopBar
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      )}
      <View style={styles.main}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>Example of data from view model:</Text>
        <Text style={styles.subtitle}>{exampleViewModel.testString}</Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => exampleViewModel.handleButtonPress()}
        >
          Press me to change the above text
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("hive");
          }}
        >
          Go to Hive Screen
        </Button>
      </View>
    </View>
  );
};

export default observer(HomeScreen);

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
