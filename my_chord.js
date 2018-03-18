

function ast_from_to(data,f,t)
{
	
	d1 = data.filter(function(d){return d.from == f && d.to == t;})
	
	if(d1!=[])
		return [d1]
	else
		return 0
	
}




function give_teammates(data,name,vector)
{
	
		
		d1 = data.filter(function(d){return d.name == name;})
		
		team=d1[0].team_name
		
		console.log("sq "+team)

		d2 = data.filter(function(d){return d.team_name == team;})	
		
		
		for(i=0;i<d2.length;i++)
			vector[i]=d2[i].name
		
			
		
}



function chord_diagram(name_player,name_to_team,total_assist,w,h)
{
	var teammates=[]
	var matrix=[]
	give_teammates(name_to_team,name_player,teammates)
	teammates.sort()
	console.log(teammates)
	
	//building the matrix, it is a square matrix dim= teammates.lenght
	for(var i=0; i<teammates.length; i++) 	
		matrix[i] = new Array(teammates.length);
		
		
		
	//filling the matrix, the cell [i,j] contains the num of assist FROM i to j	
	for(i=0;i<teammates.length;i++)
		for(j=0;j<teammates.length;j++)			
			if(i!=j)
			{
				x=ast_from_to(total_assist,teammates[i],teammates[j])
				if(x[0].length!=0)
					matrix[i][j]=x[0][0].count
				else
					matrix[i][j]=0
			}
			else
				matrix[i][j]=0
		
		
	//_________CHORD_________
		
		 
    var margin = {top: 20, right: 30, bottom: 20, left: 30},
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;	
		
	d3.select("#chord").append("svg")
	  .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
	


}


function mah()
{
	/*var matrix = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];
*/
	var teammates=[]
	var matrix=[]
	give_teammates(name_to_team,name_player,teammates)
	teammates.sort()
	console.log(teammates)
	
	//building the matrix, it is a square matrix dim= teammates.lenght
	for(var i=0; i<teammates.length; i++) 	
		matrix[i] = new Array(teammates.length);
		
		
		
	//filling the matrix, the cell [i,j] contains the num of assist FROM i to j	
	for(i=0;i<5;i++)
		for(j=0;j<5;j++)			
			if(i!=j)
			{
				x=ast_from_to(total_assist,teammates[i],teammates[j])
				if(x[0].length!=0)
					matrix[i][j]=x[0][0].count
				else
					matrix[i][j]=0
			}
			else
				matrix[i][j]=0
		




width=350
height=300

var svg = d3.select("#chord").append("svg")
    .attr("width",350)
    .attr("height", 300)
    outerRadius = Math.min(width, height) * 0.5 - 40,
    innerRadius = outerRadius - 30;

var formatValue = d3.formatPrefix(",.0", 1e3);

var chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending);

var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var ribbon = d3.ribbon()
    .radius(innerRadius);

var color = d3.scaleOrdinal()
    .domain(d3.range(4))
    .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .datum(chord(matrix));

var group = g.append("g")
    .attr("class", "groups")
  .selectAll("g")
  .data(function(chords) { return chords.groups; })
  .enter().append("g");

group.append("path")
    .style("fill", function(d) { return color(d.index); })
    .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
    .attr("d", arc);
/*
var groupTick = group.selectAll(".group-tick")
  .data(function(d) { return groupTicks(d, 1e3); })
  .enter().append("g")
    .attr("class", "group-tick")
    .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

groupTick.append("line")
    .attr("x2", 6);

groupTick
  .filter(function(d) { return d.value % 5e3 === 0; })
  .append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    .text(function(d) { return formatValue(d.value); });
*/
g.append("g")
    .attr("class", "ribbons")
  .selectAll("path")
  .data(function(chords) { return chords; })
  .enter().append("path")
    .attr("d", ribbon)
    .style("fill", function(d) { return color(d.target.index); })
    .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

// Returns an array of tick angles and values for a given group and step.
function groupTicks(d, step) {
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(function(value) {
    return {value: value, angle: value * k + d.startAngle};
  });
}
}

