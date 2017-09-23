webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(105);


/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(103);


/***/ }),

/***/ 103:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(106);
	__webpack_require__(102);
	var _mm = __webpack_require__(91);
	var _user   = __webpack_require__(108);

	// 表单的错误提示
	var formError = {
	    //显示错误信息
	    show : function (errMsg) {
	        $('.error-item').show().find('.err-msg').text(errMsg);
	    },
	    //隐藏
	    hide : function () {
	        $('.error-item').hide().find('.err-msg').text('');
	    }
	};

	// page逻辑部分
	var page = {
	    init : function () {
	        this.bindEvent();
	    },
	    bindEvent : function () {
	        var _this = this;
	        //登录
	        $("#submit").click(function () {
	            this.submit();
	        });
	        $(".user-content").keyup(function (e) {
	            if(e.keyCode === 13) {
	                this.submit();
	            }
	        })
	    },
	    //提交表单
	    submit : function () {
	        var fromData = {
	            username : $.trim($('#username').val()),
	            password : $.trim($('#password').val())
	        };
	        var validateResult = this.validate();
	        if (validateResult.status ){
	            _user.login(fromData, function (res) {
	                window.location.href = _mm.getUrlParam('redirect') || './index.html';
	            },function (err) {
	                formError.show(err);
	            });
	        }else{
	        //    错误提示
	            formError.show(validateResult.msg);
	        }
	    },
	    //表单元素验证 返回表单验证结果
	    validate : function (fromData) {
	        var result = {
	            status : false,
	            msg    : ''
	        };
	        if(!_mm.validate(fromData.username, 'require')){
	            result.msg = '用户名不能为空';
	            return result;
	        }
	        if(!_mm.validate(fromData.password, 'require')){
	            result.msg = '密码不能为空';
	            return result;
	        }
	        result.status = true;
	        result.msg = '验证通过';
	        return result;
	    }
	};


	$(function () {
	   page.init();
	});

/***/ }),

/***/ 106:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

	

	'use strict';

	var _mm = __webpack_require__(91);

	var _user = {
	    // 用户登录
	    login : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/login.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查用户名
	    checkUsername : function(username, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/check_valid.do'),
	            data    : {
	                type    : 'username',
	                str     : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 用户注册
	    register : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/register.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查登录状态
	    checkLogin : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/get_user_info.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户密码提示问题
	    getQuestion : function(username, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_get_question.do'),
	            data    : {
	                username : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查密码提示问题答案
	    checkAnswer : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 重置密码
	    resetPassword : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户信息
	    getUserInfo : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/get_information.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新个人信息
	    updateUserInfo : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/update_information.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登录状态下更新密码
	    updatePassword : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登出
	    logout : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/logout.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    }
	};
	module.exports = _user;

/***/ })

});