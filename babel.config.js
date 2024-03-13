module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      //https://www.npmjs.com/package/react-native-dotenv
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      }],
    ],
    env: {
      production: {
        plugins: [
          ['react-native-paper/babel'],
          ['@babel/plugin-proposal-class-properties'],
          ['react-native-reanimated/plugin'],
        ],
        assumptions: {
          setPublicClassFields: false,
        },
      },
    },
  };
};