var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var WEBPACK_ENV  = process.env.WEBPACK_ENV || 'dev';
// WEBPACK_ENV dev online
// 获取html 参数
var getHtmlConfig = function (name) {
    return{
        template : './src/view/'+ name +'.html',
        filename : 'view/'+ name +'.html',
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    };
};

var config = {
    // entry : './src/page/index/index.js',
    entry : {
        'common' : ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
    },
    output : {
        path : './dist',
        publicPath : '/dist',
        filename : 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]' }
        ]
    },
    resolve: {
        alias : {
            util : __dirname+"/src/util",
            page : __dirname+"/src/page",
            service : __dirname+"/src/service",
            image : __dirname+"/src/image"
        }
    }, 
    externals : {
        'jquery' : 'window.jQuery'
    },
    plugins : [
        //通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename : 'js/base.js'
        }),
        // css 单独打包
        new ExtractTextPlugin("css/[name].css"),
    //     html 模板处理
        new HtmlWebpackPlugin(
            getHtmlConfig('index')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('login')
        )

    ]
};

    if('dev' === WEBPACK_ENV){
           config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
     }
 
module.exports = config;