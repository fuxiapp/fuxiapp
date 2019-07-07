(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /^\$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [];
var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}



var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  });
}

function initVueComponent(Vue$$1, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue$$1.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage$$1 = _ref5.isPage,initRelation$$1 = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage$$1.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation$$1.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (isPage$$1) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });


  initHooks(pageOptions.methods, hooks$1);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(vm._getFormData || (vm.$parent && vm.$parent.__next_tick_pending)){
              return
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
    // 确保当前 vm 所有数据被同步
    var dataKeys = [].concat(
        Object.keys(vm._data || {}),
        Object.keys(vm._computedWatchers || {}));

    var ret = dataKeys.reduce(function(ret, key) {
        ret[key] = vm[key];
        return ret
    }, Object.create(null));
    //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
    Object.assign(ret, vm.$mp.data || {});
    if (
        Array.isArray(vm.$options.behaviors) &&
        vm.$options.behaviors.indexOf('uni://form-field') !== -1
    ) { //form-field
        ret['name'] = vm.name;
        ret['value'] = vm.value;
    }
    return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
    var this$1 = this;

    if (vnode === null) { //destroy
        return
    }
    if (this.mpType === 'page' || this.mpType === 'component') {
        var mpInstance = this.$scope;
        var data = cloneWithData(this);
        data.__webviewId__ = mpInstance.data.__webviewId__;
        var mpData = Object.create(null);
        Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
            mpData[key] = mpInstance.data[key];
        });
        var diffData = diff(data, mpData);
        if (Object.keys(diffData).length) {
            if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                    ']差量更新',
                    JSON.stringify(diffData));
            }
            this.__next_tick_pending = true;
            mpInstance.setData(diffData, function () {
                this$1.__next_tick_pending = false;
                flushCallbacks$1(this$1);
            });
        } else {
            flushCallbacks$1(this);
        }
    }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
    var parts = path.split('.');
    var key = parts[0];
    if (key.indexOf('__$n') === 0) { //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (parts.length === 1) {
        return obj[key]
    }
    return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

    var oldEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(event) {
        if (this.$scope && event) {
            this.$scope['triggerEvent'](event, {
                __args__: toArray(arguments, 1)
            });
        }
        return oldEmit.apply(this, arguments)
    };
    
    Vue.prototype.$nextTick = function (fn) {
      return nextTick$1(this, fn)
    };

    MP_METHODS.forEach(function (method) {
        Vue.prototype[method] = function(args) {
            if (this.$scope) {
                return this.$scope[method](args)
            }
        };
    });

    Vue.prototype.__init_provide = initProvide;

    Vue.prototype.__init_injections = initInjections;

    Vue.prototype.__call_hook = function(hook, args) {
        var vm = this;
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        var ret;
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
        }
        popTarget();
        return ret
    };

    Vue.prototype.__set_model = function(target, key, value, modifiers) {
        if (Array.isArray(modifiers)) {
            if (modifiers.indexOf('trim') !== -1) {
                value = value.trim();
            }
            if (modifiers.indexOf('number') !== -1) {
                value = this._n(value);
            }
        }
        if(!target){
            target = this;
        }
        target[key] = value;
    };

    Vue.prototype.__set_sync = function(target, key, value) {
        if(!target){
            target = this;
        }
        target[key] = value;
    };

    Vue.prototype.__get_orig = function(item) {
        if (isPlainObject(item)) {
            return item['$orig'] || item
        }
        return item
    };

    Vue.prototype.__get_value = function(dataPath, target) {
        return getTarget(target || this, dataPath)
    };


    Vue.prototype.__get_class = function(dynamicClass, staticClass) {
        return renderClass(staticClass, dynamicClass)
    };

    Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
        if (!dynamicStyle && !staticStyle) {
            return ''
        }
        var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
        var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
        return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
    };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\api\\index.js":
/*!******************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/api/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var API = {
  get: function get(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET'; // get请求
    return new Promise(function (resolve, reject) {
      // 获取网络类型
      url = "http://116.55.248.84:9090".concat(url);
      uni.request({
        url: url,
        method: method,
        data: data,
        header: { //自定义请求头信息
          'content-type': 'application/x-www-form-urlencoded' },

        success: function success(res) {
          var data = res.data;
          if (data.code === 'success') {
            resolve(data);
          } else if (data.code === 'no-login') {
            uni.navigateTo({
              url: '../../login/login' });

          } else {
            uni.showToast({
              title: '' + data.msg,
              icon: 'none' });

            resolve(data);
          }
        },
        fail: function fail(err) {
          uni.showToast({
            title: '请求异常',
            icon: 'none' });

          reject(err);
        } });

    });
  },
  post: function post(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; // post请求
    return new Promise(function (resolve, reject) {
      // 获取网络类型
      url = "http://116.55.248.84:9090".concat(url);
      uni.request({
        url: url,
        data: data,
        method: 'POST',
        header: { //自定义请求头信息
          'content-type': 'application/json' },

        success: function success(res) {
          var data = res.data;
          if (data.code === 'success') {
            resolve(data);
          } else if (data.code === 'no-login') {
            uni.navigateTo({
              url: '../../login/login' });

          } else {
            uni.showToast({
              title: '' + data.message,
              icon: 'none' });

            resolve(data);
          }
        },
        fail: function fail(err) {
          uni.showToast({
            title: '请求异常',
            icon: 'none' });

          reject(err);
        } });

    });
  },
  //图片上传
  upload: function upload() {var goodsCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return new Promise(function (resolve, reject) {
      var url = "http://116.55.248.84:9090/fuxi/common/upload-image?goodsCode=".concat(goodsCode);
      // 获取网络类型
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], //从相册选择
        success: function success(res) {
          var imageSrc = res.tempFilePaths[0];
          uni.uploadFile({
            url: url,
            filePath: imageSrc,
            fileType: 'image',
            name: 'file',
            success: function success(res) {
              res.imageSrc = imageSrc;
              resolve(res);
            },
            fail: function fail(err) {
              resolve(err);
            } });

        },
        fail: function fail(err) {
          reject(err);
        } });

    });
  },
  // 底部导航栏切换
  tab: function tab(url) {
    return new Promise(function (resolve, reject) {
      uni.switchTab({
        url: url,
        success: function success(res) {
          resolve(res);
        },
        fail: function fail(err) {
          reject(err);
        } });

    });
  },
  // 页面跳转
  to: function to(url) {
    return new Promise(function (resolve, reject) {
      uni.navigateTo({
        url: url,
        success: function success(res) {
          resolve(res);
        },
        fail: function fail(err) {
          reject(err);
        } });

    });
  },
  //页面后退
  bank: function bank() {var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    uni.navigateBack({
      delta: delta });

  },
  // 设置本地缓存
  setStorage: function setStorage(key, data) {
    return new Promise(function (resolve, reject) {
      uni.setStorage({
        key: key,
        data: data,
        success: function success(res) {
          resolve(res);
        },
        fail: function fail(err) {
          reject(err);
        } });

    });
  },
  // 获取本地缓存
  getStorage: function getStorage(key) {
    return new Promise(function (resolve, reject) {
      uni.getStorage({
        key: key,
        success: function success(res) {
          resolve(res);
        },
        fail: function fail(err) {
          reject(err);
        } });

    });
  },
  //删除本地缓存
  removeStorage: function removeStorage(key) {
    return new Promise(function (resolve, reject) {
      uni.removeStorage({
        key: key,
        success: function success(res) {
          resolve(res);
        },
        fail: function fail(err) {
          reject(err);
        } });

    });
  },
  //设置标题
  setTitle: function setTitle(title) {
    uni.setNavigationBarTitle({
      title: title });

  },
  disLeftNav: function disLeftNav() {
    var pages = getCurrentPages();
    var page = pages[pages.length - 1];
    var currentWebview = page.$getAppWebview();
    var titleObj = currentWebview.getStyle().titleNView;
    titleObj.autoBackButton = false;
    currentWebview.setStyle({
      titleNView: titleObj });

  } };var _default =

API;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\common\\city-data.json":
/*!***************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/common/city-data.json ***!
  \***************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, default */
/***/ (function(module) {

module.exports = [{"values":"北京市","code":"110000","children":[{"values":"北京市","code":"110000","children":[{"values":"东城区","code":"110101"},{"values":"西城区","code":"110102"},{"values":"朝阳区","code":"110105"},{"values":"丰台区","code":"110106"},{"values":"石景山区","code":"110107"},{"values":"海淀区","code":"110108"},{"values":"门头沟区","code":"110109"},{"values":"房山区","code":"110111"},{"values":"通州区","code":"110112"},{"values":"顺义区","code":"110113"},{"values":"昌平区","code":"110114"},{"values":"大兴区","code":"110115"},{"values":"怀柔区","code":"110116"},{"values":"平谷区","code":"110117"},{"values":"密云县","code":"110228"},{"values":"延庆县","code":"110229"}]}]},{"values":"天津市","code":"120000","children":[{"values":"天津市","code":"120000","children":[{"values":"和平区","code":"120101"},{"values":"河东区","code":"120102"},{"values":"河西区","code":"120103"},{"values":"南开区","code":"120104"},{"values":"河北区","code":"120105"},{"values":"红桥区","code":"120106"},{"values":"东丽区","code":"120110"},{"values":"西青区","code":"120111"},{"values":"津南区","code":"120112"},{"values":"北辰区","code":"120113"},{"values":"武清区","code":"120114"},{"values":"宝坻区","code":"120115"},{"values":"滨海新区","code":"120116"},{"values":"宁河县","code":"120221"},{"values":"静海县","code":"120223"},{"values":"蓟县","code":"120225"}]}]},{"values":"河北省","code":"130000","children":[{"values":"石家庄市","code":"130100","children":[{"values":"市辖区","code":"130101"},{"values":"长安区","code":"130102"},{"values":"桥东区","code":"130103"},{"values":"桥西区","code":"130104"},{"values":"新华区","code":"130105"},{"values":"井陉矿区","code":"130107"},{"values":"裕华区","code":"130108"},{"values":"井陉县","code":"130121"},{"values":"正定县","code":"130123"},{"values":"栾城县","code":"130124"},{"values":"行唐县","code":"130125"},{"values":"灵寿县","code":"130126"},{"values":"高邑县","code":"130127"},{"values":"深泽县","code":"130128"},{"values":"赞皇县","code":"130129"},{"values":"无极县","code":"130130"},{"values":"平山县","code":"130131"},{"values":"元氏县","code":"130132"},{"values":"赵县","code":"130133"},{"values":"辛集市","code":"130181"},{"values":"藁城市","code":"130182"},{"values":"晋州市","code":"130183"},{"values":"新乐市","code":"130184"},{"values":"鹿泉市","code":"130185"}]},{"values":"唐山市","code":"130200","children":[{"values":"市辖区","code":"130201"},{"values":"路南区","code":"130202"},{"values":"路北区","code":"130203"},{"values":"古冶区","code":"130204"},{"values":"开平区","code":"130205"},{"values":"丰南区","code":"130207"},{"values":"丰润区","code":"130208"},{"values":"曹妃甸区","code":"130209"},{"values":"滦县","code":"130223"},{"values":"滦南县","code":"130224"},{"values":"乐亭县","code":"130225"},{"values":"迁西县","code":"130227"},{"values":"玉田县","code":"130229"},{"values":"遵化市","code":"130281"},{"values":"迁安市","code":"130283"}]},{"values":"秦皇岛市","code":"130300","children":[{"values":"市辖区","code":"130301"},{"values":"海港区","code":"130302"},{"values":"山海关区","code":"130303"},{"values":"北戴河区","code":"130304"},{"values":"青龙满族自治县","code":"130321"},{"values":"昌黎县","code":"130322"},{"values":"抚宁县","code":"130323"},{"values":"卢龙县","code":"130324"}]},{"values":"邯郸市","code":"130400","children":[{"values":"市辖区","code":"130401"},{"values":"邯山区","code":"130402"},{"values":"丛台区","code":"130403"},{"values":"复兴区","code":"130404"},{"values":"峰峰矿区","code":"130406"},{"values":"邯郸县","code":"130421"},{"values":"临漳县","code":"130423"},{"values":"成安县","code":"130424"},{"values":"大名县","code":"130425"},{"values":"涉县","code":"130426"},{"values":"磁县","code":"130427"},{"values":"肥乡县","code":"130428"},{"values":"永年县","code":"130429"},{"values":"邱县","code":"130430"},{"values":"鸡泽县","code":"130431"},{"values":"广平县","code":"130432"},{"values":"馆陶县","code":"130433"},{"values":"魏县","code":"130434"},{"values":"曲周县","code":"130435"},{"values":"武安市","code":"130481"}]},{"values":"邢台市","code":"130500","children":[{"values":"市辖区","code":"130501"},{"values":"桥东区","code":"130502"},{"values":"桥西区","code":"130503"},{"values":"邢台县","code":"130521"},{"values":"临城县","code":"130522"},{"values":"内丘县","code":"130523"},{"values":"柏乡县","code":"130524"},{"values":"隆尧县","code":"130525"},{"values":"任县","code":"130526"},{"values":"南和县","code":"130527"},{"values":"宁晋县","code":"130528"},{"values":"巨鹿县","code":"130529"},{"values":"新河县","code":"130530"},{"values":"广宗县","code":"130531"},{"values":"平乡县","code":"130532"},{"values":"威县","code":"130533"},{"values":"清河县","code":"130534"},{"values":"临西县","code":"130535"},{"values":"南宫市","code":"130581"},{"values":"沙河市","code":"130582"}]},{"values":"保定市","code":"130600","children":[{"values":"市辖区","code":"130601"},{"values":"新市区","code":"130602"},{"values":"北市区","code":"130603"},{"values":"南市区","code":"130604"},{"values":"满城县","code":"130621"},{"values":"清苑县","code":"130622"},{"values":"涞水县","code":"130623"},{"values":"阜平县","code":"130624"},{"values":"徐水县","code":"130625"},{"values":"定兴县","code":"130626"},{"values":"唐县","code":"130627"},{"values":"高阳县","code":"130628"},{"values":"容城县","code":"130629"},{"values":"涞源县","code":"130630"},{"values":"望都县","code":"130631"},{"values":"安新县","code":"130632"},{"values":"易县","code":"130633"},{"values":"曲阳县","code":"130634"},{"values":"蠡县","code":"130635"},{"values":"顺平县","code":"130636"},{"values":"博野县","code":"130637"},{"values":"雄县","code":"130638"},{"values":"涿州市","code":"130681"},{"values":"定州市","code":"130682"},{"values":"安国市","code":"130683"},{"values":"高碑店市","code":"130684"}]},{"values":"张家口市","code":"130700","children":[{"values":"市辖区","code":"130701"},{"values":"桥东区","code":"130702"},{"values":"桥西区","code":"130703"},{"values":"宣化区","code":"130705"},{"values":"下花园区","code":"130706"},{"values":"宣化县","code":"130721"},{"values":"张北县","code":"130722"},{"values":"康保县","code":"130723"},{"values":"沽源县","code":"130724"},{"values":"尚义县","code":"130725"},{"values":"蔚县","code":"130726"},{"values":"阳原县","code":"130727"},{"values":"怀安县","code":"130728"},{"values":"万全县","code":"130729"},{"values":"怀来县","code":"130730"},{"values":"涿鹿县","code":"130731"},{"values":"赤城县","code":"130732"},{"values":"崇礼县","code":"130733"}]},{"values":"承德市","code":"130800","children":[{"values":"市辖区","code":"130801"},{"values":"双桥区","code":"130802"},{"values":"双滦区","code":"130803"},{"values":"鹰手营子矿区","code":"130804"},{"values":"承德县","code":"130821"},{"values":"兴隆县","code":"130822"},{"values":"平泉县","code":"130823"},{"values":"滦平县","code":"130824"},{"values":"隆化县","code":"130825"},{"values":"丰宁满族自治县","code":"130826"},{"values":"宽城满族自治县","code":"130827"},{"values":"围场满族蒙古族自治县","code":"130828"}]},{"values":"沧州市","code":"130900","children":[{"values":"市辖区","code":"130901"},{"values":"新华区","code":"130902"},{"values":"运河区","code":"130903"},{"values":"沧县","code":"130921"},{"values":"青县","code":"130922"},{"values":"东光县","code":"130923"},{"values":"海兴县","code":"130924"},{"values":"盐山县","code":"130925"},{"values":"肃宁县","code":"130926"},{"values":"南皮县","code":"130927"},{"values":"吴桥县","code":"130928"},{"values":"献县","code":"130929"},{"values":"孟村回族自治县","code":"130930"},{"values":"泊头市","code":"130981"},{"values":"任丘市","code":"130982"},{"values":"黄骅市","code":"130983"},{"values":"河间市","code":"130984"}]},{"values":"廊坊市","code":"131000","children":[{"values":"市辖区","code":"131001"},{"values":"安次区","code":"131002"},{"values":"广阳区","code":"131003"},{"values":"固安县","code":"131022"},{"values":"永清县","code":"131023"},{"values":"香河县","code":"131024"},{"values":"大城县","code":"131025"},{"values":"文安县","code":"131026"},{"values":"大厂回族自治县","code":"131028"},{"values":"霸州市","code":"131081"},{"values":"三河市","code":"131082"}]},{"values":"衡水市","code":"131100","children":[{"values":"市辖区","code":"131101"},{"values":"桃城区","code":"131102"},{"values":"枣强县","code":"131121"},{"values":"武邑县","code":"131122"},{"values":"武强县","code":"131123"},{"values":"饶阳县","code":"131124"},{"values":"安平县","code":"131125"},{"values":"故城县","code":"131126"},{"values":"景县","code":"131127"},{"values":"阜城县","code":"131128"},{"values":"冀州市","code":"131181"},{"values":"深州市","code":"131182"}]}]},{"values":"山西省","code":"140000","children":[{"values":"太原市","code":"140100","children":[{"values":"市辖区","code":"140101"},{"values":"小店区","code":"140105"},{"values":"迎泽区","code":"140106"},{"values":"杏花岭区","code":"140107"},{"values":"尖草坪区","code":"140108"},{"values":"万柏林区","code":"140109"},{"values":"晋源区","code":"140110"},{"values":"清徐县","code":"140121"},{"values":"阳曲县","code":"140122"},{"values":"娄烦县","code":"140123"},{"values":"古交市","code":"140181"}]},{"values":"大同市","code":"140200","children":[{"values":"市辖区","code":"140201"},{"values":"城区","code":"140202"},{"values":"矿区","code":"140203"},{"values":"南郊区","code":"140211"},{"values":"新荣区","code":"140212"},{"values":"阳高县","code":"140221"},{"values":"天镇县","code":"140222"},{"values":"广灵县","code":"140223"},{"values":"灵丘县","code":"140224"},{"values":"浑源县","code":"140225"},{"values":"左云县","code":"140226"},{"values":"大同县","code":"140227"}]},{"values":"阳泉市","code":"140300","children":[{"values":"市辖区","code":"140301"},{"values":"城区","code":"140302"},{"values":"矿区","code":"140303"},{"values":"郊区","code":"140311"},{"values":"平定县","code":"140321"},{"values":"盂县","code":"140322"}]},{"values":"长治市","code":"140400","children":[{"values":"市辖区","code":"140401"},{"values":"城区","code":"140402"},{"values":"郊区","code":"140411"},{"values":"长治县","code":"140421"},{"values":"襄垣县","code":"140423"},{"values":"屯留县","code":"140424"},{"values":"平顺县","code":"140425"},{"values":"黎城县","code":"140426"},{"values":"壶关县","code":"140427"},{"values":"长子县","code":"140428"},{"values":"武乡县","code":"140429"},{"values":"沁县","code":"140430"},{"values":"沁源县","code":"140431"},{"values":"潞城市","code":"140481"}]},{"values":"晋城市","code":"140500","children":[{"values":"市辖区","code":"140501"},{"values":"城区","code":"140502"},{"values":"沁水县","code":"140521"},{"values":"阳城县","code":"140522"},{"values":"陵川县","code":"140524"},{"values":"泽州县","code":"140525"},{"values":"高平市","code":"140581"}]},{"values":"朔州市","code":"140600","children":[{"values":"市辖区","code":"140601"},{"values":"朔城区","code":"140602"},{"values":"平鲁区","code":"140603"},{"values":"山阴县","code":"140621"},{"values":"应县","code":"140622"},{"values":"右玉县","code":"140623"},{"values":"怀仁县","code":"140624"}]},{"values":"晋中市","code":"140700","children":[{"values":"市辖区","code":"140701"},{"values":"榆次区","code":"140702"},{"values":"榆社县","code":"140721"},{"values":"左权县","code":"140722"},{"values":"和顺县","code":"140723"},{"values":"昔阳县","code":"140724"},{"values":"寿阳县","code":"140725"},{"values":"太谷县","code":"140726"},{"values":"祁县","code":"140727"},{"values":"平遥县","code":"140728"},{"values":"灵石县","code":"140729"},{"values":"介休市","code":"140781"}]},{"values":"运城市","code":"140800","children":[{"values":"市辖区","code":"140801"},{"values":"盐湖区","code":"140802"},{"values":"临猗县","code":"140821"},{"values":"万荣县","code":"140822"},{"values":"闻喜县","code":"140823"},{"values":"稷山县","code":"140824"},{"values":"新绛县","code":"140825"},{"values":"绛县","code":"140826"},{"values":"垣曲县","code":"140827"},{"values":"夏县","code":"140828"},{"values":"平陆县","code":"140829"},{"values":"芮城县","code":"140830"},{"values":"永济市","code":"140881"},{"values":"河津市","code":"140882"}]},{"values":"忻州市","code":"140900","children":[{"values":"市辖区","code":"140901"},{"values":"忻府区","code":"140902"},{"values":"定襄县","code":"140921"},{"values":"五台县","code":"140922"},{"values":"代县","code":"140923"},{"values":"繁峙县","code":"140924"},{"values":"宁武县","code":"140925"},{"values":"静乐县","code":"140926"},{"values":"神池县","code":"140927"},{"values":"五寨县","code":"140928"},{"values":"岢岚县","code":"140929"},{"values":"河曲县","code":"140930"},{"values":"保德县","code":"140931"},{"values":"偏关县","code":"140932"},{"values":"原平市","code":"140981"}]},{"values":"临汾市","code":"141000","children":[{"values":"市辖区","code":"141001"},{"values":"尧都区","code":"141002"},{"values":"曲沃县","code":"141021"},{"values":"翼城县","code":"141022"},{"values":"襄汾县","code":"141023"},{"values":"洪洞县","code":"141024"},{"values":"古县","code":"141025"},{"values":"安泽县","code":"141026"},{"values":"浮山县","code":"141027"},{"values":"吉县","code":"141028"},{"values":"乡宁县","code":"141029"},{"values":"大宁县","code":"141030"},{"values":"隰县","code":"141031"},{"values":"永和县","code":"141032"},{"values":"蒲县","code":"141033"},{"values":"汾西县","code":"141034"},{"values":"侯马市","code":"141081"},{"values":"霍州市","code":"141082"}]},{"values":"吕梁市","code":"141100","children":[{"values":"市辖区","code":"141101"},{"values":"离石区","code":"141102"},{"values":"文水县","code":"141121"},{"values":"交城县","code":"141122"},{"values":"兴县","code":"141123"},{"values":"临县","code":"141124"},{"values":"柳林县","code":"141125"},{"values":"石楼县","code":"141126"},{"values":"岚县","code":"141127"},{"values":"方山县","code":"141128"},{"values":"中阳县","code":"141129"},{"values":"交口县","code":"141130"},{"values":"孝义市","code":"141181"},{"values":"汾阳市","code":"141182"}]}]},{"values":"内蒙古自治区","code":"150000","children":[{"values":"呼和浩特市","code":"150100","children":[{"values":"市辖区","code":"150101"},{"values":"新城区","code":"150102"},{"values":"回民区","code":"150103"},{"values":"玉泉区","code":"150104"},{"values":"赛罕区","code":"150105"},{"values":"土默特左旗","code":"150121"},{"values":"托克托县","code":"150122"},{"values":"和林格尔县","code":"150123"},{"values":"清水河县","code":"150124"},{"values":"武川县","code":"150125"}]},{"values":"包头市","code":"150200","children":[{"values":"市辖区","code":"150201"},{"values":"东河区","code":"150202"},{"values":"昆都仑区","code":"150203"},{"values":"青山区","code":"150204"},{"values":"石拐区","code":"150205"},{"values":"白云鄂博矿区","code":"150206"},{"values":"九原区","code":"150207"},{"values":"土默特右旗","code":"150221"},{"values":"固阳县","code":"150222"},{"values":"达尔罕茂明安联合旗","code":"150223"}]},{"values":"乌海市","code":"150300","children":[{"values":"市辖区","code":"150301"},{"values":"海勃湾区","code":"150302"},{"values":"海南区","code":"150303"},{"values":"乌达区","code":"150304"}]},{"values":"赤峰市","code":"150400","children":[{"values":"市辖区","code":"150401"},{"values":"红山区","code":"150402"},{"values":"元宝山区","code":"150403"},{"values":"松山区","code":"150404"},{"values":"阿鲁科尔沁旗","code":"150421"},{"values":"巴林左旗","code":"150422"},{"values":"巴林右旗","code":"150423"},{"values":"林西县","code":"150424"},{"values":"克什克腾旗","code":"150425"},{"values":"翁牛特旗","code":"150426"},{"values":"喀喇沁旗","code":"150428"},{"values":"宁城县","code":"150429"},{"values":"敖汉旗","code":"150430"}]},{"values":"通辽市","code":"150500","children":[{"values":"市辖区","code":"150501"},{"values":"科尔沁区","code":"150502"},{"values":"科尔沁左翼中旗","code":"150521"},{"values":"科尔沁左翼后旗","code":"150522"},{"values":"开鲁县","code":"150523"},{"values":"库伦旗","code":"150524"},{"values":"奈曼旗","code":"150525"},{"values":"扎鲁特旗","code":"150526"},{"values":"霍林郭勒市","code":"150581"}]},{"values":"鄂尔多斯市","code":"150600","children":[{"values":"市辖区","code":"150601"},{"values":"东胜区","code":"150602"},{"values":"达拉特旗","code":"150621"},{"values":"准格尔旗","code":"150622"},{"values":"鄂托克前旗","code":"150623"},{"values":"鄂托克旗","code":"150624"},{"values":"杭锦旗","code":"150625"},{"values":"乌审旗","code":"150626"},{"values":"伊金霍洛旗","code":"150627"}]},{"values":"呼伦贝尔市","code":"150700","children":[{"values":"市辖区","code":"150701"},{"values":"海拉尔区","code":"150702"},{"values":"扎赉诺尔区","code":"150703"},{"values":"阿荣旗","code":"150721"},{"values":"莫力达瓦达斡尔族自治旗","code":"150722"},{"values":"鄂伦春自治旗","code":"150723"},{"values":"鄂温克族自治旗","code":"150724"},{"values":"陈巴尔虎旗","code":"150725"},{"values":"新巴尔虎左旗","code":"150726"},{"values":"新巴尔虎右旗","code":"150727"},{"values":"满洲里市","code":"150781"},{"values":"牙克石市","code":"150782"},{"values":"扎兰屯市","code":"150783"},{"values":"额尔古纳市","code":"150784"},{"values":"根河市","code":"150785"}]},{"values":"巴彦淖尔市","code":"150800","children":[{"values":"市辖区","code":"150801"},{"values":"临河区","code":"150802"},{"values":"五原县","code":"150821"},{"values":"磴口县","code":"150822"},{"values":"乌拉特前旗","code":"150823"},{"values":"乌拉特中旗","code":"150824"},{"values":"乌拉特后旗","code":"150825"},{"values":"杭锦后旗","code":"150826"}]},{"values":"乌兰察布市","code":"150900","children":[{"values":"市辖区","code":"150901"},{"values":"集宁区","code":"150902"},{"values":"卓资县","code":"150921"},{"values":"化德县","code":"150922"},{"values":"商都县","code":"150923"},{"values":"兴和县","code":"150924"},{"values":"凉城县","code":"150925"},{"values":"察哈尔右翼前旗","code":"150926"},{"values":"察哈尔右翼中旗","code":"150927"},{"values":"察哈尔右翼后旗","code":"150928"},{"values":"四子王旗","code":"150929"},{"values":"丰镇市","code":"150981"}]},{"values":"兴安盟","code":"152200","children":[{"values":"乌兰浩特市","code":"152201"},{"values":"阿尔山市","code":"152202"},{"values":"科尔沁右翼前旗","code":"152221"},{"values":"科尔沁右翼中旗","code":"152222"},{"values":"扎赉特旗","code":"152223"},{"values":"突泉县","code":"152224"}]},{"values":"锡林郭勒盟","code":"152500","children":[{"values":"二连浩特市","code":"152501"},{"values":"锡林浩特市","code":"152502"},{"values":"阿巴嘎旗","code":"152522"},{"values":"苏尼特左旗","code":"152523"},{"values":"苏尼特右旗","code":"152524"},{"values":"东乌珠穆沁旗","code":"152525"},{"values":"西乌珠穆沁旗","code":"152526"},{"values":"太仆寺旗","code":"152527"},{"values":"镶黄旗","code":"152528"},{"values":"正镶白旗","code":"152529"},{"values":"正蓝旗","code":"152530"},{"values":"多伦县","code":"152531"}]},{"values":"阿拉善盟","code":"152900","children":[{"values":"阿拉善左旗","code":"152921"},{"values":"阿拉善右旗","code":"152922"},{"values":"额济纳旗","code":"152923"}]}]},{"values":"辽宁省","code":"210000","children":[{"values":"沈阳市","code":"210100","children":[{"values":"市辖区","code":"210101"},{"values":"和平区","code":"210102"},{"values":"沈河区","code":"210103"},{"values":"大东区","code":"210104"},{"values":"皇姑区","code":"210105"},{"values":"铁西区","code":"210106"},{"values":"苏家屯区","code":"210111"},{"values":"东陵区","code":"210112"},{"values":"沈北新区","code":"210113"},{"values":"于洪区","code":"210114"},{"values":"辽中县","code":"210122"},{"values":"康平县","code":"210123"},{"values":"法库县","code":"210124"},{"values":"新民市","code":"210181"}]},{"values":"大连市","code":"210200","children":[{"values":"市辖区","code":"210201"},{"values":"中山区","code":"210202"},{"values":"西岗区","code":"210203"},{"values":"沙河口区","code":"210204"},{"values":"甘井子区","code":"210211"},{"values":"旅顺口区","code":"210212"},{"values":"金州区","code":"210213"},{"values":"长海县","code":"210224"},{"values":"瓦房店市","code":"210281"},{"values":"普兰店市","code":"210282"},{"values":"庄河市","code":"210283"}]},{"values":"鞍山市","code":"210300","children":[{"values":"市辖区","code":"210301"},{"values":"铁东区","code":"210302"},{"values":"铁西区","code":"210303"},{"values":"立山区","code":"210304"},{"values":"千山区","code":"210311"},{"values":"台安县","code":"210321"},{"values":"岫岩满族自治县","code":"210323"},{"values":"海城市","code":"210381"}]},{"values":"抚顺市","code":"210400","children":[{"values":"市辖区","code":"210401"},{"values":"新抚区","code":"210402"},{"values":"东洲区","code":"210403"},{"values":"望花区","code":"210404"},{"values":"顺城区","code":"210411"},{"values":"抚顺县","code":"210421"},{"values":"新宾满族自治县","code":"210422"},{"values":"清原满族自治县","code":"210423"}]},{"values":"本溪市","code":"210500","children":[{"values":"市辖区","code":"210501"},{"values":"平山区","code":"210502"},{"values":"溪湖区","code":"210503"},{"values":"明山区","code":"210504"},{"values":"南芬区","code":"210505"},{"values":"本溪满族自治县","code":"210521"},{"values":"桓仁满族自治县","code":"210522"}]},{"values":"丹东市","code":"210600","children":[{"values":"市辖区","code":"210601"},{"values":"元宝区","code":"210602"},{"values":"振兴区","code":"210603"},{"values":"振安区","code":"210604"},{"values":"宽甸满族自治县","code":"210624"},{"values":"东港市","code":"210681"},{"values":"凤城市","code":"210682"}]},{"values":"锦州市","code":"210700","children":[{"values":"市辖区","code":"210701"},{"values":"古塔区","code":"210702"},{"values":"凌河区","code":"210703"},{"values":"太和区","code":"210711"},{"values":"黑山县","code":"210726"},{"values":"义县","code":"210727"},{"values":"凌海市","code":"210781"},{"values":"北镇市","code":"210782"}]},{"values":"营口市","code":"210800","children":[{"values":"市辖区","code":"210801"},{"values":"站前区","code":"210802"},{"values":"西市区","code":"210803"},{"values":"鲅鱼圈区","code":"210804"},{"values":"老边区","code":"210811"},{"values":"盖州市","code":"210881"},{"values":"大石桥市","code":"210882"}]},{"values":"阜新市","code":"210900","children":[{"values":"市辖区","code":"210901"},{"values":"海州区","code":"210902"},{"values":"新邱区","code":"210903"},{"values":"太平区","code":"210904"},{"values":"清河门区","code":"210905"},{"values":"细河区","code":"210911"},{"values":"阜新蒙古族自治县","code":"210921"},{"values":"彰武县","code":"210922"}]},{"values":"辽阳市","code":"211000","children":[{"values":"市辖区","code":"211001"},{"values":"白塔区","code":"211002"},{"values":"文圣区","code":"211003"},{"values":"宏伟区","code":"211004"},{"values":"弓长岭区","code":"211005"},{"values":"太子河区","code":"211011"},{"values":"辽阳县","code":"211021"},{"values":"灯塔市","code":"211081"}]},{"values":"盘锦市","code":"211100","children":[{"values":"市辖区","code":"211101"},{"values":"双台子区","code":"211102"},{"values":"兴隆台区","code":"211103"},{"values":"大洼县","code":"211121"},{"values":"盘山县","code":"211122"}]},{"values":"铁岭市","code":"211200","children":[{"values":"市辖区","code":"211201"},{"values":"银州区","code":"211202"},{"values":"清河区","code":"211204"},{"values":"铁岭县","code":"211221"},{"values":"西丰县","code":"211223"},{"values":"昌图县","code":"211224"},{"values":"调兵山市","code":"211281"},{"values":"开原市","code":"211282"}]},{"values":"朝阳市","code":"211300","children":[{"values":"市辖区","code":"211301"},{"values":"双塔区","code":"211302"},{"values":"龙城区","code":"211303"},{"values":"朝阳县","code":"211321"},{"values":"建平县","code":"211322"},{"values":"喀喇沁左翼蒙古族自治县","code":"211324"},{"values":"北票市","code":"211381"},{"values":"凌源市","code":"211382"}]},{"values":"葫芦岛市","code":"211400","children":[{"values":"市辖区","code":"211401"},{"values":"连山区","code":"211402"},{"values":"龙港区","code":"211403"},{"values":"南票区","code":"211404"},{"values":"绥中县","code":"211421"},{"values":"建昌县","code":"211422"},{"values":"兴城市","code":"211481"}]}]},{"values":"吉林省","code":"220000","children":[{"values":"长春市","code":"220100","children":[{"values":"市辖区","code":"220101"},{"values":"南关区","code":"220102"},{"values":"宽城区","code":"220103"},{"values":"朝阳区","code":"220104"},{"values":"二道区","code":"220105"},{"values":"绿园区","code":"220106"},{"values":"双阳区","code":"220112"},{"values":"农安县","code":"220122"},{"values":"九台市","code":"220181"},{"values":"榆树市","code":"220182"},{"values":"德惠市","code":"220183"}]},{"values":"吉林市","code":"220200","children":[{"values":"市辖区","code":"220201"},{"values":"昌邑区","code":"220202"},{"values":"龙潭区","code":"220203"},{"values":"船营区","code":"220204"},{"values":"丰满区","code":"220211"},{"values":"永吉县","code":"220221"},{"values":"蛟河市","code":"220281"},{"values":"桦甸市","code":"220282"},{"values":"舒兰市","code":"220283"},{"values":"磐石市","code":"220284"}]},{"values":"四平市","code":"220300","children":[{"values":"市辖区","code":"220301"},{"values":"铁西区","code":"220302"},{"values":"铁东区","code":"220303"},{"values":"梨树县","code":"220322"},{"values":"伊通满族自治县","code":"220323"},{"values":"公主岭市","code":"220381"},{"values":"双辽市","code":"220382"}]},{"values":"辽源市","code":"220400","children":[{"values":"市辖区","code":"220401"},{"values":"龙山区","code":"220402"},{"values":"西安区","code":"220403"},{"values":"东丰县","code":"220421"},{"values":"东辽县","code":"220422"}]},{"values":"通化市","code":"220500","children":[{"values":"市辖区","code":"220501"},{"values":"东昌区","code":"220502"},{"values":"二道江区","code":"220503"},{"values":"通化县","code":"220521"},{"values":"辉南县","code":"220523"},{"values":"柳河县","code":"220524"},{"values":"梅河口市","code":"220581"},{"values":"集安市","code":"220582"}]},{"values":"白山市","code":"220600","children":[{"values":"市辖区","code":"220601"},{"values":"浑江区","code":"220602"},{"values":"江源区","code":"220605"},{"values":"抚松县","code":"220621"},{"values":"靖宇县","code":"220622"},{"values":"长白朝鲜族自治县","code":"220623"},{"values":"临江市","code":"220681"}]},{"values":"松原市","code":"220700","children":[{"values":"市辖区","code":"220701"},{"values":"宁江区","code":"220702"},{"values":"前郭尔罗斯蒙古族自治县","code":"220721"},{"values":"长岭县","code":"220722"},{"values":"乾安县","code":"220723"},{"values":"扶余市","code":"220781"}]},{"values":"白城市","code":"220800","children":[{"values":"市辖区","code":"220801"},{"values":"洮北区","code":"220802"},{"values":"镇赉县","code":"220821"},{"values":"通榆县","code":"220822"},{"values":"洮南市","code":"220881"},{"values":"大安市","code":"220882"}]},{"values":"延边朝鲜族自治州","code":"222400","children":[{"values":"延吉市","code":"222401"},{"values":"图们市","code":"222402"},{"values":"敦化市","code":"222403"},{"values":"珲春市","code":"222404"},{"values":"龙井市","code":"222405"},{"values":"和龙市","code":"222406"},{"values":"汪清县","code":"222424"},{"values":"安图县","code":"222426"}]}]},{"values":"黑龙江省","code":"230000","children":[{"values":"哈尔滨市","code":"230100","children":[{"values":"市辖区","code":"230101"},{"values":"道里区","code":"230102"},{"values":"南岗区","code":"230103"},{"values":"道外区","code":"230104"},{"values":"平房区","code":"230108"},{"values":"松北区","code":"230109"},{"values":"香坊区","code":"230110"},{"values":"呼兰区","code":"230111"},{"values":"阿城区","code":"230112"},{"values":"依兰县","code":"230123"},{"values":"方正县","code":"230124"},{"values":"宾县","code":"230125"},{"values":"巴彦县","code":"230126"},{"values":"木兰县","code":"230127"},{"values":"通河县","code":"230128"},{"values":"延寿县","code":"230129"},{"values":"双城市","code":"230182"},{"values":"尚志市","code":"230183"},{"values":"五常市","code":"230184"}]},{"values":"齐齐哈尔市","code":"230200","children":[{"values":"市辖区","code":"230201"},{"values":"龙沙区","code":"230202"},{"values":"建华区","code":"230203"},{"values":"铁锋区","code":"230204"},{"values":"昂昂溪区","code":"230205"},{"values":"富拉尔基区","code":"230206"},{"values":"碾子山区","code":"230207"},{"values":"梅里斯达斡尔族区","code":"230208"},{"values":"龙江县","code":"230221"},{"values":"依安县","code":"230223"},{"values":"泰来县","code":"230224"},{"values":"甘南县","code":"230225"},{"values":"富裕县","code":"230227"},{"values":"克山县","code":"230229"},{"values":"克东县","code":"230230"},{"values":"拜泉县","code":"230231"},{"values":"讷河市","code":"230281"}]},{"values":"鸡西市","code":"230300","children":[{"values":"市辖区","code":"230301"},{"values":"鸡冠区","code":"230302"},{"values":"恒山区","code":"230303"},{"values":"滴道区","code":"230304"},{"values":"梨树区","code":"230305"},{"values":"城子河区","code":"230306"},{"values":"麻山区","code":"230307"},{"values":"鸡东县","code":"230321"},{"values":"虎林市","code":"230381"},{"values":"密山市","code":"230382"}]},{"values":"鹤岗市","code":"230400","children":[{"values":"市辖区","code":"230401"},{"values":"向阳区","code":"230402"},{"values":"工农区","code":"230403"},{"values":"南山区","code":"230404"},{"values":"兴安区","code":"230405"},{"values":"东山区","code":"230406"},{"values":"兴山区","code":"230407"},{"values":"萝北县","code":"230421"},{"values":"绥滨县","code":"230422"}]},{"values":"双鸭山市","code":"230500","children":[{"values":"市辖区","code":"230501"},{"values":"尖山区","code":"230502"},{"values":"岭东区","code":"230503"},{"values":"四方台区","code":"230505"},{"values":"宝山区","code":"230506"},{"values":"集贤县","code":"230521"},{"values":"友谊县","code":"230522"},{"values":"宝清县","code":"230523"},{"values":"饶河县","code":"230524"}]},{"values":"大庆市","code":"230600","children":[{"values":"市辖区","code":"230601"},{"values":"萨尔图区","code":"230602"},{"values":"龙凤区","code":"230603"},{"values":"让胡路区","code":"230604"},{"values":"红岗区","code":"230605"},{"values":"大同区","code":"230606"},{"values":"肇州县","code":"230621"},{"values":"肇源县","code":"230622"},{"values":"林甸县","code":"230623"},{"values":"杜尔伯特蒙古族自治县","code":"230624"}]},{"values":"伊春市","code":"230700","children":[{"values":"市辖区","code":"230701"},{"values":"伊春区","code":"230702"},{"values":"南岔区","code":"230703"},{"values":"友好区","code":"230704"},{"values":"西林区","code":"230705"},{"values":"翠峦区","code":"230706"},{"values":"新青区","code":"230707"},{"values":"美溪区","code":"230708"},{"values":"金山屯区","code":"230709"},{"values":"五营区","code":"230710"},{"values":"乌马河区","code":"230711"},{"values":"汤旺河区","code":"230712"},{"values":"带岭区","code":"230713"},{"values":"乌伊岭区","code":"230714"},{"values":"红星区","code":"230715"},{"values":"上甘岭区","code":"230716"},{"values":"嘉荫县","code":"230722"},{"values":"铁力市","code":"230781"}]},{"values":"佳木斯市","code":"230800","children":[{"values":"市辖区","code":"230801"},{"values":"向阳区","code":"230803"},{"values":"前进区","code":"230804"},{"values":"东风区","code":"230805"},{"values":"郊区","code":"230811"},{"values":"桦南县","code":"230822"},{"values":"桦川县","code":"230826"},{"values":"汤原县","code":"230828"},{"values":"抚远县","code":"230833"},{"values":"同江市","code":"230881"},{"values":"富锦市","code":"230882"}]},{"values":"七台河市","code":"230900","children":[{"values":"市辖区","code":"230901"},{"values":"新兴区","code":"230902"},{"values":"桃山区","code":"230903"},{"values":"茄子河区","code":"230904"},{"values":"勃利县","code":"230921"}]},{"values":"牡丹江市","code":"231000","children":[{"values":"市辖区","code":"231001"},{"values":"东安区","code":"231002"},{"values":"阳明区","code":"231003"},{"values":"爱民区","code":"231004"},{"values":"西安区","code":"231005"},{"values":"东宁县","code":"231024"},{"values":"林口县","code":"231025"},{"values":"绥芬河市","code":"231081"},{"values":"海林市","code":"231083"},{"values":"宁安市","code":"231084"},{"values":"穆棱市","code":"231085"}]},{"values":"黑河市","code":"231100","children":[{"values":"市辖区","code":"231101"},{"values":"爱辉区","code":"231102"},{"values":"嫩江县","code":"231121"},{"values":"逊克县","code":"231123"},{"values":"孙吴县","code":"231124"},{"values":"北安市","code":"231181"},{"values":"五大连池市","code":"231182"}]},{"values":"绥化市","code":"231200","children":[{"values":"市辖区","code":"231201"},{"values":"北林区","code":"231202"},{"values":"望奎县","code":"231221"},{"values":"兰西县","code":"231222"},{"values":"青冈县","code":"231223"},{"values":"庆安县","code":"231224"},{"values":"明水县","code":"231225"},{"values":"绥棱县","code":"231226"},{"values":"安达市","code":"231281"},{"values":"肇东市","code":"231282"},{"values":"海伦市","code":"231283"}]},{"values":"大兴安岭地区","code":"232700","children":[{"values":"呼玛县","code":"232721"},{"values":"塔河县","code":"232722"},{"values":"漠河县","code":"232723"}]}]},{"values":"上海市","code":"310000","children":[{"values":"上海市","code":"310000","children":[{"values":"黄浦区","code":"310101"},{"values":"徐汇区","code":"310104"},{"values":"长宁区","code":"310105"},{"values":"静安区","code":"310106"},{"values":"普陀区","code":"310107"},{"values":"闸北区","code":"310108"},{"values":"虹口区","code":"310109"},{"values":"杨浦区","code":"310110"},{"values":"闵行区","code":"310112"},{"values":"宝山区","code":"310113"},{"values":"嘉定区","code":"310114"},{"values":"浦东新区","code":"310115"},{"values":"金山区","code":"310116"},{"values":"松江区","code":"310117"},{"values":"青浦区","code":"310118"},{"values":"奉贤区","code":"310120"},{"values":"崇明县","code":"310230"}]}]},{"values":"江苏省","code":"320000","children":[{"values":"南京市","code":"320100","children":[{"values":"市辖区","code":"320101"},{"values":"玄武区","code":"320102"},{"values":"秦淮区","code":"320104"},{"values":"建邺区","code":"320105"},{"values":"鼓楼区","code":"320106"},{"values":"浦口区","code":"320111"},{"values":"栖霞区","code":"320113"},{"values":"雨花台区","code":"320114"},{"values":"江宁区","code":"320115"},{"values":"六合区","code":"320116"},{"values":"溧水区","code":"320117"},{"values":"高淳区","code":"320118"}]},{"values":"无锡市","code":"320200","children":[{"values":"市辖区","code":"320201"},{"values":"崇安区","code":"320202"},{"values":"南长区","code":"320203"},{"values":"北塘区","code":"320204"},{"values":"锡山区","code":"320205"},{"values":"惠山区","code":"320206"},{"values":"滨湖区","code":"320211"},{"values":"江阴市","code":"320281"},{"values":"宜兴市","code":"320282"}]},{"values":"徐州市","code":"320300","children":[{"values":"市辖区","code":"320301"},{"values":"鼓楼区","code":"320302"},{"values":"云龙区","code":"320303"},{"values":"贾汪区","code":"320305"},{"values":"泉山区","code":"320311"},{"values":"铜山区","code":"320312"},{"values":"丰县","code":"320321"},{"values":"沛县","code":"320322"},{"values":"睢宁县","code":"320324"},{"values":"新沂市","code":"320381"},{"values":"邳州市","code":"320382"}]},{"values":"常州市","code":"320400","children":[{"values":"市辖区","code":"320401"},{"values":"天宁区","code":"320402"},{"values":"钟楼区","code":"320404"},{"values":"戚墅堰区","code":"320405"},{"values":"新北区","code":"320411"},{"values":"武进区","code":"320412"},{"values":"溧阳市","code":"320481"},{"values":"金坛市","code":"320482"}]},{"values":"苏州市","code":"320500","children":[{"values":"市辖区","code":"320501"},{"values":"虎丘区","code":"320505"},{"values":"吴中区","code":"320506"},{"values":"相城区","code":"320507"},{"values":"姑苏区","code":"320508"},{"values":"吴江区","code":"320509"},{"values":"常熟市","code":"320581"},{"values":"张家港市","code":"320582"},{"values":"昆山市","code":"320583"},{"values":"太仓市","code":"320585"}]},{"values":"南通市","code":"320600","children":[{"values":"市辖区","code":"320601"},{"values":"崇川区","code":"320602"},{"values":"港闸区","code":"320611"},{"values":"通州区","code":"320612"},{"values":"海安县","code":"320621"},{"values":"如东县","code":"320623"},{"values":"启东市","code":"320681"},{"values":"如皋市","code":"320682"},{"values":"海门市","code":"320684"}]},{"values":"连云港市","code":"320700","children":[{"values":"市辖区","code":"320701"},{"values":"连云区","code":"320703"},{"values":"新浦区","code":"320705"},{"values":"海州区","code":"320706"},{"values":"赣榆县","code":"320721"},{"values":"东海县","code":"320722"},{"values":"灌云县","code":"320723"},{"values":"灌南县","code":"320724"}]},{"values":"淮安市","code":"320800","children":[{"values":"市辖区","code":"320801"},{"values":"清河区","code":"320802"},{"values":"淮安区","code":"320803"},{"values":"淮阴区","code":"320804"},{"values":"清浦区","code":"320811"},{"values":"涟水县","code":"320826"},{"values":"洪泽县","code":"320829"},{"values":"盱眙县","code":"320830"},{"values":"金湖县","code":"320831"}]},{"values":"盐城市","code":"320900","children":[{"values":"市辖区","code":"320901"},{"values":"亭湖区","code":"320902"},{"values":"盐都区","code":"320903"},{"values":"响水县","code":"320921"},{"values":"滨海县","code":"320922"},{"values":"阜宁县","code":"320923"},{"values":"射阳县","code":"320924"},{"values":"建湖县","code":"320925"},{"values":"东台市","code":"320981"},{"values":"大丰市","code":"320982"}]},{"values":"扬州市","code":"321000","children":[{"values":"市辖区","code":"321001"},{"values":"广陵区","code":"321002"},{"values":"邗江区","code":"321003"},{"values":"江都区","code":"321012"},{"values":"宝应县","code":"321023"},{"values":"仪征市","code":"321081"},{"values":"高邮市","code":"321084"}]},{"values":"镇江市","code":"321100","children":[{"values":"市辖区","code":"321101"},{"values":"京口区","code":"321102"},{"values":"润州区","code":"321111"},{"values":"丹徒区","code":"321112"},{"values":"丹阳市","code":"321181"},{"values":"扬中市","code":"321182"},{"values":"句容市","code":"321183"}]},{"values":"泰州市","code":"321200","children":[{"values":"市辖区","code":"321201"},{"values":"海陵区","code":"321202"},{"values":"高港区","code":"321203"},{"values":"姜堰区","code":"321204"},{"values":"兴化市","code":"321281"},{"values":"靖江市","code":"321282"},{"values":"泰兴市","code":"321283"}]},{"values":"宿迁市","code":"321300","children":[{"values":"市辖区","code":"321301"},{"values":"宿城区","code":"321302"},{"values":"宿豫区","code":"321311"},{"values":"沭阳县","code":"321322"},{"values":"泗阳县","code":"321323"},{"values":"泗洪县","code":"321324"}]}]},{"values":"浙江省","code":"330000","children":[{"values":"杭州市","code":"330100","children":[{"values":"市辖区","code":"330101"},{"values":"上城区","code":"330102"},{"values":"下城区","code":"330103"},{"values":"江干区","code":"330104"},{"values":"拱墅区","code":"330105"},{"values":"西湖区","code":"330106"},{"values":"滨江区","code":"330108"},{"values":"萧山区","code":"330109"},{"values":"余杭区","code":"330110"},{"values":"桐庐县","code":"330122"},{"values":"淳安县","code":"330127"},{"values":"建德市","code":"330182"},{"values":"富阳市","code":"330183"},{"values":"临安市","code":"330185"}]},{"values":"宁波市","code":"330200","children":[{"values":"市辖区","code":"330201"},{"values":"海曙区","code":"330203"},{"values":"江东区","code":"330204"},{"values":"江北区","code":"330205"},{"values":"北仑区","code":"330206"},{"values":"镇海区","code":"330211"},{"values":"鄞州区","code":"330212"},{"values":"象山县","code":"330225"},{"values":"宁海县","code":"330226"},{"values":"余姚市","code":"330281"},{"values":"慈溪市","code":"330282"},{"values":"奉化市","code":"330283"}]},{"values":"温州市","code":"330300","children":[{"values":"市辖区","code":"330301"},{"values":"鹿城区","code":"330302"},{"values":"龙湾区","code":"330303"},{"values":"瓯海区","code":"330304"},{"values":"洞头县","code":"330322"},{"values":"永嘉县","code":"330324"},{"values":"平阳县","code":"330326"},{"values":"苍南县","code":"330327"},{"values":"文成县","code":"330328"},{"values":"泰顺县","code":"330329"},{"values":"瑞安市","code":"330381"},{"values":"乐清市","code":"330382"}]},{"values":"嘉兴市","code":"330400","children":[{"values":"市辖区","code":"330401"},{"values":"南湖区","code":"330402"},{"values":"秀洲区","code":"330411"},{"values":"嘉善县","code":"330421"},{"values":"海盐县","code":"330424"},{"values":"海宁市","code":"330481"},{"values":"平湖市","code":"330482"},{"values":"桐乡市","code":"330483"}]},{"values":"湖州市","code":"330500","children":[{"values":"市辖区","code":"330501"},{"values":"吴兴区","code":"330502"},{"values":"南浔区","code":"330503"},{"values":"德清县","code":"330521"},{"values":"长兴县","code":"330522"},{"values":"安吉县","code":"330523"}]},{"values":"绍兴市","code":"330600","children":[{"values":"市辖区","code":"330601"},{"values":"越城区","code":"330602"},{"values":"绍兴县","code":"330621"},{"values":"新昌县","code":"330624"},{"values":"诸暨市","code":"330681"},{"values":"上虞市","code":"330682"},{"values":"嵊州市","code":"330683"}]},{"values":"金华市","code":"330700","children":[{"values":"市辖区","code":"330701"},{"values":"婺城区","code":"330702"},{"values":"金东区","code":"330703"},{"values":"武义县","code":"330723"},{"values":"浦江县","code":"330726"},{"values":"磐安县","code":"330727"},{"values":"兰溪市","code":"330781"},{"values":"义乌市","code":"330782"},{"values":"东阳市","code":"330783"},{"values":"永康市","code":"330784"}]},{"values":"衢州市","code":"330800","children":[{"values":"市辖区","code":"330801"},{"values":"柯城区","code":"330802"},{"values":"衢江区","code":"330803"},{"values":"常山县","code":"330822"},{"values":"开化县","code":"330824"},{"values":"龙游县","code":"330825"},{"values":"江山市","code":"330881"}]},{"values":"舟山市","code":"330900","children":[{"values":"市辖区","code":"330901"},{"values":"定海区","code":"330902"},{"values":"普陀区","code":"330903"},{"values":"岱山县","code":"330921"},{"values":"嵊泗县","code":"330922"}]},{"values":"台州市","code":"331000","children":[{"values":"市辖区","code":"331001"},{"values":"椒江区","code":"331002"},{"values":"黄岩区","code":"331003"},{"values":"路桥区","code":"331004"},{"values":"玉环县","code":"331021"},{"values":"三门县","code":"331022"},{"values":"天台县","code":"331023"},{"values":"仙居县","code":"331024"},{"values":"温岭市","code":"331081"},{"values":"临海市","code":"331082"}]},{"values":"丽水市","code":"331100","children":[{"values":"市辖区","code":"331101"},{"values":"莲都区","code":"331102"},{"values":"青田县","code":"331121"},{"values":"缙云县","code":"331122"},{"values":"遂昌县","code":"331123"},{"values":"松阳县","code":"331124"},{"values":"云和县","code":"331125"},{"values":"庆元县","code":"331126"},{"values":"景宁畲族自治县","code":"331127"},{"values":"龙泉市","code":"331181"}]}]},{"values":"安徽省","code":"340000","children":[{"values":"合肥市","code":"340100","children":[{"values":"市辖区","code":"340101"},{"values":"瑶海区","code":"340102"},{"values":"庐阳区","code":"340103"},{"values":"蜀山区","code":"340104"},{"values":"包河区","code":"340111"},{"values":"长丰县","code":"340121"},{"values":"肥东县","code":"340122"},{"values":"肥西县","code":"340123"},{"values":"庐江县","code":"340124"},{"values":"巢湖市","code":"340181"}]},{"values":"芜湖市","code":"340200","children":[{"values":"市辖区","code":"340201"},{"values":"镜湖区","code":"340202"},{"values":"弋江区","code":"340203"},{"values":"鸠江区","code":"340207"},{"values":"三山区","code":"340208"},{"values":"芜湖县","code":"340221"},{"values":"繁昌县","code":"340222"},{"values":"南陵县","code":"340223"},{"values":"无为县","code":"340225"}]},{"values":"蚌埠市","code":"340300","children":[{"values":"市辖区","code":"340301"},{"values":"龙子湖区","code":"340302"},{"values":"蚌山区","code":"340303"},{"values":"禹会区","code":"340304"},{"values":"淮上区","code":"340311"},{"values":"怀远县","code":"340321"},{"values":"五河县","code":"340322"},{"values":"固镇县","code":"340323"}]},{"values":"淮南市","code":"340400","children":[{"values":"市辖区","code":"340401"},{"values":"大通区","code":"340402"},{"values":"田家庵区","code":"340403"},{"values":"谢家集区","code":"340404"},{"values":"八公山区","code":"340405"},{"values":"潘集区","code":"340406"},{"values":"凤台县","code":"340421"}]},{"values":"马鞍山市","code":"340500","children":[{"values":"市辖区","code":"340501"},{"values":"花山区","code":"340503"},{"values":"雨山区","code":"340504"},{"values":"博望区","code":"340506"},{"values":"当涂县","code":"340521"},{"values":"含山县","code":"340522"},{"values":"和县","code":"340523"}]},{"values":"淮北市","code":"340600","children":[{"values":"市辖区","code":"340601"},{"values":"杜集区","code":"340602"},{"values":"相山区","code":"340603"},{"values":"烈山区","code":"340604"},{"values":"濉溪县","code":"340621"}]},{"values":"铜陵市","code":"340700","children":[{"values":"市辖区","code":"340701"},{"values":"铜官山区","code":"340702"},{"values":"狮子山区","code":"340703"},{"values":"郊区","code":"340711"},{"values":"铜陵县","code":"340721"}]},{"values":"安庆市","code":"340800","children":[{"values":"市辖区","code":"340801"},{"values":"迎江区","code":"340802"},{"values":"大观区","code":"340803"},{"values":"宜秀区","code":"340811"},{"values":"怀宁县","code":"340822"},{"values":"枞阳县","code":"340823"},{"values":"潜山县","code":"340824"},{"values":"太湖县","code":"340825"},{"values":"宿松县","code":"340826"},{"values":"望江县","code":"340827"},{"values":"岳西县","code":"340828"},{"values":"桐城市","code":"340881"}]},{"values":"黄山市","code":"341000","children":[{"values":"市辖区","code":"341001"},{"values":"屯溪区","code":"341002"},{"values":"黄山区","code":"341003"},{"values":"徽州区","code":"341004"},{"values":"歙县","code":"341021"},{"values":"休宁县","code":"341022"},{"values":"黟县","code":"341023"},{"values":"祁门县","code":"341024"}]},{"values":"滁州市","code":"341100","children":[{"values":"市辖区","code":"341101"},{"values":"琅琊区","code":"341102"},{"values":"南谯区","code":"341103"},{"values":"来安县","code":"341122"},{"values":"全椒县","code":"341124"},{"values":"定远县","code":"341125"},{"values":"凤阳县","code":"341126"},{"values":"天长市","code":"341181"},{"values":"明光市","code":"341182"}]},{"values":"阜阳市","code":"341200","children":[{"values":"市辖区","code":"341201"},{"values":"颍州区","code":"341202"},{"values":"颍东区","code":"341203"},{"values":"颍泉区","code":"341204"},{"values":"临泉县","code":"341221"},{"values":"太和县","code":"341222"},{"values":"阜南县","code":"341225"},{"values":"颍上县","code":"341226"},{"values":"界首市","code":"341282"}]},{"values":"宿州市","code":"341300","children":[{"values":"市辖区","code":"341301"},{"values":"埇桥区","code":"341302"},{"values":"砀山县","code":"341321"},{"values":"萧县","code":"341322"},{"values":"灵璧县","code":"341323"},{"values":"泗县","code":"341324"}]},{"values":"六安市","code":"341500","children":[{"values":"市辖区","code":"341501"},{"values":"金安区","code":"341502"},{"values":"裕安区","code":"341503"},{"values":"寿县","code":"341521"},{"values":"霍邱县","code":"341522"},{"values":"舒城县","code":"341523"},{"values":"金寨县","code":"341524"},{"values":"霍山县","code":"341525"}]},{"values":"亳州市","code":"341600","children":[{"values":"市辖区","code":"341601"},{"values":"谯城区","code":"341602"},{"values":"涡阳县","code":"341621"},{"values":"蒙城县","code":"341622"},{"values":"利辛县","code":"341623"}]},{"values":"池州市","code":"341700","children":[{"values":"市辖区","code":"341701"},{"values":"贵池区","code":"341702"},{"values":"东至县","code":"341721"},{"values":"石台县","code":"341722"},{"values":"青阳县","code":"341723"}]},{"values":"宣城市","code":"341800","children":[{"values":"市辖区","code":"341801"},{"values":"宣州区","code":"341802"},{"values":"郎溪县","code":"341821"},{"values":"广德县","code":"341822"},{"values":"泾县","code":"341823"},{"values":"绩溪县","code":"341824"},{"values":"旌德县","code":"341825"},{"values":"宁国市","code":"341881"}]}]},{"values":"福建省","code":"350000","children":[{"values":"福州市","code":"350100","children":[{"values":"市辖区","code":"350101"},{"values":"鼓楼区","code":"350102"},{"values":"台江区","code":"350103"},{"values":"仓山区","code":"350104"},{"values":"马尾区","code":"350105"},{"values":"晋安区","code":"350111"},{"values":"闽侯县","code":"350121"},{"values":"连江县","code":"350122"},{"values":"罗源县","code":"350123"},{"values":"闽清县","code":"350124"},{"values":"永泰县","code":"350125"},{"values":"平潭县","code":"350128"},{"values":"福清市","code":"350181"},{"values":"长乐市","code":"350182"}]},{"values":"厦门市","code":"350200","children":[{"values":"市辖区","code":"350201"},{"values":"思明区","code":"350203"},{"values":"海沧区","code":"350205"},{"values":"湖里区","code":"350206"},{"values":"集美区","code":"350211"},{"values":"同安区","code":"350212"},{"values":"翔安区","code":"350213"}]},{"values":"莆田市","code":"350300","children":[{"values":"市辖区","code":"350301"},{"values":"城厢区","code":"350302"},{"values":"涵江区","code":"350303"},{"values":"荔城区","code":"350304"},{"values":"秀屿区","code":"350305"},{"values":"仙游县","code":"350322"}]},{"values":"三明市","code":"350400","children":[{"values":"市辖区","code":"350401"},{"values":"梅列区","code":"350402"},{"values":"三元区","code":"350403"},{"values":"明溪县","code":"350421"},{"values":"清流县","code":"350423"},{"values":"宁化县","code":"350424"},{"values":"大田县","code":"350425"},{"values":"尤溪县","code":"350426"},{"values":"沙县","code":"350427"},{"values":"将乐县","code":"350428"},{"values":"泰宁县","code":"350429"},{"values":"建宁县","code":"350430"},{"values":"永安市","code":"350481"}]},{"values":"泉州市","code":"350500","children":[{"values":"市辖区","code":"350501"},{"values":"鲤城区","code":"350502"},{"values":"丰泽区","code":"350503"},{"values":"洛江区","code":"350504"},{"values":"泉港区","code":"350505"},{"values":"惠安县","code":"350521"},{"values":"安溪县","code":"350524"},{"values":"永春县","code":"350525"},{"values":"德化县","code":"350526"},{"values":"金门县","code":"350527"},{"values":"石狮市","code":"350581"},{"values":"晋江市","code":"350582"},{"values":"南安市","code":"350583"}]},{"values":"漳州市","code":"350600","children":[{"values":"市辖区","code":"350601"},{"values":"芗城区","code":"350602"},{"values":"龙文区","code":"350603"},{"values":"云霄县","code":"350622"},{"values":"漳浦县","code":"350623"},{"values":"诏安县","code":"350624"},{"values":"长泰县","code":"350625"},{"values":"东山县","code":"350626"},{"values":"南靖县","code":"350627"},{"values":"平和县","code":"350628"},{"values":"华安县","code":"350629"},{"values":"龙海市","code":"350681"}]},{"values":"南平市","code":"350700","children":[{"values":"市辖区","code":"350701"},{"values":"延平区","code":"350702"},{"values":"顺昌县","code":"350721"},{"values":"浦城县","code":"350722"},{"values":"光泽县","code":"350723"},{"values":"松溪县","code":"350724"},{"values":"政和县","code":"350725"},{"values":"邵武市","code":"350781"},{"values":"武夷山市","code":"350782"},{"values":"建瓯市","code":"350783"},{"values":"建阳市","code":"350784"}]},{"values":"龙岩市","code":"350800","children":[{"values":"市辖区","code":"350801"},{"values":"新罗区","code":"350802"},{"values":"长汀县","code":"350821"},{"values":"永定县","code":"350822"},{"values":"上杭县","code":"350823"},{"values":"武平县","code":"350824"},{"values":"连城县","code":"350825"},{"values":"漳平市","code":"350881"}]},{"values":"宁德市","code":"350900","children":[{"values":"市辖区","code":"350901"},{"values":"蕉城区","code":"350902"},{"values":"霞浦县","code":"350921"},{"values":"古田县","code":"350922"},{"values":"屏南县","code":"350923"},{"values":"寿宁县","code":"350924"},{"values":"周宁县","code":"350925"},{"values":"柘荣县","code":"350926"},{"values":"福安市","code":"350981"},{"values":"福鼎市","code":"350982"}]}]},{"values":"江西省","code":"360000","children":[{"values":"南昌市","code":"360100","children":[{"values":"市辖区","code":"360101"},{"values":"东湖区","code":"360102"},{"values":"西湖区","code":"360103"},{"values":"青云谱区","code":"360104"},{"values":"湾里区","code":"360105"},{"values":"青山湖区","code":"360111"},{"values":"南昌县","code":"360121"},{"values":"新建县","code":"360122"},{"values":"安义县","code":"360123"},{"values":"进贤县","code":"360124"}]},{"values":"景德镇市","code":"360200","children":[{"values":"市辖区","code":"360201"},{"values":"昌江区","code":"360202"},{"values":"珠山区","code":"360203"},{"values":"浮梁县","code":"360222"},{"values":"乐平市","code":"360281"}]},{"values":"萍乡市","code":"360300","children":[{"values":"市辖区","code":"360301"},{"values":"安源区","code":"360302"},{"values":"湘东区","code":"360313"},{"values":"莲花县","code":"360321"},{"values":"上栗县","code":"360322"},{"values":"芦溪县","code":"360323"}]},{"values":"九江市","code":"360400","children":[{"values":"市辖区","code":"360401"},{"values":"庐山区","code":"360402"},{"values":"浔阳区","code":"360403"},{"values":"九江县","code":"360421"},{"values":"武宁县","code":"360423"},{"values":"修水县","code":"360424"},{"values":"永修县","code":"360425"},{"values":"德安县","code":"360426"},{"values":"星子县","code":"360427"},{"values":"都昌县","code":"360428"},{"values":"湖口县","code":"360429"},{"values":"彭泽县","code":"360430"},{"values":"瑞昌市","code":"360481"},{"values":"共青城市","code":"360482"}]},{"values":"新余市","code":"360500","children":[{"values":"市辖区","code":"360501"},{"values":"渝水区","code":"360502"},{"values":"分宜县","code":"360521"}]},{"values":"鹰潭市","code":"360600","children":[{"values":"市辖区","code":"360601"},{"values":"月湖区","code":"360602"},{"values":"余江县","code":"360622"},{"values":"贵溪市","code":"360681"}]},{"values":"赣州市","code":"360700","children":[{"values":"市辖区","code":"360701"},{"values":"章贡区","code":"360702"},{"values":"赣县","code":"360721"},{"values":"信丰县","code":"360722"},{"values":"大余县","code":"360723"},{"values":"上犹县","code":"360724"},{"values":"崇义县","code":"360725"},{"values":"安远县","code":"360726"},{"values":"龙南县","code":"360727"},{"values":"定南县","code":"360728"},{"values":"全南县","code":"360729"},{"values":"宁都县","code":"360730"},{"values":"于都县","code":"360731"},{"values":"兴国县","code":"360732"},{"values":"会昌县","code":"360733"},{"values":"寻乌县","code":"360734"},{"values":"石城县","code":"360735"},{"values":"瑞金市","code":"360781"},{"values":"南康区","code":"360782"}]},{"values":"吉安市","code":"360800","children":[{"values":"市辖区","code":"360801"},{"values":"吉州区","code":"360802"},{"values":"青原区","code":"360803"},{"values":"吉安县","code":"360821"},{"values":"吉水县","code":"360822"},{"values":"峡江县","code":"360823"},{"values":"新干县","code":"360824"},{"values":"永丰县","code":"360825"},{"values":"泰和县","code":"360826"},{"values":"遂川县","code":"360827"},{"values":"万安县","code":"360828"},{"values":"安福县","code":"360829"},{"values":"永新县","code":"360830"},{"values":"井冈山市","code":"360881"}]},{"values":"宜春市","code":"360900","children":[{"values":"市辖区","code":"360901"},{"values":"袁州区","code":"360902"},{"values":"奉新县","code":"360921"},{"values":"万载县","code":"360922"},{"values":"上高县","code":"360923"},{"values":"宜丰县","code":"360924"},{"values":"靖安县","code":"360925"},{"values":"铜鼓县","code":"360926"},{"values":"丰城市","code":"360981"},{"values":"樟树市","code":"360982"},{"values":"高安市","code":"360983"}]},{"values":"抚州市","code":"361000","children":[{"values":"市辖区","code":"361001"},{"values":"临川区","code":"361002"},{"values":"南城县","code":"361021"},{"values":"黎川县","code":"361022"},{"values":"南丰县","code":"361023"},{"values":"崇仁县","code":"361024"},{"values":"乐安县","code":"361025"},{"values":"宜黄县","code":"361026"},{"values":"金溪县","code":"361027"},{"values":"资溪县","code":"361028"},{"values":"东乡县","code":"361029"},{"values":"广昌县","code":"361030"}]},{"values":"上饶市","code":"361100","children":[{"values":"市辖区","code":"361101"},{"values":"信州区","code":"361102"},{"values":"上饶县","code":"361121"},{"values":"广丰县","code":"361122"},{"values":"玉山县","code":"361123"},{"values":"铅山县","code":"361124"},{"values":"横峰县","code":"361125"},{"values":"弋阳县","code":"361126"},{"values":"余干县","code":"361127"},{"values":"鄱阳县","code":"361128"},{"values":"万年县","code":"361129"},{"values":"婺源县","code":"361130"},{"values":"德兴市","code":"361181"}]}]},{"values":"山东省","code":"370000","children":[{"values":"济南市","code":"370100","children":[{"values":"市辖区","code":"370101"},{"values":"历下区","code":"370102"},{"values":"市中区","code":"370103"},{"values":"槐荫区","code":"370104"},{"values":"天桥区","code":"370105"},{"values":"历城区","code":"370112"},{"values":"长清区","code":"370113"},{"values":"平阴县","code":"370124"},{"values":"济阳县","code":"370125"},{"values":"商河县","code":"370126"},{"values":"章丘市","code":"370181"}]},{"values":"青岛市","code":"370200","children":[{"values":"市辖区","code":"370201"},{"values":"市南区","code":"370202"},{"values":"市北区","code":"370203"},{"values":"黄岛区","code":"370211"},{"values":"崂山区","code":"370212"},{"values":"李沧区","code":"370213"},{"values":"城阳区","code":"370214"},{"values":"胶州市","code":"370281"},{"values":"即墨市","code":"370282"},{"values":"平度市","code":"370283"},{"values":"莱西市","code":"370285"}]},{"values":"淄博市","code":"370300","children":[{"values":"市辖区","code":"370301"},{"values":"淄川区","code":"370302"},{"values":"张店区","code":"370303"},{"values":"博山区","code":"370304"},{"values":"临淄区","code":"370305"},{"values":"周村区","code":"370306"},{"values":"桓台县","code":"370321"},{"values":"高青县","code":"370322"},{"values":"沂源县","code":"370323"}]},{"values":"枣庄市","code":"370400","children":[{"values":"市辖区","code":"370401"},{"values":"市中区","code":"370402"},{"values":"薛城区","code":"370403"},{"values":"峄城区","code":"370404"},{"values":"台儿庄区","code":"370405"},{"values":"山亭区","code":"370406"},{"values":"滕州市","code":"370481"}]},{"values":"东营市","code":"370500","children":[{"values":"市辖区","code":"370501"},{"values":"东营区","code":"370502"},{"values":"河口区","code":"370503"},{"values":"垦利县","code":"370521"},{"values":"利津县","code":"370522"},{"values":"广饶县","code":"370523"}]},{"values":"烟台市","code":"370600","children":[{"values":"市辖区","code":"370601"},{"values":"芝罘区","code":"370602"},{"values":"福山区","code":"370611"},{"values":"牟平区","code":"370612"},{"values":"莱山区","code":"370613"},{"values":"长岛县","code":"370634"},{"values":"龙口市","code":"370681"},{"values":"莱阳市","code":"370682"},{"values":"莱州市","code":"370683"},{"values":"蓬莱市","code":"370684"},{"values":"招远市","code":"370685"},{"values":"栖霞市","code":"370686"},{"values":"海阳市","code":"370687"}]},{"values":"潍坊市","code":"370700","children":[{"values":"市辖区","code":"370701"},{"values":"潍城区","code":"370702"},{"values":"寒亭区","code":"370703"},{"values":"坊子区","code":"370704"},{"values":"奎文区","code":"370705"},{"values":"临朐县","code":"370724"},{"values":"昌乐县","code":"370725"},{"values":"青州市","code":"370781"},{"values":"诸城市","code":"370782"},{"values":"寿光市","code":"370783"},{"values":"安丘市","code":"370784"},{"values":"高密市","code":"370785"},{"values":"昌邑市","code":"370786"}]},{"values":"济宁市","code":"370800","children":[{"values":"市辖区","code":"370801"},{"values":"市中区","code":"370802"},{"values":"任城区","code":"370811"},{"values":"微山县","code":"370826"},{"values":"鱼台县","code":"370827"},{"values":"金乡县","code":"370828"},{"values":"嘉祥县","code":"370829"},{"values":"汶上县","code":"370830"},{"values":"泗水县","code":"370831"},{"values":"梁山县","code":"370832"},{"values":"曲阜市","code":"370881"},{"values":"兖州市","code":"370882"},{"values":"邹城市","code":"370883"}]},{"values":"泰安市","code":"370900","children":[{"values":"市辖区","code":"370901"},{"values":"泰山区","code":"370902"},{"values":"岱岳区","code":"370911"},{"values":"宁阳县","code":"370921"},{"values":"东平县","code":"370923"},{"values":"新泰市","code":"370982"},{"values":"肥城市","code":"370983"}]},{"values":"威海市","code":"371000","children":[{"values":"市辖区","code":"371001"},{"values":"环翠区","code":"371002"},{"values":"文登市","code":"371081"},{"values":"荣成市","code":"371082"},{"values":"乳山市","code":"371083"}]},{"values":"日照市","code":"371100","children":[{"values":"市辖区","code":"371101"},{"values":"东港区","code":"371102"},{"values":"岚山区","code":"371103"},{"values":"五莲县","code":"371121"},{"values":"莒县","code":"371122"}]},{"values":"莱芜市","code":"371200","children":[{"values":"市辖区","code":"371201"},{"values":"莱城区","code":"371202"},{"values":"钢城区","code":"371203"}]},{"values":"临沂市","code":"371300","children":[{"values":"市辖区","code":"371301"},{"values":"兰山区","code":"371302"},{"values":"罗庄区","code":"371311"},{"values":"河东区","code":"371312"},{"values":"沂南县","code":"371321"},{"values":"郯城县","code":"371322"},{"values":"沂水县","code":"371323"},{"values":"苍山县","code":"371324"},{"values":"费县","code":"371325"},{"values":"平邑县","code":"371326"},{"values":"莒南县","code":"371327"},{"values":"蒙阴县","code":"371328"},{"values":"临沭县","code":"371329"}]},{"values":"德州市","code":"371400","children":[{"values":"市辖区","code":"371401"},{"values":"德城区","code":"371402"},{"values":"陵县","code":"371421"},{"values":"宁津县","code":"371422"},{"values":"庆云县","code":"371423"},{"values":"临邑县","code":"371424"},{"values":"齐河县","code":"371425"},{"values":"平原县","code":"371426"},{"values":"夏津县","code":"371427"},{"values":"武城县","code":"371428"},{"values":"乐陵市","code":"371481"},{"values":"禹城市","code":"371482"}]},{"values":"聊城市","code":"371500","children":[{"values":"市辖区","code":"371501"},{"values":"东昌府区","code":"371502"},{"values":"阳谷县","code":"371521"},{"values":"莘县","code":"371522"},{"values":"茌平县","code":"371523"},{"values":"东阿县","code":"371524"},{"values":"冠县","code":"371525"},{"values":"高唐县","code":"371526"},{"values":"临清市","code":"371581"}]},{"values":"滨州市","code":"371600","children":[{"values":"市辖区","code":"371601"},{"values":"滨城区","code":"371602"},{"values":"惠民县","code":"371621"},{"values":"阳信县","code":"371622"},{"values":"无棣县","code":"371623"},{"values":"沾化县","code":"371624"},{"values":"博兴县","code":"371625"},{"values":"邹平县","code":"371626"}]},{"values":"菏泽市","code":"371700","children":[{"values":"市辖区","code":"371701"},{"values":"牡丹区","code":"371702"},{"values":"曹县","code":"371721"},{"values":"单县","code":"371722"},{"values":"成武县","code":"371723"},{"values":"巨野县","code":"371724"},{"values":"郓城县","code":"371725"},{"values":"鄄城县","code":"371726"},{"values":"定陶县","code":"371727"},{"values":"东明县","code":"371728"}]}]},{"values":"河南省","code":"410000","children":[{"values":"郑州市","code":"410100","children":[{"values":"市辖区","code":"410101"},{"values":"中原区","code":"410102"},{"values":"二七区","code":"410103"},{"values":"管城回族区","code":"410104"},{"values":"金水区","code":"410105"},{"values":"上街区","code":"410106"},{"values":"惠济区","code":"410108"},{"values":"中牟县","code":"410122"},{"values":"巩义市","code":"410181"},{"values":"荥阳市","code":"410182"},{"values":"新密市","code":"410183"},{"values":"新郑市","code":"410184"},{"values":"登封市","code":"410185"}]},{"values":"开封市","code":"410200","children":[{"values":"市辖区","code":"410201"},{"values":"龙亭区","code":"410202"},{"values":"顺河回族区","code":"410203"},{"values":"鼓楼区","code":"410204"},{"values":"禹王台区","code":"410205"},{"values":"金明区","code":"410211"},{"values":"杞县","code":"410221"},{"values":"通许县","code":"410222"},{"values":"尉氏县","code":"410223"},{"values":"开封县","code":"410224"},{"values":"兰考县","code":"410225"}]},{"values":"洛阳市","code":"410300","children":[{"values":"市辖区","code":"410301"},{"values":"老城区","code":"410302"},{"values":"西工区","code":"410303"},{"values":"瀍河回族区","code":"410304"},{"values":"涧西区","code":"410305"},{"values":"吉利区","code":"410306"},{"values":"洛龙区","code":"410311"},{"values":"孟津县","code":"410322"},{"values":"新安县","code":"410323"},{"values":"栾川县","code":"410324"},{"values":"嵩县","code":"410325"},{"values":"汝阳县","code":"410326"},{"values":"宜阳县","code":"410327"},{"values":"洛宁县","code":"410328"},{"values":"伊川县","code":"410329"},{"values":"偃师市","code":"410381"}]},{"values":"平顶山市","code":"410400","children":[{"values":"市辖区","code":"410401"},{"values":"新华区","code":"410402"},{"values":"卫东区","code":"410403"},{"values":"石龙区","code":"410404"},{"values":"湛河区","code":"410411"},{"values":"宝丰县","code":"410421"},{"values":"叶县","code":"410422"},{"values":"鲁山县","code":"410423"},{"values":"郏县","code":"410425"},{"values":"舞钢市","code":"410481"},{"values":"汝州市","code":"410482"}]},{"values":"安阳市","code":"410500","children":[{"values":"市辖区","code":"410501"},{"values":"文峰区","code":"410502"},{"values":"北关区","code":"410503"},{"values":"殷都区","code":"410505"},{"values":"龙安区","code":"410506"},{"values":"安阳县","code":"410522"},{"values":"汤阴县","code":"410523"},{"values":"滑县","code":"410526"},{"values":"内黄县","code":"410527"},{"values":"林州市","code":"410581"}]},{"values":"鹤壁市","code":"410600","children":[{"values":"市辖区","code":"410601"},{"values":"鹤山区","code":"410602"},{"values":"山城区","code":"410603"},{"values":"淇滨区","code":"410611"},{"values":"浚县","code":"410621"},{"values":"淇县","code":"410622"}]},{"values":"新乡市","code":"410700","children":[{"values":"市辖区","code":"410701"},{"values":"红旗区","code":"410702"},{"values":"卫滨区","code":"410703"},{"values":"凤泉区","code":"410704"},{"values":"牧野区","code":"410711"},{"values":"新乡县","code":"410721"},{"values":"获嘉县","code":"410724"},{"values":"原阳县","code":"410725"},{"values":"延津县","code":"410726"},{"values":"封丘县","code":"410727"},{"values":"长垣县","code":"410728"},{"values":"卫辉市","code":"410781"},{"values":"辉县市","code":"410782"}]},{"values":"焦作市","code":"410800","children":[{"values":"市辖区","code":"410801"},{"values":"解放区","code":"410802"},{"values":"中站区","code":"410803"},{"values":"马村区","code":"410804"},{"values":"山阳区","code":"410811"},{"values":"修武县","code":"410821"},{"values":"博爱县","code":"410822"},{"values":"武陟县","code":"410823"},{"values":"温县","code":"410825"},{"values":"沁阳市","code":"410882"},{"values":"孟州市","code":"410883"}]},{"values":"濮阳市","code":"410900","children":[{"values":"市辖区","code":"410901"},{"values":"华龙区","code":"410902"},{"values":"清丰县","code":"410922"},{"values":"南乐县","code":"410923"},{"values":"范县","code":"410926"},{"values":"台前县","code":"410927"},{"values":"濮阳县","code":"410928"}]},{"values":"许昌市","code":"411000","children":[{"values":"市辖区","code":"411001"},{"values":"魏都区","code":"411002"},{"values":"许昌县","code":"411023"},{"values":"鄢陵县","code":"411024"},{"values":"襄城县","code":"411025"},{"values":"禹州市","code":"411081"},{"values":"长葛市","code":"411082"}]},{"values":"漯河市","code":"411100","children":[{"values":"市辖区","code":"411101"},{"values":"源汇区","code":"411102"},{"values":"郾城区","code":"411103"},{"values":"召陵区","code":"411104"},{"values":"舞阳县","code":"411121"},{"values":"临颍县","code":"411122"}]},{"values":"三门峡市","code":"411200","children":[{"values":"市辖区","code":"411201"},{"values":"湖滨区","code":"411202"},{"values":"渑池县","code":"411221"},{"values":"陕县","code":"411222"},{"values":"卢氏县","code":"411224"},{"values":"义马市","code":"411281"},{"values":"灵宝市","code":"411282"}]},{"values":"南阳市","code":"411300","children":[{"values":"市辖区","code":"411301"},{"values":"宛城区","code":"411302"},{"values":"卧龙区","code":"411303"},{"values":"南召县","code":"411321"},{"values":"方城县","code":"411322"},{"values":"西峡县","code":"411323"},{"values":"镇平县","code":"411324"},{"values":"内乡县","code":"411325"},{"values":"淅川县","code":"411326"},{"values":"社旗县","code":"411327"},{"values":"唐河县","code":"411328"},{"values":"新野县","code":"411329"},{"values":"桐柏县","code":"411330"},{"values":"邓州市","code":"411381"}]},{"values":"商丘市","code":"411400","children":[{"values":"市辖区","code":"411401"},{"values":"梁园区","code":"411402"},{"values":"睢阳区","code":"411403"},{"values":"民权县","code":"411421"},{"values":"睢县","code":"411422"},{"values":"宁陵县","code":"411423"},{"values":"柘城县","code":"411424"},{"values":"虞城县","code":"411425"},{"values":"夏邑县","code":"411426"},{"values":"永城市","code":"411481"}]},{"values":"信阳市","code":"411500","children":[{"values":"市辖区","code":"411501"},{"values":"浉河区","code":"411502"},{"values":"平桥区","code":"411503"},{"values":"罗山县","code":"411521"},{"values":"光山县","code":"411522"},{"values":"新县","code":"411523"},{"values":"商城县","code":"411524"},{"values":"固始县","code":"411525"},{"values":"潢川县","code":"411526"},{"values":"淮滨县","code":"411527"},{"values":"息县","code":"411528"}]},{"values":"周口市","code":"411600","children":[{"values":"市辖区","code":"411601"},{"values":"川汇区","code":"411602"},{"values":"扶沟县","code":"411621"},{"values":"西华县","code":"411622"},{"values":"商水县","code":"411623"},{"values":"沈丘县","code":"411624"},{"values":"郸城县","code":"411625"},{"values":"淮阳县","code":"411626"},{"values":"太康县","code":"411627"},{"values":"鹿邑县","code":"411628"},{"values":"项城市","code":"411681"}]},{"values":"驻马店市","code":"411700","children":[{"values":"市辖区","code":"411701"},{"values":"驿城区","code":"411702"},{"values":"西平县","code":"411721"},{"values":"上蔡县","code":"411722"},{"values":"平舆县","code":"411723"},{"values":"正阳县","code":"411724"},{"values":"确山县","code":"411725"},{"values":"泌阳县","code":"411726"},{"values":"汝南县","code":"411727"},{"values":"遂平县","code":"411728"},{"values":"新蔡县","code":"411729"}]},{"values":"省直辖县级行政区划","code":"419000","children":[{"values":"济源市","code":"419001"}]}]},{"values":"湖北省","code":"420000","children":[{"values":"武汉市","code":"420100","children":[{"values":"市辖区","code":"420101"},{"values":"江岸区","code":"420102"},{"values":"江汉区","code":"420103"},{"values":"硚口区","code":"420104"},{"values":"汉阳区","code":"420105"},{"values":"武昌区","code":"420106"},{"values":"青山区","code":"420107"},{"values":"洪山区","code":"420111"},{"values":"东西湖区","code":"420112"},{"values":"汉南区","code":"420113"},{"values":"蔡甸区","code":"420114"},{"values":"江夏区","code":"420115"},{"values":"黄陂区","code":"420116"},{"values":"新洲区","code":"420117"}]},{"values":"黄石市","code":"420200","children":[{"values":"市辖区","code":"420201"},{"values":"黄石港区","code":"420202"},{"values":"西塞山区","code":"420203"},{"values":"下陆区","code":"420204"},{"values":"铁山区","code":"420205"},{"values":"阳新县","code":"420222"},{"values":"大冶市","code":"420281"}]},{"values":"十堰市","code":"420300","children":[{"values":"市辖区","code":"420301"},{"values":"茅箭区","code":"420302"},{"values":"张湾区","code":"420303"},{"values":"郧县","code":"420321"},{"values":"郧西县","code":"420322"},{"values":"竹山县","code":"420323"},{"values":"竹溪县","code":"420324"},{"values":"房县","code":"420325"},{"values":"丹江口市","code":"420381"}]},{"values":"宜昌市","code":"420500","children":[{"values":"市辖区","code":"420501"},{"values":"西陵区","code":"420502"},{"values":"伍家岗区","code":"420503"},{"values":"点军区","code":"420504"},{"values":"猇亭区","code":"420505"},{"values":"夷陵区","code":"420506"},{"values":"远安县","code":"420525"},{"values":"兴山县","code":"420526"},{"values":"秭归县","code":"420527"},{"values":"长阳土家族自治县","code":"420528"},{"values":"五峰土家族自治县","code":"420529"},{"values":"宜都市","code":"420581"},{"values":"当阳市","code":"420582"},{"values":"枝江市","code":"420583"}]},{"values":"襄阳市","code":"420600","children":[{"values":"市辖区","code":"420601"},{"values":"襄城区","code":"420602"},{"values":"樊城区","code":"420606"},{"values":"襄州区","code":"420607"},{"values":"南漳县","code":"420624"},{"values":"谷城县","code":"420625"},{"values":"保康县","code":"420626"},{"values":"老河口市","code":"420682"},{"values":"枣阳市","code":"420683"},{"values":"宜城市","code":"420684"}]},{"values":"鄂州市","code":"420700","children":[{"values":"市辖区","code":"420701"},{"values":"梁子湖区","code":"420702"},{"values":"华容区","code":"420703"},{"values":"鄂城区","code":"420704"}]},{"values":"荆门市","code":"420800","children":[{"values":"市辖区","code":"420801"},{"values":"东宝区","code":"420802"},{"values":"掇刀区","code":"420804"},{"values":"京山县","code":"420821"},{"values":"沙洋县","code":"420822"},{"values":"钟祥市","code":"420881"}]},{"values":"孝感市","code":"420900","children":[{"values":"市辖区","code":"420901"},{"values":"孝南区","code":"420902"},{"values":"孝昌县","code":"420921"},{"values":"大悟县","code":"420922"},{"values":"云梦县","code":"420923"},{"values":"应城市","code":"420981"},{"values":"安陆市","code":"420982"},{"values":"汉川市","code":"420984"}]},{"values":"荆州市","code":"421000","children":[{"values":"市辖区","code":"421001"},{"values":"沙市区","code":"421002"},{"values":"荆州区","code":"421003"},{"values":"公安县","code":"421022"},{"values":"监利县","code":"421023"},{"values":"江陵县","code":"421024"},{"values":"石首市","code":"421081"},{"values":"洪湖市","code":"421083"},{"values":"松滋市","code":"421087"}]},{"values":"黄冈市","code":"421100","children":[{"values":"市辖区","code":"421101"},{"values":"黄州区","code":"421102"},{"values":"团风县","code":"421121"},{"values":"红安县","code":"421122"},{"values":"罗田县","code":"421123"},{"values":"英山县","code":"421124"},{"values":"浠水县","code":"421125"},{"values":"蕲春县","code":"421126"},{"values":"黄梅县","code":"421127"},{"values":"麻城市","code":"421181"},{"values":"武穴市","code":"421182"}]},{"values":"咸宁市","code":"421200","children":[{"values":"市辖区","code":"421201"},{"values":"咸安区","code":"421202"},{"values":"嘉鱼县","code":"421221"},{"values":"通城县","code":"421222"},{"values":"崇阳县","code":"421223"},{"values":"通山县","code":"421224"},{"values":"赤壁市","code":"421281"}]},{"values":"随州市","code":"421300","children":[{"values":"市辖区","code":"421301"},{"values":"曾都区","code":"421303"},{"values":"随县","code":"421321"},{"values":"广水市","code":"421381"}]},{"values":"恩施土家族苗族自治州","code":"422800","children":[{"values":"恩施市","code":"422801"},{"values":"利川市","code":"422802"},{"values":"建始县","code":"422822"},{"values":"巴东县","code":"422823"},{"values":"宣恩县","code":"422825"},{"values":"咸丰县","code":"422826"},{"values":"来凤县","code":"422827"},{"values":"鹤峰县","code":"422828"}]},{"values":"省直辖县级行政区划","code":"429000","children":[{"values":"仙桃市","code":"429004"},{"values":"潜江市","code":"429005"},{"values":"天门市","code":"429006"},{"values":"神农架林区","code":"429021"}]}]},{"values":"湖南省","code":"430000","children":[{"values":"长沙市","code":"430100","children":[{"values":"市辖区","code":"430101"},{"values":"芙蓉区","code":"430102"},{"values":"天心区","code":"430103"},{"values":"岳麓区","code":"430104"},{"values":"开福区","code":"430105"},{"values":"雨花区","code":"430111"},{"values":"望城区","code":"430112"},{"values":"长沙县","code":"430121"},{"values":"宁乡县","code":"430124"},{"values":"浏阳市","code":"430181"}]},{"values":"株洲市","code":"430200","children":[{"values":"市辖区","code":"430201"},{"values":"荷塘区","code":"430202"},{"values":"芦淞区","code":"430203"},{"values":"石峰区","code":"430204"},{"values":"天元区","code":"430211"},{"values":"株洲县","code":"430221"},{"values":"攸县","code":"430223"},{"values":"茶陵县","code":"430224"},{"values":"炎陵县","code":"430225"},{"values":"醴陵市","code":"430281"}]},{"values":"湘潭市","code":"430300","children":[{"values":"市辖区","code":"430301"},{"values":"雨湖区","code":"430302"},{"values":"岳塘区","code":"430304"},{"values":"湘潭县","code":"430321"},{"values":"湘乡市","code":"430381"},{"values":"韶山市","code":"430382"}]},{"values":"衡阳市","code":"430400","children":[{"values":"市辖区","code":"430401"},{"values":"珠晖区","code":"430405"},{"values":"雁峰区","code":"430406"},{"values":"石鼓区","code":"430407"},{"values":"蒸湘区","code":"430408"},{"values":"南岳区","code":"430412"},{"values":"衡阳县","code":"430421"},{"values":"衡南县","code":"430422"},{"values":"衡山县","code":"430423"},{"values":"衡东县","code":"430424"},{"values":"祁东县","code":"430426"},{"values":"耒阳市","code":"430481"},{"values":"常宁市","code":"430482"}]},{"values":"邵阳市","code":"430500","children":[{"values":"市辖区","code":"430501"},{"values":"双清区","code":"430502"},{"values":"大祥区","code":"430503"},{"values":"北塔区","code":"430511"},{"values":"邵东县","code":"430521"},{"values":"新邵县","code":"430522"},{"values":"邵阳县","code":"430523"},{"values":"隆回县","code":"430524"},{"values":"洞口县","code":"430525"},{"values":"绥宁县","code":"430527"},{"values":"新宁县","code":"430528"},{"values":"城步苗族自治县","code":"430529"},{"values":"武冈市","code":"430581"}]},{"values":"岳阳市","code":"430600","children":[{"values":"市辖区","code":"430601"},{"values":"岳阳楼区","code":"430602"},{"values":"云溪区","code":"430603"},{"values":"君山区","code":"430611"},{"values":"岳阳县","code":"430621"},{"values":"华容县","code":"430623"},{"values":"湘阴县","code":"430624"},{"values":"平江县","code":"430626"},{"values":"汨罗市","code":"430681"},{"values":"临湘市","code":"430682"}]},{"values":"常德市","code":"430700","children":[{"values":"市辖区","code":"430701"},{"values":"武陵区","code":"430702"},{"values":"鼎城区","code":"430703"},{"values":"安乡县","code":"430721"},{"values":"汉寿县","code":"430722"},{"values":"澧县","code":"430723"},{"values":"临澧县","code":"430724"},{"values":"桃源县","code":"430725"},{"values":"石门县","code":"430726"},{"values":"津市市","code":"430781"}]},{"values":"张家界市","code":"430800","children":[{"values":"市辖区","code":"430801"},{"values":"永定区","code":"430802"},{"values":"武陵源区","code":"430811"},{"values":"慈利县","code":"430821"},{"values":"桑植县","code":"430822"}]},{"values":"益阳市","code":"430900","children":[{"values":"市辖区","code":"430901"},{"values":"资阳区","code":"430902"},{"values":"赫山区","code":"430903"},{"values":"南县","code":"430921"},{"values":"桃江县","code":"430922"},{"values":"安化县","code":"430923"},{"values":"沅江市","code":"430981"}]},{"values":"郴州市","code":"431000","children":[{"values":"市辖区","code":"431001"},{"values":"北湖区","code":"431002"},{"values":"苏仙区","code":"431003"},{"values":"桂阳县","code":"431021"},{"values":"宜章县","code":"431022"},{"values":"永兴县","code":"431023"},{"values":"嘉禾县","code":"431024"},{"values":"临武县","code":"431025"},{"values":"汝城县","code":"431026"},{"values":"桂东县","code":"431027"},{"values":"安仁县","code":"431028"},{"values":"资兴市","code":"431081"}]},{"values":"永州市","code":"431100","children":[{"values":"市辖区","code":"431101"},{"values":"零陵区","code":"431102"},{"values":"冷水滩区","code":"431103"},{"values":"祁阳县","code":"431121"},{"values":"东安县","code":"431122"},{"values":"双牌县","code":"431123"},{"values":"道县","code":"431124"},{"values":"江永县","code":"431125"},{"values":"宁远县","code":"431126"},{"values":"蓝山县","code":"431127"},{"values":"新田县","code":"431128"},{"values":"江华瑶族自治县","code":"431129"}]},{"values":"怀化市","code":"431200","children":[{"values":"市辖区","code":"431201"},{"values":"鹤城区","code":"431202"},{"values":"中方县","code":"431221"},{"values":"沅陵县","code":"431222"},{"values":"辰溪县","code":"431223"},{"values":"溆浦县","code":"431224"},{"values":"会同县","code":"431225"},{"values":"麻阳苗族自治县","code":"431226"},{"values":"新晃侗族自治县","code":"431227"},{"values":"芷江侗族自治县","code":"431228"},{"values":"靖州苗族侗族自治县","code":"431229"},{"values":"通道侗族自治县","code":"431230"},{"values":"洪江市","code":"431281"}]},{"values":"娄底市","code":"431300","children":[{"values":"市辖区","code":"431301"},{"values":"娄星区","code":"431302"},{"values":"双峰县","code":"431321"},{"values":"新化县","code":"431322"},{"values":"冷水江市","code":"431381"},{"values":"涟源市","code":"431382"}]},{"values":"湘西土家族苗族自治州","code":"433100","children":[{"values":"吉首市","code":"433101"},{"values":"泸溪县","code":"433122"},{"values":"凤凰县","code":"433123"},{"values":"花垣县","code":"433124"},{"values":"保靖县","code":"433125"},{"values":"古丈县","code":"433126"},{"values":"永顺县","code":"433127"},{"values":"龙山县","code":"433130"}]}]},{"values":"广东省","code":"440000","children":[{"values":"广州市","code":"440100","children":[{"values":"市辖区","code":"440101"},{"values":"荔湾区","code":"440103"},{"values":"越秀区","code":"440104"},{"values":"海珠区","code":"440105"},{"values":"天河区","code":"440106"},{"values":"白云区","code":"440111"},{"values":"黄埔区","code":"440112"},{"values":"番禺区","code":"440113"},{"values":"花都区","code":"440114"},{"values":"南沙区","code":"440115"},{"values":"萝岗区","code":"440116"},{"values":"增城市","code":"440183"},{"values":"从化市","code":"440184"}]},{"values":"韶关市","code":"440200","children":[{"values":"市辖区","code":"440201"},{"values":"武江区","code":"440203"},{"values":"浈江区","code":"440204"},{"values":"曲江区","code":"440205"},{"values":"始兴县","code":"440222"},{"values":"仁化县","code":"440224"},{"values":"翁源县","code":"440229"},{"values":"乳源瑶族自治县","code":"440232"},{"values":"新丰县","code":"440233"},{"values":"乐昌市","code":"440281"},{"values":"南雄市","code":"440282"}]},{"values":"深圳市","code":"440300","children":[{"values":"市辖区","code":"440301"},{"values":"罗湖区","code":"440303"},{"values":"福田区","code":"440304"},{"values":"南山区","code":"440305"},{"values":"宝安区","code":"440306"},{"values":"龙岗区","code":"440307"},{"values":"盐田区","code":"440308"}]},{"values":"珠海市","code":"440400","children":[{"values":"市辖区","code":"440401"},{"values":"香洲区","code":"440402"},{"values":"斗门区","code":"440403"},{"values":"金湾区","code":"440404"}]},{"values":"汕头市","code":"440500","children":[{"values":"市辖区","code":"440501"},{"values":"龙湖区","code":"440507"},{"values":"金平区","code":"440511"},{"values":"濠江区","code":"440512"},{"values":"潮阳区","code":"440513"},{"values":"潮南区","code":"440514"},{"values":"澄海区","code":"440515"},{"values":"南澳县","code":"440523"}]},{"values":"佛山市","code":"440600","children":[{"values":"市辖区","code":"440601"},{"values":"禅城区","code":"440604"},{"values":"南海区","code":"440605"},{"values":"顺德区","code":"440606"},{"values":"三水区","code":"440607"},{"values":"高明区","code":"440608"}]},{"values":"江门市","code":"440700","children":[{"values":"市辖区","code":"440701"},{"values":"蓬江区","code":"440703"},{"values":"江海区","code":"440704"},{"values":"新会区","code":"440705"},{"values":"台山市","code":"440781"},{"values":"开平市","code":"440783"},{"values":"鹤山市","code":"440784"},{"values":"恩平市","code":"440785"}]},{"values":"湛江市","code":"440800","children":[{"values":"市辖区","code":"440801"},{"values":"赤坎区","code":"440802"},{"values":"霞山区","code":"440803"},{"values":"坡头区","code":"440804"},{"values":"麻章区","code":"440811"},{"values":"遂溪县","code":"440823"},{"values":"徐闻县","code":"440825"},{"values":"廉江市","code":"440881"},{"values":"雷州市","code":"440882"},{"values":"吴川市","code":"440883"}]},{"values":"茂名市","code":"440900","children":[{"values":"市辖区","code":"440901"},{"values":"茂南区","code":"440902"},{"values":"茂港区","code":"440903"},{"values":"电白县","code":"440923"},{"values":"高州市","code":"440981"},{"values":"化州市","code":"440982"},{"values":"信宜市","code":"440983"}]},{"values":"肇庆市","code":"441200","children":[{"values":"市辖区","code":"441201"},{"values":"端州区","code":"441202"},{"values":"鼎湖区","code":"441203"},{"values":"广宁县","code":"441223"},{"values":"怀集县","code":"441224"},{"values":"封开县","code":"441225"},{"values":"德庆县","code":"441226"},{"values":"高要市","code":"441283"},{"values":"四会市","code":"441284"}]},{"values":"惠州市","code":"441300","children":[{"values":"市辖区","code":"441301"},{"values":"惠城区","code":"441302"},{"values":"惠阳区","code":"441303"},{"values":"博罗县","code":"441322"},{"values":"惠东县","code":"441323"},{"values":"龙门县","code":"441324"}]},{"values":"梅州市","code":"441400","children":[{"values":"市辖区","code":"441401"},{"values":"梅江区","code":"441402"},{"values":"梅县","code":"441421"},{"values":"大埔县","code":"441422"},{"values":"丰顺县","code":"441423"},{"values":"五华县","code":"441424"},{"values":"平远县","code":"441426"},{"values":"蕉岭县","code":"441427"},{"values":"兴宁市","code":"441481"}]},{"values":"汕尾市","code":"441500","children":[{"values":"市辖区","code":"441501"},{"values":"城区","code":"441502"},{"values":"海丰县","code":"441521"},{"values":"陆河县","code":"441523"},{"values":"陆丰市","code":"441581"}]},{"values":"河源市","code":"441600","children":[{"values":"市辖区","code":"441601"},{"values":"源城区","code":"441602"},{"values":"紫金县","code":"441621"},{"values":"龙川县","code":"441622"},{"values":"连平县","code":"441623"},{"values":"和平县","code":"441624"},{"values":"东源县","code":"441625"}]},{"values":"阳江市","code":"441700","children":[{"values":"市辖区","code":"441701"},{"values":"江城区","code":"441702"},{"values":"阳西县","code":"441721"},{"values":"阳东县","code":"441723"},{"values":"阳春市","code":"441781"}]},{"values":"清远市","code":"441800","children":[{"values":"市辖区","code":"441801"},{"values":"清城区","code":"441802"},{"values":"清新区","code":"441803"},{"values":"佛冈县","code":"441821"},{"values":"阳山县","code":"441823"},{"values":"连山壮族瑶族自治县","code":"441825"},{"values":"连南瑶族自治县","code":"441826"},{"values":"英德市","code":"441881"},{"values":"连州市","code":"441882"}]},{"values":"东莞市","code":"441900","children":[{"values":"市辖区","code":"441900"}]},{"values":"中山市","code":"442000","children":[{"values":"市辖区","code":"442000"}]},{"values":"潮州市","code":"445100","children":[{"values":"市辖区","code":"445101"},{"values":"湘桥区","code":"445102"},{"values":"潮安区","code":"445103"},{"values":"饶平县","code":"445122"}]},{"values":"揭阳市","code":"445200","children":[{"values":"市辖区","code":"445201"},{"values":"榕城区","code":"445202"},{"values":"揭东区","code":"445203"},{"values":"揭西县","code":"445222"},{"values":"惠来县","code":"445224"},{"values":"普宁市","code":"445281"}]},{"values":"云浮市","code":"445300","children":[{"values":"市辖区","code":"445301"},{"values":"云城区","code":"445302"},{"values":"新兴县","code":"445321"},{"values":"郁南县","code":"445322"},{"values":"云安县","code":"445323"},{"values":"罗定市","code":"445381"}]}]},{"values":"广西壮族自治区","code":"450000","children":[{"values":"南宁市","code":"450100","children":[{"values":"市辖区","code":"450101"},{"values":"兴宁区","code":"450102"},{"values":"青秀区","code":"450103"},{"values":"江南区","code":"450105"},{"values":"西乡塘区","code":"450107"},{"values":"良庆区","code":"450108"},{"values":"邕宁区","code":"450109"},{"values":"武鸣县","code":"450122"},{"values":"隆安县","code":"450123"},{"values":"马山县","code":"450124"},{"values":"上林县","code":"450125"},{"values":"宾阳县","code":"450126"},{"values":"横县","code":"450127"}]},{"values":"柳州市","code":"450200","children":[{"values":"市辖区","code":"450201"},{"values":"城中区","code":"450202"},{"values":"鱼峰区","code":"450203"},{"values":"柳南区","code":"450204"},{"values":"柳北区","code":"450205"},{"values":"柳江县","code":"450221"},{"values":"柳城县","code":"450222"},{"values":"鹿寨县","code":"450223"},{"values":"融安县","code":"450224"},{"values":"融水苗族自治县","code":"450225"},{"values":"三江侗族自治县","code":"450226"}]},{"values":"桂林市","code":"450300","children":[{"values":"市辖区","code":"450301"},{"values":"秀峰区","code":"450302"},{"values":"叠彩区","code":"450303"},{"values":"象山区","code":"450304"},{"values":"七星区","code":"450305"},{"values":"雁山区","code":"450311"},{"values":"临桂区","code":"450312"},{"values":"阳朔县","code":"450321"},{"values":"灵川县","code":"450323"},{"values":"全州县","code":"450324"},{"values":"兴安县","code":"450325"},{"values":"永福县","code":"450326"},{"values":"灌阳县","code":"450327"},{"values":"龙胜各族自治县","code":"450328"},{"values":"资源县","code":"450329"},{"values":"平乐县","code":"450330"},{"values":"荔浦县","code":"450331"},{"values":"恭城瑶族自治县","code":"450332"}]},{"values":"梧州市","code":"450400","children":[{"values":"市辖区","code":"450401"},{"values":"万秀区","code":"450403"},{"values":"长洲区","code":"450405"},{"values":"龙圩区","code":"450406"},{"values":"苍梧县","code":"450421"},{"values":"藤县","code":"450422"},{"values":"蒙山县","code":"450423"},{"values":"岑溪市","code":"450481"}]},{"values":"北海市","code":"450500","children":[{"values":"市辖区","code":"450501"},{"values":"海城区","code":"450502"},{"values":"银海区","code":"450503"},{"values":"铁山港区","code":"450512"},{"values":"合浦县","code":"450521"}]},{"values":"防城港市","code":"450600","children":[{"values":"市辖区","code":"450601"},{"values":"港口区","code":"450602"},{"values":"防城区","code":"450603"},{"values":"上思县","code":"450621"},{"values":"东兴市","code":"450681"}]},{"values":"钦州市","code":"450700","children":[{"values":"市辖区","code":"450701"},{"values":"钦南区","code":"450702"},{"values":"钦北区","code":"450703"},{"values":"灵山县","code":"450721"},{"values":"浦北县","code":"450722"}]},{"values":"贵港市","code":"450800","children":[{"values":"市辖区","code":"450801"},{"values":"港北区","code":"450802"},{"values":"港南区","code":"450803"},{"values":"覃塘区","code":"450804"},{"values":"平南县","code":"450821"},{"values":"桂平市","code":"450881"}]},{"values":"玉林市","code":"450900","children":[{"values":"市辖区","code":"450901"},{"values":"玉州区","code":"450902"},{"values":"福绵区","code":"450903"},{"values":"容县","code":"450921"},{"values":"陆川县","code":"450922"},{"values":"博白县","code":"450923"},{"values":"兴业县","code":"450924"},{"values":"北流市","code":"450981"}]},{"values":"百色市","code":"451000","children":[{"values":"市辖区","code":"451001"},{"values":"右江区","code":"451002"},{"values":"田阳县","code":"451021"},{"values":"田东县","code":"451022"},{"values":"平果县","code":"451023"},{"values":"德保县","code":"451024"},{"values":"靖西县","code":"451025"},{"values":"那坡县","code":"451026"},{"values":"凌云县","code":"451027"},{"values":"乐业县","code":"451028"},{"values":"田林县","code":"451029"},{"values":"西林县","code":"451030"},{"values":"隆林各族自治县","code":"451031"}]},{"values":"贺州市","code":"451100","children":[{"values":"市辖区","code":"451101"},{"values":"八步区","code":"451102"},{"values":"昭平县","code":"451121"},{"values":"钟山县","code":"451122"},{"values":"富川瑶族自治县","code":"451123"}]},{"values":"河池市","code":"451200","children":[{"values":"市辖区","code":"451201"},{"values":"金城江区","code":"451202"},{"values":"南丹县","code":"451221"},{"values":"天峨县","code":"451222"},{"values":"凤山县","code":"451223"},{"values":"东兰县","code":"451224"},{"values":"罗城仫佬族自治县","code":"451225"},{"values":"环江毛南族自治县","code":"451226"},{"values":"巴马瑶族自治县","code":"451227"},{"values":"都安瑶族自治县","code":"451228"},{"values":"大化瑶族自治县","code":"451229"},{"values":"宜州市","code":"451281"}]},{"values":"来宾市","code":"451300","children":[{"values":"市辖区","code":"451301"},{"values":"兴宾区","code":"451302"},{"values":"忻城县","code":"451321"},{"values":"象州县","code":"451322"},{"values":"武宣县","code":"451323"},{"values":"金秀瑶族自治县","code":"451324"},{"values":"合山市","code":"451381"}]},{"values":"崇左市","code":"451400","children":[{"values":"市辖区","code":"451401"},{"values":"江州区","code":"451402"},{"values":"扶绥县","code":"451421"},{"values":"宁明县","code":"451422"},{"values":"龙州县","code":"451423"},{"values":"大新县","code":"451424"},{"values":"天等县","code":"451425"},{"values":"凭祥市","code":"451481"}]}]},{"values":"海南省","code":"460000","children":[{"values":"海口市","code":"460100","children":[{"values":"市辖区","code":"460101"},{"values":"秀英区","code":"460105"},{"values":"龙华区","code":"460106"},{"values":"琼山区","code":"460107"},{"values":"美兰区","code":"460108"}]},{"values":"三亚市","code":"460200","children":[{"values":"市辖区","code":"460201"}]},{"values":"三沙市","code":"460300","children":[{"values":"西沙群岛","code":"460321"},{"values":"南沙群岛","code":"460322"},{"values":"中沙群岛的岛礁及其海域","code":"460323"}]},{"values":"省直辖县级行政区划","code":"469000","children":[{"values":"五指山市","code":"469001"},{"values":"琼海市","code":"469002"},{"values":"儋州市","code":"469003"},{"values":"文昌市","code":"469005"},{"values":"万宁市","code":"469006"},{"values":"东方市","code":"469007"},{"values":"定安县","code":"469021"},{"values":"屯昌县","code":"469022"},{"values":"澄迈县","code":"469023"},{"values":"临高县","code":"469024"},{"values":"白沙黎族自治县","code":"469025"},{"values":"昌江黎族自治县","code":"469026"},{"values":"乐东黎族自治县","code":"469027"},{"values":"陵水黎族自治县","code":"469028"},{"values":"保亭黎族苗族自治县","code":"469029"},{"values":"琼中黎族苗族自治县","code":"469030"}]}]},{"values":"重庆市","code":"500000","children":[{"values":"重庆市","code":"500000","children":[{"values":"万州区","code":"500101"},{"values":"涪陵区","code":"500102"},{"values":"渝中区","code":"500103"},{"values":"大渡口区","code":"500104"},{"values":"江北区","code":"500105"},{"values":"沙坪坝区","code":"500106"},{"values":"九龙坡区","code":"500107"},{"values":"南岸区","code":"500108"},{"values":"北碚区","code":"500109"},{"values":"綦江区","code":"500110"},{"values":"大足区","code":"500111"},{"values":"渝北区","code":"500112"},{"values":"巴南区","code":"500113"},{"values":"黔江区","code":"500114"},{"values":"长寿区","code":"500115"},{"values":"江津区","code":"500116"},{"values":"合川区","code":"500117"},{"values":"永川区","code":"500118"},{"values":"南川区","code":"500119"},{"values":"潼南县","code":"500223"},{"values":"铜梁县","code":"500224"},{"values":"荣昌县","code":"500226"},{"values":"璧山县","code":"500227"},{"values":"梁平县","code":"500228"},{"values":"城口县","code":"500229"},{"values":"丰都县","code":"500230"},{"values":"垫江县","code":"500231"},{"values":"武隆县","code":"500232"},{"values":"忠县","code":"500233"},{"values":"开县","code":"500234"},{"values":"云阳县","code":"500235"},{"values":"奉节县","code":"500236"},{"values":"巫山县","code":"500237"},{"values":"巫溪县","code":"500238"},{"values":"石柱土家族自治县","code":"500240"},{"values":"秀山土家族苗族自治县","code":"500241"},{"values":"酉阳土家族苗族自治县","code":"500242"},{"values":"彭水苗族土家族自治县","code":"500243"}]}]},{"values":"四川省","code":"510000","children":[{"values":"成都市","code":"510100","children":[{"values":"市辖区","code":"510101"},{"values":"锦江区","code":"510104"},{"values":"青羊区","code":"510105"},{"values":"金牛区","code":"510106"},{"values":"武侯区","code":"510107"},{"values":"成华区","code":"510108"},{"values":"龙泉驿区","code":"510112"},{"values":"青白江区","code":"510113"},{"values":"新都区","code":"510114"},{"values":"温江区","code":"510115"},{"values":"金堂县","code":"510121"},{"values":"双流县","code":"510122"},{"values":"郫县","code":"510124"},{"values":"大邑县","code":"510129"},{"values":"蒲江县","code":"510131"},{"values":"新津县","code":"510132"},{"values":"都江堰市","code":"510181"},{"values":"彭州市","code":"510182"},{"values":"邛崃市","code":"510183"},{"values":"崇州市","code":"510184"}]},{"values":"自贡市","code":"510300","children":[{"values":"市辖区","code":"510301"},{"values":"自流井区","code":"510302"},{"values":"贡井区","code":"510303"},{"values":"大安区","code":"510304"},{"values":"沿滩区","code":"510311"},{"values":"荣县","code":"510321"},{"values":"富顺县","code":"510322"}]},{"values":"攀枝花市","code":"510400","children":[{"values":"市辖区","code":"510401"},{"values":"东区","code":"510402"},{"values":"西区","code":"510403"},{"values":"仁和区","code":"510411"},{"values":"米易县","code":"510421"},{"values":"盐边县","code":"510422"}]},{"values":"泸州市","code":"510500","children":[{"values":"市辖区","code":"510501"},{"values":"江阳区","code":"510502"},{"values":"纳溪区","code":"510503"},{"values":"龙马潭区","code":"510504"},{"values":"泸县","code":"510521"},{"values":"合江县","code":"510522"},{"values":"叙永县","code":"510524"},{"values":"古蔺县","code":"510525"}]},{"values":"德阳市","code":"510600","children":[{"values":"市辖区","code":"510601"},{"values":"旌阳区","code":"510603"},{"values":"中江县","code":"510623"},{"values":"罗江县","code":"510626"},{"values":"广汉市","code":"510681"},{"values":"什邡市","code":"510682"},{"values":"绵竹市","code":"510683"}]},{"values":"绵阳市","code":"510700","children":[{"values":"市辖区","code":"510701"},{"values":"涪城区","code":"510703"},{"values":"游仙区","code":"510704"},{"values":"三台县","code":"510722"},{"values":"盐亭县","code":"510723"},{"values":"安县","code":"510724"},{"values":"梓潼县","code":"510725"},{"values":"北川羌族自治县","code":"510726"},{"values":"平武县","code":"510727"},{"values":"江油市","code":"510781"}]},{"values":"广元市","code":"510800","children":[{"values":"市辖区","code":"510801"},{"values":"利州区","code":"510802"},{"values":"元坝区","code":"510811"},{"values":"朝天区","code":"510812"},{"values":"旺苍县","code":"510821"},{"values":"青川县","code":"510822"},{"values":"剑阁县","code":"510823"},{"values":"苍溪县","code":"510824"}]},{"values":"遂宁市","code":"510900","children":[{"values":"市辖区","code":"510901"},{"values":"船山区","code":"510903"},{"values":"安居区","code":"510904"},{"values":"蓬溪县","code":"510921"},{"values":"射洪县","code":"510922"},{"values":"大英县","code":"510923"}]},{"values":"内江市","code":"511000","children":[{"values":"市辖区","code":"511001"},{"values":"市中区","code":"511002"},{"values":"东兴区","code":"511011"},{"values":"威远县","code":"511024"},{"values":"资中县","code":"511025"},{"values":"隆昌县","code":"511028"}]},{"values":"乐山市","code":"511100","children":[{"values":"市辖区","code":"511101"},{"values":"市中区","code":"511102"},{"values":"沙湾区","code":"511111"},{"values":"五通桥区","code":"511112"},{"values":"金口河区","code":"511113"},{"values":"犍为县","code":"511123"},{"values":"井研县","code":"511124"},{"values":"夹江县","code":"511126"},{"values":"沐川县","code":"511129"},{"values":"峨边彝族自治县","code":"511132"},{"values":"马边彝族自治县","code":"511133"},{"values":"峨眉山市","code":"511181"}]},{"values":"南充市","code":"511300","children":[{"values":"市辖区","code":"511301"},{"values":"顺庆区","code":"511302"},{"values":"高坪区","code":"511303"},{"values":"嘉陵区","code":"511304"},{"values":"南部县","code":"511321"},{"values":"营山县","code":"511322"},{"values":"蓬安县","code":"511323"},{"values":"仪陇县","code":"511324"},{"values":"西充县","code":"511325"},{"values":"阆中市","code":"511381"}]},{"values":"眉山市","code":"511400","children":[{"values":"市辖区","code":"511401"},{"values":"东坡区","code":"511402"},{"values":"仁寿县","code":"511421"},{"values":"彭山县","code":"511422"},{"values":"洪雅县","code":"511423"},{"values":"丹棱县","code":"511424"},{"values":"青神县","code":"511425"}]},{"values":"宜宾市","code":"511500","children":[{"values":"市辖区","code":"511501"},{"values":"翠屏区","code":"511502"},{"values":"南溪区","code":"511503"},{"values":"宜宾县","code":"511521"},{"values":"江安县","code":"511523"},{"values":"长宁县","code":"511524"},{"values":"高县","code":"511525"},{"values":"珙县","code":"511526"},{"values":"筠连县","code":"511527"},{"values":"兴文县","code":"511528"},{"values":"屏山县","code":"511529"}]},{"values":"广安市","code":"511600","children":[{"values":"市辖区","code":"511601"},{"values":"广安区","code":"511602"},{"values":"前锋区","code":"511603"},{"values":"岳池县","code":"511621"},{"values":"武胜县","code":"511622"},{"values":"邻水县","code":"511623"},{"values":"华蓥市","code":"511681"}]},{"values":"达州市","code":"511700","children":[{"values":"市辖区","code":"511701"},{"values":"通川区","code":"511702"},{"values":"达川区","code":"511703"},{"values":"宣汉县","code":"511722"},{"values":"开江县","code":"511723"},{"values":"大竹县","code":"511724"},{"values":"渠县","code":"511725"},{"values":"万源市","code":"511781"}]},{"values":"雅安市","code":"511800","children":[{"values":"市辖区","code":"511801"},{"values":"雨城区","code":"511802"},{"values":"名山区","code":"511803"},{"values":"荥经县","code":"511822"},{"values":"汉源县","code":"511823"},{"values":"石棉县","code":"511824"},{"values":"天全县","code":"511825"},{"values":"芦山县","code":"511826"},{"values":"宝兴县","code":"511827"}]},{"values":"巴中市","code":"511900","children":[{"values":"市辖区","code":"511901"},{"values":"巴州区","code":"511902"},{"values":"恩阳区","code":"511903"},{"values":"通江县","code":"511921"},{"values":"南江县","code":"511922"},{"values":"平昌县","code":"511923"}]},{"values":"资阳市","code":"512000","children":[{"values":"市辖区","code":"512001"},{"values":"雁江区","code":"512002"},{"values":"安岳县","code":"512021"},{"values":"乐至县","code":"512022"},{"values":"简阳市","code":"512081"}]},{"values":"阿坝藏族羌族自治州","code":"513200","children":[{"values":"汶川县","code":"513221"},{"values":"理县","code":"513222"},{"values":"茂县","code":"513223"},{"values":"松潘县","code":"513224"},{"values":"九寨沟县","code":"513225"},{"values":"金川县","code":"513226"},{"values":"小金县","code":"513227"},{"values":"黑水县","code":"513228"},{"values":"马尔康县","code":"513229"},{"values":"壤塘县","code":"513230"},{"values":"阿坝县","code":"513231"},{"values":"若尔盖县","code":"513232"},{"values":"红原县","code":"513233"}]},{"values":"甘孜藏族自治州","code":"513300","children":[{"values":"康定县","code":"513321"},{"values":"泸定县","code":"513322"},{"values":"丹巴县","code":"513323"},{"values":"九龙县","code":"513324"},{"values":"雅江县","code":"513325"},{"values":"道孚县","code":"513326"},{"values":"炉霍县","code":"513327"},{"values":"甘孜县","code":"513328"},{"values":"新龙县","code":"513329"},{"values":"德格县","code":"513330"},{"values":"白玉县","code":"513331"},{"values":"石渠县","code":"513332"},{"values":"色达县","code":"513333"},{"values":"理塘县","code":"513334"},{"values":"巴塘县","code":"513335"},{"values":"乡城县","code":"513336"},{"values":"稻城县","code":"513337"},{"values":"得荣县","code":"513338"}]},{"values":"凉山彝族自治州","code":"513400","children":[{"values":"西昌市","code":"513401"},{"values":"木里藏族自治县","code":"513422"},{"values":"盐源县","code":"513423"},{"values":"德昌县","code":"513424"},{"values":"会理县","code":"513425"},{"values":"会东县","code":"513426"},{"values":"宁南县","code":"513427"},{"values":"普格县","code":"513428"},{"values":"布拖县","code":"513429"},{"values":"金阳县","code":"513430"},{"values":"昭觉县","code":"513431"},{"values":"喜德县","code":"513432"},{"values":"冕宁县","code":"513433"},{"values":"越西县","code":"513434"},{"values":"甘洛县","code":"513435"},{"values":"美姑县","code":"513436"},{"values":"雷波县","code":"513437"}]}]},{"values":"贵州省","code":"520000","children":[{"values":"贵阳市","code":"520100","children":[{"values":"市辖区","code":"520101"},{"values":"南明区","code":"520102"},{"values":"云岩区","code":"520103"},{"values":"花溪区","code":"520111"},{"values":"乌当区","code":"520112"},{"values":"白云区","code":"520113"},{"values":"观山湖区","code":"520115"},{"values":"开阳县","code":"520121"},{"values":"息烽县","code":"520122"},{"values":"修文县","code":"520123"},{"values":"清镇市","code":"520181"}]},{"values":"六盘水市","code":"520200","children":[{"values":"钟山区","code":"520201"},{"values":"六枝特区","code":"520203"},{"values":"水城县","code":"520221"},{"values":"盘县","code":"520222"}]},{"values":"遵义市","code":"520300","children":[{"values":"市辖区","code":"520301"},{"values":"红花岗区","code":"520302"},{"values":"汇川区","code":"520303"},{"values":"遵义县","code":"520321"},{"values":"桐梓县","code":"520322"},{"values":"绥阳县","code":"520323"},{"values":"正安县","code":"520324"},{"values":"道真仡佬族苗族自治县","code":"520325"},{"values":"务川仡佬族苗族自治县","code":"520326"},{"values":"凤冈县","code":"520327"},{"values":"湄潭县","code":"520328"},{"values":"余庆县","code":"520329"},{"values":"习水县","code":"520330"},{"values":"赤水市","code":"520381"},{"values":"仁怀市","code":"520382"}]},{"values":"安顺市","code":"520400","children":[{"values":"市辖区","code":"520401"},{"values":"西秀区","code":"520402"},{"values":"平坝县","code":"520421"},{"values":"普定县","code":"520422"},{"values":"镇宁布依族苗族自治县","code":"520423"},{"values":"关岭布依族苗族自治县","code":"520424"},{"values":"紫云苗族布依族自治县","code":"520425"}]},{"values":"毕节市","code":"520500","children":[{"values":"市辖区","code":"520501"},{"values":"七星关区","code":"520502"},{"values":"大方县","code":"520521"},{"values":"黔西县","code":"520522"},{"values":"金沙县","code":"520523"},{"values":"织金县","code":"520524"},{"values":"纳雍县","code":"520525"},{"values":"威宁彝族回族苗族自治县","code":"520526"},{"values":"赫章县","code":"520527"}]},{"values":"铜仁市","code":"520600","children":[{"values":"市辖区","code":"520601"},{"values":"碧江区","code":"520602"},{"values":"万山区","code":"520603"},{"values":"江口县","code":"520621"},{"values":"玉屏侗族自治县","code":"520622"},{"values":"石阡县","code":"520623"},{"values":"思南县","code":"520624"},{"values":"印江土家族苗族自治县","code":"520625"},{"values":"德江县","code":"520626"},{"values":"沿河土家族自治县","code":"520627"},{"values":"松桃苗族自治县","code":"520628"}]},{"values":"黔西南布依族苗族自治州","code":"522300","children":[{"values":"兴义市","code":"522301"},{"values":"兴仁县","code":"522322"},{"values":"普安县","code":"522323"},{"values":"晴隆县","code":"522324"},{"values":"贞丰县","code":"522325"},{"values":"望谟县","code":"522326"},{"values":"册亨县","code":"522327"},{"values":"安龙县","code":"522328"}]},{"values":"黔东南苗族侗族自治州","code":"522600","children":[{"values":"凯里市","code":"522601"},{"values":"黄平县","code":"522622"},{"values":"施秉县","code":"522623"},{"values":"三穗县","code":"522624"},{"values":"镇远县","code":"522625"},{"values":"岑巩县","code":"522626"},{"values":"天柱县","code":"522627"},{"values":"锦屏县","code":"522628"},{"values":"剑河县","code":"522629"},{"values":"台江县","code":"522630"},{"values":"黎平县","code":"522631"},{"values":"榕江县","code":"522632"},{"values":"从江县","code":"522633"},{"values":"雷山县","code":"522634"},{"values":"麻江县","code":"522635"},{"values":"丹寨县","code":"522636"}]},{"values":"黔南布依族苗族自治州","code":"522700","children":[{"values":"都匀市","code":"522701"},{"values":"福泉市","code":"522702"},{"values":"荔波县","code":"522722"},{"values":"贵定县","code":"522723"},{"values":"瓮安县","code":"522725"},{"values":"独山县","code":"522726"},{"values":"平塘县","code":"522727"},{"values":"罗甸县","code":"522728"},{"values":"长顺县","code":"522729"},{"values":"龙里县","code":"522730"},{"values":"惠水县","code":"522731"},{"values":"三都水族自治县","code":"522732"}]}]},{"values":"云南省","code":"530000","children":[{"values":"昆明市","code":"530100","children":[{"values":"市辖区","code":"530101"},{"values":"五华区","code":"530102"},{"values":"盘龙区","code":"530103"},{"values":"官渡区","code":"530111"},{"values":"西山区","code":"530112"},{"values":"东川区","code":"530113"},{"values":"呈贡区","code":"530114"},{"values":"晋宁县","code":"530122"},{"values":"富民县","code":"530124"},{"values":"宜良县","code":"530125"},{"values":"石林彝族自治县","code":"530126"},{"values":"嵩明县","code":"530127"},{"values":"禄劝彝族苗族自治县","code":"530128"},{"values":"寻甸回族彝族自治县","code":"530129"},{"values":"安宁市","code":"530181"}]},{"values":"曲靖市","code":"530300","children":[{"values":"市辖区","code":"530301"},{"values":"麒麟区","code":"530302"},{"values":"马龙县","code":"530321"},{"values":"陆良县","code":"530322"},{"values":"师宗县","code":"530323"},{"values":"罗平县","code":"530324"},{"values":"富源县","code":"530325"},{"values":"会泽县","code":"530326"},{"values":"沾益县","code":"530328"},{"values":"宣威市","code":"530381"}]},{"values":"玉溪市","code":"530400","children":[{"values":"市辖区","code":"530401"},{"values":"红塔区","code":"530402"},{"values":"江川县","code":"530421"},{"values":"澄江县","code":"530422"},{"values":"通海县","code":"530423"},{"values":"华宁县","code":"530424"},{"values":"易门县","code":"530425"},{"values":"峨山彝族自治县","code":"530426"},{"values":"新平彝族傣族自治县","code":"530427"},{"values":"元江哈尼族彝族傣族自治县","code":"530428"}]},{"values":"保山市","code":"530500","children":[{"values":"市辖区","code":"530501"},{"values":"隆阳区","code":"530502"},{"values":"施甸县","code":"530521"},{"values":"腾冲县","code":"530522"},{"values":"龙陵县","code":"530523"},{"values":"昌宁县","code":"530524"}]},{"values":"昭通市","code":"530600","children":[{"values":"市辖区","code":"530601"},{"values":"昭阳区","code":"530602"},{"values":"鲁甸县","code":"530621"},{"values":"巧家县","code":"530622"},{"values":"盐津县","code":"530623"},{"values":"大关县","code":"530624"},{"values":"永善县","code":"530625"},{"values":"绥江县","code":"530626"},{"values":"镇雄县","code":"530627"},{"values":"彝良县","code":"530628"},{"values":"威信县","code":"530629"},{"values":"水富县","code":"530630"}]},{"values":"丽江市","code":"530700","children":[{"values":"市辖区","code":"530701"},{"values":"古城区","code":"530702"},{"values":"玉龙纳西族自治县","code":"530721"},{"values":"永胜县","code":"530722"},{"values":"华坪县","code":"530723"},{"values":"宁蒗彝族自治县","code":"530724"}]},{"values":"普洱市","code":"530800","children":[{"values":"市辖区","code":"530801"},{"values":"思茅区","code":"530802"},{"values":"宁洱哈尼族彝族自治县","code":"530821"},{"values":"墨江哈尼族自治县","code":"530822"},{"values":"景东彝族自治县","code":"530823"},{"values":"景谷傣族彝族自治县","code":"530824"},{"values":"镇沅彝族哈尼族拉祜族自治县","code":"530825"},{"values":"江城哈尼族彝族自治县","code":"530826"},{"values":"孟连傣族拉祜族佤族自治县","code":"530827"},{"values":"澜沧拉祜族自治县","code":"530828"},{"values":"西盟佤族自治县","code":"530829"}]},{"values":"临沧市","code":"530900","children":[{"values":"市辖区","code":"530901"},{"values":"临翔区","code":"530902"},{"values":"凤庆县","code":"530921"},{"values":"云县","code":"530922"},{"values":"永德县","code":"530923"},{"values":"镇康县","code":"530924"},{"values":"双江拉祜族佤族布朗族傣族自治县","code":"530925"},{"values":"耿马傣族佤族自治县","code":"530926"},{"values":"沧源佤族自治县","code":"530927"}]},{"values":"楚雄彝族自治州","code":"532300","children":[{"values":"楚雄市","code":"532301"},{"values":"双柏县","code":"532322"},{"values":"牟定县","code":"532323"},{"values":"南华县","code":"532324"},{"values":"姚安县","code":"532325"},{"values":"大姚县","code":"532326"},{"values":"永仁县","code":"532327"},{"values":"元谋县","code":"532328"},{"values":"武定县","code":"532329"},{"values":"禄丰县","code":"532331"}]},{"values":"红河哈尼族彝族自治州","code":"532500","children":[{"values":"个旧市","code":"532501"},{"values":"开远市","code":"532502"},{"values":"蒙自市","code":"532503"},{"values":"弥勒市","code":"532504"},{"values":"屏边苗族自治县","code":"532523"},{"values":"建水县","code":"532524"},{"values":"石屏县","code":"532525"},{"values":"泸西县","code":"532527"},{"values":"元阳县","code":"532528"},{"values":"红河县","code":"532529"},{"values":"金平苗族瑶族傣族自治县","code":"532530"},{"values":"绿春县","code":"532531"},{"values":"河口瑶族自治县","code":"532532"}]},{"values":"文山壮族苗族自治州","code":"532600","children":[{"values":"文山市","code":"532601"},{"values":"砚山县","code":"532622"},{"values":"西畴县","code":"532623"},{"values":"麻栗坡县","code":"532624"},{"values":"马关县","code":"532625"},{"values":"丘北县","code":"532626"},{"values":"广南县","code":"532627"},{"values":"富宁县","code":"532628"}]},{"values":"西双版纳傣族自治州","code":"532800","children":[{"values":"景洪市","code":"532801"},{"values":"勐海县","code":"532822"},{"values":"勐腊县","code":"532823"}]},{"values":"大理白族自治州","code":"532900","children":[{"values":"大理市","code":"532901"},{"values":"漾濞彝族自治县","code":"532922"},{"values":"祥云县","code":"532923"},{"values":"宾川县","code":"532924"},{"values":"弥渡县","code":"532925"},{"values":"南涧彝族自治县","code":"532926"},{"values":"巍山彝族回族自治县","code":"532927"},{"values":"永平县","code":"532928"},{"values":"云龙县","code":"532929"},{"values":"洱源县","code":"532930"},{"values":"剑川县","code":"532931"},{"values":"鹤庆县","code":"532932"}]},{"values":"德宏傣族景颇族自治州","code":"533100","children":[{"values":"瑞丽市","code":"533102"},{"values":"芒市","code":"533103"},{"values":"梁河县","code":"533122"},{"values":"盈江县","code":"533123"},{"values":"陇川县","code":"533124"}]},{"values":"怒江傈僳族自治州","code":"533300","children":[{"values":"泸水县","code":"533321"},{"values":"福贡县","code":"533323"},{"values":"贡山独龙族怒族自治县","code":"533324"},{"values":"兰坪白族普米族自治县","code":"533325"}]},{"values":"迪庆藏族自治州","code":"533400","children":[{"values":"香格里拉县","code":"533421"},{"values":"德钦县","code":"533422"},{"values":"维西傈僳族自治县","code":"533423"}]}]},{"values":"西藏自治区","code":"540000","children":[{"values":"拉萨市","code":"540100","children":[{"values":"市辖区","code":"540101"},{"values":"城关区","code":"540102"},{"values":"林周县","code":"540121"},{"values":"当雄县","code":"540122"},{"values":"尼木县","code":"540123"},{"values":"曲水县","code":"540124"},{"values":"堆龙德庆县","code":"540125"},{"values":"达孜县","code":"540126"},{"values":"墨竹工卡县","code":"540127"}]},{"values":"昌都地区","code":"542100","children":[{"values":"昌都县","code":"542121"},{"values":"江达县","code":"542122"},{"values":"贡觉县","code":"542123"},{"values":"类乌齐县","code":"542124"},{"values":"丁青县","code":"542125"},{"values":"察雅县","code":"542126"},{"values":"八宿县","code":"542127"},{"values":"左贡县","code":"542128"},{"values":"芒康县","code":"542129"},{"values":"洛隆县","code":"542132"},{"values":"边坝县","code":"542133"}]},{"values":"山南地区","code":"542200","children":[{"values":"乃东县","code":"542221"},{"values":"扎囊县","code":"542222"},{"values":"贡嘎县","code":"542223"},{"values":"桑日县","code":"542224"},{"values":"琼结县","code":"542225"},{"values":"曲松县","code":"542226"},{"values":"措美县","code":"542227"},{"values":"洛扎县","code":"542228"},{"values":"加查县","code":"542229"},{"values":"隆子县","code":"542231"},{"values":"错那县","code":"542232"},{"values":"浪卡子县","code":"542233"}]},{"values":"日喀则地区","code":"542300","children":[{"values":"日喀则市","code":"542301"},{"values":"南木林县","code":"542322"},{"values":"江孜县","code":"542323"},{"values":"定日县","code":"542324"},{"values":"萨迦县","code":"542325"},{"values":"拉孜县","code":"542326"},{"values":"昂仁县","code":"542327"},{"values":"谢通门县","code":"542328"},{"values":"白朗县","code":"542329"},{"values":"仁布县","code":"542330"},{"values":"康马县","code":"542331"},{"values":"定结县","code":"542332"},{"values":"仲巴县","code":"542333"},{"values":"亚东县","code":"542334"},{"values":"吉隆县","code":"542335"},{"values":"聂拉木县","code":"542336"},{"values":"萨嘎县","code":"542337"},{"values":"岗巴县","code":"542338"}]},{"values":"那曲地区","code":"542400","children":[{"values":"那曲县","code":"542421"},{"values":"嘉黎县","code":"542422"},{"values":"比如县","code":"542423"},{"values":"聂荣县","code":"542424"},{"values":"安多县","code":"542425"},{"values":"申扎县","code":"542426"},{"values":"索县","code":"542427"},{"values":"班戈县","code":"542428"},{"values":"巴青县","code":"542429"},{"values":"尼玛县","code":"542430"},{"values":"双湖县","code":"542431"}]},{"values":"阿里地区","code":"542500","children":[{"values":"普兰县","code":"542521"},{"values":"札达县","code":"542522"},{"values":"噶尔县","code":"542523"},{"values":"日土县","code":"542524"},{"values":"革吉县","code":"542525"},{"values":"改则县","code":"542526"},{"values":"措勤县","code":"542527"}]},{"values":"林芝地区","code":"542600","children":[{"values":"林芝县","code":"542621"},{"values":"工布江达县","code":"542622"},{"values":"米林县","code":"542623"},{"values":"墨脱县","code":"542624"},{"values":"波密县","code":"542625"},{"values":"察隅县","code":"542626"},{"values":"朗县","code":"542627"}]}]},{"values":"陕西省","code":"610000","children":[{"values":"西安市","code":"610100","children":[{"values":"市辖区","code":"610101"},{"values":"新城区","code":"610102"},{"values":"碑林区","code":"610103"},{"values":"莲湖区","code":"610104"},{"values":"灞桥区","code":"610111"},{"values":"未央区","code":"610112"},{"values":"雁塔区","code":"610113"},{"values":"阎良区","code":"610114"},{"values":"临潼区","code":"610115"},{"values":"长安区","code":"610116"},{"values":"蓝田县","code":"610122"},{"values":"周至县","code":"610124"},{"values":"户县","code":"610125"},{"values":"高陵县","code":"610126"}]},{"values":"铜川市","code":"610200","children":[{"values":"市辖区","code":"610201"},{"values":"王益区","code":"610202"},{"values":"印台区","code":"610203"},{"values":"耀州区","code":"610204"},{"values":"宜君县","code":"610222"}]},{"values":"宝鸡市","code":"610300","children":[{"values":"市辖区","code":"610301"},{"values":"渭滨区","code":"610302"},{"values":"金台区","code":"610303"},{"values":"陈仓区","code":"610304"},{"values":"凤翔县","code":"610322"},{"values":"岐山县","code":"610323"},{"values":"扶风县","code":"610324"},{"values":"眉县","code":"610326"},{"values":"陇县","code":"610327"},{"values":"千阳县","code":"610328"},{"values":"麟游县","code":"610329"},{"values":"凤县","code":"610330"},{"values":"太白县","code":"610331"}]},{"values":"咸阳市","code":"610400","children":[{"values":"市辖区","code":"610401"},{"values":"秦都区","code":"610402"},{"values":"杨陵区","code":"610403"},{"values":"渭城区","code":"610404"},{"values":"三原县","code":"610422"},{"values":"泾阳县","code":"610423"},{"values":"乾县","code":"610424"},{"values":"礼泉县","code":"610425"},{"values":"永寿县","code":"610426"},{"values":"彬县","code":"610427"},{"values":"长武县","code":"610428"},{"values":"旬邑县","code":"610429"},{"values":"淳化县","code":"610430"},{"values":"武功县","code":"610431"},{"values":"兴平市","code":"610481"}]},{"values":"渭南市","code":"610500","children":[{"values":"市辖区","code":"610501"},{"values":"临渭区","code":"610502"},{"values":"华县","code":"610521"},{"values":"潼关县","code":"610522"},{"values":"大荔县","code":"610523"},{"values":"合阳县","code":"610524"},{"values":"澄城县","code":"610525"},{"values":"蒲城县","code":"610526"},{"values":"白水县","code":"610527"},{"values":"富平县","code":"610528"},{"values":"韩城市","code":"610581"},{"values":"华阴市","code":"610582"}]},{"values":"延安市","code":"610600","children":[{"values":"市辖区","code":"610601"},{"values":"宝塔区","code":"610602"},{"values":"延长县","code":"610621"},{"values":"延川县","code":"610622"},{"values":"子长县","code":"610623"},{"values":"安塞县","code":"610624"},{"values":"志丹县","code":"610625"},{"values":"吴起县","code":"610626"},{"values":"甘泉县","code":"610627"},{"values":"富县","code":"610628"},{"values":"洛川县","code":"610629"},{"values":"宜川县","code":"610630"},{"values":"黄龙县","code":"610631"},{"values":"黄陵县","code":"610632"}]},{"values":"汉中市","code":"610700","children":[{"values":"市辖区","code":"610701"},{"values":"汉台区","code":"610702"},{"values":"南郑县","code":"610721"},{"values":"城固县","code":"610722"},{"values":"洋县","code":"610723"},{"values":"西乡县","code":"610724"},{"values":"勉县","code":"610725"},{"values":"宁强县","code":"610726"},{"values":"略阳县","code":"610727"},{"values":"镇巴县","code":"610728"},{"values":"留坝县","code":"610729"},{"values":"佛坪县","code":"610730"}]},{"values":"榆林市","code":"610800","children":[{"values":"市辖区","code":"610801"},{"values":"榆阳区","code":"610802"},{"values":"神木县","code":"610821"},{"values":"府谷县","code":"610822"},{"values":"横山县","code":"610823"},{"values":"靖边县","code":"610824"},{"values":"定边县","code":"610825"},{"values":"绥德县","code":"610826"},{"values":"米脂县","code":"610827"},{"values":"佳县","code":"610828"},{"values":"吴堡县","code":"610829"},{"values":"清涧县","code":"610830"},{"values":"子洲县","code":"610831"}]},{"values":"安康市","code":"610900","children":[{"values":"市辖区","code":"610901"},{"values":"汉滨区","code":"610902"},{"values":"汉阴县","code":"610921"},{"values":"石泉县","code":"610922"},{"values":"宁陕县","code":"610923"},{"values":"紫阳县","code":"610924"},{"values":"岚皋县","code":"610925"},{"values":"平利县","code":"610926"},{"values":"镇坪县","code":"610927"},{"values":"旬阳县","code":"610928"},{"values":"白河县","code":"610929"}]},{"values":"商洛市","code":"611000","children":[{"values":"市辖区","code":"611001"},{"values":"商州区","code":"611002"},{"values":"洛南县","code":"611021"},{"values":"丹凤县","code":"611022"},{"values":"商南县","code":"611023"},{"values":"山阳县","code":"611024"},{"values":"镇安县","code":"611025"},{"values":"柞水县","code":"611026"}]}]},{"values":"甘肃省","code":"620000","children":[{"values":"兰州市","code":"620100","children":[{"values":"市辖区","code":"620101"},{"values":"城关区","code":"620102"},{"values":"七里河区","code":"620103"},{"values":"西固区","code":"620104"},{"values":"安宁区","code":"620105"},{"values":"红古区","code":"620111"},{"values":"永登县","code":"620121"},{"values":"皋兰县","code":"620122"},{"values":"榆中县","code":"620123"}]},{"values":"嘉峪关市","code":"620200","children":[{"values":"市辖区","code":"620201"}]},{"values":"金昌市","code":"620300","children":[{"values":"市辖区","code":"620301"},{"values":"金川区","code":"620302"},{"values":"永昌县","code":"620321"}]},{"values":"白银市","code":"620400","children":[{"values":"市辖区","code":"620401"},{"values":"白银区","code":"620402"},{"values":"平川区","code":"620403"},{"values":"靖远县","code":"620421"},{"values":"会宁县","code":"620422"},{"values":"景泰县","code":"620423"}]},{"values":"天水市","code":"620500","children":[{"values":"市辖区","code":"620501"},{"values":"秦州区","code":"620502"},{"values":"麦积区","code":"620503"},{"values":"清水县","code":"620521"},{"values":"秦安县","code":"620522"},{"values":"甘谷县","code":"620523"},{"values":"武山县","code":"620524"},{"values":"张家川回族自治县","code":"620525"}]},{"values":"武威市","code":"620600","children":[{"values":"市辖区","code":"620601"},{"values":"凉州区","code":"620602"},{"values":"民勤县","code":"620621"},{"values":"古浪县","code":"620622"},{"values":"天祝藏族自治县","code":"620623"}]},{"values":"张掖市","code":"620700","children":[{"values":"市辖区","code":"620701"},{"values":"甘州区","code":"620702"},{"values":"肃南裕固族自治县","code":"620721"},{"values":"民乐县","code":"620722"},{"values":"临泽县","code":"620723"},{"values":"高台县","code":"620724"},{"values":"山丹县","code":"620725"}]},{"values":"平凉市","code":"620800","children":[{"values":"市辖区","code":"620801"},{"values":"崆峒区","code":"620802"},{"values":"泾川县","code":"620821"},{"values":"灵台县","code":"620822"},{"values":"崇信县","code":"620823"},{"values":"华亭县","code":"620824"},{"values":"庄浪县","code":"620825"},{"values":"静宁县","code":"620826"}]},{"values":"酒泉市","code":"620900","children":[{"values":"市辖区","code":"620901"},{"values":"肃州区","code":"620902"},{"values":"金塔县","code":"620921"},{"values":"瓜州县","code":"620922"},{"values":"肃北蒙古族自治县","code":"620923"},{"values":"阿克塞哈萨克族自治县","code":"620924"},{"values":"玉门市","code":"620981"},{"values":"敦煌市","code":"620982"}]},{"values":"庆阳市","code":"621000","children":[{"values":"市辖区","code":"621001"},{"values":"西峰区","code":"621002"},{"values":"庆城县","code":"621021"},{"values":"环县","code":"621022"},{"values":"华池县","code":"621023"},{"values":"合水县","code":"621024"},{"values":"正宁县","code":"621025"},{"values":"宁县","code":"621026"},{"values":"镇原县","code":"621027"}]},{"values":"定西市","code":"621100","children":[{"values":"市辖区","code":"621101"},{"values":"安定区","code":"621102"},{"values":"通渭县","code":"621121"},{"values":"陇西县","code":"621122"},{"values":"渭源县","code":"621123"},{"values":"临洮县","code":"621124"},{"values":"漳县","code":"621125"},{"values":"岷县","code":"621126"}]},{"values":"陇南市","code":"621200","children":[{"values":"市辖区","code":"621201"},{"values":"武都区","code":"621202"},{"values":"成县","code":"621221"},{"values":"文县","code":"621222"},{"values":"宕昌县","code":"621223"},{"values":"康县","code":"621224"},{"values":"西和县","code":"621225"},{"values":"礼县","code":"621226"},{"values":"徽县","code":"621227"},{"values":"两当县","code":"621228"}]},{"values":"临夏回族自治州","code":"622900","children":[{"values":"临夏市","code":"622901"},{"values":"临夏县","code":"622921"},{"values":"康乐县","code":"622922"},{"values":"永靖县","code":"622923"},{"values":"广河县","code":"622924"},{"values":"和政县","code":"622925"},{"values":"东乡族自治县","code":"622926"},{"values":"积石山保安族东乡族撒拉族自治县","code":"622927"}]},{"values":"甘南藏族自治州","code":"623000","children":[{"values":"合作市","code":"623001"},{"values":"临潭县","code":"623021"},{"values":"卓尼县","code":"623022"},{"values":"舟曲县","code":"623023"},{"values":"迭部县","code":"623024"},{"values":"玛曲县","code":"623025"},{"values":"碌曲县","code":"623026"},{"values":"夏河县","code":"623027"}]}]},{"values":"青海省","code":"630000","children":[{"values":"西宁市","code":"630100","children":[{"values":"市辖区","code":"630101"},{"values":"城东区","code":"630102"},{"values":"城中区","code":"630103"},{"values":"城西区","code":"630104"},{"values":"城北区","code":"630105"},{"values":"大通回族土族自治县","code":"630121"},{"values":"湟中县","code":"630122"},{"values":"湟源县","code":"630123"}]},{"values":"海东市","code":"630200","children":[{"values":"乐都区","code":"630202"},{"values":"平安县","code":"630221"},{"values":"民和回族土族自治县","code":"630222"},{"values":"互助土族自治县","code":"630223"},{"values":"化隆回族自治县","code":"630224"},{"values":"循化撒拉族自治县","code":"630225"}]},{"values":"海北藏族自治州","code":"632200","children":[{"values":"门源回族自治县","code":"632221"},{"values":"祁连县","code":"632222"},{"values":"海晏县","code":"632223"},{"values":"刚察县","code":"632224"}]},{"values":"黄南藏族自治州","code":"632300","children":[{"values":"同仁县","code":"632321"},{"values":"尖扎县","code":"632322"},{"values":"泽库县","code":"632323"},{"values":"河南蒙古族自治县","code":"632324"}]},{"values":"海南藏族自治州","code":"632500","children":[{"values":"共和县","code":"632521"},{"values":"同德县","code":"632522"},{"values":"贵德县","code":"632523"},{"values":"兴海县","code":"632524"},{"values":"贵南县","code":"632525"}]},{"values":"果洛藏族自治州","code":"632600","children":[{"values":"玛沁县","code":"632621"},{"values":"班玛县","code":"632622"},{"values":"甘德县","code":"632623"},{"values":"达日县","code":"632624"},{"values":"久治县","code":"632625"},{"values":"玛多县","code":"632626"}]},{"values":"玉树藏族自治州","code":"632700","children":[{"values":"玉树市","code":"632701"},{"values":"杂多县","code":"632722"},{"values":"称多县","code":"632723"},{"values":"治多县","code":"632724"},{"values":"囊谦县","code":"632725"},{"values":"曲麻莱县","code":"632726"}]},{"values":"海西蒙古族藏族自治州","code":"632800","children":[{"values":"格尔木市","code":"632801"},{"values":"德令哈市","code":"632802"},{"values":"乌兰县","code":"632821"},{"values":"都兰县","code":"632822"},{"values":"天峻县","code":"632823"}]}]},{"values":"宁夏回族自治区","code":"640000","children":[{"values":"银川市","code":"640100","children":[{"values":"市辖区","code":"640101"},{"values":"兴庆区","code":"640104"},{"values":"西夏区","code":"640105"},{"values":"金凤区","code":"640106"},{"values":"永宁县","code":"640121"},{"values":"贺兰县","code":"640122"},{"values":"灵武市","code":"640181"}]},{"values":"石嘴山市","code":"640200","children":[{"values":"市辖区","code":"640201"},{"values":"大武口区","code":"640202"},{"values":"惠农区","code":"640205"},{"values":"平罗县","code":"640221"}]},{"values":"吴忠市","code":"640300","children":[{"values":"市辖区","code":"640301"},{"values":"利通区","code":"640302"},{"values":"红寺堡区","code":"640303"},{"values":"盐池县","code":"640323"},{"values":"同心县","code":"640324"},{"values":"青铜峡市","code":"640381"}]},{"values":"固原市","code":"640400","children":[{"values":"市辖区","code":"640401"},{"values":"原州区","code":"640402"},{"values":"西吉县","code":"640422"},{"values":"隆德县","code":"640423"},{"values":"泾源县","code":"640424"},{"values":"彭阳县","code":"640425"}]},{"values":"中卫市","code":"640500","children":[{"values":"市辖区","code":"640501"},{"values":"沙坡头区","code":"640502"},{"values":"中宁县","code":"640521"},{"values":"海原县","code":"640522"}]}]},{"values":"新疆维吾尔自治区","code":"650000","children":[{"values":"乌鲁木齐市","code":"650100","children":[{"values":"市辖区","code":"650101"},{"values":"天山区","code":"650102"},{"values":"沙依巴克区","code":"650103"},{"values":"新市区","code":"650104"},{"values":"水磨沟区","code":"650105"},{"values":"头屯河区","code":"650106"},{"values":"达坂城区","code":"650107"},{"values":"米东区","code":"650109"},{"values":"乌鲁木齐县","code":"650121"}]},{"values":"克拉玛依市","code":"650200","children":[{"values":"市辖区","code":"650201"},{"values":"独山子区","code":"650202"},{"values":"克拉玛依区","code":"650203"},{"values":"白碱滩区","code":"650204"},{"values":"乌尔禾区","code":"650205"}]},{"values":"吐鲁番地区","code":"652100","children":[{"values":"吐鲁番市","code":"652101"},{"values":"鄯善县","code":"652122"},{"values":"托克逊县","code":"652123"}]},{"values":"哈密地区","code":"652200","children":[{"values":"哈密市","code":"652201"},{"values":"巴里坤哈萨克自治县","code":"652222"},{"values":"伊吾县","code":"652223"}]},{"values":"昌吉回族自治州","code":"652300","children":[{"values":"昌吉市","code":"652301"},{"values":"阜康市","code":"652302"},{"values":"呼图壁县","code":"652323"},{"values":"玛纳斯县","code":"652324"},{"values":"奇台县","code":"652325"},{"values":"吉木萨尔县","code":"652327"},{"values":"木垒哈萨克自治县","code":"652328"}]},{"values":"博尔塔拉蒙古自治州","code":"652700","children":[{"values":"博乐市","code":"652701"},{"values":"阿拉山口市","code":"652702"},{"values":"精河县","code":"652722"},{"values":"温泉县","code":"652723"}]},{"values":"巴音郭楞蒙古自治州","code":"652800","children":[{"values":"库尔勒市","code":"652801"},{"values":"轮台县","code":"652822"},{"values":"尉犁县","code":"652823"},{"values":"若羌县","code":"652824"},{"values":"且末县","code":"652825"},{"values":"焉耆回族自治县","code":"652826"},{"values":"和静县","code":"652827"},{"values":"和硕县","code":"652828"},{"values":"博湖县","code":"652829"}]},{"values":"阿克苏地区","code":"652900","children":[{"values":"阿克苏市","code":"652901"},{"values":"温宿县","code":"652922"},{"values":"库车县","code":"652923"},{"values":"沙雅县","code":"652924"},{"values":"新和县","code":"652925"},{"values":"拜城县","code":"652926"},{"values":"乌什县","code":"652927"},{"values":"阿瓦提县","code":"652928"},{"values":"柯坪县","code":"652929"}]},{"values":"克孜勒苏柯尔克孜自治州","code":"653000","children":[{"values":"阿图什市","code":"653001"},{"values":"阿克陶县","code":"653022"},{"values":"阿合奇县","code":"653023"},{"values":"乌恰县","code":"653024"}]},{"values":"喀什地区","code":"653100","children":[{"values":"喀什市","code":"653101"},{"values":"疏附县","code":"653121"},{"values":"疏勒县","code":"653122"},{"values":"英吉沙县","code":"653123"},{"values":"泽普县","code":"653124"},{"values":"莎车县","code":"653125"},{"values":"叶城县","code":"653126"},{"values":"麦盖提县","code":"653127"},{"values":"岳普湖县","code":"653128"},{"values":"伽师县","code":"653129"},{"values":"巴楚县","code":"653130"},{"values":"塔什库尔干塔吉克自治县","code":"653131"}]},{"values":"和田地区","code":"653200","children":[{"values":"和田市","code":"653201"},{"values":"和田县","code":"653221"},{"values":"墨玉县","code":"653222"},{"values":"皮山县","code":"653223"},{"values":"洛浦县","code":"653224"},{"values":"策勒县","code":"653225"},{"values":"于田县","code":"653226"},{"values":"民丰县","code":"653227"}]},{"values":"伊犁哈萨克自治州","code":"654000","children":[{"values":"伊宁市","code":"654002"},{"values":"奎屯市","code":"654003"},{"values":"伊宁县","code":"654021"},{"values":"察布查尔锡伯自治县","code":"654022"},{"values":"霍城县","code":"654023"},{"values":"巩留县","code":"654024"},{"values":"新源县","code":"654025"},{"values":"昭苏县","code":"654026"},{"values":"特克斯县","code":"654027"},{"values":"尼勒克县","code":"654028"}]},{"values":"塔城地区","code":"654200","children":[{"values":"塔城市","code":"654201"},{"values":"乌苏市","code":"654202"},{"values":"额敏县","code":"654221"},{"values":"沙湾县","code":"654223"},{"values":"托里县","code":"654224"},{"values":"裕民县","code":"654225"},{"values":"和布克赛尔蒙古自治县","code":"654226"}]},{"values":"阿勒泰地区","code":"654300","children":[{"values":"阿勒泰市","code":"654301"},{"values":"布尔津县","code":"654321"},{"values":"富蕴县","code":"654322"},{"values":"福海县","code":"654323"},{"values":"哈巴河县","code":"654324"},{"values":"青河县","code":"654325"},{"values":"吉木乃县","code":"654326"}]},{"values":"自治区直辖县级行政区划","code":"659000","children":[{"values":"石河子市","code":"659001"},{"values":"阿拉尔市","code":"659002"},{"values":"图木舒克市","code":"659003"},{"values":"五家渠市","code":"659004"}]}]},{"values":"台湾省","code":"710000","children":[{"values":"台湾市","code":"710000","children":[{"values":"台湾市","code":"710000"}]}]},{"values":"香港特别行政区","code":"810000","children":[{"values":"香港特别行政区","code":"810000","children":[{"values":"香港特别行政区","code":"810000"}]}]},{"values":"澳门特别行政区","code":"820000","children":[{"values":"澳门特别行政区","code":"820000","children":[{"values":"澳门特别行政区","code":"820000"}]}]}];

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\components\\wxcharts.js":
/*!****************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/components/wxcharts.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {/*
 * charts for WeChat small app v1.0
 *
 * https://github.com/xiaolin3303/wx-charts
 * 2016-11-28
 *
 * Designed and built with all the love of Web
 * 
 * 【秋云科技】修改为uni-app跨全端图表
 * https://github.com/16cheng/uni-wx-charts
 * 插件市场地址：
 * http://ext.dcloud.net.cn/plugin?id=271
 * 
 * 2019-04-01
 * 修改为兼容uni-wx-charts
 * 2019-04-14
 * 支持支付宝/百度/头条小程序实现跨全端
 * 2019-04-15
 * 支持横屏模式，新增rotate参数，默认flase
 * 2019-04-16
 * 新增圆弧进度图，图表类型arcbar
 * 2019-04-22
 * 修改图表拖拽功能跨端支持，增加拖拽时显示滚动条
 * 2019-04-28
 * 新增柱状图自定义颜色
 * 2019-05-01
 * 新增仪表盘图
 * 
 */



var config = {
  yAxisWidth: 15,
  yAxisSplit: 5,
  xAxisHeight: 15,
  xAxisLineHeight: 15,
  legendHeight: 15,
  yAxisTitleWidth: 15,
  padding: 12,
  pixelRatio: 1, //适配H5高分屏
  rotate: false, //横屏模式
  columePadding: 3,
  fontSize: 13,
  //dataPointShape: ['diamond', 'circle', 'triangle', 'rect'],
  dataPointShape: ['circle', 'circle', 'circle', 'circle'], //仿F2图例样式改为圆点
  colors: ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
  pieChartLinePadding: 15,
  pieChartTextPadding: 5,
  xAxisTextPadding: 3,
  titleColor: '#333333',
  titleFontSize: 20,
  subtitleColor: '#999999',
  subtitleFontSize: 15,
  toolTipPadding: 3,
  toolTipBackground: '#000000',
  toolTipOpacity: 0.7,
  toolTipLineHeight: 20,
  radarGridCount: 3,
  radarLabelTextMargin: 15,
  gaugeLabelTextMargin: 15 };


// Object.assign polyfill
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function assign(target, varArgs) {
  if (target == null) {
    // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(target);

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index];

    if (nextSource != null) {
      // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}

var util = {
  toFixed: function toFixed(num, limit) {
    limit = limit || 2;
    if (this.isFloat(num)) {
      num = num.toFixed(limit);
    }
    return num;
  },
  isFloat: function isFloat(num) {
    return num % 1 !== 0;
  },
  approximatelyEqual: function approximatelyEqual(num1, num2) {
    return Math.abs(num1 - num2) < 1e-10;
  },
  isSameSign: function isSameSign(num1, num2) {
    return Math.abs(num1) === num1 && Math.abs(num2) === num2 || Math.abs(num1) !== num1 && Math.abs(num2) !== num2;
  },
  isSameXCoordinateArea: function isSameXCoordinateArea(p1, p2) {
    return this.isSameSign(p1.x, p2.x);
  },
  isCollision: function isCollision(obj1, obj2) {
    obj1.end = {};
    obj1.end.x = obj1.start.x + obj1.width;
    obj1.end.y = obj1.start.y - obj1.height;
    obj2.end = {};
    obj2.end.x = obj2.start.x + obj2.width;
    obj2.end.y = obj2.start.y - obj2.height;
    var flag = obj2.start.x > obj1.end.x || obj2.end.x < obj1.start.x || obj2.end.y > obj1.start.y || obj2.start.y < obj1.end.y;

    return !flag;
  } };


function findRange(num, type, limit) {
  if (isNaN(num)) {
    throw new Error('[wxCharts] unvalid series data!');
  }
  limit = limit || 10;
  type = type ? type : 'upper';
  var multiple = 1;
  while (limit < 1) {
    limit *= 10;
    multiple *= 10;
  }
  if (type === 'upper') {
    num = Math.ceil(num * multiple);
  } else {
    num = Math.floor(num * multiple);
  }
  while (num % limit !== 0) {
    if (type === 'upper') {
      num++;
    } else {
      num--;
    }
  }

  return num / multiple;
}

function calValidDistance(distance, chartData, config, opts) {

  var dataChartAreaWidth = opts.width - config.padding - chartData.xAxisPoints[0];
  var dataChartWidth = chartData.eachSpacing * opts.categories.length;
  var validDistance = distance;
  if (distance >= 0) {
    validDistance = 0;
  } else if (Math.abs(distance) >= dataChartWidth - dataChartAreaWidth) {
    validDistance = dataChartAreaWidth - dataChartWidth;
  }
  return validDistance;
}

function isInAngleRange(angle, startAngle, endAngle) {
  function adjust(angle) {
    while (angle < 0) {
      angle += 2 * Math.PI;
    }
    while (angle > 2 * Math.PI) {
      angle -= 2 * Math.PI;
    }

    return angle;
  }

  angle = adjust(angle);
  startAngle = adjust(startAngle);
  endAngle = adjust(endAngle);
  if (startAngle > endAngle) {
    endAngle += 2 * Math.PI;
    if (angle < startAngle) {
      angle += 2 * Math.PI;
    }
  }

  return angle >= startAngle && angle <= endAngle;
}

function calRotateTranslate(x, y, h) {
  var xv = x;
  var yv = h - y;

  var transX = xv + (h - yv - xv) / Math.sqrt(2);
  transX *= -1;

  var transY = (h - yv) * (Math.sqrt(2) - 1) - (h - yv - xv) / Math.sqrt(2);

  return {
    transX: transX,
    transY: transY };

}

function createCurveControlPoints(points, i) {

  function isNotMiddlePoint(points, i) {
    if (points[i - 1] && points[i + 1]) {
      return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y) || points[i].y <= Math.min(points[i - 1].y, points[i + 1].y);
    } else {
      return false;
    }
  }

  var a = 0.2;
  var b = 0.2;
  var pAx = null;
  var pAy = null;
  var pBx = null;
  var pBy = null;
  if (i < 1) {
    pAx = points[0].x + (points[1].x - points[0].x) * a;
    pAy = points[0].y + (points[1].y - points[0].y) * a;
  } else {
    pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
    pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
  }

  if (i > points.length - 3) {
    var last = points.length - 1;
    pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
    pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
  } else {
    pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
    pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
  }

  // fix issue https://github.com/xiaolin3303/wx-charts/issues/79
  if (isNotMiddlePoint(points, i + 1)) {
    pBy = points[i + 1].y;
  }
  if (isNotMiddlePoint(points, i)) {
    pAy = points[i].y;
  }

  return {
    ctrA: { x: pAx, y: pAy },
    ctrB: { x: pBx, y: pBy } };

}

function convertCoordinateOrigin(x, y, center) {
  return {
    x: center.x + x,
    y: center.y - y };

}

function avoidCollision(obj, target) {
  if (target) {
    // is collision test
    while (util.isCollision(obj, target)) {
      if (obj.start.x > 0) {
        obj.start.y--;
      } else if (obj.start.x < 0) {
        obj.start.y++;
      } else {
        if (obj.start.y > 0) {
          obj.start.y++;
        } else {
          obj.start.y--;
        }
      }
    }
  }
  return obj;
}

function fillSeriesColor(series, config) {
  var index = 0;
  return series.map(function (item) {
    if (!item.color) {
      item.color = config.colors[index];
      index = (index + 1) % config.colors.length;
    }
    return item;
  });
}

function getDataRange(minData, maxData) {
  var limit = 0;
  var range = maxData - minData;
  if (range >= 10000) {
    limit = 1000;
  } else if (range >= 1000) {
    limit = 100;
  } else if (range >= 100) {
    limit = 10;
  } else if (range >= 10) {
    limit = 5;
  } else if (range >= 1) {
    limit = 1;
  } else if (range >= 0.1) {
    limit = 0.1;
  } else {
    limit = 0.01;
  }
  return {
    minRange: findRange(minData, 'lower', limit),
    maxRange: findRange(maxData, 'upper', limit) };

}

function measureText(text) {
  var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.fontSize;

  // wx canvas 未实现measureText方法, 此处自行实现
  // 适配修改初始字体10px为其他大小的方法
  text = String(text);
  var text = text.split('');
  var width = 0;
  text.forEach(function (item) {
    if (/[a-zA-Z]/.test(item)) {
      width += 7;
    } else if (/[0-9]/.test(item)) {
      width += 5.5;
    } else if (/\./.test(item)) {
      width += 2.7;
    } else if (/-/.test(item)) {
      width += 3.25;
    } else if (/[\u4e00-\u9fa5]/.test(item)) {
      width += 10;
    } else if (/\(|\)/.test(item)) {
      width += 3.73;
    } else if (/\s/.test(item)) {
      width += 2.5;
    } else if (/%/.test(item)) {
      width += 8;
    } else {
      width += 10;
    }
  });
  return width * fontSize / 10;
}

function dataCombine(series) {
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data);
  }, []);
}

function getSeriesDataItem(series, index) {
  var data = [];
  series.forEach(function (item) {
    if (item.data[index] !== null && typeof item.data[index] !== 'undefined') {
      var seriesItem = {};
      seriesItem.color = item.color;
      seriesItem.name = item.name;
      seriesItem.data = item.format ? item.format(item.data[index]) : item.data[index];
      data.push(seriesItem);
    }
  });

  return data;
}

function getMaxTextListLength(list) {
  var lengthList = list.map(function (item) {
    return measureText(item);
  });
  return Math.max.apply(null, lengthList);
}

function getRadarCoordinateSeries(length) {
  var eachAngle = 2 * Math.PI / length;
  var CoordinateSeries = [];
  for (var i = 0; i < length; i++) {
    CoordinateSeries.push(eachAngle * i);
  }

  return CoordinateSeries.map(function (item) {
    return -1 * item + Math.PI / 2;
  });
}

function getToolTipData(seriesData, calPoints, index, categories) {
  var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var textList = seriesData.map(function (item) {
    return {
      text: option.format ? option.format(item, categories[index]) : item.name + ': ' + item.data,
      color: item.color };

  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  calPoints.forEach(function (points) {
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  });
  validCalPoints.forEach(function (item) {
    offset.x = Math.round(item.x);
    offset.y += item.y;
  });

  offset.y /= validCalPoints.length;
  return { textList: textList, offset: offset };
}

function findCurrentIndex(currentPoints, xAxisPoints, opts, config) {
  var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var currentIndex = -1;
  if (isInExactChartArea(currentPoints, opts, config)) {
    xAxisPoints.forEach(function (item, index) {
      if (currentPoints.x + offset > item) {
        currentIndex = index;
      }
    });
  }

  return currentIndex;
}

function isInExactChartArea(currentPoints, opts, config) {
  return currentPoints.x < opts.width - config.padding && currentPoints.x > config.padding + config.yAxisWidth + config.yAxisTitleWidth && currentPoints.y > config.padding && currentPoints.y < opts.height - config.legendHeight - config.xAxisHeight - config.padding;
}

function findRadarChartCurrentIndex(currentPoints, radarData, count) {
  var eachAngleArea = 2 * Math.PI / count;
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, radarData.center, radarData.radius)) {
    var fixAngle = function fixAngle(angle) {
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      if (angle > 2 * Math.PI) {
        angle -= 2 * Math.PI;
      }
      return angle;
    };

    var angle = Math.atan2(radarData.center.y - currentPoints.y, currentPoints.x - radarData.center.x);
    angle = -1 * angle;
    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    var angleList = radarData.angleList.map(function (item) {
      item = fixAngle(-1 * item);

      return item;
    });

    angleList.forEach(function (item, index) {
      var rangeStart = fixAngle(item - eachAngleArea / 2);
      var rangeEnd = fixAngle(item + eachAngleArea / 2);
      if (rangeEnd < rangeStart) {
        rangeEnd += 2 * Math.PI;
      }
      if (angle >= rangeStart && angle <= rangeEnd || angle + 2 * Math.PI >= rangeStart && angle + 2 * Math.PI <= rangeEnd) {
        currentIndex = index;
      }
    });
  }

  return currentIndex;
}

function findPieChartCurrentIndex(currentPoints, pieData) {
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;
    for (var i = 0, len = pieData.series.length; i < len; i++) {
      var item = pieData.series[i];
      if (isInAngleRange(angle, item._start_, item._start_ + item._proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }

  return currentIndex;
}

function isInExactPieChartArea(currentPoints, center, radius) {
  return Math.pow(currentPoints.x - center.x, 2) + Math.pow(currentPoints.y - center.y, 2) <= Math.pow(radius, 2);
}

function splitPoints(points) {
  var newPoints = [];
  var items = [];
  points.forEach(function (item, index) {
    if (item !== null) {
      items.push(item);
    } else {
      if (items.length) {
        newPoints.push(items);
      }
      items = [];
    }
  });
  if (items.length) {
    newPoints.push(items);
  }

  return newPoints;
}

function calLegendData(series, opts, config) {
  if (opts.legend === false) {
    return {
      legendList: [],
      legendHeight: 0 };

  }
  //适配H5高分屏
  var padding = 5 * opts.pixelRatio;
  var marginTop = 8 * opts.pixelRatio;
  var shapeWidth = 15 * opts.pixelRatio;
  var legendList = [];
  var widthCount = 0;
  var currentRow = [];
  series.forEach(function (item) {
    var itemWidth = 3 * padding + shapeWidth + measureText(item.name || 'undefined');
    if (widthCount + itemWidth > opts.width) {
      legendList.push(currentRow);
      widthCount = itemWidth;
      currentRow = [item];
    } else {
      widthCount += itemWidth;
      currentRow.push(item);
    }
  });
  if (currentRow.length) {
    legendList.push(currentRow);
  }

  return {
    legendList: legendList,
    legendHeight: legendList.length * (config.fontSize + marginTop) + padding };

}

function calCategoriesData(categories, opts, config) {
  var result = {
    angle: 0,
    xAxisHeight: config.xAxisHeight };


  var _getXAxisPoints = getXAxisPoints(categories, opts, config),
  eachSpacing = _getXAxisPoints.eachSpacing;

  // get max length of categories text


  var categoriesTextLenth = categories.map(function (item) {
    return measureText(item);
  });

  var maxTextLength = Math.max.apply(this, categoriesTextLenth);

  if (maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
    result.angle = 45 * Math.PI / 180;
    result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
  }

  return result;
}

function getRadarDataPoints(angleList, center, radius, series, opts) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

  var radarOption = opts.extra.radar || {};
  radarOption.max = radarOption.max || 0;
  var maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));

  var data = [];
  series.forEach(function (each) {
    var listItem = {};
    listItem.color = each.color;
    listItem.data = [];
    each.data.forEach(function (item, index) {
      var tmp = {};
      tmp.angle = angleList[index];

      tmp.proportion = item / maxData;
      tmp.position = convertCoordinateOrigin(radius * tmp.proportion * process * Math.cos(tmp.angle), radius * tmp.proportion * process * Math.sin(tmp.angle), center);
      listItem.data.push(tmp);
    });

    data.push(listItem);
  });

  return data;
}

function getPieDataPoints(series) {
  var process = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var count = 0;
  var _start_ = 0;
  series.forEach(function (item) {
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
  });
  series.forEach(function (item) {
    item.data = item.data === null ? 0 : item.data;
    item._proportion_ = item.data / count * process;
  });
  series.forEach(function (item) {
    item._start_ = _start_;
    _start_ += 2 * item._proportion_ * Math.PI;
  });

  return series;
}

function getArcbarDataPoints(series, arcbarOption) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (process == 1) {
    process = 0.999999;
  }
  series.forEach(function (item) {
    item.data = item.data === null ? 0 : item.data;
    var totalAngle;
    if (arcbarOption.type == 'default') {
      totalAngle = arcbarOption.startAngle - arcbarOption.endAngle + 1;
    } else {
      totalAngle = 2;
    }
    item._proportion_ = totalAngle * item.data * process + arcbarOption.startAngle;
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  });
  return series;
}

function getGaugeAxisPoints(categories, startAngle, endAngle) {
  var totalAngle = startAngle - endAngle + 1;
  var tempStartAngle = startAngle;
  for (var i = 0; i < categories.length; i++) {
    categories[i].value = categories[i].value === null ? 0 : categories[i].value;
    categories[i]._startAngle_ = tempStartAngle;
    categories[i]._endAngle_ = totalAngle * categories[i].value + startAngle;
    if (categories[i]._endAngle_ >= 2) {
      categories[i]._endAngle_ = categories[i]._endAngle_ % 2;
    }
    tempStartAngle = categories[i]._endAngle_;
  }
  return categories;
}

function getGaugeDataPoints(series, categories, gaugeOption) {
  var process = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  series.forEach(function (item) {
    item.data = item.data === null ? 0 : item.data;
    if (gaugeOption.pointer.color == 'auto') {
      for (var i = 0; i < categories.length; i++) {
        if (item.data <= categories[i].value) {
          item.color = categories[i].color;
          break;
        }
      }
    } else {
      item.color = gaugeOption.pointer.color;
    }
    var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    item._endAngle_ = totalAngle * item.data + gaugeOption.startAngle;
    item._oldAngle_ = gaugeOption.oldAngle;
    if (gaugeOption.oldAngle < gaugeOption.endAngle) {
      item._oldAngle_ += 2;
    }
    if (item.data >= gaugeOption.oldData) {
      item._proportion_ = (item._endAngle_ - item._oldAngle_) * process + gaugeOption.oldAngle;
    } else {
      item._proportion_ = item._oldAngle_ - (item._oldAngle_ - item._endAngle_) * process;
    }
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  });
  return series;
}


function getPieTextMaxLength(series) {
  series = getPieDataPoints(series);
  var maxLength = 0;
  series.forEach(function (item) {
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    maxLength = Math.max(maxLength, measureText(text));
  });

  return maxLength;
}

function fixColumeData(points, eachSpacing, columnLen, index, config, opts) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    item.width = (eachSpacing - 2 * config.columePadding) / columnLen;

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      // customer column width
      item.width = Math.min(item.width, +opts.extra.column.width);
    } else {
      // default width should less tran 25px
      // don't ask me why, I don't know
      item.width = Math.min(item.width, 25);
    }
    item.x += (index + 0.5 - columnLen / 2) * item.width;

    return item;
  });
}

function getXAxisPoints(categories, opts, config) {
  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
  var spacingValid = opts.width - 2 * config.padding - yAxisTotalWidth;
  var dataCount = opts.enableScroll ? Math.min(opts.xAxis.itemCount, categories.length) : categories.length;
  var eachSpacing = spacingValid / dataCount;

  var xAxisPoints = [];
  var startX = config.padding + yAxisTotalWidth;
  var endX = opts.width - config.padding;
  categories.forEach(function (item, index) {
    xAxisPoints.push(startX + index * eachSpacing);
  });
  if (opts.enableScroll === true) {
    xAxisPoints.push(startX + categories.length * eachSpacing);
  } else {
    xAxisPoints.push(endX);
  }

  return { xAxisPoints: xAxisPoints, startX: startX, endX: endX, eachSpacing: eachSpacing };
}

function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;

  var points = [];
  var validHeight = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
      var value = item.value || item;
      var height = validHeight * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.y = opts.height - config.xAxisHeight - config.legendHeight - Math.round(height) - config.padding;
      points.push(point);
    }
  });

  return points;
}

function getYAxisTextList(series, opts, config) {
  var data = dataCombine(series);
  var sorted = [];
  // remove null from data
  data = data.filter(function (item) {
    //return item !== null;
    if (typeof item === 'object') {
      return item.value !== null;
    } else {
      return item !== null;
    }
  });
  //var minData = Math.min.apply(this, data);
  //var maxData = Math.max.apply(this, data);
  data.map(function (item) {
    typeof item === 'object' ? sorted.push(item.value) : sorted.push(item);
  });
  var minData = Math.min.apply(this, sorted);
  var maxData = Math.max.apply(this, sorted);

  if (typeof opts.yAxis.min === 'number') {
    minData = Math.min(opts.yAxis.min, minData);
  }
  if (typeof opts.yAxis.max === 'number') {
    maxData = Math.max(opts.yAxis.max, maxData);
  }

  // fix issue https://github.com/xiaolin3303/wx-charts/issues/9
  if (minData === maxData) {
    var rangeSpan = maxData || 1;
    minData -= rangeSpan;
    maxData += rangeSpan;
  }

  var dataRange = getDataRange(minData, maxData);
  var minRange = dataRange.minRange;
  var maxRange = dataRange.maxRange;

  var range = [];
  var eachRange = (maxRange - minRange) / config.yAxisSplit;

  for (var i = 0; i <= config.yAxisSplit; i++) {
    range.push(minRange + eachRange * i);
  }
  return range.reverse();
}

function calYAxisData(series, opts, config) {

  var ranges = getYAxisTextList(series, opts, config);
  var yAxisWidth = config.yAxisWidth;
  var rangesFormat = ranges.map(function (item) {
    item = util.toFixed(item, 2);
    item = opts.yAxis.format ? opts.yAxis.format(Number(item)) : item;
    yAxisWidth = Math.max(yAxisWidth, measureText(item) + 5);
    return item;
  });
  if (opts.yAxis.disabled === true) {
    yAxisWidth = 0;
  }

  return { rangesFormat: rangesFormat, ranges: ranges, yAxisWidth: yAxisWidth };
}

function drawPointShape(points, color, shape, context, opts) {
  context.beginPath();
  context.setStrokeStyle("#ffffff");
  context.setLineWidth(1 * opts.pixelRatio);
  context.setFillStyle(color);
  if (shape === 'diamond') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y);
        context.lineTo(item.x, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === 'circle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x + 3.5 * opts.pixelRatio, item.y);
        context.arc(item.x, item.y, 4 * opts.pixelRatio, 0, 2 * Math.PI, false);
      }
    });
  } else if (shape === 'rect') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x - 3.5, item.y - 3.5);
        context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
      }
    });
  } else if (shape === 'triangle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y + 4.5);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  }


  context.closePath();
  context.fill();
  context.stroke();
}

function drawRingTitle(opts, config, context) {
  var titlefontSize = opts.title.fontSize || config.titleFontSize;
  var subtitlefontSize = opts.subtitle.fontSize || config.subtitleFontSize;
  var title = opts.title.name || '';
  var subtitle = opts.subtitle.name || '';
  var titleFontColor = opts.title.color || config.titleColor;
  var subtitleFontColor = opts.subtitle.color || config.subtitleColor;
  var titleHeight = title ? titlefontSize : 0;
  var subtitleHeight = subtitle ? subtitlefontSize : 0;
  var margin = 5;
  if (subtitle) {
    var textWidth = measureText(subtitle, subtitlefontSize);
    var startX = (opts.width - textWidth) / 2 + (opts.subtitle.offsetX || 0);
    var startY = (opts.height - config.legendHeight + subtitlefontSize) / 2 + (opts.subtitle.offsetY || 0);
    if (title) {
      startY -= (titleHeight + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(subtitlefontSize);
    context.setFillStyle(subtitleFontColor);
    context.fillText(subtitle, startX, startY);
    context.stroke();
    context.closePath();
  }
  if (title) {
    var _textWidth = measureText(title, titlefontSize);
    var _startX = (opts.width - _textWidth) / 2 + (opts.title.offsetX || 0);
    var _startY = (opts.height - config.legendHeight + titlefontSize) / 2 + (opts.title.offsetY || 0);
    if (subtitle) {
      _startY += (subtitleHeight + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(titlefontSize);
    context.setFillStyle(titleFontColor);
    context.fillText(title, _startX, _startY);
    context.stroke();
    context.closePath();
  }
}

function drawPointText(points, series, config, context) {
  // 绘制数据文案
  var data = series.data;

  context.beginPath();
  context.setFontSize(config.fontSize);
  context.setFillStyle('#666666');
  points.forEach(function (item, index) {
    if (item !== null) {
      //var formatVal = series.format ? series.format(data[index]) : data[index];
      var value = data[index].value || data[index];
      var formatVal = series.format ? series.format(value) : value;
      context.fillText(formatVal, item.x - measureText(formatVal) / 2, item.y - 2);
    }
  });
  context.closePath();
  context.stroke();
}

function drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context) {
  radius -= gaugeOption.width / 2 + config.gaugeLabelTextMargin;
  context.beginPath();
  context.setFontSize(config.fontSize);
  context.setFillStyle(gaugeOption.labelColor || '#666666');
  var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
  var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
  var totalNumber = gaugeOption.endNumber - gaugeOption.startNumber;
  var splitNumber = totalNumber / gaugeOption.splitLine.splitNumber;
  var nowAngle = gaugeOption.startAngle;
  var nowNumber = gaugeOption.startNumber;
  for (var i = 0; i < gaugeOption.splitLine.splitNumber + 1; i++) {
    var pos = {
      x: radius * Math.cos(nowAngle * Math.PI),
      y: radius * Math.sin(nowAngle * Math.PI) };

    pos.x += centerPosition.x - measureText(nowNumber) / 2;
    pos.y += centerPosition.y;
    var startX = pos.x;
    var startY = pos.y;
    context.fillText(nowNumber, startX, startY + config.fontSize / 2);
    nowAngle += splitAngle;
    if (nowAngle >= 2) {
      nowAngle = nowAngle % 2;
    }
    nowNumber += splitNumber;
  }
  context.stroke();
  context.closePath();
}

function drawRadarLabel(angleList, radius, centerPosition, opts, config, context) {
  var radarOption = opts.extra.radar || {};
  radius += config.radarLabelTextMargin;
  context.beginPath();
  context.setFontSize(config.fontSize);
  context.setFillStyle(radarOption.labelColor || '#666666');
  angleList.forEach(function (angle, index) {
    var pos = {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle) };

    var posRelativeCanvas = convertCoordinateOrigin(pos.x, pos.y, centerPosition);
    var startX = posRelativeCanvas.x;
    var startY = posRelativeCanvas.y;
    if (util.approximatelyEqual(pos.x, 0)) {
      startX -= measureText(opts.categories[index] || '') / 2;
    } else if (pos.x < 0) {
      startX -= measureText(opts.categories[index] || '');
    }
    context.fillText(opts.categories[index] || '', startX, startY + config.fontSize / 2);
  });
  context.stroke();
  context.closePath();
}

function drawPieText(series, opts, config, context, radius, center) {
  var lineRadius = radius + config.pieChartLinePadding;
  var textObjectCollection = [];
  var lastTextObject = null;

  var seriesConvert = series.map(function (item) {
    var arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._proportion_ / 2);
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    var color = item.color;
    return { arc: arc, text: text, color: color };
  });
  seriesConvert.forEach(function (item) {
    // line end
    var orginX1 = Math.cos(item.arc) * lineRadius;
    var orginY1 = Math.sin(item.arc) * lineRadius;

    // line start
    var orginX2 = Math.cos(item.arc) * radius;
    var orginY2 = Math.sin(item.arc) * radius;

    // text start
    var orginX3 = orginX1 >= 0 ? orginX1 + config.pieChartTextPadding : orginX1 - config.pieChartTextPadding;
    var orginY3 = orginY1;

    var textWidth = measureText(item.text);
    var startY = orginY3;

    if (lastTextObject && util.isSameXCoordinateArea(lastTextObject.start, { x: orginX3 })) {
      if (orginX3 > 0) {
        startY = Math.min(orginY3, lastTextObject.start.y);
      } else if (orginX1 < 0) {
        startY = Math.max(orginY3, lastTextObject.start.y);
      } else {
        if (orginY3 > 0) {
          startY = Math.max(orginY3, lastTextObject.start.y);
        } else {
          startY = Math.min(orginY3, lastTextObject.start.y);
        }
      }
    }

    if (orginX3 < 0) {
      orginX3 -= textWidth;
    }

    var textObject = {
      lineStart: {
        x: orginX2,
        y: orginY2 },

      lineEnd: {
        x: orginX1,
        y: orginY1 },

      start: {
        x: orginX3,
        y: startY },

      width: textWidth,
      height: config.fontSize,
      text: item.text,
      color: item.color };


    lastTextObject = avoidCollision(textObject, lastTextObject);
    textObjectCollection.push(lastTextObject);
  });

  textObjectCollection.forEach(function (item) {
    var lineStartPoistion = convertCoordinateOrigin(item.lineStart.x, item.lineStart.y, center);
    var lineEndPoistion = convertCoordinateOrigin(item.lineEnd.x, item.lineEnd.y, center);
    var textPosition = convertCoordinateOrigin(item.start.x, item.start.y, center);
    context.setLineWidth(1 * opts.pixelRatio);
    context.setFontSize(config.fontSize);
    context.beginPath();
    context.setStrokeStyle(item.color);
    context.setFillStyle(item.color);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    var curveStartX = item.start.x < 0 ? textPosition.x + item.width : textPosition.x;
    var textStartX = item.start.x < 0 ? textPosition.x - 5 : textPosition.x + 5;
    context.quadraticCurveTo(lineEndPoistion.x, lineEndPoistion.y, curveStartX, textPosition.y);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(textPosition.x + item.width, textPosition.y);
    context.arc(curveStartX, textPosition.y, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFillStyle('#666666');
    context.fillText(item.text, textStartX, textPosition.y + 3);
    context.closePath();
    context.stroke();

    context.closePath();
  });
}

function drawToolTipSplitLine(offsetX, opts, config, context) {
  var startY = config.padding;
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
  context.beginPath();
  context.setStrokeStyle('#cccccc');
  context.setLineWidth(1 * opts.pixelRatio);
  context.moveTo(offsetX, startY);
  context.lineTo(offsetX, endY);
  context.stroke();
  context.closePath();
}

function drawToolTip(textList, offset, opts, config, context) {
  var legendWidth = 4 * opts.pixelRatio;
  var legendMarginRight = 5 * opts.pixelRatio;
  var arrowWidth = 8 * opts.pixelRatio;
  var isOverRightBorder = false;
  offset = assign({
    x: 0,
    y: 0 },
  offset);
  offset.y -= 8 * opts.pixelRatio;
  var textWidth = textList.map(function (item) {
    return measureText(item.text);
  });

  var toolTipWidth = legendWidth + legendMarginRight + 4 * config.toolTipPadding + Math.max.apply(null, textWidth);
  var toolTipHeight = 2 * config.toolTipPadding + textList.length * config.toolTipLineHeight;

  // if beyond the right border
  if (offset.x - Math.abs(opts._scrollDistance_) + arrowWidth + toolTipWidth > opts.width) {
    isOverRightBorder = true;
  }

  // draw background rect
  context.beginPath();
  context.setFillStyle(opts.tooltip.option.background || config.toolTipBackground);
  context.setGlobalAlpha(config.toolTipOpacity);
  if (isOverRightBorder) {
    context.moveTo(offset.x, offset.y + 10 * opts.pixelRatio);
    context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pixelRatio - 5 * opts.pixelRatio);
    context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pixelRatio + 5 * opts.pixelRatio);
    context.moveTo(offset.x, offset.y + 10 * opts.pixelRatio);
    context.fillRect(offset.x - toolTipWidth - arrowWidth, offset.y, toolTipWidth, toolTipHeight);
  } else {
    context.moveTo(offset.x, offset.y + 10 * opts.pixelRatio);
    context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pixelRatio - 5 * opts.pixelRatio);
    context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pixelRatio + 5 * opts.pixelRatio);
    context.moveTo(offset.x, offset.y + 10 * opts.pixelRatio);
    context.fillRect(offset.x + arrowWidth, offset.y, toolTipWidth, toolTipHeight);
  }

  context.closePath();
  context.fill();
  context.setGlobalAlpha(1);

  // draw legend
  textList.forEach(function (item, index) {
    context.beginPath();
    context.setFillStyle(item.color);
    var startX = offset.x + arrowWidth + 2 * config.toolTipPadding;
    var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;
    if (isOverRightBorder) {
      startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding;
    }
    context.fillRect(startX, startY, legendWidth, config.fontSize);
    context.closePath();
  });

  // draw text list
  context.beginPath();
  context.setFontSize(config.fontSize);
  context.setFillStyle('#ffffff');
  textList.forEach(function (item, index) {
    var startX = offset.x + arrowWidth + 2 * config.toolTipPadding + legendWidth + legendMarginRight;
    if (isOverRightBorder) {
      startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding + +legendWidth + legendMarginRight;
    }
    var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;
    context.fillText(item.text, startX, startY + config.fontSize);
  });
  context.stroke();
  context.closePath();
}

function drawYAxisTitle(title, opts, config, context) {
  var startX = config.xAxisHeight + (opts.height - config.xAxisHeight - measureText(title)) / 2;
  context.save();
  context.beginPath();
  context.setFontSize(config.fontSize);
  context.setFillStyle(opts.yAxis.titleFontColor || '#333333');
  context.translate(0, opts.height);
  context.rotate(-90 * Math.PI / 180);
  context.fillText(title, startX, config.padding + 0.5 * config.fontSize);
  context.stroke();
  context.closePath();
  context.restore();
}

function drawColumnDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var _calYAxisData = calYAxisData(series, opts, config),
  ranges = _calYAxisData.ranges;

  var _getXAxisPoints = getXAxisPoints(opts.categories, opts, config),
  xAxisPoints = _getXAxisPoints.xAxisPoints,
  eachSpacing = _getXAxisPoints.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);

    // 绘制柱状数据图
    //context.beginPath();
    //context.setFillStyle(eachSeries.color);
    points.forEach(function (item, index) {
      if (item !== null) {
        context.beginPath();
        context.setFillStyle(item.color || eachSeries.color);
        var startX = item.x - item.width / 2 + 1;
        var height = opts.height - item.y - config.padding - config.xAxisHeight - config.legendHeight;
        context.moveTo(startX, item.y);
        context.rect(startX, item.y, item.width - 2, height);
        context.closePath();
        context.fill();
      }
    });
    //context.closePath();
    //context.fill();
  });
  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
    if (opts.dataLabel !== false && process === 1) {
      drawPointText(points, eachSeries, config, context);
    }
  });
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    eachSpacing: eachSpacing };

}

function drawAreaDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var _calYAxisData2 = calYAxisData(series, opts, config),
  ranges = _calYAxisData2.ranges;

  var _getXAxisPoints2 = getXAxisPoints(opts.categories, opts, config),
  xAxisPoints = _getXAxisPoints2.xAxisPoints,
  eachSpacing = _getXAxisPoints2.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
  var calPoints = [];

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
  }


  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);

    var splitPointList = splitPoints(points);

    splitPointList.forEach(function (points) {
      // 绘制区域数据
      context.beginPath();
      context.setStrokeStyle(eachSeries.color);
      context.setFillStyle(eachSeries.color);
      context.setGlobalAlpha(0.2);
      context.setLineWidth(2 * opts.pixelRatio);
      if (points.length > 1) {
        var firstPoint = points[0];
        var lastPoint = points[points.length - 1];

        context.moveTo(firstPoint.x, firstPoint.y);
        if (opts.extra.lineStyle === 'curve') {
          points.forEach(function (item, index) {
            if (index > 0) {
              var ctrlPoint = createCurveControlPoints(points, index - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          });
        } else {
          points.forEach(function (item, index) {
            if (index > 0) {
              context.lineTo(item.x, item.y);
            }
          });
        }

        context.lineTo(lastPoint.x, endY);
        context.lineTo(firstPoint.x, endY);
        context.lineTo(firstPoint.x, firstPoint.y);
      } else {
        var item = points[0];
        context.moveTo(item.x - eachSpacing / 2, item.y);
        context.lineTo(item.x + eachSpacing / 2, item.y);
        context.lineTo(item.x + eachSpacing / 2, endY);
        context.lineTo(item.x - eachSpacing / 2, endY);
        context.moveTo(item.x - eachSpacing / 2, item.y);
      }
      context.closePath();
      context.fill();
      context.setGlobalAlpha(1);


      //画连线
      context.beginPath();
      context.setStrokeStyle(eachSeries.color);
      context.setLineWidth(2 * opts.pixelRatio);
      if (points.length === 1) {
        context.moveTo(points[0].x, points[0].y);
        context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
      } else {
        context.moveTo(points[0].x, points[0].y);
        points.forEach(function (item, index) {
          if (index > 0) {
            context.lineTo(item.x, item.y);
          }
        });
        context.moveTo(points[0].x, points[0].y);
      }
      context.closePath();
      context.stroke();
    });

    //画点
    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }

  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context);
    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawLineDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var _calYAxisData3 = calYAxisData(series, opts, config),
  ranges = _calYAxisData3.ranges;

  var _getXAxisPoints3 = getXAxisPoints(opts.categories, opts, config),
  xAxisPoints = _getXAxisPoints3.xAxisPoints,
  eachSpacing = _getXAxisPoints3.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var calPoints = [];

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points);

    splitPointList.forEach(function (points, index) {
      context.beginPath();
      context.setStrokeStyle(eachSeries.color);
      context.setLineWidth(2 * opts.pixelRatio);
      if (points.length === 1) {
        context.moveTo(points[0].x, points[0].y);
        context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
      } else {
        context.moveTo(points[0].x, points[0].y);
        if (opts.extra.lineStyle === 'curve') {
          points.forEach(function (item, index) {
            if (index > 0) {
              var ctrlPoint = createCurveControlPoints(points, index - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          });
        } else {
          points.forEach(function (item, index) {
            if (index > 0) {
              context.lineTo(item.x, item.y);
            }
          });
        }
        context.moveTo(points[0].x, points[0].y);
      }
      context.closePath();
      context.stroke();
    });

    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context);
    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawToolTipBridge(opts, config, context, process) {
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTip(opts.tooltip.textList, opts.tooltip.offset, opts, config, context);
  }
  context.restore();
}

function drawXAxis(categories, opts, config, context) {
  var _getXAxisPoints4 = getXAxisPoints(categories, opts, config),
  xAxisPoints = _getXAxisPoints4.xAxisPoints,
  startX = _getXAxisPoints4.startX,
  endX = _getXAxisPoints4.endX,
  eachSpacing = _getXAxisPoints4.eachSpacing;

  var startY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
  var endY = startY + config.xAxisLineHeight;


  //绘制滚动条
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    var scrollStartX = startX + 3 * opts.pixelRatio;
    var scrollendX = endX - 3 * opts.pixelRatio;
    var scrollY = endY + 8 * opts.pixelRatio;
    var scrollScreenWidth = scrollendX - scrollStartX;
    var scrollTotalWidth = eachSpacing * (xAxisPoints.length - 1);
    var scrollWidth = scrollScreenWidth * scrollScreenWidth / scrollTotalWidth;
    var scrollLeft = 0;
    if (opts._scrollDistance_) {
      scrollLeft = -opts._scrollDistance_ * scrollScreenWidth / scrollTotalWidth;
    }
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pixelRatio);
    context.setStrokeStyle(opts.xAxis.scrollBackgroundColor || "#EFEBEF");
    context.moveTo(scrollStartX, scrollY);
    context.lineTo(scrollendX, scrollY);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pixelRatio);
    context.setStrokeStyle(opts.xAxis.scrollColor || "#A6A6A6");
    context.moveTo(scrollStartX + scrollLeft, scrollY);
    context.lineTo(scrollStartX + scrollLeft + scrollWidth, scrollY);
    context.stroke();
    context.closePath();
  }

  context.save();

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }

  context.beginPath();
  context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");

  if (opts.xAxis.disableGrid !== true) {
    if (opts.xAxis.type === 'calibration') {
      xAxisPoints.forEach(function (item, index) {
        if (index > 0) {
          context.moveTo(item - eachSpacing / 2, startY);
          context.lineTo(item - eachSpacing / 2, startY + 4);
        }
      });
    } else {
      xAxisPoints.forEach(function (item, index) {
        context.moveTo(item, startY);
        context.lineTo(item, endY);
      });
    }
  }
  context.closePath();
  context.stroke();

  // 对X轴列表做抽稀处理
  var validWidth = opts.width - 2 * config.padding - config.yAxisWidth - config.yAxisTitleWidth;
  var maxXAxisListLength = Math.min(categories.length, Math.ceil(validWidth / config.fontSize / 1.5));
  var ratio = Math.ceil(categories.length / maxXAxisListLength);

  categories = categories.map(function (item, index) {
    return index % ratio !== 0 ? '' : item;
  });

  if (config._xAxisTextAngle_ === 0) {
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(opts.xAxis.fontColor || '#666666');
    categories.forEach(function (item, index) {
      var offset = eachSpacing / 2 - measureText(item) / 2;
      context.fillText(item, xAxisPoints[index] + offset, startY + config.fontSize + 5);
    });
    context.closePath();
    context.stroke();
  } else {
    categories.forEach(function (item, index) {
      context.save();
      context.beginPath();
      context.setFontSize(config.fontSize);
      context.setFillStyle(opts.xAxis.fontColor || '#666666');
      var textWidth = measureText(item);
      var offset = eachSpacing / 2 - textWidth;

      var _calRotateTranslate = calRotateTranslate(xAxisPoints[index] + eachSpacing / 2, startY + config.fontSize / 2 + 5, opts.height),
      transX = _calRotateTranslate.transX,
      transY = _calRotateTranslate.transY;

      context.rotate(-1 * config._xAxisTextAngle_);
      context.translate(transX, transY);
      context.fillText(item, xAxisPoints[index] + offset, startY + config.fontSize + 5);
      context.closePath();
      context.stroke();
      context.restore();
    });
  }

  context.restore();

}

function drawYAxisGrid(opts, config, context) {
  var spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  var eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
  var startX = config.padding + yAxisTotalWidth;
  var endX = opts.width - config.padding;

  var points = [];
  for (var i = 0; i < config.yAxisSplit; i++) {
    points.push(config.padding + eachSpacing * i);
  }
  points.push(config.padding + eachSpacing * config.yAxisSplit + 2);

  context.beginPath();
  context.setStrokeStyle(opts.yAxis.gridColor || "#cccccc");
  //context.setLineDash([20]);
  context.setLineWidth(1 * opts.pixelRatio);
  points.forEach(function (item, index) {
    context.moveTo(startX, item);
    context.lineTo(endX, item);
  });
  context.closePath();
  context.stroke();
  //context.setLineDash([]);
}

function drawYAxis(series, opts, config, context) {
  if (opts.yAxis.disabled === true) {
    return;
  }

  var _calYAxisData4 = calYAxisData(series, opts, config),
  rangesFormat = _calYAxisData4.rangesFormat;

  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;

  var spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  var eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
  var startX = config.padding + yAxisTotalWidth;
  var endX = opts.width - config.padding;
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;

  // set YAxis background
  context.setFillStyle(opts.background || '#ffffff');
  if (opts._scrollDistance_ < 0) {
    context.fillRect(0, 0, startX, endY + config.xAxisHeight + 5);
  }
  context.fillRect(endX, 0, opts.width, endY + config.xAxisHeight + 5);

  var points = [];
  for (var i = 0; i <= config.yAxisSplit; i++) {
    points.push(config.padding + eachSpacing * i);
  }

  context.stroke();
  context.beginPath();
  context.setFontSize(config.fontSize);
  context.setFillStyle(opts.yAxis.fontColor || '#666666');
  rangesFormat.forEach(function (item, index) {
    var pos = points[index] ? points[index] : endY;
    context.fillText(item, config.padding + config.yAxisTitleWidth, pos + config.fontSize / 2);
  });
  context.closePath();
  context.stroke();

  if (opts.yAxis.title) {
    drawYAxisTitle(opts.yAxis.title, opts, config, context);
  }
}

function drawLegend(series, opts, config, context) {
  if (!opts.legend) {
    return;
  }
  // each legend shape width 15px
  // the spacing between shape and text in each legend is the `padding`
  // each legend spacing is the `padding`
  // legend margin top `config.padding`

  var _calLegendData = calLegendData(series, opts, config),
  legendList = _calLegendData.legendList;

  var padding = 5 * opts.pixelRatio;
  var marginTop = 10 * opts.pixelRatio;
  var shapeWidth = 15 * opts.pixelRatio;
  legendList.forEach(function (itemList, listIndex) {
    var width = 0;
    itemList.forEach(function (item) {
      item.name = item.name || 'undefined';
      width += 3 * padding + measureText(item.name) + shapeWidth;
    });
    var startX = (opts.width - width) / 2 + padding;
    var startY = opts.height - config.padding - config.legendHeight + listIndex * (config.fontSize + marginTop) + padding + marginTop;

    context.setFontSize(config.fontSize);
    itemList.forEach(function (item) {
      switch (opts.type) {
        case 'line':
          context.beginPath();
          /*
                                              context.setLineWidth(1*opts.pixelRatio);
                                              context.setStrokeStyle(item.color);
                                              context.moveTo(startX - 2, startY + 5);
                                              context.lineTo(startX + 17, startY + 5);
                                              context.stroke();
                                              context.closePath();
                                              context.beginPath();
                               */
          context.setLineWidth(1 * opts.pixelRatio);
          context.setStrokeStyle(item.color);
          context.setFillStyle(item.color);
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio);
          context.arc(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio, 6 * opts.pixelRatio, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
          context.closePath();
          break;
        case 'pie':
          context.beginPath();
          context.setLineWidth(1 * opts.pixelRatio);
          context.setStrokeStyle(item.color);
          context.setFillStyle(item.color);
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio);
          context.arc(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio, 6 * opts.pixelRatio, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
          context.closePath();
          break;
        case 'ring':
          context.beginPath();
          context.setLineWidth(1 * opts.pixelRatio);
          context.setStrokeStyle(item.color);
          context.setFillStyle(item.color);
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio);
          context.arc(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio, 6 * opts.pixelRatio, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
          context.closePath();
          break;
        //圆弧进度图不显示图例
        case 'gauge':
          break;
        case 'arcbar':
          break;
        default:
          context.beginPath();
          context.setFillStyle(item.color);
          context.moveTo(startX, startY);
          context.rect(startX, startY, 15 * opts.pixelRatio, 10 * opts.pixelRatio);
          context.closePath();
          context.fill();}

      startX += padding + shapeWidth;
      context.beginPath();
      context.setFillStyle(opts.extra.legendTextColor || '#333333');
      context.fillText(item.name, startX, startY + 6 * opts.pixelRatio + 3 * opts.pixelRatio);
      context.closePath();
      context.stroke();
      startX += measureText(item.name) + 2 * padding;
    });
  });
}

function drawPieDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var pieOption = opts.extra.pie || {};
  series = getPieDataPoints(series, process);
  var centerPosition = {
    x: opts.width / 2,
    y: (opts.height - config.legendHeight) / 2 };

  var radius = Math.min(centerPosition.x - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, centerPosition.y - config.pieChartLinePadding - config.pieChartTextPadding);
  if (opts.dataLabel) {
    radius -= 10;
  } else {
    radius -= 2 * config.padding;
  }
  series = series.map(function (eachSeries) {
    eachSeries._start_ += (pieOption.offsetAngle || 0) * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function (eachSeries) {
    context.beginPath();
    context.setLineWidth(2 * opts.pixelRatio);
    context.setStrokeStyle('#ffffff');
    context.setFillStyle(eachSeries.color);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, radius, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (opts.disablePieStroke !== true) {
      context.stroke();
    }
  });

  if (opts.type === 'ring') {
    var innerPieWidth = radius * 0.6;
    if (typeof opts.extra.ringWidth === 'number' && opts.extra.ringWidth > 0) {
      innerPieWidth = Math.max(0, radius - opts.extra.ringWidth);
    }
    context.beginPath();
    context.setFillStyle(opts.background || '#ffffff');
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, innerPieWidth, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }

  if (opts.dataLabel !== false && process === 1) {
    // fix https://github.com/xiaolin3303/wx-charts/issues/132
    var valid = false;
    for (var i = 0, len = series.length; i < len; i++) {
      if (series[i].data > 0) {
        valid = true;
        break;
      }
    }

    if (valid) {
      drawPieText(series, opts, config, context, radius, centerPosition);
    }
  }

  if (process === 1 && opts.type === 'ring') {
    drawRingTitle(opts, config, context);
  }

  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawArcbarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var arcbarOption = opts.extra.arcbar || {};
  arcbarOption.startAngle = arcbarOption.startAngle ? arcbarOption.startAngle : 0.75;
  arcbarOption.endAngle = arcbarOption.endAngle ? arcbarOption.endAngle : 0.25;
  arcbarOption.type = arcbarOption.type ? arcbarOption.type : 'default';

  series = getArcbarDataPoints(series, arcbarOption, process);
  var centerPosition = {
    x: opts.width / 2,
    y: opts.height / 2 };

  var radius = Math.min(centerPosition.x, centerPosition.y);

  if (typeof arcbarOption.width === 'number' && arcbarOption.width > 0) {
    arcbarOption.width = arcbarOption.width;
  } else {
    arcbarOption.width = 12 * opts.pixelRatio;
  }
  radius -= config.padding + arcbarOption.width / 2;

  //背景颜色
  context.setLineWidth(arcbarOption.width); // 设置圆环的宽度
  context.setStrokeStyle(arcbarOption.backgroundColor || '#E9E9E9'); // 设置圆环的颜色
  context.setLineCap('round'); // 设置圆环端点的形状
  context.beginPath(); //开始一个新的路径
  if (arcbarOption.type == 'default') {
    context.arc(centerPosition.x, centerPosition.y, radius, arcbarOption.startAngle * Math.PI, arcbarOption.endAngle * Math.PI, false);
  } else {
    context.arc(centerPosition.x, centerPosition.y, radius, 0, 2 * Math.PI, false);
  }

  context.stroke(); //对当前路径进行描边


  series.forEach(function (eachSeries) {
    context.setLineWidth(arcbarOption.width);
    context.setStrokeStyle(eachSeries.color);
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, radius, arcbarOption.startAngle * Math.PI, eachSeries._proportion_ * Math.PI, false);
    context.stroke();

  });
  drawRingTitle(opts, config, context);
  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawGaugeDataPoints(categories, series, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var gaugeOption = opts.extra.gauge || {};
  gaugeOption.startAngle = gaugeOption.startAngle ? gaugeOption.startAngle : 0.75;
  if (gaugeOption.oldAngle == undefined) {
    gaugeOption.oldAngle = gaugeOption.startAngle;
  }
  if (gaugeOption.oldData == undefined) {
    gaugeOption.oldData = 0;
  }
  gaugeOption.endAngle = gaugeOption.endAngle ? gaugeOption.endAngle : 0.25;
  categories = getGaugeAxisPoints(categories, gaugeOption.startAngle, gaugeOption.endAngle);
  var centerPosition = {
    x: opts.width / 2,
    y: opts.height / 2 };

  var radius = Math.min(centerPosition.x, centerPosition.y);
  if (typeof gaugeOption.width === 'number' && gaugeOption.width > 0) {
    gaugeOption.width = gaugeOption.width;
  } else {
    gaugeOption.width = 15 * opts.pixelRatio;
  }
  radius -= config.padding + gaugeOption.width / 2;
  var innerRadius = radius - gaugeOption.width;



  //画背景
  context.setLineWidth(gaugeOption.width);
  context.setLineCap('butt');
  categories.forEach(function (eachCategories) {
    context.beginPath();
    context.setStrokeStyle(eachCategories.color);
    context.arc(centerPosition.x, centerPosition.y, radius, eachCategories._startAngle_ * Math.PI, eachCategories._endAngle_ * Math.PI, false);
    context.stroke();
  });
  context.save();

  //画刻度线
  var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
  gaugeOption.splitLine.fixRadius = gaugeOption.splitLine.fixRadius ? gaugeOption.splitLine.fixRadius : 0;
  gaugeOption.splitLine.splitNumber = gaugeOption.splitLine.splitNumber ? gaugeOption.splitLine.splitNumber : 10;
  gaugeOption.splitLine.width = gaugeOption.splitLine.width ? gaugeOption.splitLine.width : 15 * opts.pixelRatio;
  gaugeOption.splitLine.color = gaugeOption.splitLine.color ? gaugeOption.splitLine.color : '#FFFFFF';
  gaugeOption.splitLine.childNumber = gaugeOption.splitLine.childNumber ? gaugeOption.splitLine.childNumber : 5;
  gaugeOption.splitLine.childWidth = gaugeOption.splitLine.childWidth ? gaugeOption.splitLine.childWidth : 5 * opts.pixelRatio;
  var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
  var childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
  var startX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
  var endX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
  var childendX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.childWidth;

  context.translate(centerPosition.x, centerPosition.y);
  context.rotate((gaugeOption.startAngle - 1) * Math.PI);

  for (var i = 0; i < gaugeOption.splitLine.splitNumber + 1; i++) {
    context.beginPath();
    context.setStrokeStyle(gaugeOption.splitLine.color);
    context.setLineWidth(2 * opts.pixelRatio);
    context.moveTo(startX, 0);
    context.lineTo(endX, 0);
    context.stroke();
    context.rotate(splitAngle * Math.PI);
  }
  context.restore();

  context.save();
  context.translate(centerPosition.x, centerPosition.y);
  context.rotate((gaugeOption.startAngle - 1) * Math.PI);

  for (var _i = 0; _i < gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1; _i++) {
    context.beginPath();
    context.setStrokeStyle(gaugeOption.splitLine.color);
    context.setLineWidth(1 * opts.pixelRatio);
    context.moveTo(startX, 0);
    context.lineTo(childendX, 0);
    context.stroke();
    context.rotate(childAngle * Math.PI);
  }
  context.restore();

  //画指针
  gaugeOption.pointer.width = gaugeOption.pointer.width ? gaugeOption.pointer.width : 15 * opts.pixelRatio;
  if (gaugeOption.pointer.color == undefined || gaugeOption.pointer.color == 'auto') {
    gaugeOption.pointer.color == 'auto';
  } else {
    gaugeOption.pointer.color == gaugeOption.pointer.color;
  }
  series = getGaugeDataPoints(series, categories, gaugeOption, process);

  series.forEach(function (eachSeries) {
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((eachSeries._proportion_ - 1) * Math.PI);
    context.beginPath();
    context.setFillStyle(eachSeries.color);
    context.moveTo(gaugeOption.pointer.width, 0);
    context.lineTo(0, -gaugeOption.pointer.width / 2);
    context.lineTo(-innerRadius, 0);
    context.lineTo(0, gaugeOption.pointer.width / 2);
    context.lineTo(gaugeOption.pointer.width, 0);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFillStyle('#FFFFFF');
    context.arc(0, 0, gaugeOption.pointer.width / 6, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  });

  if (opts.dataLabel !== false) {
    drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context);
  }

  drawRingTitle(opts, config, context);

  if (process === 1 && opts.type === 'gauge') {
    gaugeOption.oldAngle = series[0]._proportion_;
    gaugeOption.oldData = series[0].data;
  }
  return {
    center: centerPosition,
    radius: radius,
    innerRadius: innerRadius,
    categories: categories,
    totalAngle: totalAngle };

}

function drawRadarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var radarOption = opts.extra.radar || {};
  var coordinateAngle = getRadarCoordinateSeries(opts.categories.length);
  var centerPosition = {
    x: opts.width / 2,
    y: (opts.height - config.legendHeight) / 2 };


  var radius = Math.min(centerPosition.x - (getMaxTextListLength(opts.categories) + config.radarLabelTextMargin), centerPosition.y - config.radarLabelTextMargin);

  radius -= config.padding;

  // draw grid
  context.beginPath();
  context.setLineWidth(1 * opts.pixelRatio);
  context.setStrokeStyle(radarOption.gridColor || "#cccccc");
  coordinateAngle.forEach(function (angle) {
    var pos = convertCoordinateOrigin(radius * Math.cos(angle), radius * Math.sin(angle), centerPosition);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.lineTo(pos.x, pos.y);
  });
  context.stroke();
  context.closePath();

  // draw split line grid

  var _loop = function _loop(i) {
    var startPos = {};
    context.beginPath();
    context.setLineWidth(1 * opts.pixelRatio);
    context.setStrokeStyle(radarOption.gridColor || "#cccccc");
    coordinateAngle.forEach(function (angle, index) {
      var pos = convertCoordinateOrigin(radius / config.radarGridCount * i * Math.cos(angle), radius / config.radarGridCount * i * Math.sin(angle), centerPosition);
      if (index === 0) {
        startPos = pos;
        context.moveTo(pos.x, pos.y);
      } else {
        context.lineTo(pos.x, pos.y);
      }
    });
    context.lineTo(startPos.x, startPos.y);
    context.stroke();
    context.closePath();
  };

  for (var i = 1; i <= config.radarGridCount; i++) {
    _loop(i);
  }

  var radarDataPoints = getRadarDataPoints(coordinateAngle, centerPosition, radius, series, opts, process);

  radarDataPoints.forEach(function (eachSeries, seriesIndex) {
    // 绘制区域数据
    context.beginPath();
    context.setFillStyle(eachSeries.color);
    context.setGlobalAlpha(0.3);
    eachSeries.data.forEach(function (item, index) {
      if (index === 0) {
        context.moveTo(item.position.x, item.position.y);
      } else {
        context.lineTo(item.position.x, item.position.y);
      }
    });
    context.closePath();
    context.fill();
    context.setGlobalAlpha(1);

    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      var points = eachSeries.data.map(function (item) {
        return item.position;
      });
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }
  });
  // draw label text
  drawRadarLabel(coordinateAngle, radius, centerPosition, opts, config, context);

  return {
    center: centerPosition,
    radius: radius,
    angleList: coordinateAngle };

}

function drawCanvas(opts, context) {
  context.draw();
}

var Timing = {
  easeIn: function easeIn(pos) {
    return Math.pow(pos, 3);
  },

  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },

  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },

  linear: function linear(pos) {
    return pos;
  } };


function Animation(opts) {
  this.isStop = false;
  opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
  opts.timing = opts.timing || 'linear';

  var delay = 17;

  var createAnimationFrame = function createAnimationFrame() {

    if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame;
    } else if (typeof setTimeout !== 'undefined') {

      return function (step, delay) {
        setTimeout(function () {
          var timeStamp = +new Date();
          step(timeStamp);
        }, delay);
      };
    } else {

      return function (step) {
        step(null);
      };
    }
  };
  var animationFrame = createAnimationFrame();
  var startTimeStamp = null;

  var _step = function step(timestamp) {

    if (timestamp === null || this.isStop === true) {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
      return;
    }
    if (startTimeStamp === null) {
      startTimeStamp = timestamp;
    }
    if (timestamp - startTimeStamp < opts.duration) {
      var process = (timestamp - startTimeStamp) / opts.duration;
      var timingFunction = Timing[opts.timing];
      process = timingFunction(process);

      opts.onProcess && opts.onProcess(process);
      animationFrame(_step, delay);
    } else {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
    }
  };
  _step = _step.bind(this);
  animationFrame(_step, delay);
}

// stop animation immediately
// and tigger onAnimationFinish
Animation.prototype.stop = function () {
  this.isStop = true;
};

function drawCharts(type, opts, config, context) {
  var _this = this;

  var series = opts.series;
  var categories = opts.categories;
  series = fillSeriesColor(series, config);

  var _calLegendData = calLegendData(series, opts, config),
  legendHeight = _calLegendData.legendHeight;

  config.legendHeight = legendHeight;

  var _calYAxisData = calYAxisData(series, opts, config),
  yAxisWidth = _calYAxisData.yAxisWidth;

  config.yAxisWidth = yAxisWidth;
  if (categories && categories.length) {
    var _calCategoriesData = calCategoriesData(categories, opts, config),
    xAxisHeight = _calCategoriesData.xAxisHeight,
    angle = _calCategoriesData.angle;

    config.xAxisHeight = xAxisHeight;
    config._xAxisTextAngle_ = angle;
  }
  if (type === 'pie' || type === 'ring') {
    config._pieTextMaxLength_ = opts.dataLabel === false ? 0 : getPieTextMaxLength(series);
  }

  var duration = opts.animation ? 1000 : 0;
  this.animationInstance && this.animationInstance.stop();
  switch (type) {
    case 'line':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            context.translate(opts.height, 0);
            context.rotate(90 * Math.PI / 180);
          }
          drawYAxisGrid(opts, config, context);
          var _drawLineDataPoints = drawLineDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawLineDataPoints.xAxisPoints,
          calPoints = _drawLineDataPoints.calPoints,
          eachSpacing = _drawLineDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.calPoints = calPoints;
          _this.chartData.eachSpacing = eachSpacing;
          drawXAxis(categories, opts, config, context);
          drawLegend(opts.series, opts, config, context);
          drawYAxis(series, opts, config, context);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });


      break;
    case 'column':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            context.translate(opts.height, 0);
            context.rotate(90 * Math.PI / 180);
          }
          drawYAxisGrid(opts, config, context);
          var _drawColumnDataPoints = drawColumnDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawColumnDataPoints.xAxisPoints,
          eachSpacing = _drawColumnDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.eachSpacing = eachSpacing;
          drawXAxis(categories, opts, config, context);
          drawLegend(opts.series, opts, config, context);
          drawYAxis(series, opts, config, context);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'area':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            context.translate(opts.height, 0);
            context.rotate(90 * Math.PI / 180);
          }
          drawYAxisGrid(opts, config, context);
          var _drawAreaDataPoints = drawAreaDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawAreaDataPoints.xAxisPoints,
          calPoints = _drawAreaDataPoints.calPoints,
          eachSpacing = _drawAreaDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.calPoints = calPoints;
          _this.chartData.eachSpacing = eachSpacing;
          drawXAxis(categories, opts, config, context);
          drawLegend(opts.series, opts, config, context);
          drawYAxis(series, opts, config, context);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'ring':
    case 'pie':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            context.translate(opts.height, 0);
            context.rotate(90 * Math.PI / 180);
          }
          _this.chartData.pieData = drawPieDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'radar':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            context.translate(opts.height, 0);
            context.rotate(90 * Math.PI / 180);
          }
          _this.chartData.radarData = drawRadarDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'arcbar':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            context.translate(opts.height, 0);
            context.rotate(90 * Math.PI / 180);
          }
          _this.chartData.arcbarData = drawArcbarDataPoints(series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'gauge':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            context.translate(opts.height, 0);
            context.rotate(90 * Math.PI / 180);
          }
          _this.chartData.gaugeData = drawGaugeDataPoints(categories, series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;}

}

// simple event implement

function Event() {
  this.events = {};
}

Event.prototype.addEventListener = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Event.prototype.trigger = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var type = args[0];
  var params = args.slice(1);
  if (!!this.events[type]) {
    this.events[type].forEach(function (listener) {
      try {
        listener.apply(null, params);
      } catch (e) {
        console.error(e);
      }
    });
  }
};

var Charts = function Charts(opts) {
  opts.fontSize = opts.fontSize ? opts.fontSize * opts.pixelRatio : 13 * opts.pixelRatio;
  opts.title = opts.title || {};
  opts.subtitle = opts.subtitle || {};
  opts.yAxis = opts.yAxis || {};
  opts.xAxis = opts.xAxis || {};
  opts.xAxis.itemCount = opts.xAxis.itemCount ? opts.xAxis.itemCount : 5;
  opts.extra = opts.extra || {};
  opts.legend = opts.legend === false ? false : true;
  opts.rotate = opts.rotate ? true : false;
  opts.animation = opts.animation === false ? false : true;
  var config$$1 = assign({}, config);
  config$$1.yAxisTitleWidth = opts.yAxis.disabled !== true && opts.yAxis.title ? config$$1.yAxisTitleWidth : 0;
  config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : config$$1.pieChartLinePadding * opts.pixelRatio;
  config$$1.pieChartTextPadding = opts.dataLabel === false ? 0 : config$$1.pieChartTextPadding * opts.pixelRatio;

  //屏幕旋转
  config$$1.rotate = opts.rotate;
  if (opts.rotate) {
    var tempWidth = opts.width;
    var tempHeight = opts.height;
    opts.width = tempHeight;
    opts.height = tempWidth;
  }

  //适配H5高分屏
  config$$1.yAxisWidth = config.yAxisWidth * opts.pixelRatio;
  config$$1.xAxisHeight = config.xAxisHeight * opts.pixelRatio;
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    config$$1.xAxisHeight += 4 * opts.pixelRatio;
  }
  config$$1.xAxisLineHeight = config.xAxisLineHeight * opts.pixelRatio;
  config$$1.legendHeight = config.legendHeight * opts.pixelRatio;
  //config$$1.yAxisTitleWidth=config.yAxisTitleWidth*opts.pixelRatio;
  config$$1.padding = config.padding * opts.pixelRatio;
  config$$1.fontSize = opts.fontSize;
  config$$1.titleFontSize = config.titleFontSize * opts.pixelRatio;
  config$$1.subtitleFontSize = config.subtitleFontSize * opts.pixelRatio;
  //config$$1.toolTipPadding=config.toolTipPadding*opts.pixelRatio;
  config$$1.toolTipLineHeight = config.toolTipLineHeight * opts.pixelRatio;
  config$$1.columePadding = config.columePadding * opts.pixelRatio;
  //config$$1.xAxisTextPadding=config.xAxisTextPadding*opts.pixelRatio;

  //向配置中传入当前pixelRatio及字体大小
  config.pixelRatio = opts.pixelRatio;
  config.fontSize = opts.fontSize;
  config.rotate = opts.rotate;

  this.opts = opts;
  this.config = config$$1;
  this.context = uni.createCanvasContext(opts.canvasId);
  // store calcuated chart data
  // such as chart point coordinate
  this.chartData = {};
  this.event = new Event();
  this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0 };


  drawCharts.call(this, opts.type, opts, config$$1, this.context);
};

Charts.prototype.updateData = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.opts.series = data.series || this.opts.series;
  this.opts.categories = data.categories || this.opts.categories;

  this.opts.title = assign({}, this.opts.title, data.title || {});
  this.opts.subtitle = assign({}, this.opts.subtitle, data.subtitle || {});

  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

Charts.prototype.stopAnimation = function () {
  this.animationInstance && this.animationInstance.stop();
};

Charts.prototype.addEventListener = function (type, listener) {
  this.event.addEventListener(type, listener);
};

Charts.prototype.getCurrentDataIndex = function (e) {
  var touches = e.mp.changedTouches[0];
  if (touches) {

    var _touches$ = touches,x,y;
    //适配H5高分屏
    if (_touches$.clientX) {
      if (this.opts.rotate) {//适配横屏
        y = _touches$.clientX * this.opts.pixelRatio;
        x = (_touches$.pageY - e.mp.currentTarget.offsetTop - this.opts.height / this.opts.pixelRatio / 2 * (this.opts.pixelRatio - 1)) * this.opts.pixelRatio;
      } else {
        x = _touches$.clientX * this.opts.pixelRatio;
        y = (_touches$.pageY - e.mp.currentTarget.offsetTop - this.opts.height / this.opts.pixelRatio / 2 * (this.opts.pixelRatio - 1)) * this.opts.pixelRatio;
      }
    } else {
      if (this.opts.rotate) {//适配横屏
        y = _touches$.x * this.opts.pixelRatio;
        x = _touches$.y * this.opts.pixelRatio;
      } else {
        x = _touches$.x * this.opts.pixelRatio;
        y = _touches$.y * this.opts.pixelRatio;
      }
    }
    if (this.opts.type === 'pie' || this.opts.type === 'ring' || this.opts.type === 'arcbar') {
      return findPieChartCurrentIndex({ x: x, y: y }, this.chartData.pieData);
    } else if (this.opts.type === 'radar') {
      return findRadarChartCurrentIndex({ x: x, y: y }, this.chartData.radarData, this.opts.categories.length);
    } else {
      return findCurrentIndex({ x: x, y: y }, this.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
  }
  return -1;
};

Charts.prototype.showToolTip = function (e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (this.opts.type === 'line' || this.opts.type === 'area') {
    var index = this.getCurrentDataIndex(e);
    var currentOffset = this.scrollOption.currentOffset;

    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset,
      animation: false });

    if (index > -1) {
      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.chartData.calPoints, index, this.opts.categories, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;

        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
};

Charts.prototype.scrollStart = function (e) {
  var touches = e.mp.changedTouches[0];
  if (touches && this.opts.enableScroll === true) {
    if (touches.x) {
      this.scrollOption.startTouchX = touches.x;
    } else {
      this.scrollOption.startTouchX = touches.clientX;
    }
  }
};

Charts.prototype.scroll = function (e) {
  // TODO throtting...
  var touches = e.mp.changedTouches[0];
  if (touches && this.opts.enableScroll === true) {
    var _distance;
    if (touches.x) {
      _distance = touches.x - this.scrollOption.startTouchX;
    } else {
      _distance = touches.clientX - this.scrollOption.startTouchX;
    }
    var currentOffset = this.scrollOption.currentOffset;

    var validDistance = calValidDistance(currentOffset + _distance, this.chartData, this.config, this.opts);

    this.scrollOption.distance = _distance = validDistance - currentOffset;
    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset + _distance,
      animation: false });


    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
};

Charts.prototype.scrollEnd = function (e) {
  if (this.opts.enableScroll === true) {
    var _scrollOption = this.scrollOption,
    currentOffset = _scrollOption.currentOffset,
    distance = _scrollOption.distance;

    this.scrollOption.currentOffset = currentOffset + distance;
    this.scrollOption.distance = 0;
  }
};

module.exports = Charts;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js":
/*!*************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "D:\\cgh\\lyj\\xm\\fuxiapp\\App.vue"));
var _api = _interopRequireDefault(__webpack_require__(/*! ./api */ "D:\\cgh\\lyj\\xm\\fuxiapp\\api\\index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.config.productionTip = false;
_vue.default.prototype.$API = _api.default;
_vue.default.prototype.$URL = 'http://116.55.248.84:8090/images/';
// Vue.prototype.$IMG = 'http://116.55.248.84:8090/images/';

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createApp"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fcolor%2Fcolor\"}":
/*!**********************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fcolor%2Fcolor"} ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _color = _interopRequireDefault(__webpack_require__(/*! ./pages/color/color.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\color\\color.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_color.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fcustomer%2Fcustomer\"}":
/*!****************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fcustomer%2Fcustomer"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _customer = _interopRequireDefault(__webpack_require__(/*! ./pages/customer/customer.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\customer\\customer.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_customer.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fdeduct%2Fdeduct\"}":
/*!************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fdeduct%2Fdeduct"} ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _deduct = _interopRequireDefault(__webpack_require__(/*! ./pages/deduct/deduct.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\deduct\\deduct.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_deduct.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fdepartment%2Fdepartment\"}":
/*!********************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fdepartment%2Fdepartment"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _department = _interopRequireDefault(__webpack_require__(/*! ./pages/department/department.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\department\\department.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_department.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Femployee%2Femployee\"}":
/*!****************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Femployee%2Femployee"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _employee = _interopRequireDefault(__webpack_require__(/*! ./pages/employee/employee.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\employee\\employee.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_employee.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fgoods%2FgoodsAdd%2FgoodsAdd\"}":
/*!************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fgoods%2FgoodsAdd%2FgoodsAdd"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _goodsAdd = _interopRequireDefault(__webpack_require__(/*! ./pages/goods/goodsAdd/goodsAdd.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\goods\\goodsAdd\\goodsAdd.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_goodsAdd.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fgoods%2FgoodsList%2FgoodsList\"}":
/*!**************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fgoods%2FgoodsList%2FgoodsList"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _goodsList = _interopRequireDefault(__webpack_require__(/*! ./pages/goods/goodsList/goodsList.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\goods\\goodsList\\goodsList.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_goodsList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Flogin%2Flogin\"}":
/*!**********************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Flogin%2Flogin"} ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login/login.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\login\\login.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fpayment%2Fpayment\"}":
/*!**************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fpayment%2Fpayment"} ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _payment = _interopRequireDefault(__webpack_require__(/*! ./pages/payment/payment.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\payment\\payment.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_payment.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2FpaymentReport%2FpaymentReport\"}":
/*!**************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2FpaymentReport%2FpaymentReport"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _paymentReport = _interopRequireDefault(__webpack_require__(/*! ./pages/paymentReport/paymentReport.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\paymentReport\\paymentReport.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_paymentReport.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fpurchase%2Fpurchase\"}":
/*!****************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fpurchase%2Fpurchase"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _purchase = _interopRequireDefault(__webpack_require__(/*! ./pages/purchase/purchase.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\purchase\\purchase.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_purchase.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2FpurchaseOrder%2FpurchaseOrder\"}":
/*!**************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2FpurchaseOrder%2FpurchaseOrder"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _purchaseOrder = _interopRequireDefault(__webpack_require__(/*! ./pages/purchaseOrder/purchaseOrder.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\purchaseOrder\\purchaseOrder.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_purchaseOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2FpurchaseReturn%2FpurchaseReturn\"}":
/*!****************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2FpurchaseReturn%2FpurchaseReturn"} ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _purchaseReturn = _interopRequireDefault(__webpack_require__(/*! ./pages/purchaseReturn/purchaseReturn.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\purchaseReturn\\purchaseReturn.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_purchaseReturn.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Freceival%2Freceival\"}":
/*!****************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Freceival%2Freceival"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _receival = _interopRequireDefault(__webpack_require__(/*! ./pages/receival/receival.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\receival\\receival.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_receival.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2FreceivalReport%2FreceivalReport\"}":
/*!****************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2FreceivalReport%2FreceivalReport"} ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _receivalReport = _interopRequireDefault(__webpack_require__(/*! ./pages/receivalReport/receivalReport.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\receivalReport\\receivalReport.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_receivalReport.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fsale%2FaddGoodsConfig%2FaddGoodsConfig\"}":
/*!***********************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fsale%2FaddGoodsConfig%2FaddGoodsConfig"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _addGoodsConfig = _interopRequireDefault(__webpack_require__(/*! ./pages/sale/addGoodsConfig/addGoodsConfig.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\sale\\addGoodsConfig\\addGoodsConfig.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_addGoodsConfig.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fsale%2FdefferenceCheckConfig%2FdefferenceCheckConfig\"}":
/*!*************************************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fsale%2FdefferenceCheckConfig%2FdefferenceCheckConfig"} ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _defferenceCheckConfig = _interopRequireDefault(__webpack_require__(/*! ./pages/sale/defferenceCheckConfig/defferenceCheckConfig.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\sale\\defferenceCheckConfig\\defferenceCheckConfig.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_defferenceCheckConfig.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fsale%2FdifferenceGoodsCheck%2FdifferenceGoodsCheck\"}":
/*!***********************************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fsale%2FdifferenceGoodsCheck%2FdifferenceGoodsCheck"} ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _differenceGoodsCheck = _interopRequireDefault(__webpack_require__(/*! ./pages/sale/differenceGoodsCheck/differenceGoodsCheck.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\sale\\differenceGoodsCheck\\differenceGoodsCheck.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_differenceGoodsCheck.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fsale%2FeditGoods%2FeditGoods\"}":
/*!*************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fsale%2FeditGoods%2FeditGoods"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _editGoods = _interopRequireDefault(__webpack_require__(/*! ./pages/sale/editGoods/editGoods.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\sale\\editGoods\\editGoods.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_editGoods.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fsale%2Finvoice%2Finvoice\"}":
/*!*********************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fsale%2Finvoice%2Finvoice"} ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _invoice = _interopRequireDefault(__webpack_require__(/*! ./pages/sale/invoice/invoice.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\sale\\invoice\\invoice.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_invoice.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fsale%2FsaleComfig%2FsaleComfig\"}":
/*!***************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fsale%2FsaleComfig%2FsaleComfig"} ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _saleComfig = _interopRequireDefault(__webpack_require__(/*! ./pages/sale/saleComfig/saleComfig.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\sale\\saleComfig\\saleComfig.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_saleComfig.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fsale%2FsalesPurchase%2FsalesPurchase\"}":
/*!*********************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fsale%2FsalesPurchase%2FsalesPurchase"} ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _salesPurchase = _interopRequireDefault(__webpack_require__(/*! ./pages/sale/salesPurchase/salesPurchase.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\sale\\salesPurchase\\salesPurchase.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_salesPurchase.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fsale%2FsalesSelCustomer%2FsalesSelCustomer\"}":
/*!***************************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fsale%2FsalesSelCustomer%2FsalesSelCustomer"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _salesSelCustomer = _interopRequireDefault(__webpack_require__(/*! ./pages/sale/salesSelCustomer/salesSelCustomer.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\sale\\salesSelCustomer\\salesSelCustomer.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_salesSelCustomer.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fsale%2FselStore%2FselStore\"}":
/*!***********************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fsale%2FselStore%2FselStore"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _selStore = _interopRequireDefault(__webpack_require__(/*! ./pages/sale/selStore/selStore.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\sale\\selStore\\selStore.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_selStore.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2FsalesOrder%2FsalesOrder\"}":
/*!********************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2FsalesOrder%2FsalesOrder"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _salesOrder = _interopRequireDefault(__webpack_require__(/*! ./pages/salesOrder/salesOrder.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\salesOrder\\salesOrder.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_salesOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2FsalesReturn%2FsalesReturn\"}":
/*!**********************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2FsalesReturn%2FsalesReturn"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _salesReturn = _interopRequireDefault(__webpack_require__(/*! ./pages/salesReturn/salesReturn.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\salesReturn\\salesReturn.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_salesReturn.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2FstockIn%2FstockIn\"}":
/*!**************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2FstockIn%2FstockIn"} ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _stockIn = _interopRequireDefault(__webpack_require__(/*! ./pages/stockIn/stockIn.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\stockIn\\stockIn.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_stockIn.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2FstockMove%2FstockMove\"}":
/*!******************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2FstockMove%2FstockMove"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _stockMove = _interopRequireDefault(__webpack_require__(/*! ./pages/stockMove/stockMove.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\stockMove\\stockMove.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_stockMove.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2FstockOut%2FstockOut\"}":
/*!****************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2FstockOut%2FstockOut"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _stockOut = _interopRequireDefault(__webpack_require__(/*! ./pages/stockOut/stockOut.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\stockOut\\stockOut.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_stockOut.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fstocktaking%2Fstocktaking\"}":
/*!**********************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fstocktaking%2Fstocktaking"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _stocktaking = _interopRequireDefault(__webpack_require__(/*! ./pages/stocktaking/stocktaking.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\stocktaking\\stocktaking.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_stocktaking.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fsupplier%2Fsupplier\"}":
/*!****************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fsupplier%2Fsupplier"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _supplier = _interopRequireDefault(__webpack_require__(/*! ./pages/supplier/supplier.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\supplier\\supplier.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_supplier.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2FsupplierDeduct%2FsupplierDeduct\"}":
/*!****************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2FsupplierDeduct%2FsupplierDeduct"} ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _supplierDeduct = _interopRequireDefault(__webpack_require__(/*! ./pages/supplierDeduct/supplierDeduct.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\supplierDeduct\\supplierDeduct.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_supplierDeduct.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Ftab%2Fmain%2Fmain\"}":
/*!**************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Ftab%2Fmain%2Fmain"} ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/tab/main/main.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\tab\\main\\main.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Ftab%2Fpossales%2Fpossales\"}":
/*!**********************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Ftab%2Fpossales%2Fpossales"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _possales = _interopRequireDefault(__webpack_require__(/*! ./pages/tab/possales/possales.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\tab\\possales\\possales.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_possales.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Ftab%2Fsales%2Fsales\"}":
/*!****************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Ftab%2Fsales%2Fsales"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _sales = _interopRequireDefault(__webpack_require__(/*! ./pages/tab/sales/sales.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\tab\\sales\\sales.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_sales.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Ftab%2Fsetting%2Fsetting\"}":
/*!********************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Ftab%2Fsetting%2Fsetting"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _setting = _interopRequireDefault(__webpack_require__(/*! ./pages/tab/setting/setting.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\tab\\setting\\setting.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_setting.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Ftab%2Fstatistics%2Fstatistics\"}":
/*!**************************************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Ftab%2Fstatistics%2Fstatistics"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _statistics = _interopRequireDefault(__webpack_require__(/*! ./pages/tab/statistics/statistics.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\tab\\statistics\\statistics.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_statistics.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\main.js?{\"page\":\"pages%2Fvip%2Fvip\"}":
/*!******************************************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/main.js?{"page":"pages%2Fvip%2Fvip"} ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _vip = _interopRequireDefault(__webpack_require__(/*! ./pages/vip/vip.vue */ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages\\vip\\vip.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_vip.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "D:\\cgh\\lyj\\xm\\fuxiapp\\pages.json":
/*!****************************************!*\
  !*** D:/cgh/lyj/xm/fuxiapp/pages.json ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map