import { useContext, useMemo, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { Button, useTheme, Text, MD3Theme } from "react-native-paper";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { MobXProviderContext } from "mobx-react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { HiveModel } from "@/models/hiveModel";
import HiveCard from "./HiveCard";
import { customLightTheme } from "@/assets/themes";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import UserViewModel from "@/viewModels/UserViewModel";

export interface HiveListProps {
  isDetailedView: boolean;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  hives: HiveModel[];
}

const HiveList = ({ isDetailedView, navigation, hives }: HiveListProps) => {
  const { hiveViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();
  const [parentWidth, setParentWidth] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  // Returns the number of columns to display. This ensures that the grid is responsive.
  const numColumns = useMemo(() => {
    // Ensure we don't divide by zero
    if (parentWidth === 0) return 1;

    return Math.floor(parentWidth / (isDetailedView ? 250 : 125));
  }, [parentWidth]);

  // Returns the amount of items in the last row
  const itemsInLastRow = useMemo(() => {
    const totalItems = hives.length;
    const remainder = totalItems % numColumns;

    return remainder === 0 ? 0 : remainder;
  }, [hives.length, numColumns]);

  //TODO Modify onPress
  const renderItem = ({ item }: { item: HiveModel }) => (
    <HiveCard
      item={item}
      isDetailedView={isDetailedView}
      onPress={() => {
        hiveViewModel.addSelectedHive(item);
        navigation.navigate("/hive/index", { hiveId: item.id });
      }}
      maxWidth={
        numColumns > 1 ? parentWidth / numColumns - itemsInLastRow * 8 : "100%"
      }
    />
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
        data={hives}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        key={`flatList-${numColumns}-columns`}
        numColumns={numColumns}
        ListEmptyComponent={
          <Text style={theme.fonts.bodyLarge}>
            {UserViewModel.i18n.t("no hives have been registered")}
            {/*TODO Refresh Button */}
          </Text>
        }
      />
    </GestureHandlerRootView>
  );
};

export default HiveList;
