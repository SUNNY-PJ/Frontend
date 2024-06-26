const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.extraNodeModules = {
    crypto: require.resolve('react-native-crypto'),
    stream: require.resolve('stream-browserify'),
  };

  return config;
})();
