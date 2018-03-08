var mapLayers={}

var currentRiskVector='none'
var currentAdminGeography='gya'

function mapInits(){
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FnZWNhcnRvIiwiYSI6ImNpb2xsMXVzdDAxcHR1Nm0wOXl3dThvNWIifQ.OKsbC0HOK-OjaPKyjCUxrg';
  map = new mapboxgl.Map({
      container: 'map', // container id
      // style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [-111, 43], // starting position [lng, lat]
      zoom: 4 // starting zoom
  });

  map.addControl(new mapboxgl.NavigationControl());


  map.on('load', function () {
    addMapLayers()
  });
}

function uiInits(){

  $("input:radio[name='group1']").change(function(){
       if($(this).val()=='lakes'){
         map.setLayoutProperty('nhdShortLayer', 'visibility', 'none');
         map.setLayoutProperty('nhdLongLayer', 'visibility', 'none');
         // map.setLayoutProperty('huc12Outlines', 'visibility', 'visible');
         map.setLayoutProperty('lakesLayer', 'visibility', 'visible');

       }else{
         // map.setLayoutProperty('huc12Outlines', 'visibility', 'none');
         map.setLayoutProperty('lakesLayer', 'visibility', 'none');
         map.setLayoutProperty('nhdShortLayer', 'visibility', 'visible');
         map.setLayoutProperty('nhdLongLayer', 'visibility', 'visible');
       }
   });

  $("#nhdSymbologyDropdown").material_select()

  $("#nhdSymbologyDropdown").on('change', function() {

    currentRiskVector=$(this).val()

    if(currentRiskVector=='none'){
      map.setPaintProperty('nhdLongLayer',
          'line-color','#0f7bbd'
        );
      map.setPaintProperty('nhdShortLayer',
          'line-color','#0f7bbd'
        );
      map.setPaintProperty('lakesLayer',
          'fill-color','#136190'
        );
    }
    else if(currentRiskVector=='COMPOSITE'){
      map.setPaintProperty('nhdLongLayer',
          'line-color',colorArray
      );
      map.setPaintProperty('nhdShortLayer',
          'line-color',colorArray
      );
      map.setPaintProperty('lakesLayer',
          'fill-color',colorArray
      );

    }
    else{
      map.setPaintProperty('nhdLongLayer',
          'line-color',mapStyles[currentRiskVector+'_style']
      );
      map.setPaintProperty('nhdShortLayer',
          'line-color',mapStyles[currentRiskVector+'_style']
      );
      map.setPaintProperty('lakesLayer',
          'fill-color',mapStyles[currentRiskVector+'_style']
      );
    }
		// map.removeLayer(mapLayersHolder[activeMapLayer]);
		// map.addLayer(mapLayersHolder[$(this).val()]);
		// activeMapLayer=$(this).val();

    legendBuilder();
    queryViewportFeatures();
	});



$("#geographySelector").material_select()
$("#geographySelector").on('change', function() {
  currentAdminGeography=$(this).val()
});

$(document).on('mousemove', function(e) {
    $('#hoverBox').css({
        left: e.pageX + 25,
        top: e.pageY - 40,
    });
});







}

$( document ).ready(function(){
  mapInits();
  uiInits();
  chartInit();
})


function numberFormater(toFormat){
    dawg=toFormat
    // if(mapLayersConfig[currentRiskVector].unit=='meters'){
    //   return((toFormat/1000).toFixed(2))
    // }
    //
    // if(mapLayersConfig[currentRiskVector].unit=='total'){
    //   return(toFormat)
    // }
    return(toFormat.toFixed(2))
}



function popupHandler(featureProps){

  if(map.getLayoutProperty('huc12Fill','visibility')=='visible'){

    $('#hoverBox').html(featureProps.NAME12)

  }



  if(map.getLayoutProperty('nhdShortLayer','visibility')=='visible'){
    var currentSegmentName='Unnamed Segment';

    if(featureProps.MAX_GNIS_N){
      currentSegmentName=featureProps.MAX_GNIS_N;
    }

    // $('#hoverBox').html(currentSegmentName)
    //
    // return

    if(currentRiskVector!=='none' && currentRiskVector!=='COMPOSITE'){
      var currentRiskName=$('#selectHolder select option[value="'+currentRiskVector+'"]').html();
      thisRiskValue=(numberFormater(featureProps[currentRiskVector]));
      thisRiskValue=Number(thisRiskValue)
    }

    if(currentRiskVector=='COMPOSITE'){
      averageCompositeScore=0;
      var theseKeys=Object.keys(scalersObject);
      totalMultipliers=0;
      $.each(theseKeys,(i, item) => {
        var thisVariable=item;
        var thisValue=featureProps[thisVariable]
        var thisScaler=scalersObject[thisVariable];
        totalMultipliers+=thisScaler
        // vectorsToAverage.push(thisVariable+' = '+thisValue+' * '+thisScaler)
        averageCompositeScore+=(thisValue*thisScaler)
      })
      var currentRiskName='Composite risk value';
      thisRiskValue=averageCompositeScore/totalMultipliers;
      thisRiskValue=(numberFormater(thisRiskValue));
      thisRiskValue=Number(thisRiskValue);
    }

    var popupString='<a class="popupTitle">'+currentSegmentName+'</a><br>';

    if(currentRiskName){
      popupString+='<a class="popupSubTitle">'+currentRiskName+' '+thisRiskValue+'</a><br>';
    }

    if(currentRiskVector!=='none'){
      // if(currentAdminGeography=='gya'){
      //   thisCompareAverage=numberFormater(allAverages[varLookupObject[currentRiskVector]]);
      //   thisCompareGeog=' the GYA '
      //   if(thisRiskValue>=thisCompareAverage){
      //     var higherLower='<a class="higherRiskTextClass">higher</a>';
      //   } else{
      //     var higherLower='<a class="lowerRiskTextClass">lower</a>';
      //   }
      //   var theseStats=allAverages[varLookupObject[currentRiskVector]+'Stats']
      // }
      //
      // if(currentAdminGeography=='fedAdmin'){
      //   thisCompareGeog=featureProps.ADMINNAME;
      //   if(thisCompareGeog!=='NA'){
      //     var thisCompareAverage=numberFormater(adminAverages[thisCompareGeog][varLookupObject[currentRiskVector]]);
      //     if(thisRiskValue>=thisCompareAverage){
      //       var higherLower='<a class="higherRiskTextClass">higher</a>';
      //     } else{
      //       var higherLower='<a class="lowerRiskTextClass">lower</a>';
      //     }
      //   var theseStats=adminAverages[thisCompareGeog][varLookupObject[currentRiskVector]+'Stats']
      // } else{
      //   var theseStats=null;
      // }
      // }
      //
      // if(currentAdminGeography=='county'){
      //   var thisCompareGeog=featureProps.CNTYFIPS;
      //   var thisCompareAverage=numberFormater(countyAverages[thisCompareGeog][varLookupObject[currentRiskVector]]);
      //   if(thisRiskValue>=thisCompareAverage){
      //     var higherLower='<a class="higherRiskTextClass">higher</a>';
      //   } else{
      //     var higherLower='<a class="lowerRiskTextClass">lower</a>';
      //   }
      //   var theseStats=countyAverages[thisCompareGeog][varLookupObject[currentRiskVector]+'Stats']
      // }
      //
      // if(currentAdminGeography=='state'){
      //   var thisCompareGeog=featureProps.STATE;
      //   var thisCompareAverage=numberFormater(stateAverages[thisCompareGeog][varLookupObject[currentRiskVector]]);
      //   if(thisRiskValue>=thisCompareAverage){
      //     var higherLower='<a class="higherRiskTextClass">higher</a>';
      //   } else{
      //     var higherLower='<a class="lowerRiskTextClass">lower</a>';
      //   }
      //   var theseStats=stateAverages[thisCompareGeog][varLookupObject[currentRiskVector]+'Stats']
      // }
      //
      // if(currentAdminGeography=='huc12'){
      //   var thisCompareGeog=featureProps.HUC12;
      //   var thisCompareAverage=numberFormater(huc12Averages[thisCompareGeog][varLookupObject[currentRiskVector]]);
      //   if(thisRiskValue>=thisCompareAverage){
      //     var higherLower='<a class="higherRiskTextClass">higher</a>';
      //   } else{
      //     var higherLower='<a class="lowerRiskTextClass">lower</a>';
      //   }
      //   var theseStats=huc12Averages[thisCompareGeog][varLookupObject[currentRiskVector]+'Stats']
      // }
      //
      // if(theseStats){
      //   statsSplit=theseStats.split(',');
      //   var totalSegments=theseStats[0];
      //   //removes the first element.. now just deciles
      //   statsSplit.shift();
      //
      //   var decileMatchNote='';
      //
      //   $.each(statsSplit,function(i,item){
      //     if(i<11){
      //       item=Number(item)
      //       // console.log(thisRiskValue)
      //       // console.log(item)
      //       // console.log(Number(statsSplit[i+1]))
      //       // console.log(thisRiskValue>item && thisRiskValue<Number(statsSplit[i+1]))
      //       if(thisRiskValue>numberFormater(item) && thisRiskValue<numberFormater(Number(statsSplit[i+1]))){
      //         decileMatchNote=i*10+'% - '+(i+1)*10+'% decile';
      //         // console.log(decileMatchNote)
      //         return false;
      //       }
      //     }
      //   })
      // }
      //
      //
      // if(currentAdminGeography=='county'){
      //     thisCompareGeog=numberLookups[thisCompareGeog].name+' County'
      // }
      //
      // if(currentAdminGeography=='huc12'){
      //     thisCompareGeog=numberLookups[thisCompareGeog].name+' HUC12 watershed'
      // }
      //
      // if(currentAdminGeography=='state'){
      //     thisCompareGeog='the state of '+numberLookups[thisCompareGeog].name
      // }
      //
      // if(theseStats){
      //   popupString+='<br>This segment has a '+higherLower+' risk score for '+currentRiskName+' than the average of '+thisCompareAverage
      //   + ' within '+thisCompareGeog+'. When classifying stream segments in '+thisCompareGeog+' into deciles, this observation is within the '+decileMatchNote;
      // } else{
      //   // popupString+='<br>This segment has a '+higherLower+' risk score for '+currentRiskName+' than the average of '+thisCompareAverage
      //   // + ' within '+thisCompareGeog+'. When classifying stream segments in '+thisCompareGeog+' into deciles, this observation is within the '+decileMatchNote;
      // }





    }
    $('#hoverBox').html(popupString)
  }

  if(map.getLayoutProperty('lakesLayer','visibility')=='visible'){
    // thisRiskValue=(numberFormater(featureProps[currentRiskVector]));
    if(featureProps.GNIS_NAME){
      currentSegmentName=featureProps.GNIS_NAME;
    }


    // if(currentRiskVector!=='none'){
    //   var currentRiskName=$('#selectHolder select option[value="'+currentRiskVector+'"]').html();
    //   thisRiskValue=(numberFormater(featureProps[currentRiskVector]));
    //   thisRiskValue=Number(thisRiskValue)
    // }

    var popupString='<a class="popupTitle">'+currentSegmentName+'</a><br>';

    // popupString+='<a class="popupTitle">'+thisRiskValue+'</a><br>'


    $('#hoverBox').html(popupString)

  }

}







function legendBuilder(){
  if(currentRiskVector=='none'){
    $('#mapLegend').hide();
    return
  }

  $('#mapLegend').show();

  $('#mapLegend').empty();

  var binsToUse=mapLayersConfig[currentRiskVector].breaks

  var colorsToUse=mapLayersConfig[currentRiskVector].colors

  var scaler=1;

  $.each(binsToUse, function(i, item) {
    // if(i==0){
    //   return
    // }
    var legendLabel=" ";
    var spacer='';
    if(i==0){
      var previousValue=0
    } else{
      var previousValue=numberFormater(binsToUse[i-1])
    }



    if(i==binsToUse.length-1){
      var thisValue=previousValue+' - 100';
    } else{
      var thisValue=previousValue+' - '+numberFormater(binsToUse[i]);
    }

    if(item[0]==0){
      thisValue='0'
    }

    var thisColor=colorsToUse[i];

    var thisFontSize=$("html").css("font-size");
    var thisWidthHeight=Number(thisFontSize.slice(0,2));
    var thisWidthHeight=thisWidthHeight*2;

    // var thisSquiggleString="M 5 50 Q 30 5, 50 50 T 95 50"
    // var thisSquiggleString="M 5 15 Q 30 5, 15 15 T 30 15"
    var thisSquiggleString="M 5 "+thisWidthHeight/2+" Q 15 5, "+thisWidthHeight/2+" "+thisWidthHeight/2+" T "+thisWidthHeight+" "+thisWidthHeight/2+""

    console.log(thisSquiggleString)




    $('#mapLegend').prepend("<span class='legendBlockVector'>"
      // +"<span class='legendBlockNhd' style='background:" + thisColor + ";'></span>"
      +'<svg width="100%" height="100%">'
        +'<path d="'+thisSquiggleString+'" stroke="'+thisColor+'" fill="transparent" stroke-width="2.5"/>'
      +'</svg>'
      +"</span>"
      + "<label class='legendLabelVector'>"+thisValue+"</label><br>"
    );

    // makeSquiggle("squiggle", "follow", 25, 20);


    if(i==binsToUse.length-1){
      // var legendTitle=mapLayerAnnotations[thisNhdLayer].fullName
      // var legendSubtitle=mapLayerAnnotations[thisNhdLayer].label
      var legendTitle=$('#selectHolder select option[value="'+currentRiskVector+'"]').html();

    }
  })
}
