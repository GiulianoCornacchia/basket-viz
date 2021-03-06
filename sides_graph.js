


function sides_chart(data_ply,w,h,delay,legend_text)
{
	
	
		 
    var margin = {top: 20, right: 10, bottom: 0, left: 30},
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;
		 
		 

		 
	var svg = d3.select("#radar").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform","translate(" + 25 + "," + 0 + ")");	 
		 
	
	var linee=[]
	var left=[]
	var right=[]
	var dim_x=30
	
	var acc_l=0
	
	sides(data_ply,left,right,30)
	
	console.log(left)
	
	for(i=0;i<30;i++)
		acc_l+=left[i]
	
	console.log(left)
	console.log(right)


	var left_line=[]
	var right_line=[]
	var diff_line=[]
	var max=0
	 for(i=0;i<dim_x;i++)
	  {		  
		 if(left[i]>max)
			 max=left[i]
		 if(right[i]>max)
			 max=right[i]
		 
		  left_line.push({"a":(-left[i]),"b":i})
		  right_line.push({"a":(right[i]),"b":i})
		  diff_line.push({"a":(right[i]-left[i]),"b":i})
		  
	  }
  
    left_line.push({"a":0,"b":30})
	right_line.push({"a":0,"b":30})
	diff_line.push({"a":0,"b":30})
   
	//findin max n_shot
	
	
   
   
     var xScale = d3.scaleLinear().range([0,width/2,]).domain([-(max+10),0]);

     var yScale = d3.scaleLinear().range([height, 20]).domain([0,dim_x]);
	 
	 var xScale2 = d3.scaleLinear().range([width/2,width]).domain([0,(max+10)]);

     var xScale3 = d3.scaleLinear().range([0,width]).domain([-(max+10),(max+10)]);
	 
	 
	 var asse_x = d3.axisBottom().scale(xScale).ticks(5).tickFormat(function(d,i) {return -d});
	 var asse_x2=d3.axisBottom().scale(xScale2).ticks(5);
	 var asse_y = d3.axisLeft().scale(yScale)
	 	
	var area = d3.area()
	.x(function(d) { return xScale(d.a); })
	.y0(height)
	.y1(function(d) { return yScale(d.b); })
	.curve(d3.curveCardinal);
	
	var area2 = d3.area()
	.x(function(d) { return xScale2(d.a); })
	.y0(height)
	.y1(function(d) { return yScale(d.b); })
	.curve(d3.curveCardinal);
	
	var line_left= d3.line()
				.x(function(d){return xScale(d.a)})
				.y(function(d){return yScale(d.b)})
				.curve(d3.curveCardinal);
	
	var line_right= d3.line()
				.x(function(d){return xScale2(d.a)})
				.y(function(d){return yScale(d.b)})
				.curve(d3.curveCardinal);
	
	
	var line_diff= d3.line()
				.x(function(d){return xScale3(d.a)})
				.y(function(d){return yScale(d.b)})
				.curve(d3.curveCardinal);
	
	
	var pnt3_line = svg.append('line')				
							.attr('x1', xScale(-(max+10)))
							.attr('y1', yScale(23.75))
							.attr('x2', xScale2((max+10)))
							.attr('y2', yScale(23.75))
							.attr('stroke', "grey")
							.attr('opacity',0.6)
							.attr('stroke-width', 2)
							.attr('stroke-dasharray',"5, 10")

	var line = svg.append('line')				
							.attr('x1', xScale(0))
							.attr('y1', yScale(0))
							.attr('x2', xScale2(0))
							.attr('y2', yScale(30))
							.attr('stroke', "grey")
							.attr('opacity',0.6)
							.attr('stroke-width', 1)
							
	
   	 var path = svg.append("path")
						  .datum(left_line)
                          .attr("class", "linea")						  
					      .attr("d", line_left(left_line))
                          .attr("stroke", "red")
						  .attr("opacity",1.5)
                          .attr("stroke-width", 1.5)
                          .attr("fill", "none")
						  
						  
	 var path2 = svg.append("path")
						  .datum(right_line)
                          .attr("class", "linea")						  
					      .attr("d", line_right(right_line))
                          .attr("stroke", "blue")
						  .attr("opacity",1)
                          .attr("stroke-width", 1.5)
                          .attr("fill", "none")
						  
	var path3 = svg.append("path")
						  .datum(diff_line)
                          .attr("class", "linea")						  
					      .attr("d", line_diff(diff_line))
                          .attr("stroke", "grey")
						  .attr("opacity",0.3)
                          .attr("stroke-width", 1)
                          .attr("fill", "none")					  
						  					  

											  
						  
	 var xAxisGroup = svg.append("g")
		                 .attr("transform", "translate(0," + height + ")")
                         .call(asse_x);  
							  
	 var xAxisGroup2 = svg.append("g")
		                 .attr("transform", "translate(0," + height + ")")
                         .call(asse_x2); 
     var yAxisGroup = svg.append("g")
						 .call(asse_y);					  
   
   
      var mouse_line = svg.append('line')				
							.attr('x1', xScale(-max-10))
							.attr('y1', yScale(20))
							.attr('x2', xScale2(max+10))
							.attr('y2', yScale(20))
							.attr('opacity',0)
							.attr('stroke', "lightgrey")
							.attr('stroke-width', 1.5)
   
   
		var txt_left=svg.append("text")
        .attr("x", 10)             
        .attr("y", 0)
        .attr("text-anchor", "right")  
        .style("font-size", "12px")
		.attr("fill", "red")
		.attr("opacity",0) 
        .text("");
		
		
		
		var txt_right=svg.append("text")
        .attr("x", xScale2(max+10)-35)             
        .attr("y", 0)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px")
		.attr("fill", "blue")
		.attr("opacity",0) 
        .text("");
		
   		






		
	  var totalLength = path.node().getTotalLength();					  
						  
						  
						  	
	  path.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
	    .delay(delay)
        .duration(2000)
        .attr("stroke-dashoffset", 0);
   
   	  var totalLength = path2.node().getTotalLength();					  
						  
						  
						  	
	  path2.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
	    .delay(delay)
        .duration(2000)
        .attr("stroke-dashoffset", 0);
   
   
   
    var r = svg.append('rect')
	  .attr("id","rect_mouse")
	  .attr("width", width)
      .attr("height", height)
	  .attr("opacity", 0)
	  .on("mouseover",function(){
								 mouse_line.attr("opacity",1)
								 txt_left.attr("opacity",1)
								 txt_right.attr("opacity",1)
								 })
	  .on("mouseout",function(){
								mouse_line.attr("opacity",0)
								 txt_left.attr("opacity",0)
								 txt_right.attr("opacity",0)
								})
   
	  .on("mousemove",function(){ 
		  x = d3.mouse(this)[0]
		  y = d3.mouse(this)[1]

		  y_bin = Math.round(yScale.invert(y))
		  
		  if(y_bin<30)
		  { 
		  
		  y_line = yScale(y_bin)
		  	
		  mouse_line.attr("y1",y_line).attr("y2",y_line)
		
		  var str_left = (left_line[y_bin].a).toString()
		  str_left=str_left.replace("-","")
		  
		  var str_right = (right_line[y_bin].a).toString()
		
		  var tot=-left_line[y_bin].a+right_line[y_bin].a
		
		  var pct_left = ((-left_line[y_bin].a/tot*100).toFixed(2))
		  
		  var pct_right = ((right_line[y_bin].a/tot*100).toFixed(2))
		  
		  if(tot==0)
		  {
			  pct_left=0
			  pct_right=0
		  } 
		

		 txt_left.attr("y",y_line-4).text(str_left+" ("+pct_left+"%)")
		 
		 txt_right.attr("y",y_line-4).text("("+pct_right+"%) "+str_right)
		  
		  }
	  })
	  
	  
	  
		var txt_title=svg.append("text")
        .attr("x", 0)             
        .attr("y", 15)
        .attr("text-anchor", "right")  
        .style("font-size", "13px")
		.attr("fill", "black")
		.attr("opacity",1) 
        .text("Shot Side Chart")
		.on("mouseover",function(){show_popup(w*0.75,h*0.45,"Shot Side Chart",linee,svg,"sides",0,0,"15px","12px"); document.body.style.cursor = "help"})
		.on("mouseout",function(){hide_popup("sides");document.body.style.cursor = "default";})

	  
	var text_sides = "This plot shows the shot-side tendencies for a player. "
	text_sides = text_sides+"In the x-axis we have the number of shot and on the y-axis the distance in feet from the rim. "
	text_sides = text_sides+"The red line represent the shots made from the left, the blue from the right"
	text_sides = text_sides+" while the grey line shows the difference between the number of shots."
	
	create_popup(svg,w*0.8,h*0.8,20,20,0.95,"sides")
	create_text((w*0.8-15),text_sides,linee,svg,"sides")
	  
		 
}