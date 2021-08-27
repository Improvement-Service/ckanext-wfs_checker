import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
import json 
from owslib.wfs import WebFeatureService
from .esri_rest import ESRI_REST

@toolkit.side_effect_free
def get_wfs_layers(context, data_dict=None):
    data = json.loads(data_dict['json'])
    if 'url' in data.keys():
        url = str(data['url'])
        try:
            wfs = WebFeatureService(url=url,  version='1.1.0')
        except Exception as e:
            return {'error':'URL provided is not a valid wfs'}
    else:
        return {'error':"No url field provided. Please specify an url."}

    results = []
    wfs_results = list(wfs.contents)
    for layer in wfs_results:
        results.append({
            'name': layer
        })
    
    return results

@toolkit.side_effect_free
def get_esri_rest_layers(context, data_dict=None):
    data = json.loads(data_dict['json'])
    if 'url' in data.keys():
        url = str(data['url'])
        try:
            esri_rest = ESRI_REST(url)
            resp = esri_rest.get_layers()
            return resp
        except Exception as e:
            print(e)
            return {'error': str(e) }
    else:
        return {'error':"No url field provided. Please specify an url."}




class Wfs_CheckerPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.interfaces.IActions)
    
    #IConfigurer
    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'wfs_checker')

    def get_actions(self):
        # Registers the custom API method defined above
        return {'get_wfs_layers': get_wfs_layers,
                'get_esri_rest_layers': get_esri_rest_layers}
