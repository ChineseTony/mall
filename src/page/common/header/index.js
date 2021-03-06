'use strict';

require('./index.css');

var _mm = require('util/mm');

// 导航 通用页面导航
// 搜索内容回填 表单提交
var header = {
    init : function () {
        this.bindEvent();
    },
    //搜索内容回填
    onload : function () {
        var keyword = _mm.getUrlParam('keyword');
        if (keyword){
            $('#search-input').val(keyword);
        }
    },
    //表单提交
    bindEvent : function () {
        var _this = this;
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
    //    输入回车提交表单
        $("#search-input").keyup(function (e) {
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        })
    },
    searchSubmit : function () {
        var keyword = $.trim($('#search-input').val());
        if (keyword){
            window.location.href = "./list.html?keyword="+ keyword;
        }else {
            _mm.goHome();
        }
    }
};

header.init();