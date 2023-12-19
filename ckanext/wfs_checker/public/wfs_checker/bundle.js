!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.r(t);var o=n(1),i=n(2),l=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.url="",this.is_file=!0,this.service_type=null,this.submit_type=null}var t,n,l;return t=e,(n=[{key:"set_url",value:function(e){this.url=e}},{key:"set_is_file",value:function(e){this.is_file=e}},{key:"set_service_type",value:function(e){this.service_type=e}},{key:"set_submit_type",value:function(e){this.submit_type=e}},{key:"get_url",value:function(){return this.url}},{key:"get_is_file",value:function(){return this.is_file}},{key:"get_service_type",value:function(){return this.service_type}},{key:"set_up",value:function(){i.set_up_all_listeners()}},{key:"set_data_from_form_values",value:function(){this.service_type=$("#service_type").val(),"null"==this.service_type?this.is_file=!0:this.is_file=!1}},{key:"checkValues",value:function(){var e=document.getElementById("field-resource-upload"),t=document.getElementById("field-resource-url"),n=document.getElementById("layer_name_dropdown"),r=document.getElementById("service_type");this.is_file&&(t=e);for(var i=[t,n,r],l=[],a=0;a<i.length;a++){var s=i[a];("null"==s.value||s.value.length<1)&&("service_type"==s.name&&1==this.is_file||l.push(s.name))}l.length>0?"layer_name"==l.join()?this.formSubmit():"wfs"==this.service_type||"rest"==this.service_type?(o.createErrorNotification(l),document.body.scrollTop=document.documentElement.scrollTop=0):(l=l.filter((function(e){return"layer_name"!==e})),o.createErrorNotification(l),document.body.scrollTop=document.documentElement.scrollTop=0):this.formSubmit()}},{key:"formSubmit",value:function(){"add"==this.submit_type?$("#submitAddBtn").click():document.getElementById("saveBtn")?$("#saveBtn").click():$("#submitBtn").click()}}])&&r(t.prototype,n),l&&r(t,l),e}());t.default=l,$(document).ready((function(){setTimeout(l.set_up,50)}))},function(e,t,n){"use strict";function r(e,t){document.getElementById(e).value=t}function o(){$("#service_type_info_box_1").css("display","none")}function i(){$("#service_type_info_box_1").css("display","block")}function l(){$("#layer_name_info_block").html("".concat('<i class="fa fa-info-circle"></i>'," ").concat("You can use a valid ESRI rest MapServer, Group Layer or Feature Layer.\n    If you need to supply multiple layers from this ESRI rest service, please load them individually (as separate resources).\n    "))}function a(){$("#layer_name_info_block").html("".concat('<i class="fa fa-info-circle"></i>'," ").concat("If you need to supply multiple layers from this WFS, please load them individually (as\n    separate resources)."))}function s(e,t){var n='<span class="error-block">'.concat(t,"</span>");$("#".concat(e)).after(n)}function u(){$(".error-block").remove()}function c(){$("#service_type_group").css("display","none")}function _(){$("#service_type_group").css("display","block")}function d(){document.getElementById("get_layers_btn").disabled=!0}function f(){document.getElementById("get_layers_btn").disabled=!1}function p(){$("#layer_name_dropdown").css("display","none")}function y(){$("#layer_name_dropdown").css("display","inline-block")}function v(){$("#layer_selector").css("display","inline-block")}function m(){$("#layer_selector").css("display","none")}function h(){document.body.style.cursor="progress"}function b(){document.body.style.cursor="auto"}function g(){$("#layer_name_dropdown option").remove(),$("#layer_name_dropdown").append($("<option>",{value:"null",text:"Loading..."}))}function k(){$("#layer_name_dropdown option").remove(),$("#layer_name_dropdown").append($("<option>",{value:"null",text:"No Layers Available, Please Try Again."}))}function w(){$("#layer_name_dropdown option").remove(),$("#layer_name_dropdown").append($("<option>",{value:"null",text:'Click "Get Layers" Button To Populate Dropdown.'}))}function E(e){if($("#layer_name_dropdown").empty(),e.length<1)return k(),null;if(e.length>1){$("<option value=null>Please Select Layer</option>").appendTo("#layer_name_dropdown")}$.each(e,(function(e,t){var n="<option value="+t.value+">"+t.text+"</option>";$(n).appendTo("#layer_name_dropdown")}))}function x(e){document.getElementById(e)&&document.getElementById(e).remove()}function S(e){x("attribute-errors-div");var t=document.createElement("div");t.id="attribute-errors-div",t.className="error-explanation alert alert-error";var n=document.createElement("p");n.innerHTML="Missing Attributes:";for(var r=document.createElement("ul"),o=0;o<e.length;o++){var i=document.createElement("li");i.innerHTML="".concat(e[o]," is missing."),r.append(i)}n.append(r),t.append(n),document.getElementById("resource-edit").prepend(t)}n.r(t),n.d(t,"selectElement",(function(){return r})),n.d(t,"service_type_info_box_hidden",(function(){return o})),n.d(t,"service_type_info_box_block",(function(){return i})),n.d(t,"layer_name_info_box_esri_rest_content",(function(){return l})),n.d(t,"layer_name_info_box_wfs_content",(function(){return a})),n.d(t,"error_note",(function(){return s})),n.d(t,"clear_all_error_notes",(function(){return u})),n.d(t,"service_type_display_none",(function(){return c})),n.d(t,"service_type_display_block",(function(){return _})),n.d(t,"disable_get_layer_btn",(function(){return d})),n.d(t,"enable_get_layer_btn",(function(){return f})),n.d(t,"layer_dropdown_disable",(function(){return p})),n.d(t,"layer_dropdown_enable",(function(){return y})),n.d(t,"layer_selector_enable",(function(){return v})),n.d(t,"layer_selector_disable",(function(){return m})),n.d(t,"CursorLoading",(function(){return h})),n.d(t,"CursorAuto",(function(){return b})),n.d(t,"handle_loading",(function(){return g})),n.d(t,"handle_request_fail",(function(){return k})),n.d(t,"reset_layer_dropdown",(function(){return w})),n.d(t,"add_to_drop_down",(function(){return E})),n.d(t,"removeDivIfExists",(function(){return x})),n.d(t,"createErrorNotification",(function(){return S}))},function(e,t,n){"use strict";n.r(t),n.d(t,"link_btn_listener",(function(){return s})),n.d(t,"remove_link_btn_listener",(function(){return u})),n.d(t,"service_selector_listener",(function(){return c})),n.d(t,"get_layers_btn_listener",(function(){return _})),n.d(t,"submit_btn_listener",(function(){return d})),n.d(t,"set_up_all_listeners",(function(){return f}));var r=n(1),o=n(0),i=n(3),l=n(4),a=n(5);function s(e){function t(){r.service_type_display_block(),e.set_is_file(!1)}1==document.getElementById("resource-url-link").checked&&t(),document.getElementById("resource-link-button").addEventListener("click",(function(e){t()}),!1)}function u(e){function t(){r.service_type_display_none(),r.layer_selector_disable(),r.selectElement("service_type","null"),r.reset_layer_dropdown(),r.clear_all_error_notes(),e.set_is_file(!0)}0==document.getElementById("resource-url-link").checked&&t(),document.getElementsByClassName("btn btn-danger btn-remove-url")[1].addEventListener("click",(function(e){t()}),!1)}function c(e){$("#service_type").change((function(){var t=$(this).val();r.reset_layer_dropdown(),r.clear_all_error_notes(),"wfs"==t?(e.set_service_type("wfs"),r.enable_get_layer_btn(),r.layer_selector_enable(),r.service_type_info_box_block(),r.layer_name_info_box_wfs_content()):"rest"==t?(e.set_service_type("rest"),r.enable_get_layer_btn(),r.layer_selector_enable(),r.service_type_info_box_block(),r.layer_name_info_box_esri_rest_content()):"other"==t?(e.set_service_type("other"),r.disable_get_layer_btn(),r.layer_selector_disable(),r.service_type_info_box_hidden()):(e.set_service_type(null),r.disable_get_layer_btn(),r.layer_selector_disable(),r.service_type_info_box_hidden())}))}function _(e){$("#get_layers_btn").click((function(){r.clear_all_error_notes();var t=$("#field-resource-url").val();if(""!=t&&a(t))if(e.set_data_from_form_values(),"wfs"==e.get_service_type()&&0==e.get_is_file())r.CursorLoading(),new i.WFS_getter(t).get_layers();else if("rest"==e.get_service_type()&&0==e.get_is_file()){r.CursorLoading(),new l.WFS_getter(t).get_layers()}else console.log("this should not happen...");else alert("Please Supply a valid url")}))}function d(e){$("#checkBtn").click((function(){e.set_submit_type("submit"),e.checkValues()})),$("#checkBtnAdd").click((function(){e.set_submit_type("add"),e.checkValues()}))}function f(){var e=o.default;s(e),u(e),c(e),_(e),d(e)}},function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.r(t),n.d(t,"WFS_getter",(function(){return l}));var o=n(0),i=n(1),l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.url=t,this.webserviceChecker=o.default}var t,n,l;return t=e,(n=[{key:"cleanUrl",value:function(e){e=decodeURIComponent(String(e));var t=null;for(var n in tokens=["authkey","id","key","token","authentication"],tokens)test_on(e,tokens[n])&&null==t&&(t=match_on(e,tokens[n])[0]);return e.includes("?")&&(e=e.split("?")[0]),e+="?request=getcapabilities&servicehttps://desktop.postman.com/?desktopVersion=10.20.0&userId=7601508&teamId=0=wfs",null!=t&&(e=e+"&"+t),e}},{key:"getCurrentURLPath",value:function(){return window.location.href.split("/").splice(0,3).join("/")}},{key:"handleResponse",value:function(e){return e.json().then((function(t){if(!e.ok){var n=Object.assign({},t,{status:e.status,statusText:e.statusText});return Promise.reject(n)}return t}))}},{key:"create_options",value:function(e){for(var t=[],n=0;n<e.length;n++){var r=new Object;r.text=e[n].name,r.value=e[n].name,t.push(r)}return t}},{key:"get_layers",value:function(){var e=this;i.handle_loading();var t=this.url.trim(),n="".concat(this.getCurrentURLPath(),"/api/3/action/get_wfs_layers?"),r=JSON.stringify({url:this.cleanUrl(t)}),o=$("meta[name=_csrf_token]").attr("content");fetch(n,{method:"POST",body:r,credentials:"same-origin",headers:{"Content-Type":"application/json","X-CSRFToken":o}}).then(this.handleResponse).then((function(t){if(console.log(t),t.status_code=200){if(t.result.error)throw console.error(t.result.error),i.handle_request_fail(),t.result.error;var n=e.create_options(t.result);i.add_to_drop_down(n)}else alert("Unable to retrieve layers from WFS please continue"),console.error("Request Failed"),i.handle_request_fail()})).catch((function(e){i.error_note("layer_name_dropdown_group",e),console.warn(e),i.handle_request_fail()})).finally((function(){i.CursorAuto()}))}},{key:"matchRuleShort",value:function(e,t){return new RegExp("^"+t.split("*").map((function(e){return e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")})).join(".*")+"$").test(e)}},{key:"match_on",value:function(e,t){return RegExp("(".concat(t,'=([a-z-A-Z-0-9_"£$%*^~])+)')).exec(e)}},{key:"test_on",value:function(e,t){return RegExp("(".concat(t,'=([a-z-A-Z-0-9_"£$%*^~])+)')).test(e)}},{key:"cleanUrl",value:function(e){e=decodeURIComponent(String(e));var t=null,n=["authkey","id","key","token","authentication"];for(var r in n)this.test_on(e,n[r])&&null==t&&(t=this.match_on(e,n[r])[0]);return e.includes("?")&&(e=e.split("?")[0]),e+="?request=getcapabilities&service=wfs",null!=t&&(e=e+"&"+t),e}}])&&r(t.prototype,n),l&&r(t,l),e}()},function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.r(t),n.d(t,"WFS_getter",(function(){return l}));var o=n(0),i=n(1),l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.url=t,this.webserviceChecker=o.default}var t,n,l;return t=e,(n=[{key:"getCurrentURLPath",value:function(){return window.location.href.split("/").splice(0,3).join("/")}},{key:"handleResponse",value:function(e){return e.json().then((function(t){if(!e.ok){var n=Object.assign({},t,{status:e.status,statusText:e.statusText});return Promise.reject(n)}return t}))}},{key:"create_options",value:function(e){for(var t=[],n=0;n<e.length;n++){var r=new Object;r.text=e[n].name,r.value=e[n].id,t.push(r)}return t}},{key:"get_layers",value:function(){var e=this;i.handle_loading();var t=this.url.trim(),n="".concat(this.getCurrentURLPath(),"/api/3/action/get_esri_rest_layers?"),r=JSON.stringify({url:t}),o=$("meta[name=_csrf_token]").attr("content");fetch(n,{method:"POST",body:r,credentials:"same-origin",headers:{"Content-Type":"application/json","X-CSRFToken":o}}).then(this.handleResponse).then((function(t){if(t.status_code=200){if(t.result.error)throw i.handle_request_fail(),t.result.error;var n=e.create_options(t.result);i.add_to_drop_down(n)}else alert("Unable to retrieve layers from esri rest service please use a valid url"),console.error("Request Failed"),i.handle_request_fail()})).catch((function(e){i.error_note("layer_name_dropdown_group",e),console.warn(e),i.handle_request_fail()})).finally((function(){i.CursorAuto()}))}}])&&r(t.prototype,n),l&&r(t,l),e}()},function(e,t){e.exports=function(e){if("string"!=typeof e)return!1;var t=e.match(n);if(!t)return!1;var i=t[1];if(!i)return!1;if(r.test(i)||o.test(i))return!0;return!1};var n=/^(?:\w+:)?\/\/(\S+)$/,r=/^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/,o=/^[^\s\.]+\.\S{2,}$/}]);