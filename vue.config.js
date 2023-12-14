const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pages:{
    index:{
      //入口
      entry:'src/main.js',
    }
  },
  lintOnSave:false, //关闭语法检查
  transpileDependencies: true,
  devServer:{
    proxy: 'http://localhost:9090'
  }
})
