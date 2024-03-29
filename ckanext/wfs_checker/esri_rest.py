from ckanext.wfs_checker.helpers import get_json_safely
import requests
import json

class ESRI_REST():
    def __init__(self, url):
        if 'rest/services' not in url:
            raise ValueError('URL provided is not a valid ESRI Rest Service.')
        self.url = url
        try: 
            self.base_url = self._get_base_url()
            self.params = self._get_params(url)
            self.routes = self._get_route(url)
        except Exception as e:
            raise ValueError(
                    'ESRI Rest Service URL Must be a Service, Group Layer or Feature Layer')

    def _get_base_url(self):
        return f"{self.url.split('rest/services')[0]}rest/services"

    def _get_params(self, url):
        if '?' in url and url.split('?')[1].strip != "":
            params = url.split('?')[1].split("&")
            return [{'key':p.split('=')[0], 'value':p.split('=')[1]} for p in params]
        return []

    def _get_route(self, url):
        item = url.split(self._get_base_url())
        if '?' in item[1]:
            item = item[1].split('?')[0]
        else:
            item = item[1]
        routes = list(filter(None, item.split('/')))
        return self.filter_out_operations_from_route(routes)

    @staticmethod
    def filter_out_operations_from_route(routes):
        """filter out esri operations from url

        Args:
            routes ([sting]): list of strings

        Returns:
            ([sting]): list of strings
        """
        possible_operations = ['layers', 'legends', 'query', 'dynamic_layer',
         'uploads', 'export', 'identity', 'find']
        if routes[-1] in possible_operations:
            routes.remove(routes[-1])
        return routes

    @staticmethod
    def _get_data(url):
        data = requests.get(url)
        data_json = json.loads(data.text)
        if 'error' in data_json.keys():
            return {'error':data_json['error'], 'status':'fail'}
        return data_json

    def add_json_format_to_params(self):
        """
        removes any existing format parameter and add in json format
        """
        res = list(filter(lambda i: i['key'] != 'f', self.params))
        res.append({'key':'f', 'value':'json'})
        self.params = res

    @staticmethod
    def create_params_string(params):
        """creates a formatted params string form list of strings

        Args:
            params ([string]): [list of strings]

        Returns:
            Stings: formatted string
        """
        string = ""
        for i in range(0, len(params)):
            if i == 0:
                string = string + f"{params[i]['key']}={params[i]['value']}"
            else:
                string = string + f"&{params[i]['key']}={params[i]['value']}"
        return string

    def create_url(self, route, params):
        """creates a esri rest url

        Args:
            route ([sting]): list of strings
            params ([string]): list of strings

        Returns:
            string: url string
        """
        routes = '/'.join(route)
        parametes = self.create_params_string(params)
        return f"{self.base_url}/{routes}?{parametes}"

    def create_layer_url(self, route, params):
        """create esri rest url for layer list
        Args:
            route ([sting]): list of strings
            params ([string]): list of strings
        Returns:
            string: url string
        """
        routes = '/'.join(route)
        parametes = self.create_params_string(params)
        return f"{self.base_url}/{routes}/layers?{parametes}"
  
    # @staticmethod
    def get_esri_route_type(self, url, data_dict):
        """get type from esri rest url

        Args:
            data_dict (Dictionary): Esri rest data

        Returns:
            String: type of rest url e.g. Feature Layer, Group Layer, Folder
        """
        accepted_service_types = ['mapserver', 'featureserver']
        routes = self._get_route(url)
        if 'error' in data_dict.keys():
            return 'Error'
        if routes[-1].isnumeric():
            route_type = data_dict.get('type', None)
            if route_type == 'Feature Layer':
                return 'Feature Layer'
            if route_type == 'Group Layer':
                return 'Group Layer'
        if 'serviceDescription' in data_dict.keys() or routes[-1] in accepted_service_types:
            for route in routes:
                if route.lower() in accepted_service_types:
                    return 'Service'
            raise ValueError(
            'Only ESRI FeatureServer and MapServer can be used')
        if 'services' in data_dict.keys():
            return 'Folder'
        return 'Unknown'

    def get_layers_from_services(self, params, data_dict):
        """get all layers for a esri rest services

        Args:
            params ([string]): list of strings
            data_dict (Dictionary): esri rest data

        Returns:
            [Dictionary]: list of dictionarys
        """
        layers = []
        for service in data_dict['services']:
            service_routes = [service['name'], service['type']]
            s_layers = self.get_layers_from_service(service_routes, params)
            layers = layers + s_layers
        return layers
   
    def get_layers_from_folder(self, params, data_dict):
        """get all layers for a esri rest folder

        Args:
            params ([string]): list of strings
            data_dict (Dictionary): esri rest data

        Returns:
            [Dictionary]: list of dictionarys
        """
        layers = []
        if data_dict['services']:
            s_layers = self.get_layers_from_services(params, data_dict)
            layers = layers + s_layers
        if data_dict['folders']:
            for folder_name in data_dict['folders']:
                url = self.create_url([folder_name], params)
                f_data_dict = self._get_data(url)
                if 'error' in f_data_dict.keys():
                    pass
                else:
                    s_layers = self.get_layers_from_folder(params, f_data_dict)
                    layers = layers + s_layers
        return layers

    def get_layers_from_service(self, routes, params):
        """get all layers for a esri rest service

        Args:
            routes ([string]): list of strings
            params ([string]): list of strings

        Returns:
            [Dictionary]: list of dictionarys
        """
        url = self.create_layer_url(routes, params)
        data = requests.get(url)
        data_dict = json.loads(data.text)
        layers = data_dict.get('layers', [])
        result = []
        for layer in layers:
            url = self.create_url([*routes, str(layer['id'])], [])
            if layer.get('type') == 'Feature Layer':
                obj = {
                    'name' : layer['name'],
                    'id': layer['id'],
                    'url':url
                    }
                result.append(obj)
            elif layer.get('type') is None:
                layer = self.get_feature_layer([*routes, str(layer['id'])], self.params)
                if layer.get('type') == 'Feature Layer':
                    obj = {
                        'name' : layer['name'],
                        'id': layer['id'],
                        'url':url
                    }
                    result.append(obj)
        return result

    def get_layers_from_group_layer(self, routes, params, data_dict):
        """get all layers from esri group layer.

        Args:
            routes ([string]): list of strings
            params ([string]): list of strings
            data_dict (Dictionary): esri rest data

        Returns:
            [Dictionary]: list of dictionarys
        """
        result = []
        service_url = self.create_layer_url(routes[:-1], params)
        data = self._get_data(service_url)
        sub_layer_ids = [x['id'] for x in data_dict['subLayers']]
        for layer in data['layers']:
            if layer['id'] in sub_layer_ids and layer['type'] == 'Feature Layer':
                url = self.create_url([*routes[:-1], str(layer['id'])], [])
                obj = {
                    'name' : layer['name'],
                    'id': layer['id'],
                    'url':url
                }
                result.append(obj)
        return result

    def get_layer_from_feature_layer(self, routes, data_dict):
        """gets layer data from esri rest data

        Args:
            routes ([string]): list of strings
            data_dict (Dictionary): esri rest data

        Returns:
            [Dictionary]: list of dictionarys
        """
        url = self.create_url(routes, [])
        layer = {'name' : data_dict['name'], 'id': data_dict['id'], 'url':url}
        return [layer]

    def get_feature_layer(self, routes, params):
        url = self.create_url(routes, params)
        data = requests.get(url)
        data_dict = json.loads(data.text)
        return data_dict


    def get_layers(self, routes=None, params=None):
        """get esri rest layers

        Args:
            routes ([string], optional): [description]. Defaults to None.
            params ([string], optional): [description]. Defaults to None.

        Raises:
            ValueError: if type of feature layer is 'Folder' or 'unknown'

        Returns:
            [Dictionary]: list of dictionarys
        """
        try: 
            self.add_json_format_to_params()
            routes = self.routes if routes is None else routes
            params = self.params if params is None else params
            url = self.create_url(routes, params)
            data = requests.get(url)
            data_dict = get_json_safely(data)
            route_type = self.get_esri_route_type(url, data_dict)
            layers = None
            if route_type == 'Service':
                layers = self.get_layers_from_service(routes, params)
            elif route_type == 'Feature Layer':
                layers = self.get_layer_from_feature_layer(routes, data_dict)
            elif route_type == 'Group Layer':
                layers = self.get_layers_from_group_layer(routes, params, data_dict)
            elif route_type == 'Folder':
                raise ValueError(
                    'ESRI Rest Service URL Must be a Service, Group Layer or Feature Layer')
            else:
                raise ValueError(
                    'ESRI Rest Service URL Must be a Service, Group Layer or Feature Layer')
            return layers
        except Exception as e:
            raise ValueError(
                    'ESRI Rest Service URL Must be a Service, Group Layer or Feature Layer')


