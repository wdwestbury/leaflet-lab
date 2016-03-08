// initialize the map with geographical coordinates set on madison
var map = L.map("map").setView([40, -101], 4);

//	add a tile layer to the map
var cartoDB_Map = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', 
{
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);



// call getdata
getData(map);



// create some proportional symbols
function createPropSymbols(data,map)
{
	// use pop_2015 to create proportional symbols
	var attribute = "agg2014";

	// create markers with cool options
	var geojsonMarkers = 
	{
		radius: 8,
		fillColor: "#c3dbfe",
		color: "#6fa9fe",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	};

	// creat a geojson layer and add it to the map
	L.geoJson(data,
	{
		pointToLayer: function (feature, latlng)
		{
			// determine attribute value for each feature
			var attributeValue = Number(feature.properties[attribute]);

			// log the attribute value in the console
			console.log(feature.properties, attributeValue);

			// determine radius for markers based on attribute value
			geojsonMarkers.radius = calculatePropRadius(attributeValue);

			//create the circle markers
			return L.circleMarker(latlng,geojsonMarkers);
		}
	}).addTo(map);
};



// calculate the radius of the proportional symbol
function calculatePropRadius(attributeValue)
{
	// set the scale factor
	var scaleFactor = 50;

	// set area based on the attribute value and the scale factor
	var area = attributeValue * scaleFactor;

	// calculate radius using area
	var radius = Math.sqrt(area/Math.PI);

	return radius;
}



// get some data and put it in the map
function getData(map)
{
	// get the data from the geojson file
	$.ajax("data/agg.geojson",
	{
		dataType: "json",
		success: function(response)
		{
			// call function to create proportional symbols
			createPropSymbols(response, map);
		}
	});
};




// code from 2/17/16
/*
//add the data in megacities.geojson to the map
function getData(map)
{
	$.ajax("data/MegaCities.geojson",
	{
		dataType: "json",
		success: function(response)
		{
			// create marker with cool options
			var cityMarkers = 
			{
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
*/
