require('@babel/polyfill');
var isURL = require('is-url')

//all the elements that need modifying either aesthetically or to add functionality should be done here, at startup
function layer_select_controls(){
    // document.getElementsByClassName("controls ")[1].childNodes[3].onclick = make_layer_dropdown_visible;
    document.getElementsByClassName("controls ")[1].childNodes[3].onclick = function(){
        is_wfs_display_block()
    }
    document.getElementsByClassName("btn btn-danger btn-remove-url")[0].onclick = function(){
        is_wfs_display_none()
        wfs_selector_disable()
        selectElement('is_wfs','no')
    }
    cleanTextInputBox() //add functions to be applied to layer selection box
    $("#layer_name_dropdown").on("change", choose_multiple) //apply onclick function here to avoid duplication
}

// Globals
var is_wfs = false

// UI functions
function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

function is_wfs_display_none() {
    $("#is_wfs_group").css('display', 'none')
}

function is_wfs_display_block() {
    $("#is_wfs_group").css('display', 'block')
}

function disable_get_layer_btn() {
    document.getElementById("get_layers_btn").disabled=true;
}
function enable_get_layer_btn() {
    document.getElementById("get_layers_btn").disabled=false;
}

function layer_dropdown_disable(){
    $("#layer_name_dropdown").css('display', 'none'); //make drop down visible
}

function layer_dropdown_enable(){
    $("#layer_name_dropdown").css('display', 'inline-block'); //make drop down visible
}

function wfs_selector_enable(){
    $("#wfs_selector").css('display', 'inline-block'); //make drop down visible
}

function wfs_selector_disable(){
    $("#wfs_selector").css('display', 'none'); //make drop down visible
}

function CursorLoading() {
  document.body.style.cursor = 'progress';
}

function CursorAuto() {
  document.body.style.cursor = 'auto';
}

$(document).ready(function() {
    setTimeout(layer_select_controls, 1000)
    // is_wfs_display_none()

    $('#is_wfs').change(function(){
        var x = $(this).val()
        if ($(this).val() == 'yes'){
            enable_get_layer_btn()
            wfs_selector_enable()
            is_wfs = true
        }
        if ($(this).val() == 'no'){
            disable_get_layer_btn()
            wfs_selector_disable()
            is_wfs = false
        }
    })

    $('#get_layers_btn').click(function() {
        url_value = $("#field-image-url").val()
        if (url_value != '' && isURL(url_value)){
            CursorLoading()
            getLayers()
        }
        else {
            alert('Please Supply a valid url')
        }
    })

    $('#checkBtn').click(function() {
        checkValues()
    })

    let layer_dropdown = document.getElementById('layer_name_dropdown')
    if (layer_dropdown.options[0].value.length > 0){
        wfs_selector_enable()
        layer_dropdown_enable()
    }

    url_value = $("#field-image-url").val()
    if(document.getElementById('saveBtn')){
        is_wfs_display_block()
    }

})

//emptys multi select text box
function cleanTextInputBox(){
    $('#myDIV .editor-info-block').remove()
    $('#resource-layer-name')
        .prop('disabled', true)
        .prop('rows', "4")
        .css({"width": "100%", "border-bottom": "1px solid #cccccc"});
}

function take_jsonList_append_select(data){
    var myOptions = [];
    for (var i = 0; i < data.length; i++) {
        myOptions.push(data[i].Title)
    }
    var _select = $('<select>');
    $.each(myOptions, function(val, text) {
        _select.append(
                $('<option></option>').val(val).html(text)
            );
    });
    $('#layer_name_dropdown').append(_select.html());
}

//handle load screen
function handle_loading() {
    $("#layer_name_dropdown option").remove() //delete old optionshides layer options
    // layer_dropdown_enable() //reveals layer options
    // wfs_selector_enable()
    $('#layer_name_dropdown').append($('<option>', {
        value: 'null',
        text: 'Loading...'
    })); //Add a loading on dropdown while layers are loading.
}

function handle_request_fail() {
    $("#layer_name_dropdown option").remove() //delete old optionshides layer options
    // layer_dropdown_enable() //reveals layer options
    // wfs_selector_enable()
    $('#layer_name_dropdown').append($('<option>', {
        value: 'null',
        text: 'No Layers Available, Please Try Again.'
    })); //Add a loading on dropdown while layers are loading.
}

//user needs to be able to select multiple layers
function choose_multiple(){
    var clicked_val = $("#layer_name_dropdown :selected").text()
    var preExistingVal = $('#resource-layer-name').val()
    if (clicked_val != 'Please Select Layer') {
        $('#resource-layer-name').val(clicked_val)
    }
}
//regex for url formatting.
function matchRuleShort(str, rule) {
    var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
}
//cleans the url returning it has a get capabilities request, keeps id/authkey token if needed.
// var cleanUrl = function(url) {
//     url = String(url)
//     url = decodeURIComponent(url);
//     var token = null
//     var splitUrl = []
//     if (url.includes('&')) {
//         splitUrl = url.split('&')
//     } else {
//         splitUrl = [url]
//     }
//     console.log(splitUrl)
//     if (url.includes('authkey=')) {
//         splitUrl.forEach((element) => {
//             if (matchRuleShort(element, 'authkey=*')) {
//                 token = element;
//             }
//         })
//     }
//     if (url.includes('id=')) {
//         console.log('contains_id')
//         console.log(splitUrl)
//         splitUrl.forEach((element) => {
//             console.log('here')
//             console.log('element',element)
//             if (matchRuleShort(element, 'id=*')) {
//                 token = element;
//                 console.log(token)
//             }
//         })
//     }
//
//     if(url.includes('?')){
//         url = url.split('?')[0]
//     }
//     url = url + '?request=getcapabilities&service=wfs'
//     if(token != null){
//         url = url + '&' + token;
//     }
//     console.log(url)
//     return url
// }

function match_on(str, key) {
    var re = RegExp(`(${key}=([a-z-A-Z-0-9_"£$%*^~])+)`)
    return re.exec(str);
}

function test_on(str, key) {
    var re = RegExp(`(${key}=([a-z-A-Z-0-9_"£$%*^~])+)`)
    return re.test(str);
}

var cleanUrl = function(url) {
    url = decodeURIComponent(String(url));
    var token = null
    tokens = ['authkey', 'id', 'key', 'token']
    for (var i in tokens) {
        if (test_on(url, tokens[i]) && token == null){
            token = match_on(url, tokens[i])[0]
        }
    }
    if(url.includes('?')){
        url = url.split('?')[0]
    }
    url = url + '?request=getcapabilities&service=wfs'
    if(token != null){
        url = url + '&' + token;
    }
    return url
}

var addToDropDown = function(data) {
    var myOptions = [];
    for (var i = 0; i < data.length; i++) {
        let entry = new Object()
        entry.text = data[i]['name']
        entry.value = data[i]['name']
        myOptions.push(entry)
    }
    $('#layer_name_dropdown').empty()
    var select = "<option value=" + '' + ">Please Select Layer</option>";
    $(select).appendTo('#layer_name_dropdown');
    $.each(myOptions, function(i, data) {
        var div_data = "<option value=" + data.value + ">" + data.text + "</option>";
        $(div_data).appendTo('#layer_name_dropdown');
    });
}
 
let f = document.getElementsByClassName("wfs_select")
f[0].style.display = 'none'

function getCurrentURLPath() {
    let current = window.location.href
    let base = current.split('/').splice(0,3).join('/')
    return base
}

function getLayers() {
    base_url = getCurrentURLPath()
    let url = $("#field-image-url").val().trim()
    url = cleanUrl(url)
    // wfs_url = url.replaceAll('&','@') not supported yet?
    let wfs_url = url.split("&").join('@');
    fetch_url = `${base_url}/api/3/action/get_wfs_layers?url=${wfs_url}`
    handle_loading()
    fetch(fetch_url)
        .then(
            function(response) {
                if (response.status !== 200) {
                    alert("Unable to retrieve layers from WFS please continue");
                    handle_request_fail()
                    return;
            }
            // Examine the text in the response
            response.json().then(function(data) {
                result = data.result
                addToDropDown(result)
            });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
        .finally(()=> {
            CursorAuto()
        });
}

function formSubmit() {
    if(document.getElementById('saveBtn')){
        $("#saveBtn").click()
    } else {
        $("#submitBtn").click()
    }
}

function LayerNameCheckPopup() {
    var r = confirm("You haven't selected a WFS layer for your resource, Would you like to continue?");
    if (r == true) {
        formSubmit()
    } else {
        
    }
  }

function removeDivIfExists(id) {
    if (document.getElementById('attribute-errors-div')) {
        document.getElementById('attribute-errors-div').remove()
    }
}

function createErrorNotification(errors)  {
    removeDivIfExists('attribute-errors-div')
    div = document.createElement("div");
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

function checkValues() {
    let url = document.getElementById('field-image-url')
    let layer_name = document.getElementById("layer_name_dropdown")
    let resource_name = document.getElementById("field-name")
    let uploader_name = document.getElementById("resource-uploader_name")
    let department_name = document.getElementById("resource-department_name")
    let digit_background = document.getElementById("digit_background")
    let data_processor = document.getElementById("resource-data_processor")
    let field_description = document.getElementById("field-description")
    let form = [url, layer_name,resource_name,uploader_name,department_name,digit_background,data_processor,field_description]
    let errors = []
    for (let i = 0; i < form.length; i++) {
        let element = form[i];
        if (element.value == 'null' || element.value.length < 1){
            errors.push(element.name)
        }
    }
    if (errors.length > 0){

        if (errors.join() == "layer_name" && is_wfs == true){
            removeDivIfExists('attribute-errors-div')
            LayerNameCheckPopup()
        } else if(errors.join() == "layer_name" && is_wfs == false) {
            formSubmit()
        }
        else {
            if( is_wfs == true){
                createErrorNotification(errors)
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            } else {
                errors = errors.filter(e => e !== 'layer_name');
                createErrorNotification(errors)
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        }
    }
    else {
        formSubmit()
    }
}
