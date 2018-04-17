var id_to_modify
var colori
var color
var teammates=[]
var grads
var matrix=[]
var g
var group
var ribbon
var chord


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



function chord_diagram(name_player,name_to_team,total_assist,w,h,text_popup)
{
	
	var linee=[]
	
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
    innerRadius = outerRadius - 15;

	chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending);
	
	var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
	
	ribbon = d3.ribbon()
    .radius(innerRadius);
	
	
	colori= new Array(teammates.length)
	
	for(j=0;j<teammates.length;j++)
		colori[j]=getRandomColor()
	
	console.log(colori);
	
	
	color = d3.scaleOrdinal()
    .domain(d3.range(teammates.length))
    .range(colori);
	
	
	
	g = svg.append("g")
    .attr("transform", "translate(" + (outerRadius+5) + "," + h / 2 + ")")
    .datum(chord(matrix));

	

             grads = svg.append("defs")
            .selectAll("linearGradient")
            .data(chord(matrix))
            .enter()
            .append("linearGradient")
			.attr("class","x1")
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
 group = g.append("g")
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
	.on("mouseout",function(){hig_arc(this.id,1)
							  restore_legend()
							  })


	
	//ARCHI INTERNI
   g.append("g")
    .attr("class", "ribbons")
  .selectAll("path")
  .data(function(chords) { return chords; })
  .enter().append("path")
    .attr("d", ribbon)
	.attr("class", function(d) {
              return "chord chord-" + d.source.index + " chord-" + d.target.index // The first chord allows us to select all of them. The second chord allows us to select each individual one. 
            })
	.style("fill", function(d){ return "url(#" + getGradID(d) + ")"; })


		var legend_txt=svg.append("text")
        .attr("x", 0)             
        .attr("y", 12)
		.attr("text-anchor", "left") 
        .style("font-size", "13px")
		.attr("fill", "black")
		.attr("opacity",1)
        .text("Team assists")
		.on("mouseover",function(){show_popup(w*0.88,h*0.8,"Chord Diagram",linee,svg,"chord",0,0,"15px","12px"); document.body.style.cursor = "help"})
		.on("mouseout",function(){hide_popup("chord");document.body.style.cursor = "default";})


//// DRAWING THE LEGEND ON THE RIGHT



var legendScale = d3.scaleLinear().domain([0, teammates.length]).range([15,h-15]);
   
console.log(teammates.length)

   
for(var i=0;i<teammates.length;i++)
{
	y_scaled = legendScale(i)
	
	console.log(teammates[i])
	
	 svg.append('rect')
    .attr('x',w-100)
    .attr('y',y_scaled)
    .attr('width',12)
	.attr('height',12)
	.attr("id","Leg_rec-"+i)
	.attr("class","legend_square")
	.attr("stroke","black")
	.attr("stroke-width","1")
    .attr('fill',color(i))
	.on("dblclick",function(){
		document.getElementById('foo').jscolor.show()
		id_to_modify=this.id;
	
		})
	
	var surname=teammates[i].split(" ")
	
	svg.append("text")
        .attr("x", w-80)             
        .attr("y", y_scaled+10)
		.attr("id","Leg_txt-"+i)  
		.attr("class","legend_name")
        .style("font-size", "12px") 
		.attr("fill","black")
		.on("dblclick",function(){
			var n=(this.id).split("-")
			var ind = parseInt(n[1])
			setURL(teammates[ind]);update()})
		.on("click",function(){
			var n=(this.id).split("-")
			var ind = parseInt(n[1])
			hig_arc("R"+ind,0.1)})	
		.on("mouseover",function(){document.body.style.cursor = "pointer";})
		.on("mouseout",function(){
			var n=(this.id).split("-")
			var ind = parseInt(n[1])
			hig_arc("R"+ind,1)
			document.body.style.cursor = "default";
			restore_legend()})
        .text(surname[1])
	
	
}

var text_chord="This type of diagram shows the inter-relationships between entities."
text_chord = text_chord+" In this case using assists as relation between players of the same team." 
text_chord = text_chord+" The players are arranged along a circle, each of them is represented as a circular segment which length is "
text_chord = text_chord+"proportional at the fraction of assists the player made."
text_chord = text_chord+" The relation between players A and B is shown as an arch that connects them,"
text_chord = text_chord+" the width of the arch on A is proportional at the fraction of the assists that A made to B among A's total assists"
text_chord = text_chord+", the same for B."
text_chord = text_chord+" The list on the right allows to highlight a player by clicking over the name, double clicking on it"
text_chord = text_chord+" shows the player's page and over the colored box allows to change the color associated."

create_popup(svg,w*0.8,h*0.8,20,20,0.95,"chord")
create_text((w*0.8-15),text_chord,linee,svg,"chord","12px")


console.log(linee)



function legend_opacity(touched,tot)
{
	for(i=0;i<=tot;i++)
		if(touched.indexOf(i)==-1)	
		{
			d3.select("#Leg_txt-"+i).transition().duration(300).style("opacity",0.3)
			d3.select("#Leg_rec-"+i).transition().duration(300).style("opacity",0.2)
		}	
}


function restore_legend()
{
	d3.selectAll(".legend_name").style("fill","black").style("opacity",1).style("font-size","12px")
	d3.selectAll(".legend_square").style("opacity",1)
}

function hig_name(index)
{
	d3.selectAll("#Leg_txt-"+index).style("fill","blue").style("font-size","14px")
		
}



function hig_arc(id_target,op)
{

	
	str=id_target.replace("R","")
	

	d3.selectAll("path.chord").filter(function(d){ return (str!=d.source.index && str!=d.target.index)})
	.transition()
	.duration(500)
	.attr("opacity",op)
	
	//working on the legend
	
	//highlight player source
	
	hig_name(str)
	
	if(op!=1)
	{
	var tou=[]
	d3.selectAll("path.chord").each(function(d){ if(str==d.source.index)
													if(tou.indexOf(d.target.index)==-1)
														tou.push(d.target.index)
													if(str==d.target.index)
														
													if(tou.indexOf(d.source.index)==-1)
														tou.push(d.source.index)
												})
											
	tou.push(parseInt(str))	
	console.log(tou)	
	legend_opacity(tou,teammates.length)											
	}
}




	d3.select("#rect_info").attr("width",0).attr("height",0)
    d3.selectAll("#text_pop").remove()	
}

function update_color(color)
{
	var id=id_to_modify.split("Leg_rec-")
	
	d3.selectAll("#"+id_to_modify).attr("fill","#"+color)
	console.log(id[1])

	col1=["#"+color]
	
	cl = d3.scaleOrdinal()
    .domain(d3.range(1))
    .range(col1); 
	
	d3.selectAll("#R"+id[1]).style("fill","#"+color)
							.style("stroke", function(d) { return d3.rgb(cl(id[1])).darker(); })
				
	colori[id[1]]="#"+color
	
	d3.selectAll(".x1").remove()
	

	
	color2 = d3.scaleOrdinal()
    .domain(d3.range(teammates.length))
    .range(colori);

	   grads2 = svg.append("defs")
            .selectAll("linearGradient")
            .data(chord(matrix))
            .enter()
            .append("linearGradient")
            .attr("id", getGradID)
			.attr("class","x1")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", function(d, i){ return innerRadius * Math.cos((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2); })
            .attr("y1", function(d, i){ return innerRadius * Math.sin((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2); })
            .attr("x2", function(d,i){ return innerRadius * Math.cos((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2); })
            .attr("y2", function(d,i){ return innerRadius * Math.sin((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2); })

            // set the starting color (at 0%)

            grads2.append("stop")
              .attr("offset", "0%")
              .attr("stop-color", function(d){ return color2(d.source.index)})

              //set the ending color (at 100%)
            grads2.append("stop")
              .attr("offset", "100%")
              .attr("stop-color", function(d){ return color2(d.target.index)})
	
	d3.selectAll(".chord-"+id[1]).style("fill", function(d){ return "url(#" + getGradID(d) + ")"; })
	
	
}

  function getGradID(d)
  { return "linkGrad-" + d.source.index + "-" + d.target.index; }