
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm');

$(function () {
   var type = _mm.getUrlParam('type') || 'default';
   //显示对应的 逻辑
   var $element = $('.'+type+'-success').show();

});