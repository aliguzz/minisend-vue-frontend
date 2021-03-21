const path = require("path");

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        '/Users/localhost:8080/git/fantasyfootballfrontend/src/styles/global.scss'
      ]
    },
    cordovaPath: 'src-cordova'
  },



  publicPath: '',

  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'VAPP';
        args[0].meta = { viewport: 'width=device-width,initial-scale=1.0,viewport-fit=cover,user-scalable=no' };

        return args;
      })
  }
};
