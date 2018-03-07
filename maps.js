		var off_x=0
		var off_y=0



		function polarToCartesian(centerX, centerY, radius, angleInDegrees) 
		{
		var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

		return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
		};
		}

		function describeArc(x, y, radius, startAngle, endAngle)
		{

		var start = polarToCartesian(x, y, radius, endAngle);
		var end = polarToCartesian(x, y, radius, startAngle);

		var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

		var d = [
		"M", start.x, start.y, 
		"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
		].join(" ");

		return d;       
		}
		
		
		function draw_court(svg,color_line,color_b)
		{
			



	
	//campo
     var rect = svg.append('rect')
    .attr('x',-249)
    .attr('y',-59)
    .attr('width',498)
    .attr('height',449)
    .attr('fill',color_b)
	.attr('stroke', color_line)
    .attr('stroke-width', 2)
	
	//canestro
	var basket = svg.append('circle')
	.attr("cx",0)
    .attr("cy",-25)
    .attr("r",8)
	.attr("stroke",color_line)
	.attr('fill','None')
	.attr('stroke-width', 2)
	
	//tabellone
	var tabellone = svg.append('line')
	.attr('x1', -30)
    .attr('y1', -35)
    .attr('x2', 30)
    .attr('y2', -35)
    .attr('stroke', color_line)
    .attr('stroke-width', 2)
	
	//3pnt dritti sx
	var linea3_1 = svg.append('line')		
	.attr('x1', -218)
    .attr('y1', -59)
    .attr('x2', -218)
    .attr('y2', 62)
    .attr('stroke', color_line)
    .attr('stroke-width', 2)

	
	
    //3pnt dritti dx
	var linea3_2 = svg.append('line')		
	.attr('x1', 218)
    .attr('y1', -59)
    .attr('x2', 218)
    .attr('y2', 62)
    .attr('stroke', color_line)
    .attr('stroke-width', 2)
	
	
	//paint area small
	var paint1 = svg.append('rect')
    .attr('x',-60)
    .attr('y',-59)
    .attr('width',120)
    .attr('height',185)
    .attr('fill','None')
	.attr('stroke', color_line)
    .attr('stroke-width', 2)
	
    //paint area large
	var paint2 = svg.append('rect')
    .attr('x',-80)
    .attr('y',-59)
    .attr('width',160)
    .attr('height',185)
    .attr('fill','None')
	.attr('stroke', color_line)
    .attr('stroke-width', 2)
	
	
	
   //tiro libero cerchio
	var libero = svg.append('circle')
	.attr("cx",1)
    .attr("cy",126)
    .attr("r",60)
	.attr("stroke",color_line)
	.attr('fill','None')
	.attr('stroke-width', 2)
	
	
	//arco 3 punti modo 2
	
	var arco2 = svg.append('path')
	.attr("d",describeArc(0, -35, 239, 114, 246))
	.attr("stroke",color_line)
	.attr('fill','None')
	.attr('stroke-width', 2)

	


   
   //centrocampo
	
	var arco3 = svg.append('path')
	.attr("d",describeArc(off_x, 390, 60, 270, 90))
	.attr("stroke",color_line)
	.attr('fill','None')
	.attr('stroke-width', 2)

		
		}
		
		
		
		
		
		function draw_heatmap(data)
		{
		

  
		
		//sotto canestro
        var heatmap = h337.create({
          container: document.getElementById('heatmapContainer'),
          maxOpacity: 0.8,
		  minOpacity: 0.001,
          radius: 20,
          blur: 0.7,
          backgroundColor: 'rgba(0, 0, 58, 0.96)'
        });
        
		var heatmap2 = h337.create({
          container: document.getElementById('heatmapContainer'),
          maxOpacity: 0.8,
		  minOpacity: 0.001,
          radius: 20,
          blur: 0.8,
          backgroundColor: 'None'
        });
		
		
		
		
		 
      
	  
	  
	  
	  var valore
	  var dim = data.length
	  var off_x=250
	  var off_y=30


	  for(i=0;i<dim;i++)
	  {
	    
	    var x1= parseInt(data[i].x)+off_x
		var y1= parseInt(data[i].y)+off_y
		
		
		if((x1-off_x)>-30 && (x1-off_x)<30  && (y1-off_y)>-50 && (y1-off_y)<50)
		  heatmap.addData({x:x1, y:y1, value:2})
	
	  
        else	  
		heatmap2.addData({x:x1, y:y1, value:12})
	
	  }
	  
	  
	  
	
	  
	  var svg = d3.select('#bb').append('svg')
      .attr('width',500)
      .attr('height',350)
	  .attr("viewBox","-250 -60 500 350")
	 
  
	
      draw_court(svg,"white","None");
      
	 
    
	  
	  }

	  
	  	  
	  function draw_shotchart(data,to_update,q1,m1,q2,m2,w,h,play,flags,filter)
     {








if(to_update)
{	



	//console.log(flags)


	
	var m1_rem = 12-parseInt(m1)
	var m2_rem = 12-parseInt(m2)
	
	var x = ((parseInt(q1)-1)*12)+parseInt(m1_rem)
	
    var y = ((parseInt(q2)-1)*12)+parseInt(m2_rem)
	
	
	
	
	
	var frm = parseInt(x)
	var to = parseInt(y)

	
	//ripristino tutto
		
	
   d3.selectAll('.made').attr('opacity',0.0);
   d3.selectAll('.miss').attr('opacity',0.0);
   
   
  i=frm; 
  if(!play)
	  
  for(i=frm;i<=to;i++)
  {
	  op_lvl = 0.7
	  
	var s = '#G'+i.toString()
	
    d3.selectAll(s)
  	  .attr('opacity',op_lvl)

  }
   else
   {
    var s = '#G'+(to+2)
	
	console.log("0 to 1 "+s)
	
     d3.selectAll(s)
  	  .attr('opacity',0)
	  
	  d3.selectAll(s)
	  .transition()
	  .duration(1600)
  	  .attr('opacity',1)
	   
	   
	   var s = '#G'+(to)
	   
	   d3.selectAll(s)
  	  .attr('opacity',1)
	  
	   
	  d3.selectAll(s)
	  .transition()
	  .duration(1600)
  	  .attr('opacity',0)
	   
   }
   //filtering according to the "flags" array
   if(filter)
   {
   if(!flags[0])
     d3.selectAll('.made').attr('opacity',0.0);
   if(!flags[1])
     d3.selectAll('.miss').attr('opacity',0.0);
    if(!flags[2])
     d3.selectAll('.shot2').attr('opacity',0.0);
    if(!flags[3])
     d3.selectAll('.shot3').attr('opacity',0.0);
    if(!flags[4])
     d3.selectAll('.ast').attr('opacity',0.0);
   }
}
else
{


 
var svg = d3.select('#b').append('svg')
  .attr('width',w)
  .attr('height',h)
 /// w/2   -60   w    h
   .attr("viewBox","-"+(w/2)+"-60 "+w+" "+h)
   .attr("preserveAspectRatio","xMinYMax meet")
  
  
 draw_court(svg,"white",'rgba(0, 0, 58, 0.96)')

	 
	 

	 
	 for(i=0;i<data.length;i++)
	 {
		
		//signature for filtering 
		
		var sig1 = ''+data[i].period
		mx = 12 - parseInt(data[i].minutes_remaining)

		
		
        x = (parseInt(parseInt(sig1)-1)*12)+parseInt(mx)
		
		var sig = 'G'+x
	
		
		
		var x1= parseInt(data[i].x)
		var y1= parseInt(data[i].y) - 30
		
		
		if(y1<400)
		    if(data[i].shot_made_flag == 0)
			{
				a = svg.append('line')
		        .attr("x1",x1-3)
		        .attr("y1",y1-3)
		        .attr("x2",x1+3)	
				.attr("y2",y1+3)
		        .attr('stroke-width', 0)
		        .attr('opacity',0.7)
				.attr('stroke','orange')
				.attr("id",sig)
				

				b = svg.append('line')
		        .attr("x1",x1-3)
		        .attr("y1",y1+3)
		        .attr("x2",x1+3)	
				.attr("y2",y1-3)
		        .attr('stroke-width', 0)
		        .attr('opacity',0.7)
				.attr('stroke','orange')
				.attr("id",sig)
			  
				
				

		if(data[i].shot_2pnt=='True')
		{
		a.attr("class","miss shot2")
		b.attr("class","miss shot2")
		}
		else
		{
			a.attr("class","miss shot3")
			b.attr("class","miss shot3")
		}
				
				
				a.transition()
				.delay(i)
				.duration(100)
				.attr('stroke-width', 1.5)
				
				b.transition()
				.delay(i)
				.duration(100)
				.attr('stroke-width', 1.5)
				

				
			}
		  	else
		{
		 a = svg.append('circle')
		.attr("cx",off_x)
		.attr("cy",450)
        .attr("r",0)		
		.attr('stroke-width', 1)
		.attr("stroke","black")
		.attr('opacity',0.8)
		.attr('fill','green')
		.attr("id",sig)
		.attr("cy",y1-1)
        .attr("cx",x1-1)
		
		if(data[i].shot_2pnt=='True')
			a.attr("class","made shot2")
		else
			a.attr("class","made shot3")
	 
		}
	  
		
		 
	 }

	 
	 
	 d3.selectAll('.made').transition()
		 .delay(1000)
		 .duration(1000)
		 .attr("r",5)
		 .attr('opacity',0.8)
	 


	 

}
	  
}	 


