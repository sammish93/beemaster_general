import styles from "@/assets/styles";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { Platform, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

// More info about how to use the bottom sheets can be found here:
// https://ui.gorhom.dev/components/bottom-sheet/modal

// Bottom Sheets don't particularly work well with web so a modal a-la alert box would be better.

const ExampleModal = () => {
  return (() => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      return <MobileModal />;
    } else {
      return <WebModal />;
    }
  })();
};

const MobileModal = () => {
  const theme = useTheme();

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
    <BottomSheetModalProvider>
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
          contentContainerStyle={styles(theme).bottomSheetScrollContainer}
        >
          <Button mode="contained" onPress={handleModalSheetPressClose}>
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
    </BottomSheetModalProvider>
  );
};

const WebModal = () => {
  const theme = useTheme();

  return (
    <Text style={theme.fonts.bodyLarge}>
      Bottom Sheet only visible on mobile devices
    </Text>
  );
};

export default ExampleModal;
