var apiKey = "64446BC7-8FF8-4090-89CD-5158CCF7D7B6"
var url = `https://rest.coinapi.io/v1/quotes/latest`;


var btcPrice = [];

//*********************************************** */
// table
function getPrice() {

   fetch(url, {
        headers: new Headers({
            "X-CoinAPI-Key": apiKey
        }),
    })
    .then(function (data) {
        if (!data.ok) throw new Error(data.status);
        return data.json();
    })
    .then(function (x) {

        //console.log(x)
        var resoltsBTC=x.filter(coin=>coin.symbol_id.includes("BTC_USD"));
        var resoltsDOGE=x.filter(coin=>coin.symbol_id.includes("DOGE_USDT"));
        var resoltsETH=x.filter(coin=>coin.symbol_id.includes("ETH_USD"));
        var resoltsXRP=x.filter(coin=>coin.symbol_id.includes("XRP_USDT"));
        
        btcPrice.push(resoltsBTC[0]);
        btcPrice.push(resoltsDOGE[0]);
        btcPrice.push(resoltsETH[0]);
        btcPrice.push(resoltsXRP[0]);
        return btcPrice;
    })
    .then(() => {
        
        let resultGraphx=btcPrice.map(d =>d.symbol_id);
        let resultGraphy=btcPrice.map(d =>d.ask_price);
        
        console.log(resultGraphx);
        console.log(resultGraphy);
        createGraph(resultGraphx,resultGraphy)
        //createGraph(resultGraphy)

    });
};
getPrice();

//********************************** */
//creat graph
function createGraph(resultGraphx,resultGraphy){
    var trace1 = {
        x: resultGraphx,
        y: resultGraphy,
        type: "bar",
        text:resultGraphy,
        /*marker: {
          size: resultGraphx
    
        }*/
    
    };
    
    var data = [trace1];
    
    var layout = {
        title: 'crypto Size',
        showlegend: false,
        height: 800,
        width: 1000
    };

    Plotly.newPlot('bubble', data, layout);
      

};

//********************************** */
//transfer the data into the table

var tableData = btcPrice;
var tbody = d3.select("tbody")

var button = d3.select("#coin");

//var inputUFODateAll=d3.select("#datetime");

button.on("click", handleClickAll);

function handleClickAll() {
    tbody.html("");
    console.log("a button was click")
    tableData.forEach(d => {
        var row = tbody.append("tr");
        Object.values(d).forEach(td => { row.append("td").text(td) });

    });
    //console.log(tableData);
};
