export default ({ config }) => {
  return {
    ...config,
    web: {
      ...config.web,
      build: {
        ...config.web.build,
        devServer: {
          port: 3000,
        },
      },
    },
  };
};
