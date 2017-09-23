webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(84);


/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// require('../module.js');
	// require('./index.css');

	__webpack_require__(85);
	__webpack_require__(88);
	var navSide = __webpack_require__(95);



	var _mm = __webpack_require__(91);
	navSide.init({
	    name : 'user-center'
	});

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(86);



/***/ }),

/***/ 86:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(89);

	var _mm = __webpack_require__(91);

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

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(96);

	var _mm = __webpack_require__(91);
	var templateIndex = __webpack_require__(98);
	// 侧边导航
	var navSide = {
	    option : {
	        name : '',
	        navList : [
	            {name : 'user-center', desc : '个人中心', href : './usercenter.html'},
	            {name : 'order-list', desc : '我的订单', href : './order-list.html'},
	            {name : 'pass-update', desc : '修改密码', href : './pass-update.html'},
	            {name : 'about', desc : '关于mall', href : './about.html'}
	        ]
	    },
	    init : function (option) {
	        //合并选项
	        $.extend(this.option, option);
	        this.renderNav();
	    },
	    //渲染 左侧导航
	    renderNav : function () {
	    //    计算active数据
	        for (var i = 0 ,len = this.option.navList.length ; i < len; i++){
	            if(this.option.navList[i].name === this.option.name){
	                this.option.navList[i].isActive = true;
	            }
	        }
	    //    渲染list数据
	        var navHtml = _mm.renderHtml(templateIndex, {
	            navList : this.option.navList
	        });
	    //    把HTML放入容器
	        $('.nav-side').html(navHtml);
	    }
	};

	module.exports = navSide;

/***/ }),

/***/ 96:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 98:
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\r\n{{#isActive}}\r\n<li class=\"nav-item active\">\r\n{{/isActive}}\r\n{{^isActive}}\r\n<li class=\"nav-item\">\r\n{{/isActive}}\r\n    <a class=\"link\" href=\"{{href}}\">{{desc}}</a>\r\n</li>\r\n{{/navList}}";

/***/ })

});