// 调用node中path,用以处理路径
const path = require('path');
const glob = require('glob');
// 用以将common中的通用配置与当前的配置结合在一起
const merge = require('webpack-merge');
// 一个能够删除未引用js代码(dead code)的压缩工具
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// 配置html模板 模板中不使用template属性生成的是一个简单html5页面
const htmlPlugin= require('html-webpack-plugin');
// 消除未使用的CSS
const PurifyCSSPlugin = require("purifycss-webpack");
// 通用配置
const common = require('./webpack.common');
const webpack = require('webpack');
process.env.ASSET_PATH = 'production';
// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = merge(common,{
    entry:{
      jquery:'jquery',
      lodash:'lodash'
    },
    //  出口
    output:{
        //多出口命名
        filename:'[name].[chunkhash].js',
        path:path.resolve(__dirname + '/dist'),
        publicPath: ASSET_PATH
    },
    // 对调试源码(debug)和运行基准测试(benchmark tests)很有帮助
    // 用以帮助开发者查找到源码中js文件错误的位置
    devtool:'source-map',
    // 插件
    plugins:[
        // js 压缩
        new UglifyJSPlugin({
            // 配合 devtool:'source-map'对源码的调试
            sourceMap:true
        }),
        // 该插件帮助我们安心地使用环境变量
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        }),
        // html的配置
        new htmlPlugin({
            //生产环境中使用 开发中不使用
            // mininfy 对html文件进行压缩配置
            minify:{
                // removeAttrubteQuotes 是去掉属性的双引号
                removeAttributeQuotes:true,
                // 去除空格，减少空间
                collapseWhitespace:true,
                // 删除评论
                removeComments: true,
            },
            // 将配置的js等内容置于哪个位置 默认true表示会放置 值可选 head(放置在html中head中)
            // body(放置在html的body的底部)
            inject: true,
            //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            hash:true,
            template:'./src/index.html',
            // html中title的title
            title:'Output Management',
            // 设置html的名字
            filename:'index.html',
            //不包含该js文件
            // excludeChunks: ['contact'],
            //包含
            // chunks: ['contact']
        }),
        // 消除未使用的css 针对源码使用
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        // 优化压缩引用的第三方包
        // 流程为可以在 entry定义一个名称，通过这个插件可以将公共的依赖模块提取到该
        // 已存在的入口chunk中，当然也可以命名一个在入口中没有的文件名
        new webpack.optimize.CommonsChunkPlugin({
            //name对应入口文件中的名字，我们起的是jquery
            names:['jquery','lodash'],
            //把文件打包到哪里，是一个路径
            filename:"assets/js/[name].js",
            //最小打包的文件模块数，这里直接写2就好
            minChunks:2
        }),
    ]
});