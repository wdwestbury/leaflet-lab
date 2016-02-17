// initialize the map with geographical coordinates set on madison
var map = L.map("map").setView([43, -89], 2);

//	add a tile layer to the map
var cartoDB_Map = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', 
{
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);

// call getdata
getData(map);

// add the data in megacities.geojson to the map
function getData(map)
{
	$.ajax("data/MegaCities.geojson",
	{
		dataType: "json",
		success: function(response)
		{
			// create marker with cool options
			var cityMarkers = {
				radius: 8,
				fillColor: "#c3dbfe",
				color: "#6fa9fe",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8
			};

			// create leaflet geojson layer and add it to the map
			L.geoJson(response,
			{
				pointToLayer: function (feature, latlng)
				{
					return L.circleMarker(latlng, cityMarkers);
				}
			}).addTo(map);
		}
	});	
};
