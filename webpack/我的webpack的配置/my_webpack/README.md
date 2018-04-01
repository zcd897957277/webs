1. npx webpack --config webpack.dev.js
   如果 webpack.dev.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。
2. 通过向 npm run build 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack，例如：npm run build -- --colors。
3. webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。
4. 请注意，在多数情况下，你也可以进行 CSS 分离，以便在生产环境中节省加载时间。最重要的是，现有的 loader 可以支持任何你可以想到的 CSS 处理器风格 - postcss, sass 和 less 等。
5. url-loader 可以同时处理css与js中的图片进行打包，处理js中的图片就是将图片import Icon from './1.jpg';至js中对图片添加元素将图片放置html中的方法，url-loader会将这些图片打包，单独处理html中的图片可以参考html-loader与html-withimg-loader
6. webpack --watch 看到 webpack 编译代码，然而却不会退出命令行。这是因为 script 脚本还在观察文件。保存文件并检查终端窗口。应该可以看到 webpack 自动重新编译修改后的模块！唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，可以尝试使用 webpack-dev-server，恰好可以实现我们想要的功能。
7. webpack-dev-server 与webpack --watch 功能基本相同，唯一不同就是webpack-dev-server会自动刷新页面，但是不会打包代码，而--watch会对代码进行打包但是不会对显示页面进行实时更新
8. webpack-dev-server 在使用时，output中配置publicPath: "./"，以及插件HtmlWebpakcplugin中配置filename都会对其造成影响
9. ProvidePlugin 暴露某个模块中单个导出值，只需通过一个“数组路径”进行配置（例如 [module, child, ...children?]）
10. CommonsChunkPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。让我们使用这个插件，将之前的示例中重复的 lodash 模块去除
11. css中background-image中图片地址如果一开始是这样的格式css/index.css ,images/1.jpg 则css中的图片地址是'../images/1.jpg',这种情况下在不使用postcss下没关系，使用了就必须声明publicPath:'../'使得能够获得正确的地址
