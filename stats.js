
var name_ms1


console.log("New stats version")


function min(q,m)
{	
	return ((q-1)*12)+(12-m)
}



function array_freq_min(data_1,vector,dim)
{
	dist_bins=[]
	
	for(i=0;i<dim;i++) 
		 dist_bins[i]=0
	
	
		
	for(i=0;i<data_1.length;i++)
	{  
     q = parseInt(data_1[i].period)
	 m = parseInt(data_1[i].minutes_remaining)
	 bin = min(q,m)
	 if(bin<=48)
		dist_bins[bin]+=1
	}
	
	for(i=0;i<dim;i++)
	{
		  var x=0.0
		  x=(dist_bins[i]/data_1.length)				
		  vector[i]=x		  
	}
	
	
	
}




function array_fg_min(data_1,vector,dim)
{
	
	dist_bins=[]
	made=[]
	miss=[]
	
	for(i=0;i<dim;i++)
	{	
		dist_bins[i]=0
		made[i]=0
		miss[i]=0
	}
	
		
	for(i=0;i<data_1.length;i++)
	{
		
     q = parseInt(data_1[i].period)
	 m = parseInt(data_1[i].minutes_remaining)
	 bin = min(q,m)
	 if(bin<=48)
	 { 
	 dist_bins[bin]+=1
	 if(data_1[i].shot_made_flag==1)
		 made[bin]+=1
	 else
		miss[bin]+=1
	 }
	 
	}
	
	for(i=0;i<dim;i++)
	{
		  if(dist_bins[i]!=0)
		  { 
			x=(made[i]/dist_bins[i])				
		    vector[i]=x
		  }		
		  else
			vector[i]=0
	}	
	
	
	
	
}




function array_freq_dist(data_1,vector,dim)
{
	
	dist_bins=[]
	
	for(i=0;i<dim;i++)
	 
		 dist_bins[i]=0
	
		
	for(i=0;i<data_1.length;i++)
	{  
     bin = parseInt(data_1[i].shot_distance)
	 dist_bins[bin]+=1
	}
	
	for(i=0;i<dim;i++)
	{
		  var x=0.0
		  x=(dist_bins[i]/data_1.length)				
		  vector[i]=x		  
	}
	
}


function array_fg_dist(data_1,vector,dim)
{
	
	dist_bins=[]
	made=[]
	miss=[]
	
	for(i=0;i<dim;i++)
	{	
		dist_bins[i]=0
		made[i]=0
		miss[i]=0
	}
	
		
	for(i=0;i<data_1.length;i++)
	{
		
     bin = parseInt(data_1[i].shot_distance)
	 dist_bins[bin]+=1
	 if(data_1[i].shot_made_flag==1)
		 made[bin]+=1
	 else
		miss[bin]+=1
	 
	}
	
	for(i=0;i<dim;i++)
	{
		  if(dist_bins[i]!=0)
		  { 
			x=(made[i]/dist_bins[i])				
		    vector[i]=x
		  }		
		  else
			vector[i]=0
	}	
	
	
	
	
}


function array_fg_clock(data_1,vector,dim)
{
	
	dist_bins=[]
	made=[]
	miss=[]
	
	for(i=0;i<dim;i++)
	{	
		dist_bins[i]=0
		made[i]=0
		miss[i]=0
	}
	
		
	for(i=0;i<data_1.length;i++)
	{
		
     bin = parseInt(Math.round(data_1[i].shot_clock))
	 dist_bins[bin]+=1
	 if(data_1[i].shot_made_flag==1)
		 made[bin]+=1
	 else
		miss[bin]+=1
	 
	}
	
	for(i=0;i<dim;i++)
	{
		  if(dist_bins[i]!=0)
		  { 
			x=(made[i]/dist_bins[i])				
		    vector[i]=x
		  }		
		  else
			vector[i]=0
	}	
		
	
}


function array_freq_clock(data_1,vector,dim)
{
	dist_bins=[]
	
	for(i=0;i<dim;i++)
	 
		 dist_bins[i]=0
	
		
	for(i=0;i<data_1.length;i++)
	{  
     bin = parseInt(Math.round(data_1[i].shot_clock))
	 dist_bins[bin]+=1
	}
	
	for(i=0;i<dim;i++)
	{
		  var x=0.0
		  x=(dist_bins[i]/data_1.length)				
		  vector[i]=x		  
	}
	
}


function fun_change()
{
	setURL(name_ms1)
	update()	
}



function most_similar_players(data,name,x)
{
	
	
	data = data.filter(function(d){return d.name == name;})
	
	name_ms = data[0].msp1
	
	name_ms1=name_ms
	
	score_ms = data[0].score1
	
	console.log("THE MOST SIMILAR PLAYER IS "+name_ms+" ("+score_ms+")")
	
	mid_txt = '<a onClick="fun_change();" style="cursor: pointer; cursor: hand;">'+name_ms+'</a>'
	
	document.getElementById('msp').innerHTML = "<i> The most similar player to <u>"+name+"</u> is <u>"+mid_txt+"</u> "+"with a score of "+score_ms+"<i>"

	
	
		
}
	 
	 
	 
	
function FG_pct(data,zona)
{
	made=0.0
	
	if(zona==2)
		data = data.filter(function(d){return d.shot_2pnt == "True";})
	if(zona==3)
		data = data.filter(function(d){return d.shot_2pnt == "False";})
	
	for(i=0;i<data.length;i++)
	{
		if(data[i].shot_made_flag==1)
			made++;
	}
	if(data.length!=0)
		return (100*(made/data.length)).toFixed(2)
	else
		return (0).toFixed(2)
}


function num_ast(data,name)
{
	data = data.filter(function(d){return d.from == name;})
	
	var expensesByName = d3.nest()
         .key(function(d) { return d.from; })
         .entries(data);
	
	  var expensesCount = d3.nest()
			.key(function(d) { return d.from; })
		    .rollup(function(v) { return{
					total: d3.sum(v, function(d) { return d.count; }),
									}})
            .entries(data);
	if(expensesCount.length!=0)
		return(expensesCount[0].value.total)
	else
		return 0;
}


function menu_stats(data,data_ast,name,data_team)
{
			 
		 
		 var fg= FG_pct(data,0)
		 var fg2 = FG_pct(data,2)
		 var fg3 = FG_pct(data,3)
		 
		data2 = data.filter(function(d){return d.shot_2pnt == "True";})
		data3 = data.filter(function(d){return d.shot_2pnt == "False";})
		
		data2_made = data2.filter(function(d){return d.shot_made_flag == 1;})
		
		data3_made = data3.filter(function(d){return d.shot_made_flag == 1;})
		 
		team = data_team.filter(function(d){return d.name == name;})
		
		
		total_points = data2_made.length*2 + data3_made.length*3
		
		
		document.getElementById('pct').innerHTML+="<br><b>FG%</b>"+" "+fg
		document.getElementById('pct').innerHTML+="<br><b>2P%</b>"+" "+fg2
		document.getElementById('pct').innerHTML+="<br><b>3P%</b>"+" "+fg3
		document.getElementById('pct').innerHTML+="<br><b>shots:</b> "+" "+data.length
		document.getElementById('pct').innerHTML+="<br><b>2P:</b> "+data2_made.length+"/"+data2.length
		document.getElementById('pct').innerHTML+="<br><b>3P:</b> "+data3_made.length+"/"+data3.length
		document.getElementById('pct').innerHTML+="<br><b>points:</b> "+total_points
		document.getElementById('pct').innerHTML+="<br><b>pps:</b> "+(total_points/data.length).toFixed(3)
		document.getElementById('pct').innerHTML+="<br><b>ast:</b> "+num_ast(data_ast,name)
		document.getElementById('info_player').innerHTML="<b>"+name+"</b>, "+"<i>"+team[0].team_name+"</i>"
		
	

}

