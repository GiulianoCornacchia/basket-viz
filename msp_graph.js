var node=[]
var link=[]
var graph_active


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function build_graph(data,names)
{
	console.log("Building graph..")
	
	w=1200
	h=600
	radius=6
	
	dd = document.getElementById('graph')
	if(dd!=null)
		dd.innerHTML = "";
	
	var div = document.createElement("div");
	div.style.background = "lightgrey";
	document.getElementById("graph").appendChild(div);
	
	svg = d3.select("#graph").append("svg")
              .attr("width", w)
              .attr("height", h)
              .append("g")
  
			
	
	
	//build the data structures for the graph
	var names2=[]
	
	for(j=0;j<names.length;j++)
	{
		names2[j]=names[j].value
	}
	
	console.log("n2")
	console.log(names2)
	
	var nodes=[]
	var nodes2=[]
	var links=[]
	
	if(names2.length==0)
	{
		for(i=0;i<data.length;i++)
		{
			
			nodes2.push({"id":data[i].name})
			links.push({"source":data[i].name, "target":data[i].msp1, "value":3})
			links.push({"source":data[i].name, "target":data[i].msp2, "value":2})
			links.push({"source":data[i].name, "target":data[i].msp3, "value":1})
			
			
		}
	}		
	else
	{
		
		for(i=0;i<names2.length;i++)
		{
			data2 = data.filter(function(d){return d.name == names2[i];})
			
				if(nodes.indexOf(data2[0].name)==-1)		
					nodes.push(data2[0].name)
				
				if(nodes.indexOf(data2[0].msp1)==-1)		
					nodes.push(data2[0].msp1)

				if(nodes.indexOf(data2[0].msp2)==-1)		
					nodes.push(data2[0].msp2)
				
				if(nodes.indexOf(data2[0].msp3)==-1)		
					nodes.push(data2[0].msp3)
				
				
			links.push({"source":data2[0].name, "target":data2[0].msp1, "value":3})
			links.push({"source":data2[0].name, "target":data2[0].msp2, "value":3})
			links.push({"source":data2[0].name, "target":data2[0].msp3, "value":3})
				
		}
		
		
		for(j=0;j<nodes.length;j++)
			nodes2.push({"id":nodes[j]})
		
		
	}
	
	
	
	console.log("Nodi:")
	console.log(nodes2)
	
	console.log("Link:")
	console.log(links)
	
	nodes = shuffle(nodes2)
	
///----------------------------------------------------------------------------------------------------
	


var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    //.force("link", d3.forceLink().id(function(d) { return d.id; }))
	.force("link", d3.forceLink().id(function(d) { return d.id; }).distance(20))
    .force("charge", d3.forceManyBody().strength(-4))
    .force("center", d3.forceCenter(w / 2, h / 2))
	//.force('collision', d3.forceCollide().radius(5))

	link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

	node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes2)
    .enter().append("circle")
      .attr("r", radius)	  
	  .attr("id",function(d){return (d.id).replace(" ","-")})
      .attr("fill", function(d) { return color(getRandomColor()) })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
	      .on("click", function(){setURL(this.id.replace("-"," ")); update()})
		  .on("mouseover", function(){d3.select("#"+this.id).transition().duration(300).attr("r",10)})
		  .on("mouseout", function(){d3.select("#"+this.id).transition().duration(300).attr("r",6)})

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(links);
	  


  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(w - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(h - radius, d.y)); });
  }


function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0.1);
  d.fx = null;
  d.fy = null;
}



	
}

var prev_node=""

function highlight(name)
{
	//x = node.selectAll("circle")
	
	//ripristinate previous node str
	
	if(prev_node!="")
		d3.select("#"+prev_node).transition().duration(300).attr("r", "6");
	
	//update the current node, if any
	if(name!="")
	{
		prev_node = name.replace(" ","-")
		d3.select("#"+prev_node).transition().duration(300).attr("r", "10");
	}

		
	
}