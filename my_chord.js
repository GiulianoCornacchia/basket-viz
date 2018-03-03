






function give_team(name)
{
	d3.csv(file_name, function(data){
		
		d1 = data.filter(function(d){return d.name == name;})
		
		console.log(name+" plays for "+d1[0].team_name)
			
	});
	
}






function give_teammates(data,name,vector)
{
	
		
		d1 = data.filter(function(d){return d.name == name;})
		
		team=d1[0].team_name
		
		console.log("sq "+team)

		d2 = data.filter(function(d){return d.team_name == team;})
		
		console.log(d2.length)
		
		
		for(i=0;i<d2.length;i++)
			vector[i]=d2[i].name
		
			
		
}






