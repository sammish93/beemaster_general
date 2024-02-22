
import { Dimensions, StyleSheet, Platform } from "react-native";
import { MD3Theme } from "react-native-paper";
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { customFontConfig, customLightTheme } from "./themes";
import { ScreenWidth } from "@/constants/Dimensions"

const defaultTheme = customLightTheme;

const styles = (theme?: MD3Theme) => { 
  const dynamicTheme = theme ? theme : customLightTheme
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  
  return StyleSheet.create({
    container: {
      backgroundColor: dynamicTheme.colors.surfaceVariant,
      flex: 1,
      width: screenWidth,
      justifyContent: "center",
      marginHorizontal: "auto",
    },
    main: {
      flex: 1,
      justifyContent: "center",
      maxWidth: screenWidth > ScreenWidth.Widescreen ? ScreenWidth.Widescreen : screenWidth,
      width: Platform.select({
        'web': "50%"
      }),
      marginHorizontal: "auto",
      backgroundColor: dynamicTheme.colors.surfaceVariant,
      padding: 20
    },
    topBarContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: dynamicTheme.colors.primaryContainer,
      height: 64,
    },
    leadingIconsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    leadingIcon: {
      paddingStart: 12,
      fontSize: 24,
      color: dynamicTheme.colors.onSurfaceVariant
    },
    trailingIcon: {
      paddingEnd: 12,
      fontSize: 24,
      color: dynamicTheme.colors.onSurfaceVariant
    },
    trailingIconsContainer: {
      paddingEnd: 12,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    headlineContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headline: {
      color: dynamicTheme.colors.onSurfaceVariant
    },
    bottomSheet: {
      backgroundColor: dynamicTheme.colors.primaryContainer
    },
    bottomSheetContainer: {
      flex: 1,
      alignItems: "center",
    },
    bottomSheetScrollContainer: {
      flex: 0,
      padding: 12
    },
    overlayModal: {
      alignItems: "center",
    },
    overlayContainer: {
      backgroundColor: dynamicTheme.colors.primaryContainer,
      alignContent: "center",
      maxHeight: screenHeight * 0.9,
      width: screenWidth * 0.9,
      maxWidth: ScreenWidth.Compact,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      // Accomodates the scrollbar.
      paddingRight: 4,
      borderRadius: 20,
    },
    overlayScrollView: {
      paddingRight: 8
    },
    activityIndicatorContainer: {
      flex: 1,
      backgroundColor: "#3d4553",
      justifyContent: "center",
      alignItems: "center",
    },
    activityIndicatorOrbitBody: {
      height: 40,
      width: 40,
    },
    activityIndicatorOrbiter: {
      height: 32,
      width: 32,
      position: "absolute",
      top: -24,
      left: 44,
    },
    activityIndicatorOrbitTrajectory: {
      borderColor: "transparent",
      height: 120,
      width: 120,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      gap: 5
    },
    closeButton: {
      position: 'absolute',
      top: 0, 
      right: 0
    }
  });
};

export default styles;