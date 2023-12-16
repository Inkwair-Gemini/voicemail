const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "./",//配置静态资源
  pages:{
    index:{
      //入口
      entry:'src/main.js',
    }
  },
  lintOnSave:false, //关闭语法检查
  transpileDependencies: true,
  devServer:{
    proxy: 'http://localhost:5000'
  }
})
