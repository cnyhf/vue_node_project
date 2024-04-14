const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer:{
    proxy:{
      "/adminapi":{
        target:"http://localhost:3000",
        changeOrigin:true
      }
    }
  },
  configureWebpack:{
    devtool:'source-map'
  }
})
