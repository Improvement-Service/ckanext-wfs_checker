var ui_funcs = require('./helpers/ui_funcs.js')
var listeners = require('./helpers/listeners.js')

class Webservice_Checker {
    constructor(){
        this.url = ''
        this.is_file = true
        this.service_type = null
        this.submit_type = null
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

    set_submit_type(submit_type){
        this.submit_type = submit_type
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

    // all functions that need ran at start should be placed in this function.
    set_up() {
        listeners.set_up_all_listeners()
    }

    set_data_from_form_values(){
        this.service_type = $('#service_type').val()
        if (this.service_type == 'null'){
            this.is_file = true
        } else {
            this.is_file = false
        }
    }
    
    checkValues() {
        let upload = document.getElementById("field-resource-upload")
        let url = document.getElementById('field-resource-url')
        let layer_name = document.getElementById("layer_name_dropdown")
        let service_type = document.getElementById("service_type")
        // let resource_name = document.getElementById("field-name")
        // let uploader_name = document.getElementById("resource-uploader_name")
        // let department_name = document.getElementById("resource-department_name")
        // let digit_background = document.getElementById("digit_background")
        // let data_processor = document.getElementById("resource-data_processor")
        // let field_description = document.getElementById("field-description")
        if (this.is_file){
            url = upload
        }
        let form = [url, layer_name, service_type]
        let errors = []
        for (let i = 0; i < form.length; i++) {
            let element = form[i];
            if (element.value == 'null' || element.value.length < 1) {
                if (element.name == 'service_type' && this.is_file == true) {
                } else {
                    errors.push(element.name)
                }
            }
        }
        if (errors.length > 0){
            if (errors.join() == "layer_name"){
                this.formSubmit()
            } else {

                if( this.service_type == 'wfs' || this.service_type == 'rest'){
                    ui_funcs.createErrorNotification(errors)
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                } else {
                    errors = errors.filter(e => e !== 'layer_name');
                    ui_funcs.createErrorNotification(errors)
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
            }
        }
        else {
            this.formSubmit()
        }
    }

    formSubmit() {
        if(this.submit_type == 'add'){
            $("#submitAddBtn").click()
        } else{
            if(document.getElementById('saveBtn')){
                $("#saveBtn").click()
            } else {
                $("#submitBtn").click()
            }
        }
    }
}


const webserviceChecker = new Webservice_Checker()
export default webserviceChecker

$(document).ready(function() {
    setTimeout(webserviceChecker.set_up, 50)
})

