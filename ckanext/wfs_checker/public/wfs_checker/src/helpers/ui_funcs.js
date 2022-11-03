export function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

export function service_type_info_box_hidden(){
    $("#service_type_info_box_1").css('display', 'none')
}

export function service_type_info_box_block(){
    $("#service_type_info_box_1").css('display', 'block')
}

export function layer_name_info_box_esri_rest_content(){
    var icon = '<i class="fa fa-info-circle"></i>'
    var text = `You can use a valid ESRI rest MapServer, Group Layer or Feature Layer.
    If you need to supply multiple layers from this ESRI rest service, please load them individually (as separate resources).
    `
    $("#layer_name_info_block").html(`${icon} ${text}`)
}

export function layer_name_info_box_wfs_content(){
    var icon = '<i class="fa fa-info-circle"></i>'
    var text = `If you need to supply multiple layers from this WFS, please load them individually (as
    separate resources).`
    $("#layer_name_info_block").html(`${icon} ${text}`)
}

export function error_note(attr_id, text){
    var html = `<span class="error-block">${text}</span>` 
    $(`#${attr_id}`).after(html)
}

export function clear_all_error_notes(){
    $( ".error-block" ).remove();
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

export function layer_selector_enable(){
    $("#layer_selector").css('display', 'inline-block'); //make drop down visible
}

export function layer_selector_disable(){
    $("#layer_selector").css('display', 'none'); //make drop down visible
}

export function CursorLoading() {
  document.body.style.cursor = 'progress';
}

export function CursorAuto() {
  document.body.style.cursor = 'auto';
}

export function handle_loading() {
    $("#layer_name_dropdown option").remove() //delete old options hides layer options
    $('#layer_name_dropdown').append($('<option>', {
        value: 'null',
        text: 'Loading...'
    })); //Add a loading on dropdown while layers are loading.
}

export function handle_request_fail() {
    $("#layer_name_dropdown option").remove() //delete old optionshides layer options
    $('#layer_name_dropdown').append($('<option>', {
        value: 'null',
        text: 'No Layers Available, Please Try Again.'
    })); 
}

export function reset_layer_dropdown() {
    $("#layer_name_dropdown option").remove() //delete old optionshides layer options
    $('#layer_name_dropdown').append($('<option>', {
        value: 'null',
        text: 'Click "Get Layers" Button To Populate Dropdown.'
    })); 
}

export function add_to_drop_down(options){
    $('#layer_name_dropdown').empty()
    if (options.length < 1) {
        handle_request_fail()
        return null;
    } else if (options.length > 1 ){
        var select = "<option value=" + 'null' + ">Please Select Layer</option>";
        $(select).appendTo('#layer_name_dropdown');
    }
    $.each(options, function(i, data) {
        var div_data = "<option value=" + data.value + ">" + data.text + "</option>";
        $(div_data).appendTo('#layer_name_dropdown');
    });
}

export function removeDivIfExists(id) {
    if (document.getElementById(id)) {
        document.getElementById(id).remove()
    }
}

export function createErrorNotification(errors)  {
    removeDivIfExists('attribute-errors-div')
    let div = document.createElement("div");
    div.id = 'attribute-errors-div'
    div.className = 'error-explanation alert alert-error'
    var p = document.createElement('p')
    p.innerHTML=('Missing Attributes:')
    var ul = document.createElement("ul")
    for (let i = 0; i < errors.length; i++) {
        let li = document.createElement("li")
        li.innerHTML = `${errors[i]} is missing.`
        ul.append(li)
    }
    p.append(ul)
    div.append(p)
    let form = document.getElementById('resource-edit')
    form.prepend(div)
}

// export function show(layers)