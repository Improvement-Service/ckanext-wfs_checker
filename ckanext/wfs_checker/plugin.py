import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
import json 
import logging
from owslib.wfs import WebFeatureService
from .esri_rest import ESRI_REST

log = logging.getLogger(__name__)

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
            log.error(e)
            return {'error': 'Url is not a valid ESRI rest service' }
    else:
        return {'error':"No url field provided. Please specify an url."}

def get_esri_rest_helper(url, item_id):
    try:
        esri_rest = ESRI_REST(url)
        routes = esri_rest.routes
        params = esri_rest.params
        resp = esri_rest.get_layers()
        for x in resp:
            if str(x['id']) == str(item_id):
                return x['name']
        return item_id
    except Exception as e:
        log.error(e)
        return item_id

class Wfs_CheckerPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.interfaces.IActions)
    plugins.implements(plugins.ITemplateHelpers)

    def get_helpers(self):
        return {'get_esri_rest_helper': get_esri_rest_helper}
    
    #IConfigurer
    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'wfs_checker')

    def get_actions(self):
        # Registers the custom API method defined above
        return {'get_wfs_layers': get_wfs_layers,
                'get_esri_rest_layers': get_esri_rest_layers}
