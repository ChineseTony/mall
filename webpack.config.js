var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var WEBPACK_ENV  = process.env.WEBPACK_ENV || 'dev';
// WEBPACK_ENV dev online
// 获取html 参数
var getHtmlConfig = function (name, title) {
    return{
        template : './src/view/'+ name +'.html',
        filename : 'view/'+ name +'.html',
        inject   : true,
        title    : title,
        hash     : true,
        chunks   : ['common', name]
    };
};

var config = {
    // entry : './src/page/index/index.js',
    entry : {
        'common' : ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],
        'user-register' : ['./src/page/user-register/index.js'],
        'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
        'result' : ['./src/page/result/index.js']
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
                loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            //加载.string文件
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve: {
        alias : {
            node_modules    : __dirname + '/node_modules',
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
            getHtmlConfig('index', '首页')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('user-login', '用户登录')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('user-register', '用户注册')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('result', '操作结果')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('user-pass-reset', '找回密码')
        ),
        // js压缩工具
        new webpack.optimize.UglifyJsPlugin()
    ]
};

if('dev' === WEBPACK_ENV){
           config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}
 
module.exports = config;