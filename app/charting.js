

function chartInit(){

  nv.addGraph(function () {
    chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })    //Specify the data accessors.
      .y(function(d) { return d.value })
      .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
      // .tooltips(false)        //Don't show tooltips
      // .showValues(true)       //...instead, show the bar value right on top of each bar.
      // .transitionDuration(350)
       .color(['#aec7e8']);
      ;

      chart.yAxis
        .axisLabel('Count');

      chart.xAxis
        .axisLabel('Risk Score (bins)')




      chartData = d3.select('#chart svg').datum(emptyChartData)
      chartData.transition().duration(500).call(chart);



      nv.utils.windowResize(chart.update);

      return chart;
  });


}


var emptyChartData=[
    {
      key: "Cumulative Return",
      values: [
        {
          "label" : "0" ,
          "value" : 0
        } ,
        {
          "label" : "10" ,
          "value" : 0
        } ,
        {
          "label" : "20" ,
          "value" : 0
        } ,
        {
          "label" : "30" ,
          "value" : 0
        } ,
        {
          "label" : "40" ,
          "value" : 0
        },
        {
          "label" : "50" ,
          "value" : 0
        } ,
        {
          "label" : "60" ,
          "value" : 0
        } ,
        {
          "label" : "70" ,
          "value" : 0
        } ,
        {
          "label" : "80" ,
          "value" : 0
        } ,
        {
          "label" : "90" ,
          "value" : 0
        },
        {
          "label" : "100" ,
          "value" : 0
        }
      ]
    }
  ]



function updateChart(newData){
  chartData.datum(newData).transition().duration(500).call(chart);
}
