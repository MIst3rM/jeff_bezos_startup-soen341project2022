module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/theme.scss";`,
      },
    },
  },
  lintOnSave: true,
  devServer: {
    disableHostCheck: true,
    sockHost: "store.conco",
    public: "http://0.0.0.0",
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 500,
    },
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "Store",
    },
  },
};
