
import { Dimensions, StyleSheet, Platform } from "react-native";
import { MD3Theme } from "react-native-paper";
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { customFontConfig, customLightTheme } from "./themes";

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
      maxWidth: 960,
      marginHorizontal: "auto",
      backgroundColor: dynamicTheme.colors.surfaceVariant,
      padding: 25
    },
    modal: {
      alignItems: "center",
    },
    modalContent: {
      padding: 20,
      marginHorizontal: 30,
      gap: 10,
    },
    modalTitle: {
      marginTop: 25, 
      marginBottom: 8, 
      marginHorizontal: 15
    },
    hiveContainer: {
      backgroundColor: dynamicTheme.colors.secondaryContainer,
      margin: 10,
      gap: 12,
      padding: 15,
      borderRadius: 10,

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