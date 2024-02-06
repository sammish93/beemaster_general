
import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";
import { customFontConfig, customLightTheme } from "./themes";

const defaultTheme = customLightTheme;

const styles = (theme?: MD3Theme) => { 
  const dynamicTheme = theme ? theme : customLightTheme
  
  return StyleSheet.create({
    container: {
      backgroundColor: dynamicTheme.colors.surfaceVariant,
    },
    main: {
      flex: 1,
      justifyContent: "center",
      maxWidth: 960,
      marginHorizontal: "auto",
      backgroundColor: dynamicTheme.colors.surfaceVariant,
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
  });
};

  export default styles;