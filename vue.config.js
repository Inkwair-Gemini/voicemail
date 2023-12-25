const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "./",//配置静态资源
  pages:{
    index:{
      //入口
      entry:'src/main.js',
    }
  },
  lintOnSave:false, 
  transpileDependencies: false,//关闭语法检查
  // devServer:{
  //   proxy: 'http://127.0.0.1:5000'
  // },
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js" //将preloadp配置为全局对象
    }
  }
})
