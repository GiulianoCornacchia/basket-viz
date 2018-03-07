var name_ms1


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


function fun1()
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
	
	mid_txt = '<a onClick="fun1();" style="cursor: pointer; cursor: hand;">'+name_ms+'</a>'
	
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
	
	return (100*(made/data.length)).toFixed(2)
}

