						/* scripts from tutorials */


/* tutorial from quick start */

// initialize the map with geographical coordinates and zoom level
var map = L.map("map").setView([51.505, -0.09], 13);

//add a tile layer to the map
var cartoDB_Map = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', 
{
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);

/*
var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/

// add a marker to the map
var marker = L.marker([51.5, -0.09]).addTo(map);

// add a circle marker to the map
var circle = L.circle([51.508, -0.11], 500,
{
	color: "red",
	fillColor: "#f03",
	fillOpacity: .05
}).addTo(map);

// add a polygon to the map
var polygon = L.polygon([
	[51.509, -0.08],
	[51.503, -0.06],
	[51.51, -0.047]
	]).addTo(map);

// shortcuts for popups
marker.bindPopup("<b>Hello World</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle");
polygon.bindPopup("I am a poplygon");

// use a popup as a layer
var popup = L.popup()
	.setLatLng([51.5, -0.09])
	.setContent("I am a standalone popul")
	.openOn(map);

// alert lat and lon to user on click
var popup = L.popup();

function onMapClick(e)
{
	function onMapClick(e)
	{
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
	}
}

map.on("click", onMapClick);

