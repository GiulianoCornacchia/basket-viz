//grafici




function compare(a,b)
{
	a1 = a.value.count
	b1 = b.value.count
	
	return -(a1-b1)
}





function my_gb(data,val,name)
{
	   
	
	
		//filtering total_defender over name
	  
		data = data.filter(function(d){return d.name == name;})
		  
		 //group by defender name
		 
		  var expensesByName = d3.nest()
         .key(function(d) { return d.defender_name; })
         .entries(data);
		 
		
		 
		  var expensesCount = d3.nest()
			.key(function(d) { return d.defender_name; })
		    .rollup(function(v) { return{
					count: v[0].n_shot,
					made: v[0].n_made
									}})
            .entries(data);
		  
		
		  expensesCount.sort(compare)
		  
		  
		num=5;
		for(i=0;i<num;i++)
		{		
			if(expensesCount[i].key=="")
				num=num+1;
			else
			{ 
		
			console.log(expensesCount[i].key+" - "+expensesCount[i].value.count+" - "+expensesCount[i].value.made+"/"+expensesCount[i].value.miss)		
			  val.push({"name":String(expensesCount[i].key),"pct":Number((expensesCount[i].value.made/expensesCount[i].value.count))})
			}
		}
		
	  last_name = val[0].key
	  last_pct = val[0].pct
	  
	  val.push({"name":"x","pct":last_pct})



	
}






function fg_opp(data_init,name_p)
{
	

	
	data = data_init.filter(function(d){return d.defender_name == name_p;})
	

	  var expensesByName = d3.nest()
         .key(function(d) { return d.defender_name; })
         .entries(data);
	
	
	
	  var expensesCount = d3.nest()
			.key(function(d) { return d.defender_name; })
		    .rollup(function(v) { return{
					count: d3.sum(v,function(d){return d.n_shot}),
			        made: d3.sum(v,function(d){return d.n_made}),
					}})
            .entries(data);
	

	return(expensesCount[0].value.made/expensesCount[0].value.count)
	
}


function fg_pct(data)
{
	dim_tot = data.length
		
	made=0.0
	  
	  for(i=0;i<dim_tot;i++)
	    if(data[i].shot_made_flag == 1)
		  made=made+1
		
	return made/dim_tot
	
	
}


function line_chart(data,w,h,id,delay,fun,c_line,c_area,scale_dom,delay,dim_x,legend_text){
	

		console.log(min(4,0))
	
	
	div_id='#'+id
	var vector=[]
	var abc=[]

		  if(fun=="fg_dist")
			array_fg_dist(data,vector,dim_x)

		  if(fun=="freq_dist")
			array_freq_dist(data,vector,dim_x)
		
		 if(fun=="fg_clock")
			 array_fg_clock(data,vector,dim_x)
		 
	     if(fun=="freq_clock")
			array_freq_clock(data,vector,dim_x)
		
		 if(fun=="freq_min")
			array_freq_min(data,vector,48)
		
		 if(fun=="fg_min")
			array_fg_min(data,vector,48)
	  
	  
	var margin = {top: 20, right: 10, bottom: 30, left: 35},
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;
	 

	  
	
	  
	 
	  y_max = 0.15
	  
	  
	  for(i=0;i<dim_x;i++)
	  {		  
		  abc.push({"a":i,"b":vector[i]})
		  
	  }
  
   abc.push({"a":dim_x-1,"b":0})
	  
	  
	 
	  //creazione assi grafo
	  
	  if(scale_dom)
		  y_max=0.25
	  else
		  y_max=1
	  
	 if(fun=="freq_min")
		 y_max = 0.1
	 
	 
     var xScale = d3.scaleLinear().range([0, width]).domain([0,dim_x]);

     var yScale = d3.scaleLinear().range([height, 0]).domain([0,y_max]);
	 
	 var mouseScale = d3.scaleLinear().range([0, dim_x]).domain([0,width]);
	 
	 
	 var gc = d3.scaleLinear().range([0, width]).domain([0,dim_x]);

    var asse_x = d3.axisBottom().scale(xScale).ticks(15);	
	var asse_y = d3.axisLeft().scale(yScale).ticks(5).tickFormat(function(d,i) {return (y_max/5*i*100).toFixed(0)+'%'});	
	

	  
	  
	  
	  

	 
	  svg = d3.select(id).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform","translate(" + margin.left + "," + margin.top + ")");
	  

	
	  
	  
	
						 
						 
	var area = d3.area()
    .x(function(d) { return xScale(d.a); })
    .y0(height)
    .y1(function(d) { return yScale(d.b); })
	.curve(d3.curveCardinal);

		
		  var line= d3.line()
				.x(function(d){return xScale(d.a)})
				.y(function(d){return yScale(d.b)})
				.curve(d3.curveCardinal);
				
	 var path = svg.append("path")
						  .datum(abc)
                          .attr("class", "linea")						  
					      .attr("d", line(abc))
                          .attr("stroke", c_line)
						  .attr("opacity",0.6)
                          .attr("stroke-width", 1.5)
                          .attr("fill", "none")
	
	 var area_ug = svg.append("path")
						.data(abc)
						.attr("class", "area")
						.attr("fill",c_area)
						.attr("opacity","0.0")
						.attr("d", area(abc));
	
	
	var blank_bottom = svg.append("rect")
						 .attr("x",0)
						 .attr("y",height)
						 .attr("width",width)
						 .attr("height",20)
						 .attr("fill", "white")
	

	 var xAxisGroup = svg.append("g")
		                 .attr("transform", "translate(0," + height + ")")
                         .call(asse_x);  
							  
	
     var yAxisGroup = svg.append("g")
						 .call(asse_y);
	
				
		   
	   
	  

						
	   var mouse_line = svg.append('line')				
							.attr('x1', 0)
							.attr('y1', 0)
							.attr('x2', 0)
							.attr('y2', height)
							.attr('opacity',0)
							.attr('stroke', "lightgrey")
							.attr('stroke-width', 2)
	
	   var x_3 = Math.round(xScale(23.75))
	   

	
	
	   var pnt3_line = svg.append('line')				
							.attr('x1', x_3)
							.attr('y1', height)
							.attr('x2', x_3)
							.attr('y2', height)
							.attr('stroke', "grey")
							.attr('opacity',0.6)
							.attr('stroke-width', 2)
							.attr('stroke-dasharray',"5, 10")

	
	
	

	
	
	   var mouse_circle=svg.append('circle')	
					 .attr("cx",100)
					 .attr("cy",100)
					 .attr("r",5)
					 .attr("stroke","black")
					 .attr("fill","None")
					 .attr("stroke-width",1)
					 .attr("opacity",0)

					 
		var txt_3pnt=svg.append("text")
        .attr("x", x_3+3)             
        .attr("y", 0)
        .attr("text-anchor", "right")  
        .style("font-size", "12px")
		.attr("fill", "grey")
		.attr("opacity",0)
        .text("3pnt");
		
		
		var legend_txt=svg.append("text")
        .attr("x", width/2)             
        .attr("y", 0)
		.attr("text-anchor", "middle") 
        .style("font-size", "14px")
		.style("font-style", "italic")
		.attr("fill", c_line)
		.attr("opacity",1)
        .text(legend_text);
					 
		if(fun=="fg_clock"||fun=="freq_clock" || fun=="fg_min"||fun=="freq_min")
		{
			pnt3_line.attr("opacity",0)
			
		}
				
					 
			

		
		var txt_rec = svg.append("rect")
					 .attr('x',0)
					 .attr('y',-10)
					 .attr('width',40)
					 .attr('height',15)
					 .attr('fill',"white")
					 .attr('opacity',0)

		var txt_pct=svg.append("text")
        .attr("x", 0)             
        .attr("y", 0)
        .attr("text-anchor", "right")  
        .style("font-size", "12px")
		.attr("fill", "black")
		.attr("opacity",0) 
        .text("");
		
		// filtro per glowe 

		var defs = svg.append("defs");
		
		var filter = defs.append("filter")
	                     .attr("id","glow");
		
		filter.append("feGaussianBlur")
	          .attr("stdDeviation","2.5")
	          .attr("result","coloredBlur");
			  
		var feMerge = filter.append("feMerge");
		
					 feMerge.append("feMergeNode")
		 	                .attr("in","coloredBlur");
		feMerge.append("feMergeNode")
				.attr("in","SourceGraphic");

				
		
		//animation 		
				  				  
	  var totalLength = path.node().getTotalLength();					  
						  

	//d3.selectAll(".linea").style("filter", "url(#glow)");
		
						  
						  	
	  path.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
	    .delay(delay)
        .duration(2000)
        .attr("stroke-dashoffset", 0);
		
		
		pnt3_line
		.transition()
		.delay(delay)
		.duration(1500)
		.attr("y1",0)
		
		if(fun!="fg_clock" && fun!="freq_clock" && fun!="fg_min" && fun!="freq_min")
		txt_3pnt
		.transition()
		.delay(delay)
		.duration(1500)
		.attr("opacity",1)

		area_ug
		.transition()
		.delay(delay+1000)
		.duration(1000)
		.attr("opacity", 0.3);
	  
    
	
	  var r = svg.append('rect')
	  .attr("id",id)
	 
	  //.attr("fill","red")
	  .attr("width", width)
      .attr("height", height)
	  .attr("opacity", 0)
	  .on("mouseover",function(){path.attr("opacity",0.8)
								 mouse_line.attr("opacity",1)
								 txt_pct.attr("opacity",1)
								 txt_rec.attr("opacity",0.7)
								 area_ug.attr("opacity",0.7)
								 mouse_circle.attr("opacity",1)})
	  .on("mouseout",function(){path.attr("opacity",0.7)
								txt_pct.attr("opacity",0)
								txt_rec.attr("opacity",0)
								mouse_line.attr("opacity",0)
								area_ug.attr("opacity",0.3)
								mouse_circle.attr("opacity",0)})
	  .on("mousemove",function(){
		  x = d3.mouse(this)[0]
		  y = d3.mouse(this)[1]
		  
		  
		  
		  

		 x2 = mouseScale(x)
		 x2 = Math.round(x2)
		 
		 x=gc(x2)
		  
		  
		  y=yScale(abc[x2].b)
		  
		  
		  mouse_line.attr("x1",x)
					.attr("x2",x)
		  
		  mouse_circle.attr("cx",x)
					  .attr("cy",y)
		  
		  
		  txt_pct.attr("x",x)
		  .text((100*(abc[x2].b)).toFixed(2)+"%")
		  
		  txt_rec.attr("x",x)
				 .attr("opacity",1)
		  
		  
		  
		  })
	      

	  
	
 
	  
	  
  
}





function radar_chart(data_def,w,h,num_elem,r,delay,data_ply,name,legend_text)
{
	
	
		 
    var margin = {top: 20, right: 30, bottom: 20, left: 30},
    width = w - margin.left - margin.right,
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;
		 
		 

		 
	svg = d3.select("#radar").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform","translate(" + w/2 + "," + h/2 + ")");	 
		 


angle=2*Math.PI/num_elem;	
start=-Math.PI/2;

n_circle=3
		
	
		
		var rScale = d3.scaleLinear().range([0, r]).domain([0, 0.9]);
		
		
		
	for(i=0;i<num_elem;i++)	
	{	
			x2 = r * Math.cos(start+(i*angle));
			y2 = r * Math.sin(start+(i*angle));

		  a = svg.append('line')				
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', 0)
			.attr('y2', 0)
			.attr('stroke', "grey")
			.attr('stroke-width', 1) 
			.attr('opacity','0.5')
			
			a.transition()
			.delay(delay)
			.duration(1500)
			.attr('x2', x2)
			.attr('y2', y2)
									  
	}	
	
	
	for(j=1;j<=n_circle;j++)	
{	var c = svg.append('circle')
			.attr('cx',0)
			.attr('cy',0)
			.attr('r',0)
			.attr('stroke', "grey")
			.attr('fill','none')
			.attr('opacity','0.5')
			.attr('stroke-width', 1) 
			
			c.transition()
			.delay(delay+j*100)
			.duration(1500)
			.attr('r', j*rScale(0.3))
			
			
}	

	var val=[]
	var abc=[]
	var pct_def=[]
	
	
	my_gb(data_def,val,name)
	
	

	
	console.log(val)
	
	var ns=[]
	
	//DRAW defenders names
	
for(i=0;i<num_elem;i++)	
	{	
			x2 = (r+10) * Math.cos(start+(i*angle));
			y2 = (r+10) * Math.sin(start+(i*angle));
			
		ns[i]=svg.append("text")
        .attr("x", x2)             
        .attr("y", y2)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .style("text-decoration", "underline")  
        .text(val[i].name)
		.on("click",function(){ setURL(this.innerHTML);update()})
		.on("mouseover",function(){document.body.style.cursor = "pointer";})
		.on("mouseout",function(){document.body.style.cursor = "default";})
		
	
			
	}
	
	
	
	for(i=0;i<=num_elem;i++)	
	{	
			x2 = rScale(val[i].pct) * Math.cos(start+(i*angle));
			y2 = rScale(val[i].pct) * Math.sin(start+(i*angle));
			
			abc.push({"a":x2,"b":y2})
		  							  
	}	
	
	
	//compute def FG of the five players
	for(i=0;i<num_elem;i++)
	{
		pct = fg_opp(data_def,val[i].name)
		

	  console.log(pct)
	
		x = rScale(pct) * Math.cos(start+(i*angle));
		y = rScale(pct) * Math.sin(start+(i*angle));
			
			pct_def.push({"a":x,"b":y})
	}
	
	pct_def[num_elem]=pct_def[0]
	
	
	
	 var line = d3.line()
				.x(function(d){return d.a})
				.y(function(d){return d.b})
				.curve(d3.curveCardinal);
	

	
				
	var area = d3.area()
    .x(function(d) { return d.a })
    .y0(height)
    .y1(function(d) { return d.b })
	.curve(d3.curveCardinal);
				

		var fg = svg.append('circle')
					.attr('cx',0)
					.attr('cy',0)
					.attr('r',0)
					.attr("stroke", "blue")
					.attr("fill", "lightblue")
					.attr("opacity",0.0)
					.on("mouseover",function(){fg.attr("opacity",0.8)})
					.on("mouseout",function(){fg.attr("opacity",0.3)})
					
		var fg2 = svg.append('circle')
					.attr('cx',0)
					.attr('cy',0)
					.attr('r',0)
					.attr("stroke", "blue")
					.attr("fill", "none")
					.attr("opacity",1)
					.attr('class','a1')	

		
					
					

					
					
		//compute FG of the player			
					
			fg_player = fg_pct(data_ply)		
					
			
			 fg2.transition()
			.delay(delay+1500)
			.duration(1500)
			.attr('r', rScale(fg_player))
			
			fg.transition()
			.delay(delay+1500)
			.duration(1500)
			.attr('r', rScale(fg_player))
				
				
				
	    var path = svg.append("path")
						  .datum(abc)
                          .attr("class", "a1")						  
					      .attr("d", line(abc))
                          .attr("stroke", "darkgreen")
						  .attr("opacity",1)
                          .attr("stroke-width", 2)
                          .attr("fill", "none")
						  
						  
		 var path2 = svg.append("path")
						  .datum(pct_def)
                          .attr("class", "a1")						  
					      .attr("d", line(pct_def))
                          .attr("stroke", "red")
						  .attr("opacity",1)
                          .attr("stroke-width", 1.5)
                          .attr("fill", "none")	
						  
		var area_ug2 = svg.append("path")
						.data(pct_def)
						.attr("class", "lighred")
						.attr("fill","orange")
						.attr("opacity","0")
						.attr("d", area(pct_def))
						.on("mouseover",function(){area_ug2.attr("opacity",0.7)})
						.on("mouseout",function(){area_ug2.attr("opacity",0.1)})
						
						
			   var area_ug = svg.append("path")
						.data(abc)
						.attr("class", "area")
						.attr("fill","lightgreen")
						.attr("opacity","0")
						.attr("d", area(abc))
						.on("mouseover",function(){area_ug.attr("opacity",0.7)})
						.on("mouseout",function(){area_ug.attr("opacity",0.4)})
						
						
			var legend_txt=svg.append("text")
        .attr("x", -w/2)             
        .attr("y", -h/2 + 14)
		.attr("text-anchor", "left") 
        .style("font-size", "14px")
		.attr("fill", "black")
		.attr("opacity",1)
        .text(legend_text);
								
		 	  					  
						  
area_ug.transition()
			.delay(delay+1500)
			.duration(2000)
			.attr('opacity', 0.3)
	
		
						  
		var totalLength = path.node().getTotalLength();				  	
	  path.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
	    .delay(delay+1500)
        .duration(2000)
        .attr("stroke-dashoffset", 0);
		
		
			var totalLength = path2.node().getTotalLength();				  	
	  path2.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
	    .delay(delay+1500)
        .duration(2000)
        .attr("stroke-dashoffset", 0);
		
		
		
		 // filtro per glowe 

		var defs = svg.append("defs");
		
		var filter = defs.append("filter")
	                     .attr("id","glow");
		
		filter.append("feGaussianBlur")
	          .attr("stdDeviation","2.5")
	          .attr("result","coloredBlur");
			  
		var feMerge = filter.append("feMerge");
		
					 feMerge.append("feMergeNode")
		 	                .attr("in","coloredBlur");
		feMerge.append("feMergeNode")
				.attr("in","SourceGraphic");

				
		d3.selectAll(".a1").style("filter", "url(#glow)");
		 

	
		 
		 
		 
}








