import { Platform } from 'react-native';
import { configureFonts, MD3LightTheme, MD3Theme } from 'react-native-paper';
import { MD3Type } from 'react-native-paper/lib/typescript/types';

type FontConfig = Record<string, MD3Type>;

const customFontConfig: FontConfig  = {

    displaySmall: {
        fontFamily: "Font",
        fontSize: 36,
        fontWeight: "400",
        letterSpacing: 0,
        lineHeight: 44,
      },
      displayMedium: {
        fontFamily: "Font",
        fontSize: 45,
        fontWeight: "400",
        letterSpacing: 0,
        lineHeight: 52,
      },
      displayLarge: {
        fontFamily: "Font",
        fontSize: 57,
        fontWeight: "400",
        letterSpacing: 0,
        lineHeight: 64,
      },
      headlineSmall: {
        fontFamily: "Font",
        fontSize: 24,
        fontWeight: "400",
        letterSpacing: 0,
        lineHeight: 32,
      },
      titleMedium: {
        fontFamily: "Font",
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.15,
        lineHeight: 24,
      },
      titleLarge: {
        fontFamily: "Font",
        fontSize: 22,
        fontWeight: "400",
        letterSpacing: 0,
        lineHeight: 28,
      },
      bodySmall: {
        fontFamily: "Font",
        fontSize: 12,
        fontWeight: "400",
        letterSpacing: 0.4,
        lineHeight: 16,
      },
      bodyMedium: {
        fontFamily: "Font",
        fontSize: 14,
        fontWeight: "400",
        letterSpacing: 0.25,
        lineHeight: 20,
      },
      bodyLarge: {
        fontFamily: "Font",
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: 0.15,
        lineHeight: 24,
      },
      labelSmall: {
        fontFamily: "Font",
        fontSize: 11,
        fontWeight: "500",
        letterSpacing: 0.5,
        lineHeight: 16,
      },
      labelMedium: {
        fontFamily: "Font",
        fontSize: 12,
        fontWeight: "500",
        letterSpacing: 0.5,
        lineHeight: 16,
      },
      labelLarge: {
        fontFamily: "Font",
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.1,
        lineHeight: 20,
      }
  };

export const customDarkTheme: MD3Theme = {
    ...MD3LightTheme,
    fonts: configureFonts({config: customFontConfig}),
    dark: true,
    mode: 'adaptive',
    version: 3,
    isV3: true,
    colors: {
        primary: "rgb(255, 179, 172)",
        onPrimary: "rgb(104, 0, 8)",
        primaryContainer: "rgb(147, 0, 16)",
        onPrimaryContainer: "rgb(255, 218, 214)",
        secondary: "rgb(231, 189, 184)",
        onSecondary: "rgb(68, 41, 39)",
        secondaryContainer: "rgb(93, 63, 60)",
        onSecondaryContainer: "rgb(255, 218, 214)",
        tertiary: "rgb(225, 195, 140)",
        onTertiary: "rgb(63, 45, 4)",
        tertiaryContainer: "rgb(88, 68, 25)",
        onTertiaryContainer: "rgb(254, 222, 166)",
        error: "rgb(255, 180, 171)",
        onError: "rgb(105, 0, 5)",
        errorContainer: "rgb(147, 0, 10)",
        onErrorContainer: "rgb(255, 180, 171)",
        background: "rgb(32, 26, 25)",
        onBackground: "rgb(237, 224, 222)",
        surface: "rgb(32, 26, 25)",
        onSurface: "rgb(237, 224, 222)",
        surfaceVariant: "rgb(83, 67, 66)",
        onSurfaceVariant: "rgb(216, 194, 191)",
        outline: "rgb(160, 140, 138)",
        outlineVariant: "rgb(83, 67, 66)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(237, 224, 222)",
        inverseOnSurface: "rgb(54, 47, 46)",
        inversePrimary: "rgb(186, 26, 32)",
        elevation: {
          level0: "transparent",
          level1: "rgb(43, 34, 32)",
          level2: "rgb(50, 38, 37)",
          level3: "rgb(57, 43, 41)",
          level4: "rgb(59, 44, 43)",
          level5: "rgb(63, 47, 46)"
        },
        surfaceDisabled: "rgba(237, 224, 222, 0.12)",
        onSurfaceDisabled: "rgba(237, 224, 222, 0.38)",
        backdrop: "rgba(59, 45, 44, 0.4)"
      }
    }

export const customLightTheme: MD3Theme = {
    fonts: configureFonts({config: customFontConfig}),
    dark: false,
    roundness: 4,
    version: 3,
    isV3: true,
    colors: {
        primary: "rgb(186, 26, 32)",
        onPrimary: "rgb(255, 255, 255)",
        primaryContainer: "rgb(255, 218, 214)",
        onPrimaryContainer: "rgb(65, 0, 3)",
        secondary: "rgb(119, 86, 83)",
        onSecondary: "rgb(255, 255, 255)",
        secondaryContainer: "rgb(255, 218, 214)",
        onSecondaryContainer: "rgb(44, 21, 19)",
        tertiary: "rgb(114, 91, 46)",
        onTertiary: "rgb(255, 255, 255)",
        tertiaryContainer: "rgb(254, 222, 166)",
        onTertiaryContainer: "rgb(38, 25, 0)",
        error: "rgb(186, 26, 26)",
        onError: "rgb(255, 255, 255)",
        errorContainer: "rgb(255, 218, 214)",
        onErrorContainer: "rgb(65, 0, 2)",
        background: "rgb(255, 251, 255)",
        onBackground: "rgb(32, 26, 25)",
        surface: "rgb(255, 251, 255)",
        onSurface: "rgb(32, 26, 25)",
        surfaceVariant: "rgb(245, 221, 219)",
        onSurfaceVariant: "rgb(83, 67, 66)",
        outline: "rgb(133, 115, 113)",
        outlineVariant: "rgb(216, 194, 191)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(54, 47, 46)",
        inverseOnSurface: "rgb(251, 238, 236)",
        inversePrimary: "rgb(255, 179, 172)",
        elevation: {
          level0: "transparent",
          level1: "rgb(252, 240, 244)",
          level2: "rgb(250, 233, 237)",
          level3: "rgb(247, 226, 231)",
          level4: "rgb(247, 224, 228)",
          level5: "rgb(245, 220, 224)"
        },
        surfaceDisabled: "rgba(32, 26, 25, 0.12)",
        onSurfaceDisabled: "rgba(32, 26, 25, 0.38)",
        backdrop: "rgba(59, 45, 44, 0.4)"
      },
    animation: {
      scale: 1.0,
    },
  };