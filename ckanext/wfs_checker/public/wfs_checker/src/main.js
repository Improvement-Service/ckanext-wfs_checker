var ui_funcs = require('./helpers/ui_funcs.js')
var listeners = require('./helpers/listeners.js')

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

    // all functions that need ran at start should be placed in this function.
    set_up() {
        listeners.set_up_all_listeners()
    }
    
    checkValues() {
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
        if(document.getElementById('saveBtn')){
            $("#saveBtn").click()
        } else {
            $("#submitBtn").click()
        }
    }
}


const webserviceChecker = new Webservice_Checker()
export default webserviceChecker

$(document).ready(function() {
    // timeout needed ad if it runs to quickly the elements wont be created yet so listners wont be set up correctly
    setTimeout(webserviceChecker.set_up, 600)
})

