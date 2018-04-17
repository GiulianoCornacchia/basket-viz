
function create_popup(svg,w,h,x,y,opacity,id)
{
	
	svg.append('rect')
	  .attr("id","rect_info"+id)
	  .attr("x",x)
	  .attr("y",y)
	  .attr("width", 0)
      .attr("height", 0)
	  .attr("opacity", opacity)
	  .attr("fill","white")
	  .attr("stroke","black")
	  .attr("stroke-width","3")
	  
	
}


function show_popup(w,h,title,lines,svg,id,off_x,off_y)
{	
	d3.select("#rect_info"+id).attr("width",w).attr("height",h)
	
	 var text=svg.append("text")
        .attr("x", 30+off_x)             
        .attr("y", 40+off_y)
		.attr("id","text_pop"+id)
		.attr("text-anchor", "left") 
        .style("font-size", "15px")
		//.style("font-style", "italic")
		.attr("font-weight", "bold")
		.attr("fill", "black")
		.attr("opacity",1)
        .text(title)
	
	
	for(var i=0;i<lines.length;i++)
	{
		 var text=svg.append("text")
        .attr("x", 30+off_x)             
        .attr("y", off_y+60+15*i)
		.attr("id","text_pop"+id)
		.attr("text-anchor", "left") 
        .style("font-size", "12px")
		.attr("fill", "black")
		.attr("opacity",1)
        .text(lines[i])
		
	}

}

function create_text(w,txt,lines,svg,id)
{
	//the idea is: i split word by word the "txt", adding the word to the current line if it is contained in the svg, otherwise i change line
	
	words=txt.split(" ")

	var line_w=0
	lines[0]=""
	var j=0
	
	for(var i=0;i<words.length;i++)
	{
		
		 var text=svg.append("text")
        .attr("x", 0)             
        .attr("y", 0)
		.attr("text-anchor", "left") 
        .style("font-size", "13px")
		.attr("fill", "black")
		.attr("opacity",0)
        .text("")
		text.text(words[i]+" ")
		bbox = text.node().getBBox().width
		
		if((line_w+bbox)<=w)
		{
			lines[j]=lines[j]+words[i]+" "
			line_w=line_w+bbox
            if((words[i][words[i].length-1])==".")
			{
				j++;
				lines[j]=""	
				line_w=0
			}
		}
		else
		{
			j++;
			lines[j]=""
			lines[j]=words[i]+" "
			line_w=bbox		
		}
		

	}
	
}

function hide_popup(id)
{	
	d3.select("#rect_info"+id).attr("width",0).attr("height",0)
    d3.selectAll("#text_pop"+id).remove()	
}
