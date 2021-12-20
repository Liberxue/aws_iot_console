module.exports = {
  devServer: {
    public: 'a2g12gxb5alkoc-ats.iot.us-east-1.amazonaws.com',
    disableHostCheck: true
  },
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
};
