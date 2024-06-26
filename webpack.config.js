const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Node.js 폴리필 설정
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
  };

  return config;
};
