/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/is-url/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-url/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * Expose `isUrl`.\n */\n\nmodule.exports = isUrl;\n\n/**\n * RegExps.\n * A URL must match #1 and then at least one of #2/#3.\n * Use two levels of REs to avoid REDOS.\n */\n\nvar protocolAndDomainRE = /^(?:\\w+:)?\\/\\/(\\S+)$/;\n\nvar localhostDomainRE = /^localhost[\\:?\\d]*(?:[^\\:?\\d]\\S*)?$/\nvar nonLocalhostDomainRE = /^[^\\s\\.]+\\.\\S{2,}$/;\n\n/**\n * Loosely validate a URL `string`.\n *\n * @param {String} string\n * @return {Boolean}\n */\n\nfunction isUrl(string){\n  if (typeof string !== 'string') {\n    return false;\n  }\n\n  var match = string.match(protocolAndDomainRE);\n  if (!match) {\n    return false;\n  }\n\n  var everythingAfterProtocol = match[1];\n  if (!everythingAfterProtocol) {\n    return false;\n  }\n\n  if (localhostDomainRE.test(everythingAfterProtocol) ||\n      nonLocalhostDomainRE.test(everythingAfterProtocol)) {\n    return true;\n  }\n\n  return false;\n}\n\n\n//# sourceURL=webpack:///./node_modules/is-url/index.js?");

/***/ }),

/***/ "./src/helpers/listeners.js":
/*!**********************************!*\
  !*** ./src/helpers/listeners.js ***!
  \**********************************/
/*! exports provided: link_btn_listner, upload_btn_listern, service_selector_listener, get_layers_btn_listener, submit_btn_listener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"link_btn_listner\", function() { return link_btn_listner; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"upload_btn_listern\", function() { return upload_btn_listern; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"service_selector_listener\", function() { return service_selector_listener; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get_layers_btn_listener\", function() { return get_layers_btn_listener; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"submit_btn_listener\", function() { return submit_btn_listener; });\nvar ui_funcs = __webpack_require__(/*! ./ui_funcs */ \"./src/helpers/ui_funcs.js\");\n\nvar main = __webpack_require__(/*! ../main.js */ \"./src/main.js\");\n\nfunction link_btn_listner() {}\nfunction upload_btn_listern() {}\nfunction service_selector_listener() {\n  $('#service_type').change(function () {\n    var webserviceChecker = main[\"default\"];\n    var val = $(this).val();\n\n    if (val == 'wfs') {\n      webserviceChecker.set_service_type('wfs');\n      ui_funcs.enable_get_layer_btn();\n      ui_funcs.wfs_selector_enable();\n    } else if (val == 'rest') {\n      webserviceChecker.set_service_type('rest');\n      ui_funcs.disable_get_layer_btn();\n      ui_funcs.wfs_selector_disable();\n    } else if (val == 'other') {\n      webserviceChecker.set_service_type('other');\n      ui_funcs.disable_get_layer_btn();\n      ui_funcs.wfs_selector_disable();\n    } else {\n      webserviceChecker.set_service_type(null);\n      ui_funcs.disable_get_layer_btn();\n      ui_funcs.wfs_selector_disable();\n    }\n\n    console.log(webserviceChecker.get_service_type());\n  });\n}\nfunction get_layers_btn_listener() {\n  $('#get_layers_btn').click(function () {\n    url_value = $(\"#field-image-url\").val();\n\n    if (url_value != '' && isURL(url_value)) {\n      ui_funcs.CursorLoading();\n      getLayers();\n    } else {\n      alert('Please Supply a valid url');\n    }\n  });\n}\nfunction submit_btn_listener() {\n  $('#checkBtn').click(function () {\n    checkValues();\n  });\n}\n\n//# sourceURL=webpack:///./src/helpers/listeners.js?");

/***/ }),

/***/ "./src/helpers/ui_funcs.js":
/*!*********************************!*\
  !*** ./src/helpers/ui_funcs.js ***!
  \*********************************/
/*! exports provided: selectElement, is_wfs_display_none, is_wfs_display_block, service_type_display_none, service_type_display_block, disable_get_layer_btn, enable_get_layer_btn, layer_dropdown_disable, layer_dropdown_enable, wfs_selector_enable, wfs_selector_disable, CursorLoading, CursorAuto, show_service_type_dropdown_if_not_none, show_wfs_dropdown_if_service_type_is_wfs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectElement\", function() { return selectElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"is_wfs_display_none\", function() { return is_wfs_display_none; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"is_wfs_display_block\", function() { return is_wfs_display_block; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"service_type_display_none\", function() { return service_type_display_none; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"service_type_display_block\", function() { return service_type_display_block; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"disable_get_layer_btn\", function() { return disable_get_layer_btn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enable_get_layer_btn\", function() { return enable_get_layer_btn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"layer_dropdown_disable\", function() { return layer_dropdown_disable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"layer_dropdown_enable\", function() { return layer_dropdown_enable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wfs_selector_enable\", function() { return wfs_selector_enable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wfs_selector_disable\", function() { return wfs_selector_disable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CursorLoading\", function() { return CursorLoading; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CursorAuto\", function() { return CursorAuto; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"show_service_type_dropdown_if_not_none\", function() { return show_service_type_dropdown_if_not_none; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"show_wfs_dropdown_if_service_type_is_wfs\", function() { return show_wfs_dropdown_if_service_type_is_wfs; });\nfunction selectElement(id, valueToSelect) {\n  var element = document.getElementById(id);\n  element.value = valueToSelect;\n}\nfunction is_wfs_display_none() {\n  $(\"#service_type_group\").css('display', 'none');\n}\nfunction is_wfs_display_block() {\n  $(\"#service_type_group\").css('display', 'block');\n}\nfunction service_type_display_none() {\n  $(\"#service_type_group\").css('display', 'none');\n}\nfunction service_type_display_block() {\n  $(\"#service_type_group\").css('display', 'block');\n}\nfunction disable_get_layer_btn() {\n  document.getElementById(\"get_layers_btn\").disabled = true;\n}\nfunction enable_get_layer_btn() {\n  document.getElementById(\"get_layers_btn\").disabled = false;\n}\nfunction layer_dropdown_disable() {\n  $(\"#layer_name_dropdown\").css('display', 'none'); //make drop down visible\n}\nfunction layer_dropdown_enable() {\n  $(\"#layer_name_dropdown\").css('display', 'inline-block'); //make drop down visible\n}\nfunction wfs_selector_enable() {\n  $(\"#wfs_selector\").css('display', 'inline-block'); //make drop down visible\n}\nfunction wfs_selector_disable() {\n  $(\"#wfs_selector\").css('display', 'none'); //make drop down visible\n}\nfunction CursorLoading() {\n  document.body.style.cursor = 'progress';\n}\nfunction CursorAuto() {\n  document.body.style.cursor = 'auto';\n}\nfunction show_service_type_dropdown_if_not_none() {\n  var s_type = document.getElementById('service_type').value;\n\n  if (s_type != 'null') {\n    service_type_display_block();\n  }\n}\nfunction show_wfs_dropdown_if_service_type_is_wfs() {\n  var s_type = document.getElementById('service_type').value;\n\n  if (s_type == 'wfs') {\n    layer_dropdown_enable();\n    wfs_selector_enable();\n  }\n}\n\n//# sourceURL=webpack:///./src/helpers/ui_funcs.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// require('@babel/polyfill');\nvar isURL = __webpack_require__(/*! is-url */ \"./node_modules/is-url/index.js\");\n\nvar ui_funcs = __webpack_require__(/*! ./helpers/ui_funcs.js */ \"./src/helpers/ui_funcs.js\");\n\nvar listeners = __webpack_require__(/*! ./helpers/listeners.js */ \"./src/helpers/listeners.js\");\n\nconsole.log('g'); //Globals ..... to be removed\n\nvar is_file = true;\nvar is_wfs = false;\n\nvar Webservice_Checker =\n/*#__PURE__*/\nfunction () {\n  function Webservice_Checker() {\n    _classCallCheck(this, Webservice_Checker);\n\n    this.url = '';\n    this.is_file = true;\n    this.service_type = null;\n  }\n\n  _createClass(Webservice_Checker, [{\n    key: \"set_url\",\n    value: function set_url(url) {\n      this.url = url;\n    }\n  }, {\n    key: \"set_is_file\",\n    value: function set_is_file(is_file) {\n      this.is_file = is_file;\n    }\n  }, {\n    key: \"set_service_type\",\n    value: function set_service_type(service_type) {\n      this.service_type = service_type;\n    }\n  }, {\n    key: \"get_url\",\n    value: function get_url() {\n      return this.url;\n    }\n  }, {\n    key: \"get_is_file\",\n    value: function get_is_file() {\n      return this.is_file;\n    }\n  }, {\n    key: \"get_service_type\",\n    value: function get_service_type() {\n      return this.service_type;\n    } // all function that need ran at start should be placed in this function.\n\n  }, {\n    key: \"set_up\",\n    value: function set_up() {\n      //user clicked link button\n      document.getElementsByClassName(\"controls \")[1].childNodes[3].onclick = function () {\n        ui_funcs.service_type_display_block();\n        this.is_file = false;\n      }; //user clicked remove button\n\n\n      document.getElementsByClassName(\"btn btn-danger btn-remove-url\")[0].onclick = function () {\n        ui_funcs.service_type_display_none();\n        ui_funcs.wfs_selector_disable();\n        ui_funcs.selectElement('service_type', 'null');\n        this.is_file = true;\n      }; // used for update resource page so if a resource is using wfs or rest or other the dropdown box still appears\n      // and layers selector bos id applicapable\n\n\n      ui_funcs.show_service_type_dropdown_if_not_none();\n      ui_funcs.show_wfs_dropdown_if_service_type_is_wfs();\n      var layer_dropdown = document.getElementById('layer_name_dropdown');\n\n      if (layer_dropdown.options[0].value.length > 0) {\n        ui_funcs.wfs_selector_enable();\n        ui_funcs.layer_dropdown_enable();\n      }\n\n      var url_value = $(\"#field-image-url\").val();\n\n      if (document.getElementById('saveBtn')) {\n        ui_funcs.is_wfs_display_block();\n      }\n\n      listeners.service_selector_listener();\n    }\n  }]);\n\n  return Webservice_Checker;\n}();\n\nvar webserviceChecker = new Webservice_Checker();\n/* harmony default export */ __webpack_exports__[\"default\"] = (webserviceChecker);\n$(document).ready(function () {\n  console.log('here'); // timeout needed ad if it runs to quickly the elements wont be created yet so listners wont be set up correctly\n\n  setTimeout(webserviceChecker.set_up, 600);\n}); //handle load screen\n\nfunction handle_loading() {\n  $(\"#layer_name_dropdown option\").remove(); //delete old options hides layer options\n\n  $('#layer_name_dropdown').append($('<option>', {\n    value: 'null',\n    text: 'Loading...'\n  })); //Add a loading on dropdown while layers are loading.\n}\n\nfunction handle_request_fail() {\n  $(\"#layer_name_dropdown option\").remove(); //delete old optionshides layer options\n\n  $('#layer_name_dropdown').append($('<option>', {\n    value: 'null',\n    text: 'No Layers Available, Please Try Again.'\n  })); //Add a loading on dropdown while layers are loading.\n} //regex for url formatting.\n\n\nfunction matchRuleShort(str, rule) {\n  var escapeRegex = function escapeRegex(str) {\n    return str.replace(/([.*+?^=!:${}()|\\[\\]\\/\\\\])/g, \"\\\\$1\");\n  };\n\n  return new RegExp(\"^\" + rule.split(\"*\").map(escapeRegex).join(\".*\") + \"$\").test(str);\n}\n\nfunction match_on(str, key) {\n  var re = RegExp(\"(\".concat(key, \"=([a-z-A-Z-0-9_\\\"\\xA3$%*^~])+)\"));\n  return re.exec(str);\n}\n\nfunction test_on(str, key) {\n  var re = RegExp(\"(\".concat(key, \"=([a-z-A-Z-0-9_\\\"\\xA3$%*^~])+)\"));\n  return re.test(str);\n}\n\nfunction cleanUrl(url) {\n  url = decodeURIComponent(String(url));\n  var token = null;\n  tokens = ['authkey', 'id', 'key', 'token', 'authentication'];\n\n  for (var i in tokens) {\n    if (test_on(url, tokens[i]) && token == null) {\n      token = match_on(url, tokens[i])[0];\n    }\n  }\n\n  if (url.includes('?')) {\n    url = url.split('?')[0];\n  }\n\n  url = url + '?request=getcapabilities&service=wfs';\n\n  if (token != null) {\n    url = url + '&' + token;\n  }\n\n  return url;\n} // function to add data to list\n\n\nvar addToDropDown = function addToDropDown(data) {\n  var myOptions = [];\n\n  for (var i = 0; i < data.length; i++) {\n    var entry = new Object();\n    entry.text = data[i]['name'];\n    entry.value = data[i]['name'];\n    myOptions.push(entry);\n  }\n\n  $('#layer_name_dropdown').empty();\n  var select = \"<option value=\" + '' + \">Please Select Layer</option>\";\n  $(select).appendTo('#layer_name_dropdown');\n  $.each(myOptions, function (i, data) {\n    var div_data = \"<option value=\" + data.value + \">\" + data.text + \"</option>\";\n    $(div_data).appendTo('#layer_name_dropdown');\n  });\n};\n\nvar f = document.getElementsByClassName(\"wfs_select\");\nf[0].style.display = 'none';\n\nfunction getCurrentURLPath() {\n  var current = window.location.href;\n  var base = current.split('/').splice(0, 3).join('/');\n  return base;\n}\n\nfunction getLayers() {\n  base_url = getCurrentURLPath();\n  var url = $(\"#field-image-url\").val().trim();\n  url = cleanUrl(url); // wfs_url = url.replaceAll('&','@') not supported yet?\n\n  var wfs_url = url.split(\"&\").join('@');\n  fetch_url = \"\".concat(base_url, \"/api/3/action/get_wfs_layers?url=\").concat(wfs_url);\n  handle_loading();\n  fetch(fetch_url).then(function (response) {\n    if (response.status !== 200) {\n      alert(\"Unable to retrieve layers from WFS please continue\");\n      handle_request_fail();\n      return;\n    } // Examine the text in the response\n\n\n    response.json().then(function (data) {\n      result = data.result;\n      addToDropDown(result);\n    });\n  })[\"catch\"](function (err) {\n    console.log('Fetch Error :-S', err);\n  })[\"finally\"](function () {\n    ui_funcs.CursorAuto();\n  });\n}\n\nfunction formSubmit() {\n  if (document.getElementById('saveBtn')) {\n    $(\"#saveBtn\").click();\n  } else {\n    $(\"#submitBtn\").click();\n  }\n}\n\nfunction LayerNameCheckPopup() {\n  var r = confirm(\"You haven't selected a WFS layer for your resource, Would you like to continue?\");\n\n  if (r == true) {\n    formSubmit();\n  } else {}\n}\n\nfunction removeDivIfExists(id) {\n  if (document.getElementById('attribute-errors-div')) {\n    document.getElementById('attribute-errors-div').remove();\n  }\n}\n\nfunction createErrorNotification(errors) {\n  removeDivIfExists('attribute-errors-div');\n  div = document.createElement(\"div\");\n  div.id = 'attribute-errors-div';\n  div.className = 'error-explanation alert alert-error';\n  var p = document.createElement('p');\n  p.innerHTML = 'Missing Attributes:';\n  var ul = document.createElement(\"ul\");\n\n  for (var i = 0; i < errors.length; i++) {\n    var li = document.createElement(\"li\");\n    li.innerHTML = \"\".concat(errors[i], \" is missing.\");\n    ul.append(li);\n  }\n\n  p.append(ul);\n  div.append(p);\n  var form = document.getElementById('resource-edit');\n  form.prepend(div);\n}\n\nfunction checkValues() {\n  var url = document.getElementById('field-image-url');\n  var layer_name = document.getElementById(\"layer_name_dropdown\");\n  var resource_name = document.getElementById(\"field-name\");\n  var uploader_name = document.getElementById(\"resource-uploader_name\");\n  var department_name = document.getElementById(\"resource-department_name\");\n  var digit_background = document.getElementById(\"digit_background\");\n  var data_processor = document.getElementById(\"resource-data_processor\");\n  var field_description = document.getElementById(\"field-description\");\n  var service_type = document.getElementById(\"service_type\");\n  var form = [url, layer_name, resource_name, uploader_name, department_name, digit_background, data_processor, field_description, service_type];\n  var errors = [];\n\n  for (var i = 0; i < form.length; i++) {\n    var element = form[i];\n\n    if (element.value == 'null' || element.value.length < 1) {\n      if (element.name == 'service_type' && is_file == true) {} else {\n        errors.push(element.name);\n      }\n    }\n  }\n\n  if (errors.length > 0) {\n    if (errors.join() == \"layer_name\" && is_wfs == true) {\n      // removeDivIfExists('attribute-errors-div')\n      // LayerNameCheckPopup()\n      formSubmit();\n    } else if (errors.join() == \"layer_name\" && is_wfs == false) {\n      formSubmit();\n    } else {\n      if (is_wfs == true) {\n        createErrorNotification(errors);\n        document.body.scrollTop = document.documentElement.scrollTop = 0;\n      } else {\n        errors = errors.filter(function (e) {\n          return e !== 'layer_name';\n        });\n        createErrorNotification(errors);\n        document.body.scrollTop = document.documentElement.scrollTop = 0;\n      }\n    }\n  } else {\n    formSubmit();\n  }\n}\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });