const path = require('path')//引入node处理路径模块
const px2rem = require("postcss-plugin-px2rem");
function resolve(dir) {
    return path.join(__dirname, dir)
}
const px2remOptions = {
    rootValue: 19.2,
    unitPrecision: 5,
    // propWhiteList: [],
    // propBlackList: [],
    // exclude: false,
    // selectorBlackList: [],
    // ignoreIdentifier: false,
    // replace: true,
    mediaQuery: false,
    minPixelValue: 0,
};
module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    },
    devServer: {
        proxy: {
            "/admin": {
                target: "http://127.0.0.1:7001",
                ws: true,
                changeOrigin: true,
            },
        },
    },
    css: {
        loaderOptions: {
            postcss: {
                //   px2rem 不支持行内样式的编译
                plugins: [px2rem(px2remOptions)],
            },
        },
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto"
                },
            ]
        }
    }
}

