
var most_similar_player
var total_assist
var total_defender
var name_to_team
var current_player
var current_year


function yearValid(current_year)
{
	return(current_year==2014 || current_year==2017)
		
}


function getPar()
{
	str = window.location.href;
	
	
	if(str!=undefined)
		s = str.split('?')
	else
		return undefined
	

	if(s[1]!=undefined)
		str = s[1].split('&')
	else
		return undefined
	
	console.log("NAME "+str[0])
	
	console.log("YEAR "+str[1])
	
	//check whether the name of parameter is "player"
	if(str[0]==undefined)
	   return undefined
	
	check = str[0].split('=')
	
	if(check[0]!="player")
	{
		console.log("Bad parameters..")
		return undefined;	
	}
	
	name_player=str[0].toString().replace("player=","")
	
	name_player=name_player.toString().replace("_"," ")
	
	current_year=str[1].toString().replace("year=","")
	
	console.log("ANN="+current_year)
	
	return name_player
	
}



function getPar_year()
{
	str = window.location.href;
	
	if(str!=undefined)
		s = str.split('?')
    else
		return undefined;
	
	if(s[1]!=undefined)
		str = s[1].split('&')
	else
		return undefined
	
	
	//check whether the name of parameter is "player"
	if(str[0]==undefined)
	   return undefined
	
	check = str[0].split('=')
	
	if(check[0]!="player")
	{
		console.log("Bad parameters..")
		return undefined;	
	}
	
	name_player=str[0].toString().replace("player=","")
	
	name_player=name_player.toString().replace("_"," ")
	
	current_year=str[1].toString().replace("year=","")
	
	console.log("ANN="+current_year)
	
	return current_year
	
}


function read_data(msp,tot_ast,tot_def,name_team)
{
	par = getPar()
	par_y = getPar_year()
	
	console.log(window.location.href)
	
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
		
		

		if(par!=undefined && par_y != undefined)
		{	
			if(is_validname(par) && yearValid(par_y))
			{	
				update()
				set_tags(par_y)
			}
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
	
	
	
	//getting the div's width
	var w_graph = $(".grafico_").width();
	var w_chord = document.getElementById("chord").getBoundingClientRect().width;
	var w_radar = document.getElementById("radar").getBoundingClientRect().width;
		 

	
	
	
	var x_g = 350
	
	//i have different data beetween 2014 and 2017
	if(current_year==2014)
	{
	line_chart(data_player,w_graph,170,"#grafico2",3500,"freq_dist","red","orange",1,2000,30,"Freq. vs distance (ft.)");
	line_chart(data_player,w_graph,170,"#grafico",3500,"fg_dist","blue","lightblue",0,2000,30,"FG vs distance (ft.)");
	line_chart(data_player,w_graph,170,"#grafico3",3500,"fg_clock","green","lightgreen",0,2000,25,"FG vs shot_clock (s)");
	line_chart(data_player,w_graph,170,"#grafico4",3500,"freq_clock","orange","yellow",1,2000,25,"Freq. vs shot_clock (s)");
	draw_heatmap(data_player,"none");
	draw_shotchart(data_player,false,q1,m1,q2,m2,505,350,filter_flag,false,"vis")
	radar_chart(total_defender,w_radar,300,5,110,4000,data_player,name_player,"TOP 5 matchups")
	menu_stats(data_player,total_assist,name_player,name_to_team)
	chord_diagram(name_player,name_to_team,total_assist,w_chord,310)
	most_similar_players(most_similar_player,name_player,1)
	}

	if(current_year==2017)
	{
	line_chart(data_player,w_graph,170,"#grafico2",3500,"freq_dist","red","orange",1,2000,30,"Freq. vs distance (ft.)");
	line_chart(data_player,w_graph,170,"#grafico",3500,"fg_dist","blue","lightblue",0,2000,30,"FG vs distance (ft.)");
	line_chart(data_player,w_graph,170,"#grafico3",3500,"fg_min","green","lightgreen",0,2000,48,"FG vs min (min)");
	line_chart(data_player,w_graph,170,"#grafico4",3500,"freq_min","orange","yellow",1,2000,48,"Freq. vs min (min)");
	draw_heatmap(data_player,"none");
	draw_shotchart(data_player,false,q1,m1,q2,m2,505,350,filter_flag,false,"vis")
	sides_chart(data_player,w_chord,300)
	menu_stats(data_player,total_assist,name_player,name_to_team)
	chord_diagram(name_player,name_to_team,total_assist,w_chord,310)
	most_similar_players(most_similar_player,name_player,1)
	}
	
	
	
	
	
	
	//work in progress..
	
	

	
	
	
	
	


}


function update()
{
	//i take the url parameter
	
	name_player=getPar()
	
	current_year=getPar_year()

    console.log("Searching "+name_player+" year="+current_year)
	
	if(name_player!="" && yearValid(current_year))
	{	
	
	
	d3.csv("./data_names/"+current_year+"/"+name_player+".csv", function(data){
		
		
		current_player = data
		
	
	
	console.log("CSV of "+name_player+" loaded")
	
	document.getElementById('welcome').innerHTML = "";
	document.getElementById('grafico').innerHTML = "";
	document.getElementById('grafico2').innerHTML = "";
	document.getElementById('grafico3').innerHTML = "";
	document.getElementById('grafico4').innerHTML = "";
	document.getElementById('radar').innerHTML = "";
	document.getElementById('chord').innerHTML = "";
	document.getElementById('b').innerHTML = "";
	document.getElementById('pct').innerHTML = "";
	document.getElementById('msp').innerHTML = "";
	document.getElementById('info_player').innerHTML = "";
	document.getElementById('bb').innerHTML = "";
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



