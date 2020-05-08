const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 部署应用时的基本 URL  
    // publicPath: process.env.NODE_ENV === 'production' ? '/' : '192.168.0.231:9090',
    //设置@为一个公共路径
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('jquery', 'jquery');
    },
    // baseUrl: "./",
    devServer: {

        //设置代理
        proxy: {
            //'/api':{}：接口只要是'api'开头的才用代理.这个'api'即标识
            //当设置了标识符后，接口调用就要这么写 :/api/delete?id=123，最后请求的路径就是 http://xxx.xx.com/api/delete?id=123.但是如果正确的接口路径里面没有/api. 所以就需要 pathRewrite,用'^/api':'', 把'/api'用空字符代替,最后请求的路径就是http://xxx.xx.com/delete?id=123了.这样既能有正确标识, 又能在请求接口的时候去掉api.
            '/api': {
                //源地址，即请求接口的url前缀，如果我的接口都在http://xxx.xx.com下，那么源地址就是http://xxx.xx.com
                target: 'http://192.168.0.231:9090',
                //避免跨域问题
                changeOrigin: true,
                //是否代理websockets
                ws: true,
                //顾名思义，这是 ' 路径重写 ’ 的意思
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                'window.jQuery': 'jquery',
                "window.$": "jquery"
            }),
            new HtmlWebpackPlugin({
                filename: './public/index.html',
                template: './public/index.html',
                inject: true,
                // favicon图标(这里需要图标的路径与页面中的路径一样)
                favicon: './public/favicon.ico'
            })
        ]
    },
};