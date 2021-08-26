var ui_funcs = require('./ui_funcs')
var main = require('../main.js')
var wfs_getter = require('./wfs_getter')
var esri_rest_getter = require('./esri_rest_getter')
var isURL = require('is-url')

export function link_btn_listener(webserviceChecker){
    document.getElementsByClassName("controls ")[1].childNodes[3].onclick = function() {
        ui_funcs.service_type_display_block()
        webserviceChecker.set_is_file(false)
    }
}

export function remove_link_btn_listener(webserviceChecker){
    document.getElementsByClassName("btn btn-danger btn-remove-url")[0].onclick = function() {
        ui_funcs.service_type_display_none()
        ui_funcs.layer_selector_disable()
        ui_funcs.selectElement('service_type','null')
        ui_funcs.reset_layer_dropdown()
        webserviceChecker.set_is_file(true)
    }
}

export function service_selector_listener(webserviceChecker){
    $('#service_type').change(function() {
        var val = $(this).val()
        ui_funcs.reset_layer_dropdown()
        if (val == 'wfs') {
            webserviceChecker.set_service_type('wfs')
            ui_funcs.enable_get_layer_btn()
            ui_funcs.layer_selector_enable()
            ui_funcs.service_type_info_box_block()
            ui_funcs.layer_name_info_box_wfs_content()
        }
        else if (val == 'rest') {
            webserviceChecker.set_service_type('rest')
            ui_funcs.enable_get_layer_btn()
            ui_funcs.layer_selector_enable()
            ui_funcs.service_type_info_box_block()
            ui_funcs.layer_name_info_box_esri_rest_content()
        }
        else if (val == 'other') {
            webserviceChecker.set_service_type('other')
            ui_funcs.disable_get_layer_btn()
            ui_funcs.layer_selector_disable()
            ui_funcs.service_type_info_box_hidden()
        } else {
            webserviceChecker.set_service_type(null)
            ui_funcs.disable_get_layer_btn()
            ui_funcs.layer_selector_disable()
            ui_funcs.service_type_info_box_hidden()
        }
    })
}

export function get_layers_btn_listener(webserviceChecker){
    $('#get_layers_btn').click(function() {
        var url_value = $("#field-image-url").val()
        if (url_value != '' && isURL(url_value)){
            if (webserviceChecker.get_service_type() == 'wfs' && webserviceChecker.get_is_file() == false ) {
                ui_funcs.CursorLoading()
                var wfs = new wfs_getter.WFS_getter(url_value)
                wfs.get_layers()
            }
            else if (webserviceChecker.get_service_type() == 'rest' && webserviceChecker.get_is_file() == false ) {
                ui_funcs.CursorLoading()
                var esri_rest = new esri_rest_getter.WFS_getter(url_value)
                esri_rest.get_layers()
            }
            else {
                console.log('this should not happen...')
            }
        }
        else {
            alert('Please Supply a valid url')
        }
    })
}

export function submit_btn_listener(webserviceChecker){
    $('#checkBtn').click(function() {
        webserviceChecker.checkValues()
    })
}

export function set_up_all_listeners(){
    const webserviceChecker = main.default
    link_btn_listener(webserviceChecker)
    remove_link_btn_listener(webserviceChecker)
    link_btn_listener(webserviceChecker)
    service_selector_listener(webserviceChecker)
    get_layers_btn_listener(webserviceChecker)
    submit_btn_listener(webserviceChecker)
}