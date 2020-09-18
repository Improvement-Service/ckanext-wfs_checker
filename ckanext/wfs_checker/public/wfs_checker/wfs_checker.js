require('@babel/polyfill');
var parseString = require('xml2js').parseString;

const findPaths = (
 obj,
 searchValue,
 { searchKeys = typeof searchValue === "string", maxDepth = 20 } = {}
) => {
 const paths = []
 const notObject = typeof searchValue !== "object"
 const gvpio = (obj, maxDepth, prefix) => {
   if (!maxDepth) return

   for (const [curr, currElem] of Object.entries(obj)) {
     if (searchKeys && curr === searchValue) {
       // To search for property name too ...
       paths.push(prefix + curr)
     }

     if (typeof currElem === "object") {
       // object is "object" and "array" is also in the eyes of "typeof"
       // search again :D
       gvpio(currElem, maxDepth - 1, prefix + curr + "/")
       if (notObject) continue
     }
     // it's something else... probably the value we are looking for
     // compares with "searchValue"
     if (currElem === searchValue) {
       // return index AND/OR property name
       paths.push(prefix + curr)
     }
   }
 }
 gvpio(obj, maxDepth, "")
 return paths
}

//all the elements that need modifying either aesthetically or to add functionality should be done here, at startup
function layer_select_controls(){
    // document.getElementsByClassName("controls ")[1].childNodes[3].onclick = make_layer_dropdown_visible;
    document.getElementsByClassName("controls ")[1].childNodes[3].onclick = function(){
        is_wfs_display_block()
    }
    document.getElementsByClassName("btn btn-danger btn-remove-url")[0].onclick = function(){
        is_wfs_display_none()
        layer_dropdown_disable()
        wfs_selector_disable()
    }
    cleanTextInputBox() //add functions to be applied to layer selection box
    $("#layer_name_dropdown").on("change", choose_multiple) //apply onclick function here to avoid duplication
}

// Globals

var typingTimer;                //timer identifier
var doneTypingInterval = 2000;
var is_wfs = false

// UI functions

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
    console.log('called')
    $("#layer_name_dropdown").css('display', 'none'); //make drop down visible
}

function layer_dropdown_enable(){
    console.log('call this')
    $("#layer_name_dropdown").css('display', 'inline-block'); //make drop down visible
}

function wfs_selector_enable(){
    $("#wfs_selector").css('display', 'inline-block'); //make drop down visible
}

function wfs_selector_disable(){
    let x = getElementById('wfs_selector')
    console.log(x)
    $("#wfs_selector").css('display', 'none'); //make drop down visible
}

function CursorLoading() {
  document.body.style.cursor = 'progress';
}

function CursorAuto() {
  document.body.style.cursor = 'auto';
}

$(document).ready(function() {
    setTimeout(layer_select_controls, 800)
    // is_wfs_display_none()

    $('#is_wfs').change(function(){
        var x = $(this).val()
        if ($(this).val() == 'yes'){
            console.log('yes')
            enable_get_layer_btn()
            layer_dropdown_enable()
            wfs_selector_enable()
            is_wfs = true
        }
        if ($(this).val() == 'no'){
            disable_get_layer_btn()
            layer_dropdown_disable()
            wfs_selector_disable()
            is_wfs = false
        }
    })

    $('#get_layers_btn').click(function() {
        CursorLoading()
        if ($("#field-image-url").val()) {
            getLayers()
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
    console.log(layer_dropdown.options[0].value.length)
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
    layer_dropdown_enable() //reveals layer options
    wfs_selector_enable()
    $('#layer_name_dropdown').append($('<option>', {
        value: 1,
        text: 'Loading...'
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
var cleanUrl = function(url) {
    url = String(url)
    url = decodeURIComponent(url);
    let token = null
    if (url.includes('&')) {
        let splitUrl = url.split('&')
        if (url.includes('authkey=')) {
            splitUrl.forEach((element) => {
                if (matchRuleShort(element, 'authkey=*')) {
                    token = element;
                }
            })
        }
        if (url.includes('id=')) {
            splitUrl.forEach((element) => {
                if (matchRuleShort(element, 'id=*')) {
                    token = element;
                }
            })
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
    let name = 'Name'
    let title = 'Title'
    if(data.append != undefined){
        name = data.append + name
        title = data.append + title
    }
    let features = data.features
    var myOptions = [];
    for (var i = 0; i < features.length; i++) {
        let entry = new Object()
        entry.text = features[i][title][0]
        entry.value = features[i][name][0]
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
 
var getFeatureTypes = function(json) {
    let x = findPaths(json,'FeatureType')
    let y = findPaths(json,'wfs:FeatureType')
    let data = new Object();
    let features = json
    if(x.length > 0){
        let path = x[0].split('/')
        for (let i = 0; i < path.length; i++) {
            features = features[path[i]]
        }
    }
    if(y.length > 0){
        let path = y[0].split('/')
        for (let i = 0; i < path.length; i++) {
            features = features[path[i]]
            data.append = 'wfs:'
        }
    }
    data.features = features;
    return data
}

var getData = function(data) {
    return fetch(data)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return Promise.resolve(response)
            } else {
              var error = new Error(response.statusText || response.status)
              error.response = response
              return Promise.reject(error)
            }
        })
        .catch((err) => {
            CursorAuto()
            alert("Unable to retrieve layers from WFS please continue");
            return Promise.reject("Unable to retrieve layers from WFS please continue");
        })
        .then((res) => {
            return res.text();
        })
        .then((xml) => {
            let f = document.getElementsByClassName("wfs_select")
            f[0].style.display = 'block'
            f[0].id = 'wfs_selector'
            parseString(xml,{trim: true}, function (err, result) {
            data = getFeatureTypes(result)
            })
        addToDropDown(data)
    }).finally(()=> {
        CursorAuto()
    });
}

let f = document.getElementsByClassName("wfs_select")
f[0].style.display = 'none'

function getLayers() {
    let proxy = 'https://cors-anywhere.herokuapp.com/'
    handle_loading()
    let url = $("#field-image-url").val().trim()
    url = cleanUrl(url)
    getData(proxy.concat(url))
    CursorAuto()
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