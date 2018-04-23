var svg = d3.select("svg");
svg.append("text").attr("id", "wait")
       .attr("text-anchor", "middle")
       .attr("stroke","lightgrey").attr("stroke-width", "0.4")
       .attr("x", 520)
       .attr("y", 310)
       .attr("fill","black").attr("font-size", 50)
       .text("Please Wait...");
var colors = {"bakerloo": '#B36305', 'central':'#e32017', 'circle':'#ffd300','hammersmith-city':'#f3a9bb','jubilee':'#a0a5a9','district':'#00782a',
              'metropolitan':'#9b0056',
              'northern':'#000000',
              'piccadilly':'#003688',
              'victoria': '#0098d4',
          'waterloo-city': '#95cdba',
          'All' : 'black'};
var container = svg.append("g");

function getCoords(){
    $.ajax({
        url: '/coords',
        type: 'GET',
        success: function(d){
            //console.log(JSON.parse(d));
            drawAll(JSON.parse(d));
        }
    });
};

function getTimes(lines, line, displayNames, direction){
    
    //console.log(direction);
  $.ajax({
    url: '/times',
    type: 'GET',
    data:{
        "line": line,
        "direction": direction
    },
    success: function(d){
      //console.log(d);
      draw(lines, line, JSON.parse(d), displayNames);
    }
  })
}


function drawAll(lines){
    var direction = "outbound";
    if(d3.select("#direction").attr("value") == "checked"){
        direction = "inbound";
    }
    var lineName = (d3.select("#lineName").attr("value"));
    if(d3.select("#title").html() != "All") d3.select("#title").html(lines[lineName]["name"]);
    if( lineName == "circle" || lineName == "hammersmith-city" || lineName == "waterloo-city"){
        d3.select("#title").style("color", "black");
    }
    if( lineName != "piccadilly" && lineName != "All") d3.select("ul").style("background-color", colors[lineName]);
    else{
        d3.select("#title").style("color", colors[lineName]);
        d3.select("ul").style("background-color", "#e0ebff");
    }
    //console.log(lineName);
    if(lineName == "All"){
        for(var line in lines){
            getTimes(lines, line, false, direction);
        }
    }
    else getTimes(lines, lineName, true, direction);
}

var interpolator = d3.interpolateCubehelixDefault;

function interpolateCustomKey(g){
        //console.log(interpolator(g/200.0));
        if(g < 190) return interpolator(1-g/200.0);
        else return interpolator(0.0);
};

function interpolateCustom(second){
    return function(g){
        return interpolateCustomKey((1- g) * second/240*200);
    }
}

function makeKey(){
	var xs = [];
	for(var i = 0; i <= 255; i++){
		xs.push(i);
	}
	svg.selectAll('line')
	   .data(xs)
	   .enter()
	   .append('line')
	   .attr("x1", function(d){return 735+d;})
	   .attr("x2", function(d){return 735+d;})
	   .attr("y1", 540)
	   .attr("y2", 590)
	   .attr("stroke-width", "2px")
	   .attr("stroke", interpolateCustomKey);
	svg.append("text")
       .attr("stroke","lightgrey").attr("stroke-width", "0.4")
	   .attr("x", 735)
	   .attr("y", 530)
	   .attr("fill","black").attr("font-size", 20)
	   .text("0");
    svg.append("text")
       .attr("stroke","lightgrey").attr("stroke-width", "0.4")
       .attr("text-anchor", "middle")
       .attr("x", 830)
       .attr("y", 530)
       .attr("fill","black").attr("font-size", 20)
       .text("2");
    svg.append("text")
       .attr("stroke","lightgrey").attr("stroke-width", "0.4")
       .attr("text-anchor", "middle")
       .attr("x", 925)
       .attr("y", 530)
       .attr("fill","black").attr("font-size", 20)
       .text("4");
    svg.append("text")
       .attr("stroke","lightgrey").attr("stroke-width", "0.4")
       .attr("x", 975)
       .attr("y", 532)
       .attr("fill","black").attr("font-size", 30)
       .text("∞");
    svg.append("text")
       .attr("stroke","lightgrey").attr("stroke-width", "0.4")
       .attr("text-anchor", "middle")
       .attr("x", 863)
       .attr("y", 510)
       .attr("fill","black").attr("font-size", 23)
       .text("Minutes to arrival");

}

function draw(lines, line, times, displayNames){
    d3.select("#wait").text("");
    lineCoords = lines[line]["lines"];
    var path = "";
    for(var i = 0; i < lineCoords.length; i++){
        //console.log(lineCoords[i]);
        l = JSON.parse(lineCoords[i])[0];
        //console.log(l[0][1]);
        path = path + "M " + Math.floor((l[0][0] + .65) * 1100).toString() + " " + (parseInt(svg.attr("height")) - Math.floor((l[0][1] - 51.395) * 1900)).toString() + " ";
        for(var j = 1; j < l.length; j++){
            path = path + "L " + Math.floor((l[j][0] + .65) * 1100).toString() + " " + (parseInt(svg.attr("height")) - Math.floor((l[j][1] -51.395) * 1900)).toString() + " "
        }
        //console.log(path);
    }
    //console.log(path);
    //console.log(path_coords);
    var paths = container.append("path");
    paths.attr("d", path);
    //console.log(colors[line]);
    paths.attr("stroke", colors[line]).attr("stroke-width", "2px").attr("fill","none");
    var stops = container.selectAll("."+line+"-stop").data(lines[line]['stops']).enter().append("circle");
    stops.attr("cy", function(d){
        //console.log(d['lat'] * 3000 - 51.4 * 3000);
        return parseInt(svg.attr("height")) - Math.floor((d['lat'] - 51.395) * 1900);
    });
    stops.attr("id", function(d){
      //console.log(d)
      return d['id']
    })
    stops.attr("cx", function(d){
        //console.log(Math.floor(d['lon'] * 3000 + .35 * 3000));
        return Math.floor((d['lon'] + .65) * 1100);
    });
    
            var names = container.selectAll("."+line+"-name").data(lines[line]['stops']).enter().append("text");

    var names = container.selectAll("."+line+"-name").data(lines[line]['stops']).enter().append("text");
    if(displayNames){
        names.attr("id", "stopname");
        names.attr("y", function(d){
            //console.log(d['lat'] * 3000 - 51.4 * 3000);
            return parseInt(svg.attr("height")) - Math.floor((d['lat'] - 51.395) * 1900) + 2;
        });
        names.attr("x", function(d){
            //console.log(Math.floor(d['lon'] * 3000 + .35 * 3000));
            return Math.floor((d['lon'] + .65) * 1100 - 1);
        });
    names.attr("fill","black").attr("font-size", 5).attr("stroke","lightgrey").attr("stroke-width", "0.1");
        names.text(function(d){
            //console.log()
            if(d['name'].indexOf('Underground', 0) != -1) return "\xa0\xa0\xa0\xa0\xa0" + d['name'].slice(0, d['name'].indexOf('Underground', 0))/* + " " + d['lon'].toString() + ", " + d['lat'].toString()*/;
            else return "\xa0\xa0\xa0\xa0\xa0" + d['name']
        });

    }
    stops.attr("r", 3).attr("stroke","black");
    stops.classed(line, true);
    svg.attr("width",svg.attr("width")).attr("length",svg.attr("length")).style("fill", "none").style("pointer-events", "all").call(d3.zoom()
                     .scaleExtent([1, 10])
                     //.translateExtent([[0, 0], [svg.attr("width"), svg.attr("length")]])
                     .on("zoom", function(){
                         container.attr("transform", d3.event.transform);
                     }))
    //stops.attr("onmouseover","evt.target.setAttribute('r', '20');");
    stops.transition().duration(function(d){return times[d['id']] * 1000}).ease(d3.easeLinear)
         .attrTween("fill", function(d){
            return interpolateCustom(times[d['id']]);
        });


};

getCoords()
//getTimes()
//gradient()
makeKey();
