

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
    innerRadius = outerRadius - 15;

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
    .attr("transform", "translate(" + (outerRadius+5) + "," + h / 2 + ")")
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
  
  group.append("title")
      .text(function(d) { return d.id; });

  

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
        .attr("y", 14)
		.attr("text-anchor", "left") 
        .style("font-size", "14px")
		.attr("fill", "black")
		.attr("opacity",1)
        .text("Team assists");	  	
	  


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

var old_id=""
	
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

}
