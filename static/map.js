var svg = d3.select("svg");
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
            console.log(JSON.parse(d));
            drawAll(JSON.parse(d));
        }
    });
};

function getTimes(){
  $.ajax({
    url: '/times',
    type: 'GET',
    success: function(d){
      console.log(d);
      setTimes(d);
    }
  })
}

function setTimes(d){
  console.log(d);
  console.log(d[0]["id"]);
  for(i = 0; i < d.length; i++){
    console.log(d[i]["id"]);
    console.log(d[i]["timeToStation"])
  };
}


function drawAll(lines){
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
            draw(lines, line, false);
        }
    }
    else draw(lines, lineName, true);
}

function color(seconds){
    if(seconds >= 255){
	return "#ffffff";
    }
    else{
	return "#ff" + seconds.toString(16) + seconds.toString(16);
    }
}

var interpolator = d3.interpolateMagma;

function interpolateCustomKey(g){
        //console.log(interpolator(g/200.0));
        if(g < 190) return interpolator(1-g/200.0);
        else return interpolator(0.0);
};

function interpolateCustom(second){
    return function(g){
        return interpolateCustomKey((1- g) * second/60*200);
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
	   .attr("x", 735)
	   .attr("y", 530)
	   .attr("fill","black").attr("font-size", 20)
	   .text("0");
    svg.append("text")
       .attr("text-anchor", "middle")
       .attr("x", 830)
       .attr("y", 530)
       .attr("fill","black").attr("font-size", 20)
       .text("30");
    svg.append("text")
        .attr("text-anchor", "middle")
       .attr("x", 925)
       .attr("y", 530)
       .attr("fill","black").attr("font-size", 20)
       .text("60");
    svg.append("text")
       .attr("x", 975)
       .attr("y", 532)
       .attr("fill","black").attr("font-size", 30)
       .text("∞");
}

function gradient(){
    var svg = d3.select("svg");
    var gradient = svg.append("linearGradient")
	.attr("id", "svgGradient")
	.attr("x1", "0%")
	.attr("x2", "100%")
	.attr("y1", "0%")
	.attr("y2", "0%");
    gradient.append("stop")
	.attr('class', 'start')
	.attr("offset", "0%")
	.attr("stop-color", "cyan")
	.attr("stop-opacity", 1);
    gradient.append("stop")
	.attr('class', 'start')
	.attr("offset", "50%")
	.attr("stop-color", "yellow")
	.attr("stop-opacity", 1);
    gradient.append("stop")
	.attr('class', 'start')
	.attr("offset", "100%")
	.attr("stop-color", "red")
	.attr("stop-opacity", 1);
    var rect = svg.append("rect")
	.attr("x", 745)
	.attr("y", 550)
	.attr("height", 50)
	.attr("width", 255)
	.attr("fill", "url(#svgGradient)");
    var text = svg.append("text")
	.attr("x", 745)
	.attr("y", 550)
	.text(">=255       0")
	.attr("font-size",50)
	.attr("font-family", "sans-serif");
}

function draw(lines, line, displayNames){
    //console.log(lines[line]['stops']);
    //console.log('line');
    /*var lines = map.selectAll("line").data(data[line]['stops']).enter().append("line");
    var x1 = data[line]['stops'][0]['lat'];
    var x2 = data[line]['stops'][0]['lon'];
    lines.attr("x1",function(d){
        x = x1;
        x1 = d['lat'];
        console.log(x);
        lines.attr("x2", function(d){
            return Math.floor(x1 * 1100 - 51400);
        });
       return Math.floor(x * 1100 - 51400);
    });
    lines.attr("y1",function(d){
       return 1100-Math.floor(d[0]/100);
    });***/

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
    if(displayNames){
        names.attr("y", function(d){
            //console.log(d['lat'] * 3000 - 51.4 * 3000);
            return parseInt(svg.attr("height")) - Math.floor((d['lat'] - 51.395) * 1900) + 1;
        });
        names.attr("x", function(d){
            //console.log(Math.floor(d['lon'] * 3000 + .35 * 3000));
            return Math.floor((d['lon'] + .65) * 1100)+5;
        });
    names.attr("fill","black").attr("font-size", 5);
        names.text(function(d){
            //console.log()
            if(d['name'].indexOf('Underground', 0) != -1) return d['name'].slice(0, d['name'].indexOf('Underground', 0))/* + " " + d['lon'].toString() + ", " + d['lat'].toString()*/;
            else return d['name']
        });

    }
    stops.attr("r", 3).attr("stroke","black").attr("stroke-width","1").attr("fill","white");
    stops.classed(line, true);
    svg.attr("width",svg.attr("width")).attr("length",svg.attr("length")).style("fill", "none").style("pointer-events", "all").call(d3.zoom()
                     .scaleExtent([1, 10])
                     //.translateExtent([[0, 0], [svg.attr("width"), svg.attr("length")]])
                     .on("zoom", function(){
                         container.attr("transform", d3.event.transform);
                     }))
    //stops.attr("onmouseover","evt.target.setAttribute('r', '20');");
    var seconds = 60;
    stops.transition().duration(seconds * 1000).attrTween("fill", function(){return interpolateCustom(seconds)});


};

getCoords()
//getTimes()
//gradient()
makeKey();
