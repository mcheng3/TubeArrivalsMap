import requests, json

key_file = open("../keys.txt", "r")
app_id = key_file.readline()
app_key = key_file.readline()
print app_id
def get_stations():
    l = requests.get('https://api.tfl.gov.uk/line/mode/tube', data={"app_id":app_id, "app_key":app_key})
    print l
    lines_data = l.json()
    lines = []
    for line in lines_data:
        lines.append(line['id'])
    stops = {}
    for line in lines:
        stopData = {}
        print 'https://api.tfl.gov.uk/line/'+line+'/route/sequence/inbound'
        r= requests.get('https://api.tfl.gov.uk/line/'+line+'/route/sequence/inbound', data={"app_id":app_id, "app_key":app_key})
        sequences = r.json()
        stopData['name'] = sequences['lineName']
        stopData['lines'] = sequences['lineStrings']
        stopData['stops'] = sequences['stations']
        stops[line] = stopData
    #print stops
    stops_file = open("stops.json", "w")
    #print json.dumps(stops)
    stops_file.write(json.dumps(stops))


get_stations()
