import urllib.request
import json

def process_usd_data(u):
  url_open = urllib.request.urlopen(u)
  decode_data = url_open.read().decode()
  loading_data = json.loads(decode_data)
  
  rates = loading_data["rates"]
  
  return json.dumps(rates)