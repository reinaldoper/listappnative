
module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
