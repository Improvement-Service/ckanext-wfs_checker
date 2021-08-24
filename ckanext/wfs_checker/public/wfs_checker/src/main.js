// require('@babel/polyfill');
var isURL = require('is-url')
var ui_funcs = require('./helpers/ui_funcs.js')
var listeners = require('./helpers/listeners.js')

console.log('g')

//Globals ..... to be removed
var is_file = true
var is_wfs = false

class Webservice_Checker {
    constructor(){
        this.url = ''
        this.is_file = true
        this.service_type = null
    }

    set_url(url){
        this.url = url
    }

    set_is_file(is_file){
        this.is_file = is_file
    }

    set_service_type(service_type){
        this.service_type = service_type
    }

    get_url(){
        return this.url
    }

    get_is_file(){
        return this.is_file
    }

    get_service_type(){
        return this.service_type
    }

    // all function that need ran at start should be placed in this function.
    set_up() {
        //user clicked link button
        document.getElementsByClassName("controls ")[1].childNodes[3].onclick = function() {
            ui_funcs.service_type_display_block()
            this.is_file = false
        }
        //user clicked remove button
        document.getElementsByClassName("btn btn-danger btn-remove-url")[0].onclick = function() {
            ui_funcs.service_type_display_none()
            ui_funcs.wfs_selector_disable()
            ui_funcs.selectElement('service_type','null')
            this.is_file = true
        }
        // used for update resource page so if a resource is using wfs or rest or other the dropdown box still appears
        // and layers selector bos id applicapable
        ui_funcs.show_service_type_dropdown_if_not_none()
        ui_funcs.show_wfs_dropdown_if_service_type_is_wfs()

        let layer_dropdown = document.getElementById('layer_name_dropdown')
        if (layer_dropdown.options[0].value.length > 0){
            ui_funcs.wfs_selector_enable()
            ui_funcs.layer_dropdown_enable()
        }

        let url_value = $("#field-image-url").val()
        if(document.getElementById('saveBtn')){
            ui_funcs.is_wfs_display_block()
        }

         listeners.service_selector_listener()
    }

    
}


const webserviceChecker = new Webservice_Checker()
export default webserviceChecker

$(document).ready(function() {
    console.log('here')
    // timeout needed ad if it runs to quickly the elements wont be created yet so listners wont be set up correctly
    setTimeout(webserviceChecker.set_up, 600)
})


//handle load screen
function handle_loading() {
    $("#layer_name_dropdown option").remove() //delete old options hides layer options
    $('#layer_name_dropdown').append($('<option>', {
        value: 'null',
        text: 'Loading...'
    })); //Add a loading on dropdown while layers are loading.
}

function handle_request_fail() {
    $("#layer_name_dropdown option").remove() //delete old optionshides layer options
    $('#layer_name_dropdown').append($('<option>', {
        value: 'null',
        text: 'No Layers Available, Please Try Again.'
    })); //Add a loading on dropdown while layers are loading.
}

//regex for url formatting.
function matchRuleShort(str, rule) {
    var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
}

function match_on(str, key) {
    var re = RegExp(`(${key}=([a-z-A-Z-0-9_"£$%*^~])+)`)
    return re.exec(str);
}

function test_on(str, key) {
    var re = RegExp(`(${key}=([a-z-A-Z-0-9_"£$%*^~])+)`)
    return re.test(str);
}

function cleanUrl(url) {
    url = decodeURIComponent(String(url));
    var token = null
    tokens = ['authkey', 'id', 'key', 'token','authentication']
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

// function to add data to list
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
            ui_funcs.CursorAuto()
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
    let service_type = document.getElementById("service_type")
    let form = [url, layer_name, resource_name, uploader_name, department_name,
        digit_background, data_processor, field_description, service_type]
    let errors = []
    for (let i = 0; i < form.length; i++) {
        let element = form[i];
        if (element.value == 'null' || element.value.length < 1) {
            if (element.name == 'service_type' && is_file == true) {
            } else {
                errors.push(element.name)
            }
        }
    }
    if (errors.length > 0){

        if (errors.join() == "layer_name" && is_wfs == true){
            // removeDivIfExists('attribute-errors-div')
            // LayerNameCheckPopup()
             formSubmit()
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
