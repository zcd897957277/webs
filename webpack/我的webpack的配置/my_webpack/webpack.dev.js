// 调用node中path,用以处理路径
const path = require('path');
// 用以将common中的通用配置与当前的配置结合在一起
const merge = require('webpack-merge');
// 配置html模板 模板中不使用template属性生成的是一个简单html5页面
const htmlPlugin= require('html-webpack-plugin');
// 通用配置
const common = require('./webpack.common');
const webpack = require('webpack');

process.env.ASSET_PATH = 'development';
// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = merge(common,{
    // 对调试源码(debug)和运行基准测试(benchmark tests)很有帮助
    // 用以帮助开发者查找到源码中js文件错误的位置
    devtool:'inline-source-map',
    //  配置webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading
    devServer:{
        // 指明访问地址
        contentBase:path.resolve(__dirname,'dist'),
        //在 localhost:8080 下建立服务
        // 端口
        port:8080,
        // 主机
        host:'localhost',
        open:true,
        // //服务端压缩是否开启
        compress:true,
        //热更新
        hot: true
    },
    // 插件
    plugins:[
        // html的配置
        new htmlPlugin({ //生产环境中使用 开发中不使用
            template:'./src/index.html',
            // html中title的title
            title:'Output Management',
            // 设置html的名字
            filename:'index.html',
            // 将配置的js等内容置于哪个位置 默认true表示会放置 值可选 head(放置在html中head中)
            // body(放置在html的body的底部)
            inject: true,
            //不包含该js文件
            // excludeChunks: ['contact'],
            //包含
            // chunks: ['contact']
        }),
        // 配合webpack-dev-server 进行模块热替换
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // 该插件帮助我们安心地使用环境变量
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        }),
    ],
    // watch 的配置
    watchOptions:{
        //检测修改的时间，以毫秒为单位
        poll:1000,
        //防止重复保存而发生重复编译错误。这里设置的500是半秒内重复保存，不进行打包操作
        aggregateTimeout:500,
        //不监听的目录
        ignored:/node_modules/,
    }
});