import sys, json
import requests
import urllib.request

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    lines = read_in()

    try:
        url = lines
        print('input is', lines)
        print('\n')

        headers = {}
        headers['User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"
        req = urllib.request.Request(url, headers = headers)
        resp = urllib.request.urlopen(req)
        respData = resp.read()
        
        saveFile = open('withHeaders.txt','w')
        saveFile.write(str(respData))
        saveFile.close()

    except Exception as e:
        print(str(e))

    #saving html
    # file = open("withHeaders.txt","r")

    #parsing
    searchfile = open("withHeaders.txt", "r")
    for line in searchfile:
        if "Content + Care" in line: 
            s=line
    searchfile.close()

    index = s.find("Content + Care")

    substring = s[(index+17):(index+1000)]

    final = substring[0:(substring.find("-")-1)]

    listed = final.split()
    i=0
    previous = 0

    clothing_h2O = { "cotton": 273, "wool": 197, "silk": 5117, "flax": 182, "linen": 182, "viscose": 337, "polyester": 7, "acrylic": 11, "rayon": 2640, "spandex": 7 }
    clothing_weights = { "top": 0.33, "pants": 0.875, "jacket": 2.5, "dress": 1 }
    water1=0
    #formula based on research
    while i<len(listed):
        if i%2==0:
            string = listed[i][:-1]
            previous = int(string)/100
        
        else:
            for element in clothing_h2O:
                if i==(len(listed)-1):
                    string = listed[i]
                else:
                    string = listed[i][:-1]
               
                if str(element)==string:
                    water1 += (previous * clothing_h2O[element])   

        i+=1
    print(water1)

    
# Start process
if __name__ == '__main__':
    main()