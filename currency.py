import urllib.request
import json

def process_currency_data(u, c):
  url_open = urllib.request.urlopen(u)
  decode_data = url_open.read().decode()
  loading_data = json.loads(decode_data)

  dates = loading_data["rates"]
  cList = []

  for i in loading_data['rates'] :
    cList.append(loading_data['rates'][i][c])

  

  retVal = [dates,cList]
  return json.dumps(retVal)