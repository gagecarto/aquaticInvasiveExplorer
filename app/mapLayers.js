
// var nineColors=['#d53e4f','#f46d43','#f99c42','#f6d26e','#ffff6e','#cde64e','#6edd5f','#45c29a','#0f7bbd'];
// var nineColorsFlipped = ['#d53e4f','#f46d43','#f99c42','#f6d26e','#ffff6e','#cde64e','#6edd5f','#45c29a','#0f7bbd'];
var nineColorsFlipped=[ "#4F66FF","#5042EA","#511FD5","#5E07C3","#8303B5","#A800A7","#BA007A","#C2003D","#CB0000"]
// var nineColorsFlipped=nineColorsFlipped.reverse();
// var testing:[6000,11000,16000,22000,28000,34000,40000,56000,64000]

 // colfunc <- colorRampPalette(c("#008890","#ffed00" ,"#ff7300"))
 // colfunc(9)

 // colfunc <- colorRampPalette(c('#14FFEC','#14ff4f','#d714ff','#ff1414'))
 // colfunc(9)

 //  colfunc <- colorRampPalette(c('#009488','#009f28','#74008c','#a70000'))
 // colfunc(9)

   // colfunc <- colorRampPalette(c('#5628B4','#D80E70','#E7455F','#F7B236'))
   // colfunc(9)

    // colfunc <- colorRampPalette(c('#4f66ff','#5208c8','#b500a3','#cb0000'))
    // colfunc(9)



 var mapLayersConfig={

   BOATINGALL:{
     breaks:[51.18,66.8,71.4,75.5,80.1,84.7,89.7,94.1,99.8],
     colors:nineColorsFlipped,
     unit:'riskScore',
   },
   BOATINGMOT:{
    breaks:[22.6,44.7,59.3,68.1,75.4,82.4,89.9,95],
    colors:nineColorsFlipped,
    unit:'riskScore',
   },
   BOATINGNON:{
     breaks:[21.3,36.7,50.01,61.6,72.1,81.6,90.4,95],
     colors:nineColorsFlipped,
     unit:'riskScore',
   },
   GYAROADS:{
     breaks:[10,37.2,56.3,69.3,79.5,88.1,95.3,99],
     colors:nineColorsFlipped,
     unit:'riskScore',
   },
   TRAILS:{
     breaks:[10,32.5,50.6,65.5,78.1,88.2,95.2,98],
     colors:nineColorsFlipped,
     unit:'riskScore',
   },
   GYACAMPING:{
     breaks:[27.6,43.2,55,64.6,73,81,89,95],
     colors:nineColorsFlipped,
     unit:'riskScore',
   },
   MOTORIZEDW:{
     breaks:[22.7,45,60.2,69.5,76.6,83.7,91.2,95],
     colors:nineColorsFlipped,
     unit:'riskScore',
   },
   NONMOTORIZ:{
     breaks:[22,34.2,45.6,56.8,67,76.5,86.6,95],
     colors:nineColorsFlipped,
     unit:'riskScore',
   },
   RAMPS5KMNRM:{
     breaks:[22,34.2,45.6,56.8,67,76.5,86.6,95],
     colors:nineColorsFlipped,
     unit:'riskScore',
   },
   HRSKLKS:{
     breaks:[22,34.2,45.6,56.8,67,76.5,86.6,95],
     colors:nineColorsFlipped,
     unit:'riskScore',
   }
 }


var nhdStrokeStops=[
  [
      {
          "zoom": 0,
          "value": 0
      },
      0.05
  ],
  [
      {
          "zoom": 0,
          "value": 14194
      },
      0.1
  ],
  [
      {
          "zoom": 0,
          "value": 21865
      },
      0.15
  ],
  [
      {
          "zoom": 0,
          "value": 31256
      },
      0.25
  ],
  [
      {
          "zoom": 0,
          "value": 75607
      },
      0.5
  ],
  [
      {
          "zoom": 15,
          "value": 0
      },
      0.1
  ],
  [
      {
          "value": 14194,
          "zoom": 15
      },
      2
  ],
  [
      {
          "value": 21865,
          "zoom": 15
      },
      2.5
  ],
  [
      {
          "value": 31256,
          "zoom": 15
      },
      3
  ],
  [
      {
          "value": 75607,
          "zoom": 15
      },
      5
  ]
]


var nhdStrokeStopsHover=[
  [
      {
          "zoom": 0,
          "value": 0
      },
      4.1
  ],
  [
      {
          "zoom": 0,
          "value": 14194
      },
      4.2
  ],
  [
      {
          "zoom": 0,
          "value": 21865
      },
      4.3
  ],
  [
      {
          "zoom": 0,
          "value": 31256
      },
      4.5
  ],
  [
      {
          "zoom": 0,
          "value": 75607
      },
      8
  ],
  [
      {
          "zoom": 15,
          "value": 0
      },
      6
  ],
  [
      {
          "value": 14194,
          "zoom": 15
      },
      9
  ],
  [
      {
          "value": 21865,
          "zoom": 15
      },
      10
  ],
  [
      {
          "value": 31256,
          "zoom": 15
      },
      18
  ],
  [
      {
          "value": 75607,
          "zoom": 15
      },
      25
  ]
]




var mapStyles={

}

var stopsColors=[];

$.each(Object.keys(mapLayersConfig),function(i,item){
  var theseStopColors=[]




  $.each(mapLayersConfig[item].breaks,function(j,jitem){
    theseStopColors.push([jitem,mapLayersConfig[item].colors[j]])
  })
  mapStyles[item+"_style"]={}
  mapStyles[item+"_style"]['property']=item;
  mapStyles[item+"_style"]['stops']=theseStopColors;
})

function addMapLayers(){
  //get first layer id
  var layers = map.getStyle().layers;
  // Find the index of the first symbol layer in the map style
  var firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          // break;
      }
  }

  // map.setPaintProperty('water', 'fill-opacity',0);
  //
  // map.setPaintProperty('water shadow', 'fill-opacity',0);


  map.addLayer({
      'id': 'gyaBoundsLayer',
      'type': 'line',
      'source': {
          'type': 'geojson',
          'data':gyaBounds
      },
      "layout": {
          "line-join": "round",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#000000",
          "line-width": 2.5
      }
  },firstSymbolId);

  map.fitBounds(turf.bbox(gyaBounds), {padding: 10})


  if(map.getSource('nhdHoverSource')==undefined){
  map.addSource("nhdHoverSource", {
    "type": "geojson",
    // "data": {"type": "FeatureCollection", "features": []}
    "data": {"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-110.71609497070312,44.05601169578526],[-110.71746826171875,44.048115730823525]]}}
  });
  }


  if(map.getSource('nhdLongSource')==undefined){
      map.addSource("nhdLongSource", {
          "type": "vector",
          "url": 'mapbox://adamsepulveda.dpkxhzma/'
      });
    }

    map.addLayer({
      "id": "nhdLongLayerHover",
      "type": "line",
      "source": "nhdLongSource",
      "minzoom":3,
      "source-layer": "nhd030718long",
      "layout": {
          "visibility": "visible",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#af0fbd",
          "line-opacity": 0,
          "line-width": {
              "base": 1,
              "type": "exponential",
              "property": "namedLngth",
              "stops": nhdStrokeStopsHover
          }
      }
    },'water')

    map.addLayer({
      "id": "nhdHoverPop",
      "type": "line",
      "source": "nhdHoverSource",
      "minzoom":3,
      "layout": {
          "visibility": "visible",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#000",
          "line-opacity": 0.65,
          "line-width": 10
      },
    },'water')

    map.addLayer({
      "id": "nhdLongLayer",
      "type": "line",
      "source": "nhdLongSource",
      "minzoom":3,
      "source-layer": "nhd030718long",
      "layout": {
          "visibility": "visible",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#0f7bbd",
          "line-opacity": 1,
          "line-width": {
              "base": 1,
              "type": "exponential",
              "property": "namedLngth",
              "stops": nhdStrokeStops
          }
      }
    },'water')

    if(map.getSource('nhdShortSource')==undefined){
        map.addSource("nhdShortSource", {
            "type": "vector",
            "url": 'mapbox://adamsepulveda.1nx2ezoc/'
        });
      }

      map.addLayer({
        "id": "nhdShortLayerHover",
        "type": "line",
        "source": "nhdShortSource",
        "minzoom":7,
        "source-layer": "nhd030718short",
        "layout": {
            "visibility": "visible",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#bd0f82",
            "line-opacity": 0,
            "line-width": {
                "base": 1,
                "type": "exponential",
                "property": "namedLngth",
                "stops": nhdStrokeStopsHover
            }
        }
      },'water')

      map.addLayer({
        "id": "nhdShortLayerHoverPop",
        "type": "line",
        "source": "nhdShortSource",
        "minzoom":7,
        "source-layer": "nhd030718short",
        "layout": {
            "visibility": "visible",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#000",
            "line-opacity": 1,
            "line-width": {
                "base": 1,
                "type": "exponential",
                "property": "namedLngth",
                "stops": nhdStrokeStopsHover
            }
        },
        "filter": ["==", "FID_1", ""]
      },'water')

  map.addLayer({
    "id": "nhdShortLayer",
    "type": "line",
    "source": "nhdShortSource",
    "minzoom":7,
    "source-layer": "nhd030718short",
    "layout": {
        "visibility": "visible",
        "line-cap": "round"
    },
    "paint": {
        "line-color": "#0f7bbd",
        "line-opacity": 1,
        "line-width": {
            "base": 1,
            "type": "exponential",
            "property": "namedLngth",
            "stops": nhdStrokeStops
        }
    }
  },'water')

  if(map.getSource('hucHoverSource')==undefined){
  map.addSource("hucHoverSource", {
    "type": "geojson",
    "data": {"type": "FeatureCollection", "features": []}
  });
  }

  map.addLayer({
    "id": "hucHover",
    "type": "line",
    "source": "hucHoverSource",
    // "maxzoom":8,
    "layout": {},
    "paint": {
      "line-color": "#009090",
      "line-width": 4,
      "line-opacity":0.55
    },
  });


  if(map.getSource('huc12Source')==undefined){
      map.addSource("huc12Source", {
          "type": "vector",
          "url": 'mapbox://adamsepulveda.7gmw8n2l/'
      });
    }



    map.addLayer({
      "id": "huc12Outlines",
      "type": "line",
      "source": "huc12Source",
      "minzoom":3,
      "source-layer": "huc12012418",
      "layout": {
          "visibility": "none",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#0b6d73",
          "line-opacity": 1,
          "line-width": 0.25
      }
    },'water')



    map.addLayer({
      "id": "huc12Fill",
      "type": "fill",
      "source": "huc12Source",
      "minzoom":3,
      "source-layer": "huc12012418",
      "layout": {
          "visibility": "none",
          // "line-cap": "round"
      },
      "paint": {
          "fill-color": "#5492b8",
          "fill-opacity": 0,
          "fill-outline-color":"#ba12cc"
      }
    },'water')

    if(map.getSource('lakesHoverSource')==undefined){
      map.addSource("lakesHoverSource", {
        "type": "geojson",
        "data": {"type": "FeatureCollection", "features": []}
      });
    }


    map.addLayer({
      "id": "lakesHoverLayer",
      "type": "line",
      "source": "lakesHoverSource",
      // "maxzoom":8,
      "layout": {},
      "paint": {
        "line-color": "#143d57",
        "line-width": 6,
        "line-opacity":1
      },
    });


    if(map.getSource('lakesSource')==undefined){
        map.addSource("lakesSource", {
            "type": "vector",
            "url": 'mapbox://adamsepulveda.2sl8l2un/'
        });
      }


      map.addLayer({
        "id": "lakesLayer",
        "type": "fill",
        "source": "lakesSource",
        "minzoom":3,
        "source-layer": "waterBodies030718",
        "layout": {
            "visibility": "none",
            // "line-cap": "round"
        },
        "paint": {
            "fill-color": "#136190",
            "fill-opacity": 1,
            // "fill-outline-color":"#ba12cc"
        }
      })


      map.on("mousemove", 'lakesLayer',function(e) {
        var feature=e.features[0]

        relatedFeatures=map.querySourceFeatures('lakesSource', {
          sourceLayer: "waterBodies030718",
          filter: ['in', "REACHCODE",feature.properties.REACHCODE]
        });

        var boundsGeoJson={
          "type": "FeatureCollection",
          "features": relatedFeatures.map(function(f) {
            return {"type": "Feature", "geometry": f.geometry}
          })
        }



        var boundsGeoJson=turf.union.apply(this, boundsGeoJson.features)
        // var boundsGeoJsonn=turf.union.apply(this, relatedFeatures)
        map.getSource("lakesHoverSource").setData(boundsGeoJson);
        popupHandler(feature.properties)
        $('#hoverBox').show()
      });


    map.on("mouseout", "lakesLayer", function(e) {
        if(map.getLayoutProperty('lakesLayer','visibility')=='visible'){
          map.getCanvas().style.cursor = '';
          var thisGeoJson={
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "LineString",
                  "coordinates": []
              }
          }
          map.getSource("lakesHoverSource").setData(thisGeoJson);
          $('#hoverBox').hide()
        }
    });




    map.on("mousemove", "nhdLongLayerHover", function(e) {
      if(map.getLayoutProperty('nhdShortLayer','visibility')=='visible'){
        map.getCanvas().style.cursor = 'pointer';
        var thisGeoJson={
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": e.features[0].geometry.coordinates
            }
        }
        map.getSource("nhdHoverSource").setData(thisGeoJson);
        popupHandler(e.features[0].properties)
        $('#hoverBox').show()
      }
    });

    map.on("mousemove", "nhdShortLayerHover", function(e) {
        if(map.getLayoutProperty('nhdShortLayer','visibility')=='visible'){
          map.getCanvas().style.cursor = 'pointer';
          var thisGeoJson={
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "LineString",
                  "coordinates": e.features[0].geometry.coordinates
              }
          }
          map.getSource("nhdHoverSource").setData(thisGeoJson);
          popupHandler(e.features[0].properties)
          $('#hoverBox').show()
        }
    });

    map.on("mouseout", "nhdLongLayerHover", function(e) {
        if(map.getLayoutProperty('nhdShortLayer','visibility')=='visible'){
          map.getCanvas().style.cursor = '';
          var thisGeoJson={
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "LineString",
                  "coordinates": []
              }
          }
          map.getSource("nhdHoverSource").setData(thisGeoJson);
          $('#hoverBox').hide()
        }
    });

    map.on("mouseout", "nhdShortLayerHover", function(e) {
      if(map.getLayoutProperty('nhdShortLayer','visibility')=='visible'){
        map.getCanvas().style.cursor = '';
        var thisGeoJson={
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": []
            }
        }
        map.getSource("nhdHoverSource").setData(thisGeoJson);
        $('#hoverBox').hide()
      }
    });


    map.on("mousemove", 'huc12Fill',function(e) {
      var feature=e.features[0]

      relatedFeatures=map.querySourceFeatures('huc12Source', {
        sourceLayer: "huc12012418",
        filter: ['in', "HUC12",feature.properties.HUC12]
      });

      var boundsGeoJson={
        "type": "FeatureCollection",
        "features": relatedFeatures.map(function(f) {
          return {"type": "Feature", "geometry": f.geometry}
        })
      }

      var boundsGeoJson=turf.union.apply(this, boundsGeoJson.features)
      // var boundsGeoJsonn=turf.union.apply(this, relatedFeatures)
      map.getSource("hucHoverSource").setData(boundsGeoJson);
    });


    map.on("mousemove", 'huc12Fill',function(e) {
      if(map.getLayoutProperty('huc12Fill','visibility')=='visible'){
        map.getCanvas().style.cursor = 'pointer';
        popupHandler(e.features[0].properties)
        $('#hoverBox').show()
      }
    });

    map.on("mouseout", "huc12Fill", function(e) {
      if(map.getLayoutProperty('huc12Fill','visibility')=='visible'){
        map.getCanvas().style.cursor = '';
        var thisGeoJson={
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": []
            }
        }
        map.getSource("hucHoverSource").setData(thisGeoJson);
        $('#hoverBox').hide()
      }
    });

    map.on('zoomend',function(){
      queryViewportFeatures()
    })



    map.on('moveend', function() {
      queryViewportFeatures()
    });


    if(document.location.hash){
      var thisHash=document.location.hash;
      if(thisHash.indexOf('bnds=')>-1){
        thisHash=thisHash.split('bnds=')[1]
        var theseBounds=thisHash.split(',').map(function(bnd) {
            return Number(bnd);
        });
        map.fitBounds(theseBounds)
      }
    }

}

function queryViewportFeatures(){
  longFeatures = map.queryRenderedFeatures({layers:['nhdLongLayer']});
  shortFeatures = map.queryRenderedFeatures({layers:['nhdShortLayer']});

  if (longFeatures) {
      console.log(longFeatures.length+' longFeatures dawg')
      longFeatures=getUniqueFeatures(longFeatures, "REACHCODE");
      console.log(longFeatures.length+' unique longFeatures dawg')
      longDawg=longFeatures
  }
  if (shortFeatures) {
      console.log(shortFeatures.length+' shortFeatures dawg')
      shortFeatures=getUniqueFeatures(shortFeatures, "REACHCODE");
      console.log(shortFeatures.length+' unique shortFeatures dawg')
      shortDawg=shortFeatures;
      var result = shortFeatures.concat(longFeatures).map(function(a) {return a.properties[currentRiskVector];});
      buildQuantiles(result)
  }
}


function getUniqueFeatures(array, comparatorProperty) {
    var existingFeatureKeys = {};
    var uniqueFeatures = array.filter(function(el) {
        if (existingFeatureKeys[el.properties[comparatorProperty]]) {
            return false;
        } else {
            existingFeatureKeys[el.properties[comparatorProperty]] = true;
            return true;
        }
    });
    return uniqueFeatures;
}

function buildQuantiles(array){
  bins = d3.layout.histogram()  // create layout object
    .bins(20)       // to use 20 bins
    .range([0, 100])  // to cover range from 0 to 1
    (array);          // group the data into the bins

    newChartData=[
        {
          key: "Cumulative Return",
          values: []
        }
      ]

      bins.forEach(function(item,i){
        console.log(i)
        console.log(item)
        newChartData[0].values.push(
          {
            "label" : (i+1)*5 ,
            "value" : item.y
          }
        )
      })

      updateChart(newChartData)
}
