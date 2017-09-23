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
    data : {
      username : '',
      question : '',
      answer   : '',
      token    : ''
    },
    init : function () {
        this.onload();
        this.bindEvent();
    },
    onload : function () {
            this.loadStepUsername();
    },
    bindEvent : function () {
        var _this = this;
        //登录
        $("#submit-username").click(function () {
            var username = $.trim($('#username').val());
            if (username){
                _user.getQuestion(username,function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion() ;
                },function (errMsg) {
                    formError.show(errMsg);
                })
            }else {
                formError.show('请输入用户名')
            }
        });

        $("#submit-question").click(function () {
            var answer = $.trim($("#answer").val());
            if (answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : _this.data.answer
                },function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res.token;
                    _this.loadStepPassword();
                },function (errMsg) {
                    formError.show(errMsg);
                })
            }else {
                formError.show('请输入密码提示问题答案')
            }
        });

        $('#submit-password').click(function () {
            var password = $.trim($("#password").val());
            if (password && password.length >= 6){
                _user.updatePassword({
                    username        : _this.data.username,
                    passwordNew     : password,
                    forgetToken     : _this.data.token
                },function (res) {

                },function (errMsg) {
                    formError.show(errMsg);
                })
            }else {
                formError.show('用户密码不能为空');
            }
        });
    },
    //加载输入用户名的第一步
    loadStepUsername : function () {
        $('.step-username').show();
    },
    loadStepQuestion : function () {
        formError.hide();
        $('.step-username').hide();
        $('.step-password').show().find('.question').text(this.data.question);
    },
    loadStepPassword : function () {
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        $('.step-question').hide().siblings('.step-password').show();
    }

};


$(function () {
    page.init();
});