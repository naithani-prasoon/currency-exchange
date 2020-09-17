import bottle
import currency
import usd

@bottle.route("/")
def index():
  return bottle.static_file("index.html", root="")

@bottle.route("/charts.js")
def charts():
  return bottle.static_file("charts.js", root="")

@bottle.route("/currency/<base>/<compare>/<start_at>/<end_at>")
def get_currency_data(base, compare, start_at, end_at):
  return currency.process_currency_data("https://api.exchangeratesapi.io/history?start_at="+start_at+"&end_at="+end_at+"&symbols="+compare+"&base="+base, compare)

@bottle.route("/usd")
def get_usd_data():
  return usd.process_usd_data("https://api.exchangeratesapi.io/latest?base=USD")

bottle.run(host="0.0.0.0", port=8080, debug=True) 


