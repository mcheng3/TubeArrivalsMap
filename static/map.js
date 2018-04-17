

var colors = {"bakerloo": '#B36305', 'central':'#e32017', 'circle':'#ffd300','hammersmith-city':'#f3a9bb','jubilee':'#a0a5a9','district':'#00782a',
			  'metropolitan':'#9b0056',
			  'northern':'#000000',
			  'piccadilly':'#003688',
			  'victoria': '#0098d4',
			  'waterloo-city': '95cdba'};

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

function drawAll(lines){
	for(var line in lines){
		if(line == "metropolitan") draw(lines, line, false);
		else draw(lines, line, false);
	}
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
    var container = d3.select("svg");
    lineCoords = lines[line]["lines"];
    var path = "";
    for(var i = 0; i < lineCoords.length; i++){
        //console.log(lineCoords[i]);
        l = JSON.parse(lineCoords[i])[0];
        console.log(l);
        path = path + "M " + Math.floor((l[0][0] + .65) * 1100).toString() + " " + (parseInt(container.attr("height")) - Math.floor((l[0][1] - 51.395) * 1900)).toString() + " ";
        for(var j = 1; j < l.length; j++){
            path = path + "L " + Math.floor((l[j][0] + .65) * 1100).toString() + " " + (parseInt(container.attr("height")) - Math.floor((l[j][1] -51.395) * 1900)).toString() + " "
        }
        //console.log(path);
    }
    console.log(path);
    //console.log(path_coords);
    var paths = container.append("path");
    paths.attr("d", path);
    //console.log(colors[line]);
    paths.attr("stroke", colors[line]).attr("stroke-width", "2px").attr("fill","none");
    var stops = container.selectAll("."+line+"-stop").data(lines[line]['stops']).enter().append("circle");
    stops.attr("cy", function(d){
    	//console.log(d['lat'] * 3000 - 51.4 * 3000);
    	return parseInt(container.attr("height")) - Math.floor((d['lat'] - 51.395) * 1900);
    });
    stops.attr("cx", function(d){
    	//console.log(Math.floor(d['lon'] * 3000 + .35 * 3000));
    	return Math.floor((d['lon'] + .65) * 1100);
    });
    if(displayNames){
	    var names = container.selectAll("."+line+"-name").data(lines[line]['stops']).enter().append("text");
	    names.attr("y", function(d){
	    	//console.log(d['lat'] * 3000 - 51.4 * 3000);
	    	return parseInt(container.attr("height")) - Math.floor((d['lat'] - 51.395) * 1900) - 6;
	    });
	    names.attr("x", function(d){
	    	//console.log(Math.floor(d['lon'] * 3000 + .35 * 3000));
	    	return Math.floor((d['lon'] + .65) * 1100)+10;
	    });
	names.attr("stroke","black");
	    names.text(function(d){
	    	return d['name'].slice(0, d['name'].indexOf('Underground', 0))/* + " " + d['lon'].toString() + ", " + d['lat'].toString()*/;
	    });
	
	}
    stops.attr("r", 3).attr("stroke","black").attr("stroke-width","1").attr("fill","white");
	stops.classed(line, true)
	
};

getCoords()
