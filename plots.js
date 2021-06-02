/**
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var stock = d3.select("#stockInput").node().value;
  console.log(stock);

  // clear the input value
  d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  //buildPlot(stock);
}



d3.csv("static/Data/BTC_USD_2021-02-26_2021-05-25-CoinDesk.csv").then(function (dataset) {
  console.log(dataset); {

    // Grab values from the response json object to build the plots
    var name = dataset.Currency;
    console.log(name)
    
    //console.log(`date: ${dataset[0].Date}`)

    //var stock = data.dataset.dataset_code;
    //var endDate = dataset.end_date;
    var dates = dataset.map(row => row.Date);
    console.log(`date array: ${dates}`)

    
    var openingPrices = dataset.map(row => Number(row["24h Open (USD)"]));
    console.log(openingPrices)

    var highPrices = dataset.map(row => Number(row["24h High (USD)"]));
    console.log(highPrices)


    //var stock = d3.select("#stockInput").node().value;
    var lowPrices = dataset.map(row => Number(row["24h Low (USD)"]));


  var closingPrices = dataset.map(row => Number(row["Closing Price (USD)"]));
  console.log(closingPrices)


    var mid_point = dataset.map(row => (row.lowPrices + row.highPrices) / 2)

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: mid_point,
      line: {
        color: "#17BECF"
      }
    };

    // Candlestick Trace
    var trace2 = {
      type: "candlestick",
      name: "Candlestick Trace",
      x: dates,
      high: highPrices,
      low: lowPrices,
      open: openingPrices,
      close: closingPrices
    };

    var data = [trace1, trace2];
    //var stock = d3.select("#stockInput").node().value;
    //console.log(stock)
    var layout = {
      //title: `${stock} closing prices`,
      title: "BitCoin",
      xaxis: {
        range: [dates[0], dates[88]],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);
  };


  // Add event listener for submit button
  //d3.select("#submit").on("click", handleSubmit);
})