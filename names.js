var ur = window.location.href

//this lines are executed at the beginning, so if te URL is "dirty" with same parameters these lines clean it and
//made the url in the form https://name.something?player=

ur = ur.split("?")

console.log(ur[0])

url = ur[0]+"?player="


function setURL(name)
{
		name_url = 	name.replace(" ","_")
		my_url = url+name_url
		console.log(url)
		console.log(my_url)
		window.history.pushState({path:my_url},'',my_url);
	
}



$( function() {
		var availableTags = [
	   'Mike Scott', 'Al Horford', 'Mike Muscala', 'Kent Bazemore',
       'Paul Millsap', 'Thabo Sefolosha', 'Pero Antic', 'Dennis Schroder',
       'Jeff Teague', 'DeMarre Carroll', 'Shelvin Mack', 'Kyle Korver',
       'John Jenkins', 'Austin Daye', 'Elton Brand', 'Adreian Payne',
       'Gerald Henderson', 'Bismack Biyombo', 'Cody Zeller',
       'Michael KiddGilchrist', 'Lance Stephenson', 'Noah Vonleh',
       'Kemba Walker', 'Gary Neal', 'Mo Williams', 'PJ Hairston',
       'Marvin Williams', 'Jeff Taylor', 'Jason Maxiell', 'Brian Roberts',
       'Al Jefferson', 'Jannero Pargo', 'Troy Daniels', 'Jeff Green',
       'James Young', 'Marcus Smart', 'Avery Bradley', 'Gerald Wallace',
       'Brandon Bass', 'Dwight Powell', 'Kelly Olynyk', 'Jonas Jerebko',
       'Tyler Zeller', 'Jae Crowder', 'Evan Turner', 'Phil Pressey',
       'Rajon Rondo', 'Jared Sullinger', 'Tayshaun Prince', 'Gigi Datome',
       'Marcus Thornton', 'Isaiah Thomas', 'Jameer Nelson',
       'Brandan Wright', 'Shavlik Randolph', 'Mason Plumlee',
       'Cory Jefferson', 'Brook Lopez', 'Jerome Jordan', 'Kevin Garnett',
       'Markel Brown', 'Deron Williams', 'Mirza Teletovic', 'Jarrett Jack',
       'Joe Johnson', 'Bojan Bogdanovic', 'Thaddeus Young',
       'Alan Anderson', 'Darius Morris', 'Brandon Davies',
       'Sergey Karasev', 'Earl Clark', 'Jorge Gutierrez',
       'Andrei Kirilenko', 'Nikola Mirotic', 'Pau Gasol', 'Jimmy Butler',
       'Taj Gibson', 'Nazr Mohammed', 'ETwaun Moore', 'Joakim Noah',
       'Derrick Rose', 'Aaron Brooks', 'Tony Snell', 'Doug McDermott',
       'Kirk Hinrich', 'Mike Dunleavy', 'Cameron Bairstow', 'JaVale McGee',
       'Alonzo Gee', 'Timofey Mozgov', 'Kenneth Faried', 'Will Barton',
       'JJ Hickson', 'Wilson Chandler', 'Joffrey Lauvergne',
       'Arron Afflalo', 'Darrell Arthur', 'Ty Lawson', 'Jusuf Nurkic',
       'Danilo Gallinari', 'Gary Harris', 'Erick Green', 'Randy Foye',
       'Nate Robinson', 'Ian Clark', 'Jamaal Franklin', 'Tyson Chandler',
       'AlFarouq Aminu', 'Charlie Villanueva', 'Amare Stoudemire',
       'Richard Jefferson', 'Bernard James', 'Dirk Nowitzki',
       'Jose Juan Barea', 'Devin Harris', 'Chandler Parsons',
       'Monta Ellis', 'Raymond Felton', 'Ricky Ledo', 'Greg Smith',
       'Andrew Bogut', 'Festus Ezeli', 'Shaun Livingston',
       'Andre Iguodala', 'Justin Holiday', 'Harrison Barnes',
       'Klay Thompson', 'Marreese Speights', 'David Lee', 'Draymond Green',
       'Stephen Curry', 'James Michael McAdoo', 'Leandro Barbosa',
       'Brandon Rush', 'Ognjen Kuzmic', 'Tristan Thompson',
       'Iman Shumpert', 'Kevin Love', 'JR Smith', 'Shawn Marion',
       'LeBron James', 'Kendrick Perkins', 'Kyrie Irving', 'James Jones',
       'Matthew Dellavedova', 'Dion Waiters', 'Joe Harris', 'Will Cherry',
       'AJ Price', 'Anderson Varejao', 'Brendan Haywood', 'Lou Amundson',
       'Mike Miller', 'Alex Kirk', 'Wesley Johnson', 'Ed Davis',
       'Jordan Clarkson', 'Tarik Black', 'Jabari Brown', 'Ryan Kelly',
       'Wayne Ellington', 'Ronnie Price', 'Nick Young', 'Jordan Hill',
       'Vander Blue', 'Kobe Bryant', 'Jeremy Lin', 'Carlos Boozer',
       'Robert Sacre', 'Dwight Buycks', 'Julius Randle', 'Xavier Henry',
       'Gorgui Dieng', 'Zach LaVine', 'Andrew Wiggins', 'Chase Budinger',
       'Justin Hamilton', 'Shabazz Muhammad', 'Kevin Martin',
       'Corey Brewer', 'Lorenzo Brown', 'Anthony Bennett',
       'Sean Kilpatrick', 'Nikola Pekovic', 'Ricky Rubio', 'Jeff Adrien',
       'Glenn Robinson', 'Robbie Hummel', 'Arinze Onuaku',
       'Miroslav Raduljica', 'Carmelo Anthony', 'Samuel Dalembert',
       'Quincy Acy', 'Tim Hardaway Jr', 'Cleanthony Early', 'Jason Smith',
       'Travis Wear', 'Shane Larkin', 'Andrea Bargnani',
       'Langston Galloway', 'Cole Aldrich', 'Alexey Shved', 'Lance Thomas',
       'Pablo Prigioni', 'Jose Calderon', 'Andre Drummond', 'Joel Anthony',
       'Kentavious CaldwellPope', 'Greg Monroe', 'Josh Smith',
       'Shawne Williams', 'Reggie Jackson', 'DJ Augustin',
       'Brandon Jennings', 'Jodie Meeks', 'Caron Butler',
       'Spencer Dinwiddie', 'Kyle Singler', 'Anthony Tolliver',
       'Cartier Martin', 'John Lucas III', 'Quincy Miller',
       'Andre Roberson', 'Steven Adams', 'Kevin Durant', 'Serge Ibaka',
       'Russell Westbrook', 'Perry Jones', 'Jeremy Lamb', 'Anthony Morrow',
       'Nick Collison', 'Mitch McGary', 'Sebastian Telfair', 'Ish Smith',
       'Enes Kanter', 'Grant Jerrett', 'Steve Novak', 'Nerlens Noel',
       'JaKarr Sampson', 'KJ McDaniels', 'Malcolm Thomas',
       'Michael CarterWilliams', 'Thomas Robinson', 'Robert Covington',
       'Jerami Grant', 'Hollis Thompson', 'Henry Sims', 'Isaiah Canaan',
       'Jason Richardson', 'Luc Mbah a Moute', 'Tony Wroten',
       'Tim Frazier', 'Malcolm Lee', 'Furkan Aldemir', 'Chris Johnson',
       'Larry Drew', 'Drew Gordon', 'Dewayne Dedmon', 'Victor Oladipo',
       'Aaron Gordon', 'Maurice Harkless', 'Nikola Vucevic',
       'Tobias Harris', 'Evan Fournier', 'Willie Green', 'Elfrid Payton',
       'Channing Frye', 'Kyle OQuinn', 'Devyn Marble', 'Ben Gordon',
       'Luke Ridnour', 'Andrew Nicholson', 'Robin Lopez', 'Nicolas Batum',
       'LaMarcus Aldridge', 'Damian Lillard', 'Allen Crabbe',
       'Meyers Leonard', 'Victor Claver', 'Chris Kaman', 'Wesley Matthews',
       'Dorell Wright', 'Joel Freeland', 'CJ McCollum', 'Steve Blake',
       'Markieff Morris', 'Miles Plumlee', 'Marcus Morris', 'Alex Len',
       'Archie Goodwin', 'Gerald Green', 'Eric Bledsoe', 'PJ Tucker',
       'Goran Dragic', 'TJ Warren', 'Brandon Knight', 'Zoran Dragic',
       'Tyler Ennis', 'Reggie Bullock', 'Earl Barron', 'Jerel McNeal',
       'Seth Curry', 'Chris Andersen', 'Hassan Whiteside', 'Tyler Johnson',
       'James Ennis', 'Chris Bosh', 'Josh McRoberts', 'Udonis Haslem',
       'Michael Beasley', 'Dwyane Wade', 'Mario Chalmers', 'Henry Walker',
       'Shannon Brown', 'Luol Deng', 'Shabazz Napier', 'Norris Cole',
       'Danny Granger', 'Andre Dawkins', 'Ben McLemore',
       'Derrick Williams', 'Rudy Gay', 'DeMarcus Cousins', 'Ryan Hollins',
       'Ray McCallum', 'Jason Thompson', 'Omri Casspi', 'Ramon Sessions',
       'Reggie Evans', 'Darren Collison', 'Nik Stauskas', 'Andre Miller',
       'Carl Landry', 'David Stockton', 'Sim Bhullar', 'Eric Moreland',
       'David Wear', 'Terrence Ross', 'Patrick Patterson', 'Amir Johnson',
       'James Johnson', 'Lucas Nogueira', 'Jonas Valanciunas',
       'DeMar DeRozan', 'Bruno Caboclo', 'Landry Fields', 'Greg Stiemsma',
       'Tyler Hansbrough', 'Lou Williams', 'Kyle Lowry', 'Greivis Vasquez',
       'Louis Williams', 'Charles Hayes', 'Otto Porter', 'Marcin Gortat',
       'John Wall', 'Martell Webster', 'Rasual Butler', 'Bradley Beal',
       'Kevin Seraphin', 'Kris Humphries', 'Garrett Temple', 'Nene',
       'Paul Pierce', 'Toure Murry', 'Drew Gooden', 'Glen Rice Jr',
       'DeJuan Blair', 'Will Bynum', 'John Henson',
       'Giannis Antetokounmpo', 'Jerryd Bayless', 'Kenyon Martin',
       'Larry Sanders', 'Jabari Parker', 'Ersan Ilyasova',
       'Khris Middleton', 'Nate Wolters', 'OJ Mayo', 'Jared Dudley',
       'Zaza Pachulia', 'Johnny OBryant', 'Kendall Marshall',
       'Rudy Gobert', 'Jeremy Evans', 'Gordon Hayward', 'Derrick Favors',
       'Trevor Booker', 'Bryce Cotton', 'Trey Burke', 'Alec Burks',
       'Joe Ingles', 'Elijah Millsap', 'Dante Exum', 'Rodney Hood',
       'Patrick Christopher', 'Jack Cooley', 'Elliot Williams',
       'Anthony Davis', 'Austin Rivers', 'Alexis Ajinca',
       'Dante Cunningham', 'Jeff Withey', 'Omer Asik', 'Tyreke Evans',
       'Jrue Holiday', 'Ryan Anderson', 'Eric Gordon', 'Luke Babbitt',
       'Toney Douglas', 'Quincy Pondexter', 'John Salmons',
       'Jimmer Fredette', 'Gal Mekel', 'Darius Miller', 'Russ Smith',
       'Ian Mahinmi', 'CJ Miles', 'Solomon Hill', 'Rodney Stuckey',
       'CJ Watson', 'Luis Scola', 'Donald Sloan', 'George Hill',
       'Chris Copeland', 'Damjan Rudez', 'David West', 'Roy Hibbert',
       'Lavoy Allen', 'Paul George', 'Shayne Whittington', 'Blake Griffin',
       'DeAndre Jordan', 'Matt Barnes', 'Spencer Hawes', 'Glen Davis',
       'Jamal Crawford', 'Chris Paul', 'JJ Redick', 'Chris DouglasRoberts',
       'Jordan Farmar', 'Hedo Turkoglu', 'Jared Cunningham',
       'Lester Hudson', 'CJ Wilcox', 'Dahntay Jones', 'Jordan Hamilton',
       'Ekpe Udoh', 'Aron Baynes', 'Kawhi Leonard', 'Jeff Ayres',
       'Tim Duncan', 'Marco Belinelli', 'Boris Diaw', 'Danny Green',
       'Manu Ginobili', 'Tony Parker', 'Cory Joseph', 'Tiago Splitter',
       'Reggie Williams', 'Kyle Anderson', 'Matt Bonner', 'Patty Mills',
       'JaMychal Green', 'Dwight Howard', 'Joey Dorsey', 'Clint Capela',
       'Terrence Jones', 'James Harden', 'Kostas Papanikolaou',
       'Nick Johnson', 'Donatas Motiejunas', 'Patrick Beverley',
       'Trevor Ariza', 'Jason Terry', 'Francisco Garcia', 'Kosta Koufos',
       'Jon Leuer', 'Marc Gasol', 'Courtney Lee', 'Tony Allen',
       'Vince Carter', 'Mike Conley', 'Nick Calathes', 'Beno Udrih',
       'Zach Randolph', 'Jordan Adams', 'Jarnell Stokes', 'Kalin Lucas',
       'Tyrus Thomas'
		];
		$( "#tags" ).autocomplete({
			source: availableTags,
			select: function (event,ui){
				
			setURL(ui.item.label)	
			update()
			}
		});
	} );