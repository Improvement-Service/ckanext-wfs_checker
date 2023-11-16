# pylint: disable=no-member, unused-argument
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
import json 
import logging
from owslib.wfs import WebFeatureService
from ckanext.wfs_checker.esri_rest import ESRI_REST

LOGGER = logging.getLogger(__name__)

SERVICE_FORCE_ONE_LAYER = False

@toolkit.side_effect_free
def get_wfs_layers(context, data_dict=None):
    """get all wfs layers in a wfs service

    Args:
        context ([type]): [description]
        data_dict (Dictionary, optional): contains url key value pair. Defaults to None.

    Returns:
        [dictionary]: list of dictionarys
    """
    if data_dict is not None:
        if 'url' in data_dict.keys():
            url = str(data_dict['url'])
            try:
                wfs = WebFeatureService(url=url, version='1.1.0')
            except Exception as error:
                LOGGER.error(error)
                return {'error': 'URL provided is not a valid wfs'}
        else:
            return {'error': "No url field provided. Please specify an url."}
    else:
        return []
    results = []
    wfs_results = list(wfs.contents)
    for layer in wfs_results:
        results.append({
            'name': layer
        })
    return results

@toolkit.side_effect_free
def get_esri_rest_layers(context, data_dict=None):
    """get all layer from esri rest service

    Args:
        context ([type]): [description]
        data_dict (Dictionary, optional): contains url key value pair. Defaults to None.

    Returns:
        [dictionary]: list of dictionarys
    """
    if data_dict is not None:
        url = str(data_dict['url'])
        try:
            esri_rest = ESRI_REST(url)
            resp = esri_rest.get_layers()
            return resp
        except ValueError as error:
            LOGGER.error(error)
            return {'error': str(error)}
        except RuntimeError as error:
            LOGGER.error(error)
            return {'error': 'Url is not a valid ESRI rest service'}
    else:
        return {'error': "No url field provided. Please specify an url."}

def get_esri_rest_helper(url, item_id):
    """get a specific esri rest layer by layer id, this is
    used in update page to get the name of the previously saved layer
    as only the layer_id is stored in metadata.
    Args:
        url (sting): url of esri rest service
        item_id (string or int): id of layer

    Returns:
        string: name of layer if request is valid
        string: returns orginal layer id
    """
    try:
        esri_rest = ESRI_REST(url)
        resp = esri_rest.get_layers()
        for layer in resp:
            if str(layer['id']) == str(item_id):
                return layer['name']
        return item_id
    except Exception as error:
        LOGGER.error(error)
        return item_id

class Wfs_CheckerPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.interfaces.IActions)
    plugins.implements(plugins.ITemplateHelpers)
    plugins.implements(plugins.IResourceController, inherit=True)

    def raise_validation_error(self, attr, error_string, error_summary):
        """
            uses ckan validationError function to raise errors on upload if
        """
        error = {attr: [error_string]}
        raise toolkit.ValidationError(error, error_summary=error_summary)

    def before_resource_create(self, context, resource):
        if 'service_type' not in resource.keys() and 'layer_name' in resource.keys():
            del resource['layer_name']
        if 'layer_name' in resource.keys() and resource['layer_name'] == 'null':
            resource['layer_name'] = ""

    def before_resource_update(self, context, current, resource):
        if 'service_type' not in resource.keys() and 'layer_name' in resource.keys():
            del resource['layer_name']
        if 'layer_name' in resource.keys() and resource['layer_name'] == 'null':
            resource['layer_name'] = ""

    @staticmethod
    def get_helpers():
        """ Return a dict mapping names to helper functions.
        """
        return {'get_esri_rest_helper': get_esri_rest_helper}

    #IConfigurer
    @staticmethod
    def update_config(config_):
        """
            Returns a string representing the location of the
            template to be rendered when the view is displayed
        """
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'wfs_checker')

    @staticmethod
    def get_actions():
        """ Should return a dict, the keys being the name of 
            the logic function and the values being the functions themselves.
        """
        return {'get_wfs_layers': get_wfs_layers,
                'get_esri_rest_layers': get_esri_rest_layers}
