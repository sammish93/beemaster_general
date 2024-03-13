import HiveCard from "@/components/hive/HiveCard";
import { render } from "@testing-library/react-native";
import * as React from "react";
import { customLightTheme, customFontConfig } from "@/assets/themes";
import { PaperProvider, useTheme, configureFonts } from "react-native-paper";
import { Provider } from "mobx-react";
import en from "@/constants/localisation/en.json";

// Mocking a view model. The viewModel.i18n.t(<localisation key>) function is mocked in beforeEach below.
const userViewModel = { i18n: { t: null } };

// Mocking the hive to inject into the <HiveCard>
const mockHiveItem = {
  id: "1",
  name: "Hive-test",
};

// Mock implementation of theme - defaulted to light theme in this case.
jest.mock("react-native-paper", () => {
  const originalModule = jest.requireActual("react-native-paper");

  // Define the fonts manually - The theme has too many dependencies and is written in TypeScript
  // to render fonts. Pretty annoying otherwise.
  const mockFonts = {
    displaySmall: {
      fontFamily: "ChelaOne",
      fontSize: 36,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 44,
    },
    displayMedium: {
      fontFamily: "ChelaOne",
      fontSize: 45,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 52,
    },
    displayLarge: {
      fontFamily: "ChelaOne",
      fontSize: 57,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 64,
    },
    headlineSmall: {
      fontFamily: "ChelaOne",
      fontSize: 24,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 32,
    },
    headlineMedium: {
      fontFamily: "ChelaOne",
      fontSize: 28,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 36,
    },
    headlineLarge: {
      fontFamily: "ChelaOne",
      fontSize: 32,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 40,
    },
    titleSmall: {
      fontFamily: "ChelaOne",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    titleMedium: {
      fontFamily: "ChelaOne",
      fontSize: 16,
      fontWeight: "500",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    titleLarge: {
      fontFamily: "ChelaOne",
      fontSize: 22,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 28,
    },
    bodySmall: {
      fontFamily: "PatrickHand",
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0.4,
      lineHeight: 16,
    },
    bodyMedium: {
      fontFamily: "PatrickHand",
      fontSize: 14,
      fontWeight: "400",
      letterSpacing: 0.25,
      lineHeight: 20,
    },
    bodyLarge: {
      fontFamily: "PatrickHand",
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    labelSmall: {
      fontFamily: "PatrickHand",
      fontSize: 11,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelMedium: {
      fontFamily: "PatrickHand",
      fontSize: 12,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelLarge: {
      fontFamily: "PatrickHand",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
  };

  // Mock implementation of useTheme
  const useTheme = jest.fn(() => ({
    ...originalModule.MD3LightTheme,
    fonts: mockFonts,
  }));

  return {
    ...originalModule,
    useTheme,
  };
});

// Wraps around every test - reduces lines of code.
const customRender = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => (
      <Provider userViewModel={userViewModel}>
        <PaperProvider theme={customLightTheme}>{children}</PaperProvider>
      </Provider>
    ),
    ...options,
  });

beforeEach(() => {
  // Mocks localisation to English.
  if (!userViewModel.i18n) {
    userViewModel.i18n = { t: jest.fn() };
  } else {
    userViewModel.i18n.t = jest.fn();
  }

  userViewModel.i18n.t.mockImplementation((key) => en[key] || key);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("HiveCard", () => {
  it("renders the hive name correctly", () => {
    const { getByText } = customRender(
      <HiveCard
        item={mockHiveItem}
        isDetailedView={false}
        onPress={() => null}
        maxWidth={200}
      />
    );

    expect(getByText("Hive-test")).toBeTruthy();
  });

  it("renders sensor data when isDetailedView is true", () => {
    const { queryByText } = customRender(
      <HiveCard
        item={mockHiveItem}
        isDetailedView={true}
        onPress={() => null}
        maxWidth={200}
      />
    );

    expect(queryByText("57.6 kg")).not.toBeNull();
    expect(queryByText("34.2 °C")).not.toBeNull();
    expect(queryByText("54%")).not.toBeNull();
    expect(queryByText("421 p/h")).not.toBeNull();
  });

  it("should not render sensor data when isDetailedView is false", () => {
    const { queryByText } = customRender(
      <HiveCard
        item={mockHiveItem}
        isDetailedView={false}
        onPress={() => null}
        maxWidth={200}
      />
    );

    expect(queryByText("57.6 kg")).toBeNull();
    expect(queryByText("34.2 °C")).toBeNull();
    expect(queryByText("54%")).toBeNull();
    expect(queryByText("421 p/h")).toBeNull();
  });

  it("renders only Temperature, Wind, and Rain when isDetailedView is false", () => {
    const { queryByText } = customRender(
      <HiveCard
        item={mockHiveItem}
        isDetailedView={false}
        onPress={() => null}
        maxWidth={200}
      />
    );

    expect(queryByText("21 °C")).not.toBeNull();
    expect(queryByText("4 km/h")).not.toBeNull();
    expect(queryByText("0.0mm")).not.toBeNull();
    expect(queryByText("57.6 kg")).toBeNull();
  });
});
