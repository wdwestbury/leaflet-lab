/***************** scripts from tutorials ******************/



/*******************************************/
/******   tutorial from quick start   ******/
/*******************************************/

// initialize the map with geographical coordinates and zoom level
var map = L.map("map").setView([51.505, -0.09], 19);

//add a tile layer to the map
var cartoDB_Map = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', 
{
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);

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



/*********************************************/
/******   tutorial from using geojson   ******/
/*********************************************/

// create a geojson object and add it to the map
L.geoJson(geojsonFeature).addTo(map);

// pass geojson objects as an array of geojson objects
var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, 
{
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

// create an empty geojson layer and add data to it
var myLayer = L.geoJson().addTo(map);
myLayer.addData(geojsonFeature);

// create some lines
var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, 
{
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

// create a style for the lines
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

// apply the style to the lines 
L.geoJson(myLines, 
{
    style: myStyle
}).addTo(map);

// create some polygon features
var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": 
    {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, 
{
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": 
    {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];

// style the polygons
L.geoJson(states, 
{
    style: function(feature) 
    {
        switch (feature.properties.party) 
        {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(map);

// create a circle marker with some nifty style options
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// add the markes to the map
L.geoJson(someGeojsonFeature, 
{
    pointToLayer: function (feature, latlng) 
    {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);

// attach a popup to the features using a function
function onEachFeature(feature, layer) 
{
    if (feature.properties && feature.properties.popupContent) 
    {
        layer.bindPopup(feature.properties.popupContent);
    }
}

// create a point feature
var geojsonFeature = {
    "type": "Feature",
    "properties": 
    {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": 
    {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

// add features and their popups to the map
L.geoJson(geojsonFeature, 
{
    onEachFeature: onEachFeature
}).addTo(map);


// create a couple of featuers with filter options
var someFeatures = [{
    "type": "Feature",
    "properties": 
    {
        "name": "Coors Field",
        "show_on_map": true
    },
    "geometry": 
    {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, 
{
    "type": "Feature",
    "properties": 
    {
        "name": "Busch Field",
        "show_on_map": false
    },
    "geometry": 
    {
        "type": "Point",
        "coordinates": [-104.98404, 39.74621]
    }
}];

// add features to the map
L.geoJson(someFeatures, 
{
    filter: function(feature, layer) 
    {
        return feature.properties.show_on_map;
    }
}).addTo(map);