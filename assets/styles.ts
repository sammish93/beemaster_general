import { ScreenHeight } from './../constants/Dimensions';

import { Dimensions, StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";
import { customFontConfig, customLightTheme } from "./themes";
import { addHiddenFinalProp } from 'mobx/dist/internal';



const styles = (theme?: MD3Theme) => {
  const dynamicTheme = theme ? theme : customLightTheme
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const isMobile = screenWidth < 768;

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

    centeredViewGDPR: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',


    },
    dialogStyle: {
      width: '75%',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },

    dialogStyleMobile: {
      width: screenWidth * 0.9,
      alignSelf: 'center',
      maxHeight: screenHeight * 0.7,
      //justifyContent: 'flex-start',


    },

    scrollViewContent: {
      paddingHorizontal: 4,
      paddingTop: 6,

    },

    titleDialogGDPR: {
      textAlign: 'center',
    },
    listItem: {
      marginTop: 8,
      width: '100%',
      flexShrink: 1,

      color: dynamicTheme.colors.onSecondaryContainer,
      ...dynamicTheme.fonts.bodyMedium,


    },
  });
};

export default styles;