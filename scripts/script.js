//{"id":1,
//	"s":"Parthenais/Ste-Catherine",

//	"n":"6001",
//	"st":1,
//	"b":false,
//	"su":false,
//	"m":false,

//	"lu":1476912248405, updatetime
//	"lc":1476912249500, 

//	"bk":false,
//	"bl":false,

//	"la":45.52604347726228,
//	"lo":-73.54896068572998,

//	"da":12, nbEmptyDocks
//	"dx":0,
//	"ba":7, nbBike
//	"bx":0

//REFERENCE: 
// https://developers.google.com/maps/
// https://developers.google.com/maps/web/
// http://www.w3schools.com/graphics/google_maps_intro.asp

var useTable;
var useMap;

function getMap() {
	var mapCanvas = document.getElementById("map");
	var myCenter =  new google.maps.LatLng(45.5087, -73.554)
  	var mapOptions = {center:myCenter , zoom: 12, panControl:true}
	var map = new google.maps.Map(mapCanvas, mapOptions);
	
	useMap = true;
	useTable = false;
	
	getStations(map);
}

function getStations(map) {
	
	$.ajax({
		
		url: "https://secure.bixi.com/data/stations.json" , success: function(result){
			
			var stations = result;
			var nbStations = result.stations.length;
			
			for (var i=0 ; i<nbStations ; i++)
				{					
					var idStation = stations.stations[i].id;
					var nomStation = stations.stations[i].s;
					var emptyDocks = stations.stations[i].da;
					var diponibilite = stations.stations[i].ba;

					var laStation = stations.stations[i].la;
					var loStation = stations.stations[i].lo;
					
//					var emplacements=laStation+","+loStation;
//					placeMarker(emplacements,map);
//					console.log(emplacements);
					
					if(useTable){
					createTable(nbStations,idStation,nomStation,emptyDocks, diponibilite,laStation,loStation);	
					
                    //$('#map').html('<tr>'+idStation+'</tr>');
                        
                    }
					else{
					placeMarker(idStation,nomStation,emptyDocks, diponibilite,laStation,loStation,map);
					}
				}
		},
		error:function(xhr,status,erreur) { alert(status)}
	}); //end of ajax
}; //end of getStations()

function placeMarker(id,nom,empty,dispo,la,lo,map)
{
	var bixiDispo="images/iconBixi.png";
	var bixiEmpty="images/iconEmpty.png";
	var infowindow;
	
	var pointer = new google.maps.LatLng(la,lo);
	
	if (dispo>0)
		{
		var marker = new google.maps.Marker({position:pointer, icon:bixiDispo});
		}
	else
		{
		var marker = new google.maps.Marker({position:pointer, icon:bixiEmpty});
		}

	marker.setMap(map);

  	google.maps.event.addListener(marker,'click',function() {
	
		infowindow = new google.maps.InfoWindow({	
		title:id,
		content:id+" - "+nom+" <br><br> Docks dispo: "+empty+" <br> Bike dispo: "+dispo

		});

		if (marker.getAnimation() != null) 
		{
			marker.setAnimation(null);
			
			infowindow.close(map, marker);
			
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
		
		infowindow.open(map, marker);
		
	}); //end of click
		
/*	google.maps.event.addListener(marker,'mouseenter',function() {
		
		infowindow = new google.maps.InfoWindow({
		title:id,
		content:id+" - "+nom+" <br><br> Docks dispo: "+empty+" <br> Bike dispo: "+dispo
			
		});
		
		marker.setAnimation(google.maps.Animation.BOUNCE);

  		infowindow.open(map,marker);
		
  		}); //end of mouseOn*/
		
		
	google.maps.event.addListener(marker,'mouseover',function() {

		marker.setAnimation(null);

		infowindow.close();

  	}); //end of mouseOver	

}; //end of placeMarker

function getTable() {
	
	useTable = true;
	useMap = false;
	
	$('#map').html('');
	$('#map').html('<table>');
	
	getStations();
	
	$('#map').html('</table>');

};

function createTable(nbStations,idStation,nomStation,emptyDocks, diponibilite,laStation,loStation) {
	
	$('#map').html('<tr>'+idStation+'</tr>');
	
};
