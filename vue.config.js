const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: { 
    resolve: { 
      alias: { 
        '@': path.resolve(__dirname, 'src'), 
        '@layouts': path.resolve(__dirname, 'src/layouts'), 
        '@v': path.resolve(__dirname, 'src/views') 
      } 
    }
  }
})
