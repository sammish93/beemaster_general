// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});
config.resolver.sourceExts.push("cjs");

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "react-native-maps": "@teovilla/react-native-web-maps",
};

module.exports = config;
