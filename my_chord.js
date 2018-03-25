

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
					matrix[i][j]=parseInt(x[0][0].count)
				else
					matrix[i][j]=0
			}
			else
				matrix[i][j]=0
		
	console.log(matrix);
	
	//chord_diagram
	
 svg = d3.select("#chord").append("svg")
              .attr("width", w)
              .attr("height", h)
    
	outerRadius = Math.min(w, h) * 0.5 - 10,
    innerRadius = outerRadius - 20;

	var chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending);
	
	var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
	
	var ribbon = d3.ribbon()
    .radius(innerRadius);
	
	
	var colori= new Array(teammates.length)
	
	for(j=0;j<teammates.length;j++)
		colori[j]=getRandomColor()
	
	console.log(colori);
	
	
	var color = d3.scaleOrdinal()
    .domain(d3.range(teammates.length))
    .range(colori);
	
	var g = svg.append("g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
    .datum(chord(matrix));

//ARCO ESTERNO	
var group = g.append("g")
    .attr("class", "groups")
  .selectAll("g")
  .data(function(chords) { return chords.groups; })
  .enter().append("g")
  

  

group.append("path")
    .style("fill", function(d) { return color(d.index); })
	.attr("id",function(d){ return("R"+d.index)})
    .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
    .attr("d", arc)
	.on("mouseover",function(){console.log("QUAA"); hig_arc(this.id)})
	.on("mouseout",function(){console.log("QUAA"); d3.selectAll("#arco").attr("opacity",0.9)})

var groupTick = group.selectAll(".group-tick")
  .data(function(d) { return d; })
  .enter().append("g")
    .attr("class", "group-tick")
    .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

	groupTick
  .append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    .text(function(d) { return formatValue(d.value); });
	
	//ARCHI INTERNI
	g.append("g")
    .attr("class", "ribbons")
  .selectAll("path")
  .data(function(chords) { return chords; })
  .enter().append("path")
    .attr("d", ribbon)
	.attr("id","arco")
	.attr("class", function(d){ return("A"+d.target.index+" "+"A"+d.source.index)})
    .style("fill", function(d) { return color(d.target.index); })
	.on("mouseover",function(){console.log("ARCO")})
    .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });
	
	




	
function hig_arc(id_target)
{
	console.log("H_A su "+id_target)
	
	str=id_target.replace("R","")
	
	d3.selectAll("#arco").attr("opacity",0.08)
	d3.selectAll(".A"+str).attr("opacity",1)
	
}				
		
	
}


