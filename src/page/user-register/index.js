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
        //用户名 唯一校验
        $("#username").blur(function () {
            var username = $.trim($(this).val());
            if(!username) {
                return ;
            }
            //    ajax 校验
            _user.checkUsername(username,function (res) {
                formError.hide();
            }, function (errMsg) {
                formError.show(errMsg)
            })

        });
        //注册
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
            password : $.trim($('#password').val()),
            passwordConfim : $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val())
        };
        var validateResult = this.validate(fromData);
        if (validateResult.status ){
            _user.register(fromData, function (res) {
                window.location.href = _mm.getUrlParam('redirect') || './result.html?type=register';
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
        if(fromData.password.length < 6){
            result.msg = '密码长度不能少于6位';
            return result;
        }
        if(fromData.password !== fromData.passwordConfim){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        if (!_mm.validate(fromData.phone, 'phone')){
            result.msg = '请输入正确的手机格式';
            return result;
        }

        if (!_mm.validate(fromData.email, 'email')){
            result.msg = '请输入正确的邮箱格式';
            return result;
        }
        if(!_mm.validate(fromData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if(!_mm.validate(fromData.answer, 'require')){
            result.msg = '密码提示答案不能为空';
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