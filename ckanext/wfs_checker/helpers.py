def get_json_safely(response):
    """
    The get_json_safely function takes a response object as an argument and returns the JSON
    of that response if the status code is 200. If it's not, it raises an exception with the error
    message from the API.

    Args:
        response: Get the json from the api

    Returns:
        The json of the response if the status code is 200
    """
    # bad status code
    if response.status_code != 200:
        response.raise_for_status()

    json = response.json()  # get the JSON
    if "error" in json:
        raise Exception(f"Error: {json['error']}")
    return json
