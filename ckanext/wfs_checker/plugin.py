import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from owslib.wfs import WebFeatureService

@toolkit.side_effect_free
def get_wfs_layers(context, data_dict=None):
    if 'url' in data_dict.keys():
        url = str(data_dict['url'])
        url = url.replace('@', '&')
        wfs = WebFeatureService(url=url,  version='1.1.0')
    else:
        return "Error: No url field provided. Please specify an url."

    results = []
    wfs_results = list(wfs.contents)
    for layer in wfs_results:
        results.append({
            'name': layer
        })
    
    return results

class Wfs_CheckerPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.interfaces.IActions)
    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'wfs_checker')

    def get_actions(self):
        # Registers the custom API method defined above
        return {'get_wfs_layers': get_wfs_layers}
