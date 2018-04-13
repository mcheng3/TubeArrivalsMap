var colors = {"bakerloo": '#B36305', 'central':'#e32017', 'circle':'#00782A','hammersmith-city':'#f3a9bb','jubilee':'#a0a5a9',
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
		draw(lines, line, false);
	}
}
function draw(lines, line, displayNames){
	//console.log(lines[line]['stops']);
	console.log('line');
	/*var lines = map.selectAll("line").data(data[line]['stops']).enter().append("line");
    var x1 = data[line]['stops'][0]['lat'];
    var x2 = data[line]['stops'][0]['lon'];
    lines.attr("x1",function(d){
    	x = x1;
    	x1 = d['lat'];
    	console.log(x);
    	lines.attr("x2", function(d){
    		return Math.floor(x1 * 1000 - 51400);
    	});
	   return Math.floor(x * 1000 - 51400);
    });
    lines.attr("y1",function(d){
	   return 1000-Math.floor(d[0]/100);
    });***/
    var container = d3.select("svg");
    var stops = container.selectAll("."+line+"-stop").data(lines[line]['stops']).enter().append("circle");
    var path_coords = [];
    for (var i = 0; i <= lines[line]['stops'].length - 2; i++){
    	var line_coords = [];
    	line_coords.push(lines[line]['stops'][i]['lon']);
    	line_coords.push(lines[line]['stops'][i]['lat']);
    	line_coords.push(lines[line]['stops'][i+1]['lon']);
    	line_coords.push(lines[line]['stops'][i+1]['lat']);
    	path_coords[i] = line_coords;
    };
    //console.log(path_coords);
    var paths = container.selectAll("."+line+"-path").data(path_coords).enter().append("line");
    paths.attr("x1",function(d){
    	console.log(d);
    	return Math.floor(d[0] * 3000 + .35 * 3000);
    });
    paths.attr("y1",function(d){
    	return parseInt(container.attr("height")) - Math.floor(d[1] * 3000 - 51.4 * 3000);
    });
    paths.attr("x2",function(d){
    	return Math.floor(d[2] * 3000 + .35 * 3000);
    });
    paths.attr("y2",function(d){
    	return parseInt(container.attr("height")) - Math.floor(d[3] * 3000 - 51.4 * 3000);
    });
    paths.classed(line, true)
    console.log(colors[line]);
    paths.attr("style", "stroke:"+colors[line]+";stroke-width:3px;")
    stops.attr("cy", function(d){
    	//console.log(d['lat'] * 3000 - 51.4 * 3000);
    	return parseInt(container.attr("height")) - Math.floor(d['lat'] * 3000 - 51.4 * 3000);
    });
    stops.attr("cx", function(d){
    	//console.log(Math.floor(d['lon'] * 3000 + .35 * 3000));
    	return Math.floor(d['lon'] * 3000 + .35 * 3000);
    });
    if(displayNames){
	    var names = container.selectAll("."+line+"-name").data(lines[line]['stops']).enter().append("text");
	    names.attr("y", function(d){
	    	//console.log(d['lat'] * 3000 - 51.4 * 3000);
	    	return parseInt(container.attr("height")) - Math.floor(d['lat'] * 3000 - 51.4 * 3000) - 6;
	    });
	    names.attr("x", function(d){
	    	//console.log(Math.floor(d['lon'] * 3000 + .35 * 3000));
	    	return Math.floor(d['lon'] * 3000 + .35 * 3000)+10;
	    });
	    names.text(function(d){
	    	return d['name'].slice(0, d['name'].indexOf('Underground', 0));
	    });
	}
    stops.attr("r", 5).attr("stroke","black").attr("stroke-width","1").attr("fill","white");
	stops.classed(line, true)
	
};

getCoords()