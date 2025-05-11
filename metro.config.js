const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts
      .filter(ext => ext !== 'svg')
      .concat(['ttf']),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'ts', 'tsx'],
    //blacklistRE: /node_modules\/.*\/node_modules\/react-dom/,
  },
};

module.exports = mergeConfig(defaultConfig, config);
