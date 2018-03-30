// 调用node中path,用以处理路径
const path = require('path');
// 针对css与js代码分离出来时的情况，分离css文件
// (不分离的情况就是在入口js文件中引入css文件)
const extractTextPlugin = require('extract-text-webpack-plugin');
// 静态资源集中输出
const copyWebpackPlugin= require("copy-webpack-plugin");
// 清除文件
const cleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

// ?sourceMap 检测css 出错位置
let cssDev = [
    {loader:'style-loader'},
    {loader:'css-loader?sourceMap',options:{modules: true}},
    {loader: 'postcss-loader'}
];
let cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader'
    ]
});

let lessDev = [
    {loader:'style-loader'},
    {loader:'css-loader?sourceMap',options:{modules: true}},
    {loader: 'postcss-loader'},
    {loader:'less-loader?sourceMap'}
];
let lessProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    //resolve-url-loader may be chained before sass-loader if necessary
    use: [
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader','less-loader?sourceMap'
    ]
});

let scssDev = [
    {loader:'style-loader'},
    {loader:'css-loader?sourceMap',options:{modules: true}},
    {loader: 'postcss-loader'},
    {loader:'sass-loader?sourceMap'}
];
let scssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    //resolve-url-loader may be chained before sass-loader if necessary
    use: [
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader','sass-loader?sourceMap'
    ]
});

let cssConfig = process.env.ASSET_PATH === 'production' ? cssProd : cssDev;
let lessConfig = process.env.ASSET_PATH === 'production' ? lessProd : lessDev;
let scssConfig = process.env.ASSET_PATH === 'production' ? scssProd : scssDev;

// 被清理的文件地址（路径）
let pathsToClean = [
    'dist',
];

module.exports = {
    entry:{
        index:'./src/js/index.js',
        print:'./src/js/print.js'
    },
    output: {
        filename: '[name].js',
        publicPath: process.env.ASSET_PATH === 'production'
            ? './'
            : './'
    },
    // 模块 loader
    module:{
        rules:[
            // 针对css的解析
            // {
            //     test:/\.css$/,
            //     // css与js的分离
            //     use:extractTextPlugin.extract({
            //         // 将css最终插入style放置html
            //         fallback:'style-loader',
            //         // 解析css
            //         use:'css-loader',
            //         // 使得css中的图片能获取正确的地址
            //         publicPath:'../'
            //     })
            // },
            // 解析css文件并同时自动添加css3属性前缀
            {
                test:/\.css$/,
                use:extractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',options:{importLoaders:1}//importLoaders Number of loaders applied before CSS loader
                        },'postcss-loader'
                    ],
                    publicPath:'../'//为了让css中图片地址获取正确的路径
                })
            },
            // 针对less的解析 将less分离至index.css
            {
                test:/\.less$/,
                use:extractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','less-loader']
                })
            },
            // 针对less的解析 将less分离至index.css
            {
                test:/\.(scss|sass)$/,
                use:extractTextPlugin.extract({
                    // use style-loader in development
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            // 图片问题打包css中的图片或者在js文件中通过js添加的图片
            {
                test:/\.(png|jpe?g|gif|svg)/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            //是把小于500000B的文件打成Base64的格式，写入JS。
                            limit:5000,
                            // 打包后的图片放置在images/文件夹下 配置了outputPath也没有
                            // 图片放置在images中的原因时图片大小在limit内
                            outputPath:'images/'
                        }
                    }
                ]
            },
            // 图片问题打包html文件中的图片（<img/>）
            {
                test:/\.(htm|html)$/,
                use:['html-withimg-loader']
            },
            // 检验es6 将es6语法转译成es5语法  建议配置放到转门的.babelrc文件中
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader'
                },
                // 不对该文件进行解析
                exclude:/node_modules/
            },
            // 解析pug文件
            {
                test: /\.pug$/,
                loader: ['raw-loader', 'pug-html-loader']
            },
            //处理字体文件
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:['file-loader']
            }
        ]
    },
    // 插件
    plugins:[
        // css 与 js文件分离 css分离后的路径位置
        new extractTextPlugin("stylesheets/index.css"),
        // 可以用以在js中加上我们的版权或开发者声明。
        new webpack.BannerPlugin('我们的版权或开发者声明。'),
        // 将第三方包对象输出至全局，在全局中任意地方都可以调用
        new webpack.ProvidePlugin({
            // 全局输出jquery可以使用$符号调用
            $:"jquery",
            // 全局输出lodash的join方法，可以在全局任意地方调用该方法
            join: ['lodash', 'join']
        }),
        // 将from中的静态资源集中输出至to中，并且忽略ignore中的文件
        new copyWebpackPlugin([{
            from:__dirname+'/src/public',
            to:'./public',
            ignore: ['.*']
        }]),
        // 清理文件
        new cleanWebpackPlugin(pathsToClean),
    ]
};