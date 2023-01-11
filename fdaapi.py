import urllib.request, json
from operator import itemgetter

def getMedicationData(product_ndc):
    try:
        url = "https://api.fda.gov/drug/ndc.json?search=product_ndc:{}".format(product_ndc)
        response = urllib.request.urlopen(url)
        data = response.read()
        dict = json.loads(data)
        active_ingredients, brand_name, generic_name, packaging, route = itemgetter('active_ingredients', 'brand_name', 'generic_name', 'packaging', 'route')(dict['results'][0])
        data = {"active_ingredients": active_ingredients, "brand_name": brand_name, "generic_name":generic_name, "packaging":packaging, "route":route}
        return data
    except:
        return 'Unable to find medication with product_ndc {}'.format(product_ndc)