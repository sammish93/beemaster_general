import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";

const ToolboxScreen = () => {
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Toolbox</Text>
        <Text style={styles.subtitle}>
          String from View Model with a state: {exampleViewModel.testString}
        </Text>
      </View>
    </View>
  );
};

export default observer(ToolboxScreen);

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
