

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

	
	
	 // creating the fill gradient
          function getGradID(d){ return "linkGrad-" + d.source.index + "-" + d.target.index; }


          var grads = svg.append("defs")
            .selectAll("linearGradient")
            .data(chord(matrix))
            .enter()
            .append("linearGradient")
            .attr("id", getGradID)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", function(d, i){ return innerRadius * Math.cos((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2); })
            .attr("y1", function(d, i){ return innerRadius * Math.sin((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2); })
            .attr("x2", function(d,i){ return innerRadius * Math.cos((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2); })
            .attr("y2", function(d,i){ return innerRadius * Math.sin((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2); })

            // set the starting color (at 0%)

            grads.append("stop")
              .attr("offset", "0%")
              .attr("stop-color", function(d){ return color(d.source.index)})

              //set the ending color (at 100%)
            grads.append("stop")
              .attr("offset", "100%")
              .attr("stop-color", function(d){ return color(d.target.index)})
	
	
	
	
	
	
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
	.on("mouseover",function(){hig_arc(this.id,0.1)})
	.on("mouseout",function(){hig_arc(this.id,1)})


	
	//ARCHI INTERNI
	g.append("g")
    .attr("class", "ribbons")
  .selectAll("path")
  .data(function(chords) { return chords; })
  .enter().append("path")
    .attr("d", ribbon)
	.attr("opacity",1)
	
	.attr("class", function(d) {
              return "chord chord-" + d.source.index + " chord-" + d.target.index // The first chord allows us to select all of them. The second chord allows us to select each individual one. 
            })
	.style("fill", function(d){ return "url(#" + getGradID(d) + ")"; })
	






	
function hig_arc(id_target,op)
{

	console.log("H_A su "+id_target)
	
	str=id_target.replace("R","")
	
	d3.selectAll("path.chord").filter(function(d){ return (str!=d.source.index && str!=d.target.index)})
	.transition()
	.duration(500)
	.attr("opacity",op)
	
	
	
	//d3.selectAll(".chord-"+str).attr("opacity",1)

			
	
}

}
