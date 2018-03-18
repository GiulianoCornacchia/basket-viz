
var most_similar_player
var total_assist
var total_defender
var name_to_team
var current_player


function getPar()
{
	str = window.location.href;
	
	str = str.split('?')

	
	//check whether the name of parameter is "player"
	if(str[1]==undefined)
	   return undefined
	
	check = str[1].split('=')
	
	if(check[0]!="player")
	{
		console.log("Bad parameters..")
		return undefined;	
	}
	
	name_player=str[1].toString().replace("player=","")
	
	name_player=name_player.toString().replace("_"," ")
	
	return name_player
	
}


function read_data(msp,tot_ast,tot_def,name_team)
{
	par = getPar()
	
	console.log("Start loading..")
	d3.csv(msp, function(data){
		
		most_similar_player = data
		
		if(par==undefined)
		{
			build_graph(most_similar_player,[])
			graph_active=1
		}
		
		
	});
	console.log("most_similar_player loaded")
	
	d3.csv(tot_ast, function(data){
		
		total_assist = data
		
	});
	
	console.log("total_assist loaded")
	
	
	
		d3.csv(name_team, function(data){
		
		name_to_team = data
		
	});
	
	console.log("name_to_team loaded")
	

	d3.csv(tot_def, function(data){
		
		total_defender = data
		
		//this function has to be here, since total_defender is the biggest dataset, it takes more time to load, and if the update()
		//is out of this function it could be executed while total_defender is still undefined
		
		

		if(par!=undefined)
		{	
			if(is_validname(par))
				update()
			else
			  alert("Name/URL invalid");
		}
	
		
		
	});
	
	console.log("total_defender loaded")
	
	
	
	
	
}


function analytics(data_player,name_player,tot_def)
{
	
	var w=500
	var h=350
	
	
	
	most_similar_players(most_similar_player,name_player,1)
	line_chart(data_player,400,170,"#grafico2",1500,"freq_dist","red","orange",1,2000,30,"Freq. vs distance (ft.)");

	
	
	line_chart(data_player,400,170,"#grafico",1500,"fg_dist","blue","lightblue",0,2000,30,"FG vs distance (ft.)");
	line_chart(data_player,400,170,"#grafico3",1500,"fg_clock","green","lightgreen",0,2000,25,"FG vs shot_clock (s)");
	line_chart(data_player,400,170,"#grafico4",1500,"freq_clock","orange","yellow",1,2000,25,"Freq. vs shot_clock (s)");
	
	draw_heatmap(data_player);
	
	draw_shotchart(data_player,false,q1,m1,q2,m2,500,350,filter_flag,false,"vis")
	
	
	
	//work in progress..
	
	radar_chart(total_defender,350,300,5,110,2000,data_player,name_player,"TOP 5 matchups")

	menu_stats(data_player,total_assist,name_player)
	
	//chord_diagram(name_player,name_to_team,total_assist,350,300)
	
	
	


}


function update()
{
	//i take the url parameter
	
	name_player=getPar()

    console.log(name_player)
	
	if(name_player!="")
	{	
	
	
	d3.csv("./data_names/"+name_player+".csv", function(data){
		
		
		current_player = data
		
	
	
	console.log("CSV of "+name_player+" loaded")
	
	document.getElementById('grafico').innerHTML = "";
	document.getElementById('grafico2').innerHTML = "";
	document.getElementById('grafico3').innerHTML = "";
	document.getElementById('grafico4').innerHTML = "";
	document.getElementById('radar').innerHTML = "";
	document.getElementById('chord').innerHTML = "";
	document.getElementById('b').innerHTML = "";
	document.getElementById('pct').innerHTML = "";
	document.getElementById('msp').innerHTML = "";
	document.getElementById('made').checked = true;
	document.getElementById('miss').checked = true;
	document.getElementById('pnt2').checked = true;
	document.getElementById('pnt3').checked = true;
	
	document.getElementById('filter_menu').setAttribute("style", "opacity: 1;");
	document.getElementById('range').setAttribute("style", "opacity: 1;");
	document.getElementById('max').setAttribute("style", "opacity: 1;");
	document.getElementById('min').setAttribute("style", "opacity: 1;");
	
	var el = document.getElementById('graph');
	if(el!=null)
		el.parentNode.removeChild( el );
	
	graph_active=0
	
	
	analytics(current_player,name_player,total_defender)
	
	});
	
	}
}



