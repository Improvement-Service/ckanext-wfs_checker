var main = require('../main.js')
var ui_funcs = require('./ui_funcs.js')

export class WFS_getter {
    constructor(url){
        this.url = url
        this.webserviceChecker = main.default
    }
    
    cleanUrl(url) {
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
            entry.value = data[i]['name']
            options.push(entry)
        }
        return options
    }

    get_layers(){
        ui_funcs.handle_loading()
        let url = $("#field-image-url").val().trim()
        let fetch_url = `${this.getCurrentURLPath()}/api/3/action/get_wfs_layers`
        var payload = {
            url: this.cleanUrl(url)
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
                alert("Unable to retrieve layers from WFS please continue");
                console.error('Request Failed')
                ui_funcs.handle_request_fail()
            }
        })
        .catch(error => {
            ui_funcs.error_note('layer_name_dropdown_group', error)
            console.warn(error);
            ui_funcs.handle_request_fail()
        }).finally(()=> {
            ui_funcs.CursorAuto()
        });
    }

    matchRuleShort(str, rule) {
        var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
    }
    
    match_on(str, key) {
        var re = RegExp(`(${key}=([a-z-A-Z-0-9_"£$%*^~])+)`)
        return re.exec(str);
    }
    
    test_on(str, key) {
        var re = RegExp(`(${key}=([a-z-A-Z-0-9_"£$%*^~])+)`)
        return re.test(str);
    }

    cleanUrl(url) {
        url = decodeURIComponent(String(url));
        var token = null
        var tokens = ['authkey', 'id', 'key', 'token','authentication']
        for (var i in tokens) {
            if (this.test_on(url, tokens[i]) && token == null){
                token = this.match_on(url, tokens[i])[0]
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
}