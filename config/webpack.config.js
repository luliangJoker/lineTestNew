const path = require("path");
const uglify = require('uglifyjs-webpack-plugin'); //js压缩
const htmlPlugin = require("html-webpack-plugin"); //html打包
const extractTextPlugin = require('extract-text-webpack-plugin'); //css 分离
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //vue打包
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清空

module.exports = {
    mode: "production", //入口文件的配置项
    entry: {
        main: './src/main.js'
    },
    //打包
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        'mint-ui': 'MINT',
        'BMap':'BMap'
    },
    // 调试
    // devtool: '#eval-source-map',
    //出口文件配置项
    output: {
        //输出路径
        path: path.resolve(__dirname, '../paps'),
        filename: 'js/[name].js'
    // publicPath: website.publicPath
    },
    //模块： 例如解读css，图片如何转换，压缩
    module: {
        rules: [
            //css
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "postcss-loader",
                    }]
                })
            },
            //图片压缩
            {
                test: /\.(png|jpg|gif|jpeg)/, //是匹配图片文件后缀名称
                use: [{
                    loader: 'url-loader', //是指定使用的loader和loader的配置参数
                    options: {
                        name: '[name].[ext]',
                        limit: 500,
                        outputPath: 'images/' //是把小于500B的文件打成Base64的格式，写入JS
                    }
                }]
            },
            //html文件
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            //less loader
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            //sass loader
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader",
                    publicPath: '../'
                })
            },
            //babel 配置
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            //vue配置
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'coffee-loader'
                    },
                    preLoaders: {
                        js: '/path/to/custom/loader'
                    },
                    postLoaders: {
                        html: 'babel-loader'
                    }
                }
            }
        ]
    },
    //插件，用于生产模板和各项功能
    plugins: [
        new CleanWebpackPlugin('../ifspaps'),
        new uglify(),
        new htmlPlugin({
            // minify: {
            //     removeAttributeQuotes: true //removeAttrubuteQuotes是却掉属性的双引号。
            // },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './src/pages/index.html' //是要打包的html模版路径和文件名称。
        }),
        new extractTextPlugin("css/index.css"),
        new VueLoaderPlugin()
    ],
    //vue
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    }

}