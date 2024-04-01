import { useNavigation } from "expo-router";
import { Dimensions, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import ToolboxCard from "@/components/toolbox/ToolboxCard";
import { ScrollView } from "react-native-virtualized-view";
import { ScreenWidth } from "@/constants/Dimensions";
import { HorizontalSpacer, VerticalSpacer } from "@/components/Spacers";

const ToolboxScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("toolbox")}
      />
      <ScrollView>
        <View style={{ ...styles(theme).main }}>
          {Dimensions.get("window").width <= ScreenWidth.Compact ? (
            <View style={{ flex: 1 }}>
              <ToolboxCard
                title={userViewModel.i18n.t("community")}
                description={userViewModel.i18n.t("community description")}
                image={require("@/assets/images/toolbox/community.jpg")}
                onClick={() => {
                  navigation.navigate("/toolbox/community");
                }}
              />
              <VerticalSpacer size={12} />
              <ToolboxCard
                title={userViewModel.i18n.t("checklist")}
                description={userViewModel.i18n.t("checklist description")}
                image={require("@/assets/images/toolbox/checklist.jpg")}
                onClick={() => {
                  navigation.navigate("/toolbox/checklist");
                }}
              />
              <VerticalSpacer size={12} />
              <ToolboxCard
                title={userViewModel.i18n.t("calendar")}
                description={userViewModel.i18n.t("calendar description")}
                image={require("@/assets/images/toolbox/calendar.jpg")}
                onClick={() => {
                  navigation.navigate("/toolbox/calendar");
                }}
              />
              <VerticalSpacer size={12} />
              <ToolboxCard
                title={userViewModel.i18n.t("hive scan")}
                description={userViewModel.i18n.t("hive scan description")}
                image={require("@/assets/images/toolbox/hiveScan.jpg")}
                onClick={() => {
                  navigation.navigate("/toolbox/hiveScan");
                }}
              />
            </View>
          ) : (
            <View>
              <View style={{ flexDirection: "row" }}>
                <ToolboxCard
                  title={userViewModel.i18n.t("community")}
                  description={userViewModel.i18n.t("community description")}
                  image={require("@/assets/images/toolbox/community.jpg")}
                  onClick={() => {
                    navigation.navigate("/toolbox/community");
                  }}
                />
                <HorizontalSpacer size={12} />
                <ToolboxCard
                  title={userViewModel.i18n.t("checklist")}
                  description={userViewModel.i18n.t("checklist description")}
                  image={require("@/assets/images/toolbox/checklist.jpg")}
                  onClick={() => {
                    navigation.navigate("/toolbox/checklist");
                  }}
                />
              </View>
              <VerticalSpacer size={12} />
              <View style={{ flexDirection: "row" }}>
                <ToolboxCard
                  title={userViewModel.i18n.t("calendar")}
                  description={userViewModel.i18n.t("calendar description")}
                  image={require("@/assets/images/toolbox/calendar.jpg")}
                  onClick={() => {
                    navigation.navigate("/toolbox/calendar");
                  }}
                />

                <HorizontalSpacer size={12} />
                <ToolboxCard
                  title={userViewModel.i18n.t("hive scan")}
                  description={userViewModel.i18n.t("hive scan description")}
                  image={require("@/assets/images/toolbox/hiveScan.jpg")}
                  onClick={() => {
                    navigation.navigate("/toolbox/hiveScan");
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(ToolboxScreen);
