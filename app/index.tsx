import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { ScrollView, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme, Text } from "react-native-paper";
import TopBar from "@/components/TopBar";
import styles from "@/assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import HiveList from "@/components/HiveList";
import AddHiveButton from "@/components/AddHiveButton";
import AddHiveModal from "@/components/AddHiveModal";


const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Home"
      />
      <View style={styles(theme).main}>
        
        <Button
          mode="elevated"
          onPress={() => {
            const hiveId = "hive-1234-1234-abc";
            navigation.navigate("/hive/index", { hiveId: hiveId });
          }}
        >
          Go to Hive Screen
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default observer(HomeScreen);
