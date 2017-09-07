'use strict';

// require('../module.js');
// require('./index.css');

// console.log("index hello");

// $('body').html('hello jQuery');
//  ajax 跨域访问
var _mm = require('util/mm.js');
_mm.request({
	url : './test.do',
	success : function(res){
		console.log(res);
	},
	error : function(res){
		console.log(res);
	}
});