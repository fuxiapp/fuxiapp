(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sale/addGoodsConfig/addGoodsConfig"],{"26ba":function(n,t,o){"use strict";o.r(t);var e=o("c076"),i=o.n(e);for(var d in e)"default"!==d&&function(n){o.d(t,n,function(){return e[n]})}(d);t["default"]=i.a},"73b3":function(n,t,o){"use strict";var e=o("f432"),i=o.n(e);i.a},b900:function(n,t,o){"use strict";var e=function(){var n=this,t=n.$createElement;n._self._c},i=[];o.d(t,"a",function(){return e}),o.d(t,"b",function(){return i})},c076:function(n,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=function(){return o.e("components/goodsItem").then(o.bind(null,"d074"))},i={data:function(){return{infoList:[{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1}],isAccount:!1,moduleType:0}},onLoad:function(n){var t=n.type;""!==t&&void 0!==t&&(this.moduleType=parseInt(t))},onNavigationBarButtonTap:function(){this.$API.to("../../sale/differenceGoodsCheck/differenceGoodsCheck?type=".concat(this.moduleType))},methods:{goEditGoods:function(n){this.$API.to("../../sale/editGoods/editGoods?id=".concat(n))},accountPirce:function(){this.isAccount=!0}},components:{goodsItem:e}};t.default=i},d431:function(n,t,o){"use strict";o.r(t);var e=o("b900"),i=o("26ba");for(var d in i)"default"!==d&&function(n){o.d(t,n,function(){return i[n]})}(d);o("73b3");var u=o("2877"),c=Object(u["a"])(i["default"],e["a"],e["b"],!1,null,null,null);t["default"]=c.exports},f432:function(n,t,o){}},[["8e8e","common/runtime","common/vendor"]]]);