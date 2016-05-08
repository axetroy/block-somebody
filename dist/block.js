// ==UserScript==
// @name    Block somebody
// @author  burningall
// @description 在贴吧屏蔽某人,眼不见心不烦
// @version     2016.05.08
// @include     *tieba.baidu.com/p/*
// @include     *tieba.baidu.com/*
// @include     *tieba.baidu.com/f?*
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @run-at      document-start
// @compatible  chrome  两个字，破费
// @compatible  firefox  两个字，破费
// @license     The MIT License (MIT); http://opensource.org/licenses/MIT
// @supportURL      http://www.burningall.com
// @contributionURL troy450409405@gmail.com|alipay.com
// @namespace https://greasyfork.org/zh-CN/users/3400-axetroy
// ==/UserScript==
      
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _jqLite = __webpack_require__(2);

	var _jqLite2 = _interopRequireDefault(_jqLite);

	var _style = __webpack_require__(48);

	var _style2 = _interopRequireDefault(_style);

	var _blockIcon = __webpack_require__(50);

	var _blockIcon2 = _interopRequireDefault(_blockIcon);

	var _config = __webpack_require__(49);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var blockIcon = _blockIcon2.default;

	(0, _jqLite2.default)(function () {
	  var config = {};

	  var common = {
	    formatDate: function formatDate(date, fmt) {
	      var o = {
	        "M+": date.getMonth() + 1, //月份
	        "d+": date.getDate(), //日
	        "h+": date.getHours(), //小时
	        "m+": date.getMinutes(), //分
	        "s+": date.getSeconds(), //秒
	        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	        "S": date.getMilliseconds() //毫秒
	      };
	      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	      for (var k in o) {
	        if (new RegExp("(" + k + ")").test(fmt)) {
	          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	      }
	      return fmt;
	    },

	    // 获取当前所在的位置，是贴吧列表，还是贴吧内容页
	    getPosition: function getPosition() {
	      var url = location.href;
	      var postInside = /.*tieba.baidu.com\/p\/.*/ig;
	      var postList = /.*tieba.baidu.com\/(f\?.*|[^p])/ig;
	      return postInside.test(url) ? 'post' : postList.test(url) ? 'list' : null;
	    },

	    // 获取当前页的贴吧名
	    getBarName: function getBarName() {
	      return (0, _jqLite2.default)(".card_title_fname").text().trim();
	    },

	    // 显示控制面板
	    showPanel: function showPanel() {

	      if ((0, _jqLite2.default)('#' + _config.MaskID).length) return;

	      var fragment = document.createDocumentFragment(); // 创建文档碎片
	      var $$div = document.createElement('div'); // 创建div
	      var $mask = (0, _jqLite2.default)($$div.cloneNode(false)); // 创建遮罩层
	      var $panel = (0, _jqLite2.default)($$div.cloneNode(false)); // 创建控制面板

	      $mask.attr('id', _config.MaskID);
	      $panel.attr('id', _config.PanelID);

	      $panel.html('\n<h2 class="block-title">控制面板</h2>\n<div class="block-container">\n  \n  <div class="block-menu">\n    <ul>\n      <li>配置</li>\n      <li>屏蔽</li>\n      <li>名单</li>\n    </ul>\n  </div>\n  \n  <div class="block-content">\n  \n    <session class="block-config">\n      <h2>暂时没什么可配置的...</h2>\n    </session>\n    \n    <session class="block-block">\n    \n      <form style="margin: 0 auto;">\n        <div>\n          <label>\n            *贴吧ID\n          </label>\n          <input class="block-id form-control" type="text" placeholder="贴吧ID"/>\n        </div>\n        \n        <div>\n          <label>\n            屏蔽原因\n          </label>\n          <input class="block-reason form-control" type="text" placeholder="屏蔽原因"/>\n        </div>\n        \n        <div>\n          <label>\n            所在贴吧\n          </label>\n          <input class="block-bar form-control" type="text" placeholder="所在贴吧" value="' + common.getBarName() + '"/>\n        </div>\n  \n        <input class="block-block-submit btn" type="button" value="提交"/>\n      </form>\n      \n    </session>\n    \n    <session class="block-list">\n    </session>\n  </div>\n  \n  <div class="block-clear"></div>\n\n</div>\n      ');

	      $mask.append($panel);

	      // 关掉控制面板
	      $mask.click(function (e) {
	        if ((0, _jqLite2.default)(e.target).attr('id') === _config.MaskID) $mask.remove();
	      });

	      var $menu = (0, _jqLite2.default)('.block-menu ul li', $mask[0]);
	      var $session = (0, _jqLite2.default)('.block-content session', $mask[0]);
	      var $config = $session.eq(0);
	      var $block = $session.eq(1);
	      var $list = $session.eq(2);

	      // init the panel
	      $menu.eq(0).addClass(_config.Active);
	      $session.hide().eq(0).show();

	      // get the block list
	      $list.html(function () {
	        var GMList = GM_listValues();
	        var list = [];

	        for (var i = 0; i < GMList.length; i++) {
	          list[i] = GM_getValue(GMList[i]);
	        }

	        var tableStr = '';

	        list.forEach(function (v, i) {
	          var time = '';
	          if (v.date) {
	            var date = new Date(v.date);
	            time = common.formatDate(date, 'yyyy-MM-dd');
	          }
	          tableStr += '\n            <tr>\n              <td>' + v.id + '</td>\n              <td>' + v.bar + '</td>\n              <td>' + v.reason + '</td>\n              <td>' + time + '</td>\n              <td>\n                <a class="block-remove btn" href="javascript:void(0)" block-id="' + v.id + '" list-index="' + i + '">移除</a>\n              </td>\n            </tr>\n          ';
	        });

	        return '\n          <table>\n            <thead>\n              <tr>\n                <th><b>贴吧ID</b></th>\n                <th><b>所在贴吧</b></th>\n                <th><b>屏蔽理由</b></th>\n                <th><b>屏蔽时间</b></th>\n                <th><b>操作</b></th>\n              </tr>\n            </thead>\n            <tbody>\n              ' + tableStr + '\n            </tbody>\n          </table>\n        ';
	      }).find('.block-remove').click(function (e) {
	        var $target = (0, _jqLite2.default)(e.target);
	        var index = +$target.attr('list-index');
	        var blockID = $target.attr('block-id');

	        $list.find('table>tbody>tr').each(function (ele) {
	          if ((0, _jqLite2.default)(ele).find('.block-remove').attr('block-id') === blockID) {
	            ele.remove();
	            GM_deleteValue(blockID);
	          }
	        });
	      });

	      // remove the panel
	      $menu.click(function (e) {
	        var index = (0, _jqLite2.default)(e.target).index;
	        $menu.removeClass(_config.Active).eq(index).addClass(_config.Active);
	        $session.hide().eq(index).show();
	        return false;
	      });

	      // block someone
	      $block.find('.block-block-submit').click(function (e) {
	        var _map = ['id', 'bar', 'reason'].map(function (name) {
	          return $block.find('.block-' + name);
	        });

	        var _map2 = _slicedToArray(_map, 3);

	        var $id = _map2[0];
	        var $bar = _map2[1];
	        var $reason = _map2[2];

	        var _map3 = [$id, $bar, $reason].map(function (input) {
	          return input.val();
	        });

	        var _map4 = _slicedToArray(_map3, 3);

	        var id = _map4[0];
	        var bar = _map4[1];
	        var reason = _map4[2];


	        if (!id) return;
	        GM_setValue(id, { id: id, bar: bar, reason: reason, date: new Date() });
	        $id.val('');
	        $reason.val('');
	      });

	      fragment.appendChild($mask[0]);
	      document.documentElement.appendChild(fragment);
	    }
	  };

	  (0, _jqLite2.default)(document).bind('keyup', function (e) {
	    if (e.keyCode === 120) common.showPanel();
	  });

	  GM_registerMenuCommand("控制面板", common.showPanel);

	  (0, _style2.default)();

	  var $icon = (0, _jqLite2.default)(document.createElement("a")).html(blockIcon);

	  var initCount = 0;
	  var init = function init() {
	    if (common.getPosition() === 'post') {
	      initCount++;
	      (0, _jqLite2.default)('.p_postlist .l_post').each(function (post) {
	        var $name = (0, _jqLite2.default)(post).find('.d_author ul.p_author li.d_name');
	        if (!$name[0]) return;

	        var id = $name.find('a[data-field].p_author_name').text().trim();

	        if (!id) return;

	        var icon = $icon[0].cloneNode(true);

	        if (GM_listValues().indexOf(id) > -1) return post.remove();

	        if ($name.find('svg').length) return;

	        (0, _jqLite2.default)(icon).click(function () {
	          var bar = common.getBarName();
	          var reason = '在帖子中选择';


	          GM_setValue(id, { id: id, bar: bar, reason: reason, date: new Date() });
	          (0, _jqLite2.default)('.p_postlist .l_post').each(function (ele) {
	            var username = (0, _jqLite2.default)(ele).attr('data-field').replace(/\'/g, '"');
	            if (!username) return;
	            username = JSON.parse(username).author.user_name || JSON.parse(username).author.name_u;
	            username = username.replace(/\&ie\=.*$/ig, '');
	            username = decodeURI(username);
	            if (username === id) ele.remove();
	          });
	        });

	        $name[0].appendChild(icon);
	      });
	    } else if (common.getPosition() === 'list') {
	      (function () {
	        var interval = setInterval(function () {
	          var postList = (0, _jqLite2.default)('ul#thread_list li[data-field].j_thread_list');
	          if (!postList.length) return;

	          clearInterval(interval);
	          initCount++;
	          postList.each(function (post) {
	            var $name = (0, _jqLite2.default)(post).find('.j_threadlist_li_right .tb_icon_author');
	            if (!$name[0]) return;

	            var id = $name.find('a[data-field].frs-author-name').text().trim();
	            var icon = $icon[0].cloneNode(true);

	            if (GM_listValues().indexOf(id) > -1) return post.remove();

	            (0, _jqLite2.default)(icon).click(function () {
	              var bar = common.getBarName();
	              var reason = '贴吧首页选择';

	              if (!id) return;
	              GM_setValue(id, { id: id, bar: bar, reason: reason, date: new Date() });

	              (0, _jqLite2.default)('ul#thread_list li[data-field].j_thread_list').each(function (_post) {
	                var username = (0, _jqLite2.default)(_post).find('a[data-field].frs-author-name').text().trim();
	                if (!username) return;
	                if (username === id) _post.remove();
	              });
	            });

	            $name[0].appendChild(icon);
	          });
	        }, 100);
	      })();
	    }
	  };

	  init();

	  (0, _jqLite2.default)(document).observe(function (target) {
	    var addedNodes = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	    var removedNodes = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];


	    addedNodes = Array.from(addedNodes);

	    // if (!addedNodes || !addedNodes.length || removedNodes.length) return;

	    addedNodes.forEach(function (node) {
	      // 翻页
	      if (node.id === 'content_leftList' || node.id === 'j_p_postlist') {
	        initCount > 0 && init();
	      }
	    });

	    // 楼中楼翻页
	    if (target && (0, _jqLite2.default)(target).hasClass('j_lzl_m_w')) {
	      (function () {

	        var $lzlList = (0, _jqLite2.default)(target).find('li.lzl_single_post');

	        $lzlList.each(function (lzl) {
	          var $lzl = (0, _jqLite2.default)(lzl);
	          if ($lzl.attr('filter')) return;

	          $lzl.attr('filter', true);
	          var id = JSON.parse($lzl.attr('data-field').replace(/\'/g, '"')).user_name;
	          id = decodeURI(id);

	          if (!id) return;

	          if (GM_listValues().indexOf(id) > -1) return lzl.remove();

	          var $name = $lzl.find('.lzl_cnt');

	          if ($name.find('svg').length) return;

	          var icon = $icon[0].cloneNode(true);

	          (0, _jqLite2.default)(icon).click(function (e) {
	            var bar = common.getBarName();
	            var reason = '楼中楼选择';


	            GM_setValue(id, { id: id, bar: bar, reason: reason, date: new Date() });

	            $lzlList.each(function (_lzl) {
	              var username = (0, _jqLite2.default)(_lzl).find('div.lzl_cnt a.j_user_card').text().trim();
	              if (!username) return;
	              if (username === id) _lzl.remove();
	            });
	          });

	          $name[0].insertBefore(icon, $name[0].childNodes[0]);
	        });
	      })();
	    }

	    //
	    var $lzlList = (0, _jqLite2.default)('ul.j_lzl_m_w');
	    if (!$lzlList.length) return;

	    $lzlList.each(function (lzls) {
	      if ((0, _jqLite2.default)(lzls).attr('filter')) return;

	      (0, _jqLite2.default)(lzls).attr('filter', true);

	      (0, _jqLite2.default)(lzls).find('li.lzl_single_post').each(function (lzl) {
	        var $lzl = (0, _jqLite2.default)(lzl);
	        var $name = $lzl.find('.lzl_cnt');

	        if ($name.find('svg').length) return;

	        var icon = $icon[0].cloneNode(true);

	        var id = JSON.parse($lzl.attr('data-field').replace(/\'/g, '"')).user_name;

	        if (GM_listValues().indexOf(id) > -1) return lzl.remove();

	        if (!id) return;

	        (0, _jqLite2.default)(icon).click(function (e) {
	          var bar = common.getBarName();
	          var reason = '楼中楼选择';

	          GM_setValue(id, { id: id, bar: bar, reason: reason, date: new Date() });
	          // 删除当前楼中楼的
	          $lzlList.each(function (_lzl) {
	            var $floor = (0, _jqLite2.default)(_lzl).find('div.lzl_cnt');
	            $floor.each(function (_post) {
	              var username = (0, _jqLite2.default)(_post).find('a.j_user_card').text().trim();
	              if (!username) return;
	              if (username === id) _post.parentElement.remove();
	            });
	          });
	          // 删除帖子里面楼层的
	          init();
	        });
	        $name[0].insertBefore(icon, $name[0].childNodes[0]);
	      });
	    });
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// es6 Array.from

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	// es6 Object.assign


	__webpack_require__(3);

	__webpack_require__(36);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var noop = function noop(x) {
	  return x;
	};

	var jqLite = function () {
	  function jqLite() {
	    var _this = this;

	    var selectors = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

	    _classCallCheck(this, jqLite);

	    this.selectors = selectors;
	    this.context = context;
	    this.length = 0;

	    switch (typeof selectors === 'undefined' ? 'undefined' : _typeof(selectors)) {
	      case 'undefined':
	        break;
	      case 'string':
	        Array.from(context.querySelectorAll(selectors), function (ele, i) {
	          _this[i] = ele;
	          _this.length++;
	        }, this);
	        break;
	      case 'object':
	        if (selectors.length) {
	          Array.from(selectors, function (ele, i) {
	            _this[i] = ele;
	            _this.length++;
	          }, this);
	        } else {
	          this[0] = selectors;
	          this.length = 1;
	        }
	        break;
	      case 'function':
	        this.ready(selectors);
	        break;
	      default:

	    }
	  }

	  _createClass(jqLite, [{
	    key: 'eq',
	    value: function eq() {
	      var n = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	      return new jqLite(this[n]);
	    }
	  }, {
	    key: 'find',
	    value: function find(selectors) {
	      return new jqLite(selectors, this[0]);
	    }
	  }, {
	    key: 'each',
	    value: function each() {
	      var fn = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];

	      for (var i = 0; i < this.length; i++) {
	        fn.call(this, this[i], i);
	      }
	      return this;
	    }
	  }, {
	    key: 'bind',
	    value: function bind() {
	      var types = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var fn = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];

	      this.each(function (ele) {
	        types.trim().split(/\s{1,}/).forEach(function (type) {
	          ele.addEventListener(type, function (e) {
	            var target = e.target || e.srcElement;
	            if (fn.call(target, e) === false) {
	              e.returnValue = true;
	              e.cancelBubble = true;
	              e.preventDefault && e.preventDefault();
	              e.stopPropagation && e.stopPropagation();
	              return false;
	            }
	          }, false);
	        });
	      });
	    }
	  }, {
	    key: 'click',
	    value: function click() {
	      var fn = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];

	      this.bind('click', fn);
	      return this;
	    }
	  }, {
	    key: 'ready',
	    value: function ready() {
	      var _this2 = this;

	      var fn = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];

	      window.addEventListener('DOMContentLoaded', function (e) {
	        fn.call(_this2, e);
	      }, false);
	    }
	  }, {
	    key: 'observe',
	    value: function observe() {
	      var _this3 = this;

	      var fn = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	      var config = arguments.length <= 1 || arguments[1] === undefined ? { childList: true, subtree: true } : arguments[1];

	      this.each(function (ele) {
	        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	        var observer = new MutationObserver(function (mutations) {
	          mutations.forEach(function (mutation) {
	            fn.call(_this3, mutation.target, mutation.addedNodes, mutation.removedNodes);
	          });
	        });
	        observer.observe(ele, config);
	      });
	      return this;
	    }
	  }, {
	    key: 'attr',
	    value: function (_attr) {
	      function attr(_x, _x2) {
	        return _attr.apply(this, arguments);
	      }

	      attr.toString = function () {
	        return _attr.toString();
	      };

	      return attr;
	    }(function (attr, value) {
	      // one agm
	      if (arguments.length === 1) {
	        // get attr value
	        if (typeof attr === 'string') {
	          return this[0].getAttribute(attr);
	        }
	        // set attr with a json
	        else if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) === 'object') {
	            this.each(function (ele) {
	              for (var at in attr) {
	                if (attr.hasOwnProperty(at)) {
	                  ele.setAttribute(at, value);
	                }
	              }
	            });
	            return value;
	          }
	      }
	      // set
	      else if (arguments.length === 2) {
	          this.each(function (ele) {
	            ele.setAttribute(attr, value);
	          });
	          return this;
	        } else {
	          return this;
	        }
	    })
	  }, {
	    key: 'removeAttr',
	    value: function removeAttr(attr) {
	      if (arguments.length === 1) {
	        this.each(function (ele) {
	          ele.removeAttribute(attr);
	        });
	      }
	      return this;
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.each(function (ele) {
	        ele.remove();
	      });
	      this.length = 0;
	      return this;
	    }

	    // get the element style

	  }, {
	    key: 'style',
	    value: function style(attr) {
	      return this[0].currentStyle ? this[0].currentStyle[attr] : getComputedStyle(this[0])[attr];
	    }

	    // (attr,value) || 'string' || {}

	  }, {
	    key: 'css',
	    value: function css() {
	      for (var _len = arguments.length, agm = Array(_len), _key = 0; _key < _len; _key++) {
	        agm[_key] = arguments[_key];
	      }

	      if (agm.length === 1) {
	        // get style
	        if (typeof agm[0] === 'string') {
	          // set style as a long text
	          if (/:/ig.test(agm[0])) {
	            this.each(function (ele) {
	              ele.style.cssText = attr;
	            });
	          } else {
	            return this[0].currentStyle ? this[0].currentStyle[agm[0]] : getComputedStyle(this[0])[agm[0]];
	          }
	        }
	        // set style as a object
	        else {
	            this.each(function (ele) {
	              for (var _attr2 in agm[0]) {
	                if (agm[0].hasOwnProperty(_attr2)) {
	                  ele.style[_attr2] = agm[0][_attr2];
	                }
	              }
	            });
	          }
	      }
	      // set as (key,value)
	      else if (agm.length === 2) {
	          this.each(function (ele) {
	            ele.style[agm[0]] = agm[1];
	          });
	        }
	      return this;
	    }
	  }, {
	    key: 'width',
	    value: function width(value) {
	      var element = this[0];
	      // window or document
	      if (element.window === element || element.body) {
	        return document.body.scrollWidth > document.documentElement.scrollWidth ? document.body.scrollWidth : document.documentElement.scrollWidth;
	      }
	      // set width
	      else if (value) {
	          this.each(function (ele) {
	            ele.style.width = value + 'px';
	          });
	          return this;
	        }
	        // get width
	        else {
	            return this[0].offsetWidth || parseFloat(this.style('width'));
	          }
	    }
	  }, {
	    key: 'height',
	    value: function height(value) {
	      var ele = this[0];
	      // window or document
	      if (ele.window === ele || ele.body) {
	        return document.body.scrollHeight > document.documentElement.scrollHeight ? document.body.scrollHeight : document.documentElement.scrollHeight;
	      }
	      // set height
	      else if (value) {
	          this.each(function (ele) {
	            ele.style.height = value + 'px';
	          });
	          return this;
	        }
	        // get height
	        else {
	            return this[0].offsetHeight || parseFloat(this.style('height'));
	          }
	    }
	  }, {
	    key: 'html',
	    value: function html(value) {
	      if (value !== undefined) {
	        this.each(function (ele) {
	          ele.innerHTML = typeof value === 'function' ? value(ele) : value;
	        });
	      } else {
	        return this[0].innerHTML;
	      }
	      return this;
	    }
	  }, {
	    key: 'text',
	    value: function text(value) {
	      if (value === undefined) return this[0].innerText || this[0].textContent;

	      this.each(function (ele) {
	        ele.innerText = ele.textContent = value;
	      });
	      return this;
	    }
	  }, {
	    key: 'val',
	    value: function val(value) {
	      if (value === undefined) return this[0].value;
	      this.each(function (ele) {
	        ele.value = value;
	      });
	      return this;
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this.each(function (ele) {
	        ele.style.display = '';
	      });
	      return this;
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.each(function (ele) {
	        ele.style.display = 'none';
	      });
	      return this;
	    }

	    // content str || jqLite Object || DOM
	    // here is jqLite Object

	  }, {
	    key: 'append',
	    value: function append(content) {
	      this.each(function (ele) {
	        ele.appendChild(content[0]);
	      });
	      return this;
	    }
	  }, {
	    key: 'prepend',


	    // content str || jqLite Object || DOM
	    // here is jqLite Object
	    value: function prepend(content) {
	      this.each(function (ele) {
	        ele.insertBefore(content[0], ele.children[0]);
	      });
	      return this;
	    }
	  }, {
	    key: 'hasClass',
	    value: function hasClass(className) {
	      if (!this[0]) return false;
	      return this[0].classList.contains(className);
	    }
	  }, {
	    key: 'addClass',
	    value: function addClass(className) {
	      this.each(function (ele) {
	        ele.classList.add(className);
	      });
	      return this;
	    }
	  }, {
	    key: 'removeClass',
	    value: function removeClass(className) {
	      this.each(function (ele) {
	        ele.classList.remove(className);
	      });
	      return this;
	    }
	  }, {
	    key: 'index',
	    get: function get() {
	      var index = 0;
	      var brothers = this[0].parentNode.children;
	      for (var i = 0; i < brothers.length; i++) {
	        if (brothers[i] == this[0]) {
	          index = i;
	          break;
	        }
	      }
	      return index;
	    }
	  }], [{
	    key: 'fn',
	    get: function get() {
	      var visible = function visible(ele) {
	        var pos = ele.getBoundingClientRect();
	        var w = void 0;
	        var h = void 0;
	        var inViewPort = void 0;
	        var docEle = document.documentElement;
	        var docBody = document.body;
	        if (docEle.getBoundingClientRect) {
	          w = docEle.clientWidth || docBody.clientWidth;
	          h = docEle.clientHeight || docBody.clientHeight;
	          inViewPort = pos.top > h || pos.bottom < 0 || pos.left > w || pos.right < 0;
	          return inViewPort ? false : true;
	        }
	      };
	      var merge = function merge() {
	        for (var _len2 = arguments.length, sources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          sources[_key2] = arguments[_key2];
	        }

	        return Object.assign.apply(Object, [{}].concat(sources));
	      };
	      return {
	        visible: visible,
	        merge: merge
	      };
	    }
	  }]);

	  return jqLite;
	}();

	var $ = function $() {
	  var selectors = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

	  return new jqLite(selectors, context);
	};
	$.fn = jqLite.fn;

	exports.default = $;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(4)
	  , $export        = __webpack_require__(6)
	  , toObject       = __webpack_require__(22)
	  , call           = __webpack_require__(24)
	  , isArrayIter    = __webpack_require__(25)
	  , toLength       = __webpack_require__(29)
	  , createProperty = __webpack_require__(31)
	  , getIterFn      = __webpack_require__(32);

	$export($export.S + $export.F * !__webpack_require__(35)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(5);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , hide      = __webpack_require__(9)
	  , redefine  = __webpack_require__(19)
	  , ctx       = __webpack_require__(4)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.3.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(10)
	  , createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(14) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(11)
	  , IE8_DOM_DEFINE = __webpack_require__(13)
	  , toPrimitive    = __webpack_require__(17)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(14) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(14) && !__webpack_require__(15)(function(){
	  return Object.defineProperty(__webpack_require__(16)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(15)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(12);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , hide      = __webpack_require__(9)
	  , has       = __webpack_require__(20)
	  , SRC       = __webpack_require__(21)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	__webpack_require__(8).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 20 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(23);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(11);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(26)
	  , ITERATOR   = __webpack_require__(27)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(28)('wks')
	  , uid        = __webpack_require__(21)
	  , Symbol     = __webpack_require__(7).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(30)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(10)
	  , createDesc      = __webpack_require__(18);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(33)
	  , ITERATOR  = __webpack_require__(27)('iterator')
	  , Iterators = __webpack_require__(26);
	module.exports = __webpack_require__(8).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(34)
	  , TAG = __webpack_require__(27)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(27)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(6);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(37)});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(38)
	  , gOPS     = __webpack_require__(46)
	  , pIE      = __webpack_require__(47)
	  , toObject = __webpack_require__(22)
	  , IObject  = __webpack_require__(41)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(15)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(39)
	  , enumBugKeys = __webpack_require__(45);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(20)
	  , toIObject    = __webpack_require__(40)
	  , arrayIndexOf = __webpack_require__(42)(false)
	  , IE_PROTO     = __webpack_require__(44)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(41)
	  , defined = __webpack_require__(23);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(40)
	  , toLength  = __webpack_require__(29)
	  , toIndex   = __webpack_require__(43);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(30)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(28)('keys')
	  , uid    = __webpack_require__(21);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 46 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 47 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  GM_addStyle('\n    /** 公共部分 **/\n    @font-face { \n      font-family: ifont;\n      src: url("http://at.alicdn.com/t/font_1442373896_4754455.eot?#iefix") format("embedded-opentype"), url("http://at.alicdn.com/t/font_1442373896_4754455.woff") format("woff"), url("http://at.alicdn.com/t/font_1442373896_4754455.ttf") format("truetype"), url("http://at.alicdn.com/t/font_1442373896_4754455.svg#ifont") format("svg");\n    }\n    ' + ('#' + _config.MaskID) + '{\n      position: fixed;\n      top: 0;\n      left: 0;\n      z-index: 9999999;\n      width:100%;\n      height:100%;\n      background: rgba(45, 45, 45, 0.6);\n      margin: 0;\n      padding: 0;\n      overflow: hidden;\n      font-size:14px;\n      line-height:1.42857143em;\n    }\n    \n    ' + ('#' + _config.MaskID) + ' *{\n      -webkit-box-sizing:border-box;\n      box-sizing:border-box;\n    }\n    \n    ' + ('#' + _config.MaskID) + ' label{\n      display:inline-block;\n      max-width:100%;\n      margin-bottom:5px;\n      font-weight:700;\n    }\n    \n    ' + ('#' + _config.MaskID) + ' .btn{\n      display:inline-block;\n      padding:6px 12px;\n      font-size:14px;\n      line-height:1.42857143;\n      text-align:center;\n      white-space:nowrap;\n      vertical-align:middle;\n      -ms-touch-action:manipulation;\n      touch-action:manipulation;\n      cursor:pointer;\n      -webkit-user-select:none;\n      -moz-user-select:none;\n      user-select:none;\n      background-image:none;\n      border:1px solid transparent;\n      border-radius:4px;\n      margin-top:5px;\n      margin-bottom:5px;\n      color:#333;\n      background-color:#fff;\n      border-color:#333;\n    }\n    \n    ' + ('#' + _config.MaskID) + ' .form-group{\n      margin-bottom:15px;\n    }\n    \n    ' + ('#' + _config.MaskID) + ' .form-control{\n      display:block;\n      width:100%;\n      height:34px;\n      padding:6px 12px;\n      font-size:14px;\n      line-height:1.42857143;\n      color:#555;\n      background-color:#fff;\n      background-image:none;\n      border:1px solid #ccc;\n      border-radius:4px;\n      -webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);\n      box-shadow:inset 0 1px 1px rgba(0,0,0,.075);\n      -webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;\n      transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;\n    }\n    \n    ' + ('#' + _config.MaskID) + ' .form-control:focus{\n      border-color:#66afe9;\n      outline:0;\n      -webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\n      box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\n    }\n    \n    ' + ('#' + _config.MaskID) + ' p{\n      color:#fff;\n      line-height:3em;\n    }\n    \n    ' + ('#' + _config.MaskID) + ' a{\n      color:#555;\n      text-decoration:none;\n    }\n    \n    ' + ('#' + _config.MaskID) + ' .block-clear{\n      visibility:hidden;\n      font-size:0;\n      width:0;\n      height:0;\n      clear:both;\n    }\n    ' + ('#' + _config.MaskID) + ' ul{\n      list-style:none;\n    }\n    ' + ('#' + _config.MaskID) + ' ul li{\n      color:#555;\n    }\n    \n    \n    /** 非公共部分 **/\n    ' + ('#' + _config.PanelID) + '{\n      position: relative;\n      top: 100px;\n      width: 800px;\n      height: auto;\n      margin: 0 auto;\n      background: #fff;\n      z-index: inherit;\n    }\n    \n    ' + ('#' + _config.PanelID) + ' .block-title{\n      text-align:center;\n      line-height:36px;\n      font-size: 1.6em;\n      border-bottom:1px solid #ccc;\n    }\n    \n    ' + ('#' + _config.PanelID) + ' .block-container{\n      margin-top:10px;\n      padding-bottom:10px;\n    }\n    \n    ' + ('#' + _config.PanelID) + ' .block-menu{\n      width:10%;\n      float:left;\n    }\n    \n    ' + ('#' + _config.PanelID) + ' .block-menu ul{\n      text-align:center;\n    }\n    \n    ' + ('#' + _config.PanelID) + ' .block-menu ul li{\n      line-height:4em;\n      cursor:pointer;\n    }\n    \n    \n    ' + ('#' + _config.PanelID) + ' .block-menu ul li.active{\n      background:#6B6B6B;\n      color:#fff;\n    }\n    \n    ' + ('#' + _config.PanelID) + ' .block-content{\n      width:90%;\n      padding-left:20px;\n      float:left;\n      max-height:400px;\n      overflow-y:auto;\n    }\n    \n    ' + ('#' + _config.PanelID) + ' .block-content .block-list table{\n      width:100%;\n    }\n    \n    ' + ('#' + _config.PanelID) + ' .block-content .block-list table tr{\n      text-align:center;\n      line-height:24px;\n    }\n    \n  ');
	};

	var _config = __webpack_require__(49);

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by axetroy on 5/8/16.
	 */

	var MaskID = 'block-mask';
	var PanelID = 'block-panel';
	var Active = 'active';

	exports.MaskID = MaskID;
	exports.PanelID = PanelID;
	exports.Active = Active;

/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by axetroy on 5/8/16.
	 */

	var svg = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"20\" height=\"20\" viewBox=\"0 0 200 200\" version=\"1.1\" style=\"\n    vertical-align: middle;\n\">\n<g class=\"transform-group\">\n  <g transform=\"scale(0.1953125, 0.1953125)\">\n    <path d=\"M822.809088 510.318592q0-91.994112-49.711104-168.56064l-430.829568 430.258176q78.280704 50.853888 169.703424 50.853888 63.424512 0 120.849408-24.855552t99.136512-66.567168 66.281472-99.707904 24.569856-121.4208zm-570.820608 170.846208l431.40096-430.829568q-77.13792-51.996672-171.4176-51.996672-84.566016 0-155.990016 41.711616t-113.135616 113.707008-41.711616 156.561408q0 92.565504 50.853888 170.846208zm698.812416-170.846208q0 89.708544-34.854912 171.4176t-93.422592 140.562432-139.99104 93.708288-170.560512 34.854912-170.560512-34.854912-139.99104-93.708288-93.422592-140.562432-34.854912-171.4176 34.854912-171.131904 93.422592-140.276736 139.99104-93.708288 170.560512-34.854912 170.560512 34.854912 139.99104 93.708288 93.422592 140.276736 34.854912 171.131904z\" fill=\"#272636\"></path>\n    </g>\n  </g>\n</svg>\n";

	exports.default = svg;

/***/ }
/******/ ]);