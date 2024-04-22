import { useContext, useMemo, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { Button, useTheme, Text, MD3Theme } from "react-native-paper";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { MobXProviderContext } from "mobx-react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { HiveModel } from "@/models/hiveModel";
import HiveCard from "@/components/hive/HiveCard";
import { customLightTheme } from "@/assets/themes";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import UserViewModel from "@/viewModels/UserViewModel";
import { HiveNotification } from "@/models/notification";
import NotificationCard from "./NotificationCard";

export interface NotificationListProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  notifications: HiveNotification[];
}

const NotificationList = ({
  navigation,
  notifications,
}: NotificationListProps) => {
  const { hiveViewModel } = useContext(MobXProviderContext);
  const { userViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();
  const [parentWidth, setParentWidth] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  const renderItem = ({ item }: { item: HiveNotification }) => (
    <NotificationCard item={item} navigation={navigation} />
  );

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
      onLayout={({ nativeEvent }) => {
        // Update parentWidth when the layout is calculated
        setParentWidth(nativeEvent.layout.width);
      }}
    >
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        ListEmptyComponent={
          <Text style={theme.fonts.bodyLarge}>
            {userViewModel.i18n.t("no new notifications")}
            {/*TODO Refresh Button */}
          </Text>
        }
      />
    </GestureHandlerRootView>
  );
};

export default NotificationList;
