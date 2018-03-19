const path = require('path');
// 引入压缩插件 uglifyjs-webpack-plugin
const uglify = require('uglifyjs-webpack-plugin');
// 针对html文件的配置
const htmlPlugin = require('html-webpack-plugin');
// 针对css与js代码分离出来时的情况，分离css文件
// (不分离的情况就是在入口js文件中引入css文件)
const extractTextPlugin = require('extract-text-webpack-plugin');
// 引入node的glob对象，用于同步检查html模板
const glob = require('glob');
// 引入purifycss-webpack用于消除未使用的css
const PurifyCSSPlugin = require('purifycss-webpack');
//本机ip地址
const website = {
    // publicPath:'http://192.168.1.27:1717/'
    publicPath:'./'
}
module.exports = {
    //入口文件的配置项
    entry:{
        entry:'./src/entry.js',
        entry2:'./src/entry2.js'
    },
    //出口文件的配置项
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].js',
        // 处理静态文件路径
        publicPath:website.publicPath
    },
    // webpack打包调试
    devtool:'eval-source-map',
    //模块：例如解读CSS，图片如何转换，压缩
    module:{
        rules:[
            // {
            //     test:/\.css$/,
            //     use:extractTextPlugin.extract({
            //         fallback:'style-loader',
            //         use:'css-loader',
            //         publicPath:'../'
            //     })
            // },
             // 图片问题 css中的图片
            {
                test:/\.(png|jpg|gif)/,
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
            // 图片问题 html中的图片 <img/>
            {
                test:/\.(htm|html)$/,
                use:['html-withimg-loader']
            },
            // 针对less的解析 不单独将less分离至index.css中 默认在index.html中
            // {
            //     test:/\.less$/,
            //     use:[{
            //         loader:'style-loader'//creates styles nodes from JS strings
            //     },{
            //         loader:'css-loader'//translates CSS into CommonJS
            //     },{
            //         loader:'less-loader'//compiles Less to CSS
            //     }]
            // }
            // 针对less的解析 将less分离至index.css
            {
                test:/\.less$/,
                use:extractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','less-loader']
                })
            },
            //针对sass的解析 不单独将sass分离至index.css中 默认在index.html中
            // {
            //     test:/\.(sass|scss)$/,
            //     use:[
            //         {
            //             loader:'style-loader',//creates style nodes from JS strings
            //         },
            //         {
            //             loader:'css-loader'//translates CSS into CommonJS
            //         },
            //         {
            //             loader:'sass-loader'// compiles Sass to CSS
            //         }
            //     ]
            // }
            // 针对less的解析 将less分离至index.css
            {
                test:/\.(scss|sass)$/,
                use:extractTextPlugin.extract({
                    // use style-loader in development
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            // 自当处理css3属性前缀 默认不将css从html文件中分离
            // {
            //     test:/\.css$/,
            //     use:[
            //         {
            //             loader:'style-loader'
            //         },{
            //             loader:'css-loader',
            //             options:{
            //                 modules:true
            //             }
            //         },{
            //             loader:'postcss-loader'
            //         }
            //     ]
            // }
            // 自当处理css3属性前缀 提取css
            {
                test:/\.css$/,
                use:extractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',options:{importLoaders:1}//importLoaders Number of loaders applied before CSS loader
                        },'postcss-loader'
                    ],
                    publicPath:'../'
                })
            },
            // 检验es6 将es6语法转译成es5语法  建议配置放到转门的.babelrc文件中
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader'
                },
                exclude:/node_modules/
            }
        ]
        /**
         * loader的三种写法
         * 1.module:{
         *     rules:[
         *        {
         *              test:/\.css$/,
         *              use:['style.loader','css-loader']
         *         }
         *     ]
         * }
         * 2.module:{
         *      rules:[
         *          {
         *              test:/\.css$/,
         *              loader:['style-loader','css-loader']
         *          }
         *      ]
         * }
         * 3.module:{
         *      rules:[
         *          {
         *              test:/\.css$/,
         *              use:[
         *                  {
         *                      loader:'style-loader'
         *                  },
         *                  {
         *                      loader:'css-loader'
         *                  }
         *              ]
         *           }
         *      ]
         * }
         */ 
    },
    // 插件：用于生产模块与各项功能
    plugins:[
        // 压缩  生产环境中使用 开发中不使用
        new uglify(),
        // html的配置
        new htmlPlugin({ //生产环境中使用 开发中不使用
            // mininfy 是否对html文件进行压缩
            minify:{
                // removeAttrubteQuotes 是去掉属性的双引号
                removeAttributeQuotes:true
            },
            //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            hash:true,
            template:'./src/index.html'
        }),
        // css 与 js文件分离 css分离后的路径位置
        new extractTextPlugin("stylesheets/index.css"),
        // 消除未使用的css 该插件必须与extract-text-webpack-plugin插件同用
        new PurifyCSSPlugin({
            //Give paths to parse for rules. These should be absolue!
            paths:glob.sync(path.join(__dirname,'src/*.html'))
        })
    ],
    //配置webpack开发服务功能 开发中使用 生产环境中不使用 
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //设置服务器的ip地址，可以使用IP也可以使用localhost
        host:'192.168.1.27',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }
}