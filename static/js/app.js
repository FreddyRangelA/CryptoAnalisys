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

        console.log(x)
        var resoltsBTC=x.filter(coin=>coin.symbol_id.includes("BTC_USD"));
        var resoltsDOGE=x.filter(coin=>coin.symbol_id.includes("DOGE_USDT"));
        var resoltsETH=x.filter(coin=>coin.symbol_id.includes("ETH_USD"));
        var resoltsXRP=x.filter(coin=>coin.symbol_id.includes("XRP_USDT"));

       if (resoltsBTC.length >0){
        btcPrice.push(resoltsBTC[0]);
       } 
       if (resoltsDOGE.length >0){
        btcPrice.push(resoltsDOGE[0]);
       }  
       if (resoltsETH.length >0){
        btcPrice.push(resoltsETH[0]);
       } 
       if (resoltsXRP.length >0){
        btcPrice.push(resoltsXRP[0]);
       } 

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
        marker: {
          //size: resultGraphx,
          color: ["orange","doge","blue","black"]
    
        }
    
    };
    
    var data = [trace1];
    
    var layout = {
        title: 'crypto Prices real time',
        showlegend: false,
        height: 800,
        width: 1000,
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

function makeplot() {
    d3.csv("static/historyCoin/BTC_USD_2021-02-27_2021-05-26-CoinDesk.csv").then(d=>processData(d));

  function processData(allRows) {
  
    console.log(allRows);
    var x = [], y = [], standard_deviation = [];
  
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      x.push( row['Date'] );
      y.push( Number(row['Closing Price (USD)']) );
    }
    console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
    makePlotly( x, y, standard_deviation );
  }
  
  function makePlotly( x, y, standard_deviation ){
    var plotDiv = document.getElementById("plot");
    var traces = [{
      x: x,
      y: y
    }];
  
    Plotly.newPlot('myDivBTC', traces,
      {title: 'BTC graph'});
  };

};

makeplot();

function makeplotETH() {
    d3.csv("static/historyCoin/ETH_USD_2021-02-27_2021-05-26-CoinDesk.csv").then(d=>processData(d));

  function processData(allRows) {
  
    console.log(allRows);
    var x = [], y = [], standard_deviation = [];
  
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      x.push( row['Date'] );
      y.push( Number(row['Closing Price (USD)']) );
    }
    console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
    makePlotly( x, y, standard_deviation );
  }
  
  function makePlotly( x, y, standard_deviation ){
    var plotDiv = document.getElementById("plot");
    var traces = [{
      x: x,
      y: y
    }];
  
    Plotly.newPlot('myDivETH', traces,
      {title: 'ETH graph'});
  };

};

makeplotETH();

function makeplotXPR() {
    d3.csv("static/historyCoin/XRP_USD_2021-05-27-CoinDesk.csv").then(d=>processData(d));

  function processData(allRows) {
  
    console.log(allRows);
    var x = [], y = [], standard_deviation = [];
  
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      x.push( row['Date'] );
      y.push( Number(row['Closing Price (USD)']) );
    }
    console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
    makePlotly( x, y, standard_deviation );
  }
  
  function makePlotly( x, y, standard_deviation ){
    var plotDiv = document.getElementById("plot");
    var traces = [{
      x: x,
      y: y
    }];
  
    Plotly.newPlot('myDivXPR', traces,
      {title: 'XPR graph'});
  };

};

makeplotXPR();

function makeplotDoge() {
    d3.csv("static/historyCoin/DOGE-USD (1).csv").then(d=>processData(d));

  function processData(allRows) {
  
    console.log(allRows);
    var x = [], y = [], standard_deviation = [];
  
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      x.push( row['Date'] );
      y.push( Number(row['Close']) );
    }
    console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
    makePlotly( x, y, standard_deviation );
  }
  
  function makePlotly( x, y, standard_deviation ){
    var plotDiv = document.getElementById("plot");
    var traces = [{
      x: x,
      y: y
    }];
  
    Plotly.newPlot('myDivDOGE', traces,
      {title: 'BTC graph'});
  };

};

makeplotDoge();

d3.csv("static/historyCoin/redditElonmentions5.csv").then(function(data){

    var title = data.map(row => Number(row.title));
    var time = data.map(row => row.time);
    
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: 'Elon Submissions',
      x: time,
      y: title,
      line: {color: '#17BECF'}
    }
    
    var dataset = [trace1];
    
    var layout = {
      title: 'Date vs. Reddit Submissions with name Elon',
    };
    
    Plotly.newPlot('elonDiv', dataset, layout);
    
});