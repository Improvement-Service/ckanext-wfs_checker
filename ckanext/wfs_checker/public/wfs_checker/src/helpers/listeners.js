var ui_funcs = require('./ui_funcs')
var main = require('../main.js')

export function link_btn_listner(){

}

export function upload_btn_listern(){

}

export function service_selector_listener(){
    $('#service_type').change(function() {

        var webserviceChecker = main.default
        var val = $(this).val()
        if (val == 'wfs') {
            webserviceChecker.set_service_type('wfs')
            ui_funcs.enable_get_layer_btn()
            ui_funcs.wfs_selector_enable()
        }
        else if (val == 'rest') {
            webserviceChecker.set_service_type('rest')
            ui_funcs.disable_get_layer_btn()
            ui_funcs.wfs_selector_disable()
        }
        else if (val == 'other') {
            webserviceChecker.set_service_type('other')
            ui_funcs.disable_get_layer_btn()
            ui_funcs.wfs_selector_disable()
        } else {
            webserviceChecker.set_service_type(null)
            ui_funcs.disable_get_layer_btn()
            ui_funcs.wfs_selector_disable()
        }
        console.log(webserviceChecker.get_service_type())
    })
}

export function get_layers_btn_listener(){
    $('#get_layers_btn').click(function() {
        url_value = $("#field-image-url").val()
        if (url_value != '' && isURL(url_value)){
            ui_funcs.CursorLoading()
            getLayers()
        }
        else {
            alert('Please Supply a valid url')
        }
    })
}

export function submit_btn_listener(){
    $('#checkBtn').click(function() {
        checkValues()
    })
}