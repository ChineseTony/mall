'use strict';

var conf = {
    serverHost : ''
};

var Hogan = require('hogan');
var _mm = {

	request: function(param){
		var _this = this;
		$.ajax({
			type 	 : param.method || 'get',
			url   	 : param.url   	|| '',
			dataType : param.type  	|| 'json',
			data     : param.data   || '',
			success	 : function(res){
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}else if(10 === res.status){
						// 没有登录 需要强制登录
					_this.doLogin();
				}else if(1 === res.status){
					// 请求数据错误
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error  : function(err){
					typeof param.error === 'function' && param.error(err.statusText);
			}
		})
	},
    //获取服务器地址
    getServerUrl : function (path) {
        return conf.serverHost +  path;
    },
    //获取URL参数  example http://localhost/product/list?keyword=1&page=1 获取keyword
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        console.log(result);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染HTML 模板
      renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    //成功提示
    successTips : function (msg) {
        alert(msg || '操作成功');
    },
    errorTips : function (msg) {
        alert(msg || '操作失败，请检查');
    },
    //前端验证  非空 手机 邮箱校验
    validate : function (value, type) {
        var val = $.trim(value);
        // 非空验证
        if ('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
	//统一登录接口
	doLogin : function(){
		window.location.href = "./user-login.html?redirect=" +
            encodeURIComponent(window.location.href);
	},
    goHome : function () {
        window.location.href = "./index.html";
    }
};

module.exports = _mm;