export function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

export function is_wfs_display_none() {
    $("#service_type_group").css('display', 'none')
}

export function is_wfs_display_block() {
    $("#service_type_group").css('display', 'block')
}

export function service_type_display_none() {
    $("#service_type_group").css('display', 'none')
}

export function service_type_display_block() {
    $("#service_type_group").css('display', 'block')
}

export function disable_get_layer_btn() {
    document.getElementById("get_layers_btn").disabled=true;
}
export function enable_get_layer_btn() {
    document.getElementById("get_layers_btn").disabled=false;
}

export function layer_dropdown_disable(){
    $("#layer_name_dropdown").css('display', 'none'); //make drop down visible
}

export function layer_dropdown_enable(){
    $("#layer_name_dropdown").css('display', 'inline-block'); //make drop down visible
}

export function wfs_selector_enable(){
    $("#wfs_selector").css('display', 'inline-block'); //make drop down visible
}

export function wfs_selector_disable(){
    $("#wfs_selector").css('display', 'none'); //make drop down visible
}

export function CursorLoading() {
  document.body.style.cursor = 'progress';
}

export function CursorAuto() {
  document.body.style.cursor = 'auto';
}

export function show_service_type_dropdown_if_not_none(){
    var s_type = document.getElementById('service_type').value
    if (s_type != 'null'){
        service_type_display_block()
    }
}

export function show_wfs_dropdown_if_service_type_is_wfs(){
    var s_type = document.getElementById('service_type').value
    if (s_type == 'wfs'){
        layer_dropdown_enable()
        wfs_selector_enable()
    }
}

