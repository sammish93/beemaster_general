import { useNavigation } from "expo-router";
import { Platform, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useMemo, useRef } from "react";
import { useTheme, Text, Button } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";

const UpdatesScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  // Variables required for the modal bottom sheet
  let bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // The percentage of screen height that the bottom sheet snaps to (starts at whatever the index is set to).
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // Opens up the bottom sheet.
  const handleModalSheetPressOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Closes the bottom sheet.
  const handleModalSheetPressClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // Allows behaviour on bottom sheet appearing/being dismissed.
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) console.log("Sheet Closed");
    else if (index === 1) console.log("Sheet Opened");
  }, []);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Updates"
      />
      <View style={styles(theme).main}>
        <BottomSheetModalProvider>
          <Text style={theme.fonts.titleLarge}>Updates</Text>
          {(() => {
            if (Platform.OS === "android" || Platform.OS === "ios") {
              return (
                <View>
                  <Button mode="contained" onPress={handleModalSheetPressOpen}>
                    Open Bottom Sheet (MOBILE ONLY)
                  </Button>
                  <BottomSheetModal
                    ref={bottomSheetModalRef}
                    enableDynamicSizing={true}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backgroundStyle={styles(theme).bottomSheet}
                  >
                    <BottomSheetScrollView
                      contentContainerStyle={
                        styles(theme).bottomSheetScrollContainer
                      }
                    >
                      <Button
                        mode="contained"
                        onPress={handleModalSheetPressClose}
                      >
                        Close Bottom Sheet
                      </Button>
                      <Text style={theme.fonts.bodyLarge}>I'm scrollable!</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.bodyLarge}>Scrolling...</Text>
                      <Text style={theme.fonts.titleLarge}>
                        You have reached the bottom!
                      </Text>
                    </BottomSheetScrollView>
                  </BottomSheetModal>
                </View>
              );
            } else {
              {
                /* //TODO Web solution here*/
              }
              return (
                <Text style={theme.fonts.bodyLarge}>
                  Bottom Sheet only visible on mobile devices
                </Text>
              );
            }
          })()}
        </BottomSheetModalProvider>
      </View>
    </SafeAreaView>
  );
};

export default observer(UpdatesScreen);
