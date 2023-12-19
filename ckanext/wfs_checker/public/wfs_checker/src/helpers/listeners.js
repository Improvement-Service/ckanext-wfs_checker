var ui_funcs = require('./ui_funcs')
var main = require('../main.js')
var wfs_getter = require('./wfs_getter')
var esri_rest_getter = require('./esri_rest_getter')
var isURL = require('is-url')

export function link_btn_listener(webserviceChecker){

    function action(){
        ui_funcs.service_type_display_block()
        webserviceChecker.set_is_file(false)
    }

    if (document.getElementById("resource-url-link").checked == true){
        action()
    }

    var resource_link_btn = document.getElementById("resource-link-button")
    resource_link_btn.addEventListener('click',  function(event){
        action()
        },false
    )
}

export function remove_link_btn_listener(webserviceChecker){
    function action (){
        ui_funcs.service_type_display_none()
        ui_funcs.layer_selector_disable()
        ui_funcs.selectElement('service_type','null')
        ui_funcs.reset_layer_dropdown()
        ui_funcs.clear_all_error_notes()
        webserviceChecker.set_is_file(true) 
    }
    if (document.getElementById("resource-url-link").checked == false){
        action()
    } 

    var remove_btn = document.getElementsByClassName("btn btn-danger btn-remove-url")[1]
    remove_btn.addEventListener('click',  function(event){
        action()
        },false
    )
}

export function service_selector_listener(webserviceChecker){
    $('#service_type').change(function() {
        var val = $(this).val()
        ui_funcs.reset_layer_dropdown()
        ui_funcs.clear_all_error_notes()
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
        ui_funcs.clear_all_error_notes()
        var url_value = $("#field-resource-url").val()
        if (url_value != '' && isURL(url_value)){
            webserviceChecker.set_data_from_form_values()
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
        webserviceChecker.set_submit_type('submit')
        webserviceChecker.checkValues()
    })
    $('#checkBtnAdd').click(function() {
        webserviceChecker.set_submit_type('add')
        webserviceChecker.checkValues()
    })
}

export function set_up_all_listeners(){
    const webserviceChecker = main.default
    link_btn_listener(webserviceChecker)
    remove_link_btn_listener(webserviceChecker)
    service_selector_listener(webserviceChecker)
    get_layers_btn_listener(webserviceChecker)
    submit_btn_listener(webserviceChecker)
}