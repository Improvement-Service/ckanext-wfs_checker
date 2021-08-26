var main = require('../main.js')
var ui_funcs = require('./ui_funcs.js')

export class WFS_getter {
    constructor(url){
        this.url = url
        this.webserviceChecker = main.default
    }
    
    getCurrentURLPath() {
        let current = window.location.href
        let base = current.split('/').splice(0,3).join('/')
        return base
    }

    handleResponse(response) {
        return response.json()
            .then((json) => {
                if (!response.ok) {
                    const error = Object.assign({}, json, {
                        status: response.status,
                        statusText: response.statusText,
                    });
                    return Promise.reject(error);
                }
                return json;
            });
    }

    create_options(data){
        var options = [];
        for (var i = 0; i < data.length; i++) {
            let entry = new Object()
            entry.text = data[i]['name']
            entry.value = data[i]['url']
            options.push(entry)
        }
        return options 
    }

    get_layers(){
        ui_funcs.handle_loading()
        let url = $("#field-image-url").val().trim()
        let fetch_url = `${this.getCurrentURLPath()}/api/3/action/get_esri_rest_layers`
        var payload = {
            url: url
        };
        var data = new FormData();
        data.append( "json", JSON.stringify( payload ) );
        fetch(fetch_url,{
            method: "POST",
            body: data
        })
        .then(this.handleResponse)
        .then((resp) =>{
            if (resp.status_code = 200){
                if (resp.result.error){
                    console.error(resp.result.error)
                    ui_funcs.handle_request_fail()
                    throw resp.result.error
                } else{
                    var options = this.create_options(resp.result)
                    ui_funcs.add_to_drop_down(options)
                }
            } else {
                alert("Unable to retrieve layers from esri rest service please use a valid url");
                console.error('Request Failed')
                ui_funcs.handle_request_fail()
            }
        })
        .catch(error => {
            console.warn(error);
            ui_funcs.handle_request_fail()
        }).finally(()=> {
            ui_funcs.CursorAuto()
        });
    }


}