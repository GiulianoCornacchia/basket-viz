


function sides_chart(data_ply,w,h)
{
	
	
		 
    var margin = {top: 20, right: 30, bottom: 10, left: 30},
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;
		 
		 

		 
	svg = d3.select("#radar").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform","translate(" + 25 + "," + 0 + ")");	 
		 

	
	var left=[]
	var right=[]
	var dim_x=24
	
	var acc_l=0
	
	sides(data_ply,left,right,24)
	
	console.log(left)
	
	for(i=0;i<24;i++)
		acc_l+=left[i]
	
	console.log(left)
	console.log(right)


	var left_line=[]
	var right_line=[]
	var max=0
	 for(i=0;i<dim_x;i++)
	  {		  
		 if(left[i]>max)
			 max=left[i]
		 if(right[i]>max)
			 max=right[i]
		  left_line.push({"a":(-left[i]),"b":i})
		  right_line.push({"a":(right[i]),"b":i})
		  
	  }
  
    left_line.push({"a":0,"b":26})
	right_line.push({"a":0,"b":26})
   
	//findin max n_shot
	
	
   
   
     var xScale = d3.scaleLinear().range([0,width/2,]).domain([-(max+10),0]);

     var yScale = d3.scaleLinear().range([height, 10]).domain([0,28]);
	 
	 var xScale2 = d3.scaleLinear().range([width/2,width]).domain([0,(max+10)]);

     
	 
	 
	 var asse_x = d3.axisBottom().scale(xScale).ticks(5).tickFormat(function(d,i) {return -d});
	 var asse_x2=d3.axisBottom().scale(xScale2).ticks(5);
	 var asse_y = d3.axisLeft().scale(yScale)
	 	
	
	
	
	var line_left= d3.line()
				.x(function(d){return xScale(d.a)})
				.y(function(d){return yScale(d.b)})
				.curve(d3.curveCardinal);
	
	var line_right= d3.line()
				.x(function(d){return xScale2(d.a)})
				.y(function(d){return yScale(d.b)})
				.curve(d3.curveCardinal);
	
	
	
   	 var path = svg.append("path")
						  .datum(left_line)
                          .attr("class", "linea")						  
					      .attr("d", line_left(left_line))
                          .attr("stroke", "red")
						  .attr("opacity",0.6)
                          .attr("stroke-width", 1.5)
                          .attr("fill", "none")
						  
						  
	 var path2 = svg.append("path")
						  .datum(right_line)
                          .attr("class", "linea")						  
					      .attr("d", line_right(right_line))
                          .attr("stroke", "blue")
						  .attr("opacity",0.6)
                          .attr("stroke-width", 1.5)
                          .attr("fill", "none")
						  					  
		 var pnt3_line = svg.append('line')				
							.attr('x1', xScale(0))
							.attr('y1', yScale(0))
							.attr('x2', xScale(0))
							.attr('y2', yScale(width))
							.attr('stroke', "grey")
							.attr('opacity',0.6)
							.attr('stroke-width', 1)
											  
						  
	 var xAxisGroup = svg.append("g")
		                 .attr("transform", "translate(0," + height + ")")
                         .call(asse_x);  
							  
	 var xAxisGroup2 = svg.append("g")
		                 .attr("transform", "translate(0," + height + ")")
                         .call(asse_x2); 
     var yAxisGroup = svg.append("g")
						 .call(asse_y);					  
   
		 
		 
}