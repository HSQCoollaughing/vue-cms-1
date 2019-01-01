const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin } = require("vue-loader");

module.exports = {
    entry: path.join(__dirname, './src/main.js'),//入口文件
    output: { //输出文件
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.(jpg|png|jpeg|gif|bmp)$/, use: 'url-loader?limit=7630&name=[hash:8]-[name].[ext]'},
            //如果不加其他限制，这种加载图片的方式通畅会把图片转成base64，
            // 如果我们希望限制图片小于一定大小转否则不转可以加limit参数
            {test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'url-loader'},
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    },
    resolve:{
        alias:{
            "vue$":'vue/dist/vue.js'  //修改vue包导入的时候的路径
        }
    }

}
 