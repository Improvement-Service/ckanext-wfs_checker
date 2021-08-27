import requests
import json

class ESRI_REST():
    def __init__(self, url):
        if 'rest/services' not in url:
            raise ValueError('URL provided is not a valid ESRI Rest Service.')
        self.url = url
        self.base_url = self._get_base_url()
        self.params = self._get_params()
        self.routes = self._get_route()
        
    def _get_base_url(self):
        return f"{self.url.split('rest/services')[0]}rest/services"
        
    def _get_params(self):
        if '?' in self.url and self.url.split('?')[1].strip != "":
            params = self.url.split('?')[1].split("&")
            return [{'key':p.split('=')[0],'value':p.split('=')[1]} for p in params]
        else:
            return []
    
    def _get_route(self):
        x = self.url.split(self._get_base_url())
        if '?' in x[1]:
            x = x[1].split('?')[0]
        else: 
            x = x[1]
        return list(filter(None, x.split('/')))

    def _get_data(self, url):
        x = requests.get(url)
        y = json.loads(x.text)
        if 'error' in y.keys():
            return {'error':y['error'], 'status':'fail'}
        else:
            return y
    
    def add_json_format_to_params(self):
        res = list(filter(lambda i: i['key'] != 'f', self.params))
        res.append({'key':'f','value':'json'})
        self.params = res
    
    def create_params_string(self, params):
        s = ""
        for i in range(0,len(params)):
            if i == 0:
                s = s + f"{params[i]['key']}={params[i]['value']}"
            else:
                s = s + f"&{params[i]['key']}={params[i]['value']}"
        return s
    
    def is_feature_layer(self, url):
        x = requests.get(url)
        y = json.loads(x.text)
        return y.get('type', 'unknown')
    
    def create_url(self, route, params):
        r = '/'.join(route)
        p = self.create_params_string(params)
        return f"{self.base_url}/{r}?{p}"
    
    def create_layer_url(self, route, params):
        r = '/'.join(route)
        p = self.create_params_string(params)
        return f"{self.base_url}/{r}/layers?{p}"
    
    def get_esri_route_type(self, data_dict):
        route_type = data_dict.get('type', None) 
        if 'error' in data_dict.keys():
            return 'Error'
        elif route_type == 'Feature Layer':
            return 'Feature Layer'
        elif route_type == 'Group Layer':
            return 'Group Layer'
        elif 'serviceDescription' in data_dict.keys():
            return 'Service'
        elif 'services' in data_dict.keys():
            return 'Folder'
        else:
            return 'Unknown'
    
    def get_layers_from_services(self, routes, params, data_dict):
        layers = []
        for service in data_dict['services']:
            service_routes = [service['name'], service['type']]
            s_layers = self.get_layers_from_service(service_routes, params)
            layers = layers + s_layers
        return layers
    
    def get_layers_from_folder(self, routes, params, data_dict):
        layers = []
        if data_dict['services']:
            s_layers = self.get_layers_from_services(routes, params, data_dict)
            layers = layers + s_layers
        if data_dict['folders']:
            for folder_name in data_dict['folders']:
                url = self.create_url([folder_name], params)
                f_data_dict = self._get_data(url)
                if 'error' in f_data_dict.keys():
                    pass
                else:
                    s_layers = self.get_layers_from_folder([folder_name], params, f_data_dict)
                    layers = layers + s_layers
        return layers
        
    def get_layers_from_service(self, routes, params):
        url = self.create_layer_url(routes, params)
        r = requests.get(url)
        data_dict = json.loads(r.text)
        layers = data_dict.get('layers', [])
        result = []
        for layer in layers:
            if layer['type'] == 'Feature Layer':
                url = self.create_url([*routes,str(layer['id'])], [])
                obj = {
                    'name' : layer['name'],
                    'id': layer['id'],
                    'url':url
                    }
                result.append(obj)
        return result

    def get_layers_from_group_layer(self, routes, params, data_dict):
        print('here')
        result = []
        service_url = self.create_layer_url(routes[:-1], params)
        data = self._get_data(service_url)
        # print(data['layers']) 

        sub_layer_ids = [ x['id'] for x in data_dict['subLayers']]
        print('$$$$$$$$$$$$$$$$$$$$$$$')
        print(sub_layer_ids)
        for layer in data['layers']:
            print(layer)
            if layer['id'] in sub_layer_ids and layer['type'] == 'Feature Layer':

                url = self.create_url([*routes[:-1],str(layer['id'])], [])
                obj = {
                    'name' : layer['name'],
                    'id': layer['id'],
                    'url':url
                }
                result.append(obj)
        return result



        # result = []
        # for layer in data_dict['subLayers']:
        #     url = self.create_url([*routes[:-1],str(layer['id'])], [])
        #     obj = {
        #             'name' : layer['name'],
        #             'id': layer['id'],
        #             'url':url
        #             }
        #     result.append(obj)
        # return result
    
    def get_layer_from_feature_layer(self, routes, params, data_dict):
        url = self.create_url(routes, [])
        layer = {
                'name' : data_dict['name'],
                'id': data_dict['id'],
                'url':url
                }
        return [layer]
        
    def get_layers(self, routes=None, params=None):
        self.add_json_format_to_params()
        routes = self.routes if routes is None else routes
        params = self.params if params is None else params
        url = self.create_url(routes, params)
        x = requests.get(url)
        data_dict = json.loads(x.text)
        route_type = self.get_esri_route_type(data_dict)
        layers = None
        if route_type == 'Service':
            layers = self.get_layers_from_service(routes, params)
        elif route_type == 'Feature Layer':
            layers = self.get_layer_from_feature_layer(routes, params, data_dict)
        elif route_type == 'Group Layer':
            layers = self.get_layers_from_group_layer(routes, params, data_dict)
        elif route_type == 'Folder':
            raise ValueError('ESRI Rest Service URL Must be a Service, Group Layer or Feature Layer')
        else:
            raise ValueError('ESRI Rest Service URL Must be a Service, Group Layer or Feature Layer')
        return layers
        
        