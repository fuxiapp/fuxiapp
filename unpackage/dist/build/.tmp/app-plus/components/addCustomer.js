(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/addCustomer"],{"049e":function(t,e,n){"use strict";var i=n("ac41"),u=n.n(i);u.a},"541c":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{selPrivince:{type:Array,default:[]},selCityInfo:{type:Array,default:[]},selCounty:{type:Array,default:[]},isShowCity:{type:Boolean,default:!1},cityType:{type:Number,default:0},moduleType:{type:Number,default:1},selCityNameS:{}},data:function(){return{}},onLoad:function(){},methods:{selCity:function(t){this.$emit("selCity",t)},closeAlert:function(){this.$emit("closeAlertCity")},okCityValue:function(t,e){t.index=e,this.$emit("okCityValue",t)},closeAdd:function(){this.$emit("saveCustomer")},saveCustomer:function(){this.$emit("saveCustomer")},goPlaceOrder:function(){this.$API.to("../../sale/invoice/invoice?type={this.moduleType}")}}};e.default=i},"9dbc":function(t,e,n){"use strict";n.r(e);var i=n("cb75"),u=n("ebd3");for(var o in u)"default"!==o&&function(t){n.d(e,t,function(){return u[t]})}(o);n("049e");var a=n("2877"),r=Object(a["a"])(u["default"],i["a"],i["b"],!1,null,"0f63feda",null);e["default"]=r.exports},ac41:function(t,e,n){},cb75:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return u})},ebd3:function(t,e,n){"use strict";n.r(e);var i=n("541c"),u=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/addCustomer-create-component',
    {
        'components/addCustomer-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("9dbc"))
        })
    },
    [['components/addCustomer-create-component']]
]);                
