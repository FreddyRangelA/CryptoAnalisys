#live price update.

import requests
import matplotlib.pyplot as plt


def livePrice():
    #usin API from coinapi to get real time price.
    url = 'https://rest.coinapi.io/v1/quotes/latest'
    headers = {'X-CoinAPI-Key' : '64446BC7-8FF8-4090-89CD-5158CCF7D7B6'}
    #generatin the json object
    response = requests.get(url, headers=headers).json()

    #metho to obtain specific dictionary for each coin is on the jupyter file.
    #retriving dictionary for doge.
    price_doge=response[56]
    #retriving dictionary for BTC.
    price_btc=response[30]
    #generating dictionary for both.
    a_dic={'doge':price_doge,'btc':price_btc}

    return a_dic

if __name__ == "__main__":
    print(livePrice() )