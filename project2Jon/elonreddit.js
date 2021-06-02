
d3.csv("redditElonmentions5.csv").then(function(data){

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

})