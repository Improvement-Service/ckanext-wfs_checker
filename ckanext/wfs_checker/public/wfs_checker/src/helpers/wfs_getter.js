export class WFS_getter {
    constructor(url){
        this.url = url
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

    get_layers(){
        var url = `${this.tms_api_url}${this.create_token_endpoint}${this.tms_api_key}`
        var result = fetch(url)
        .then(this.handleResponse)
        .then((resp) =>{
            if (resp.status_code = 200){
                this.tms_token = resp.token
                this.getGeneralNotices()
                this.getLicensingNotices()
                this.getPlanningNotices()
                this.getTrafficNotices()
            } else {
                console.error('Failed to get TMS token')
            }
        })
        .catch(error => {
            console.warn(error);
        });
        return result
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
}