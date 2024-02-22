
import { Dimensions, StyleSheet, Platform } from "react-native";
import { MD3Theme } from "react-native-paper";
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { customFontConfig, customLightTheme } from "./themes";
import { ScreenWidth } from "@/constants/Dimensions"

const defaultTheme = customLightTheme;
 
const styles = (theme?: MD3Theme) => { 
  const dynamicTheme = theme ? theme : customLightTheme
  const screenWidth = Dimensions.get('window').width;
  
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
    modal: {
      alignItems: "center",
    },
    modalContent: {
      margin: 10,
      padding: 10,
      gap: 10,
    },
    modalTitle: {
      marginTop: 25, 
      marginBottom: 8, 
      marginHorizontal: 15
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
      alignItems: "center",
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
    },
    filterContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16
    }
  });
};

  export default styles;