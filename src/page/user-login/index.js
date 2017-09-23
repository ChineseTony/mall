'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm');
var _user   = require('service/user_service.js');

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
            _this.submit();
        });
        $(".user-content").keyup(function (e) {
            if(e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    //提交表单
    submit : function () {
        var fromData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        };
        var validateResult = this.validate(fromData);
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