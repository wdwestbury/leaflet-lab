//////////////////////
// global variables //
//////////////////////

	var PAGE = '';

	var ABREVIATION = '';

	var RESETSLIDER = 0;

	var ATTRIBUTES;

	var INDUSTRYDATA;

	var BEGIN = 0;
	var END = 0;

	// initialize the map with geographical coordinates set on madison
	var map = L.map("map",
		{
			maxBounds: new L.LatLngBounds([15, -150],[60,-60])
		})
		.setView([40, -110], 4);

	//	add a tile layer to the map
	var cartoDB_Map = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', 
	{
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
		subdomains: 'abcd',
		maxZoom: 19
	})
	.addTo(map);






///////////////////////////////////////////////////////////////
// remove a feature if the id is not equal to the basemap id //
///////////////////////////////////////////////////////////////

	function removeLayers()
	{
		map.eachLayer(function(layer)
		{
			if(layer._leaflet_id != 22)
			{
				map.removeLayer(layer);
			}
		});

		// reset the slider value
		$('.range-slider').val(RESETSLIDER);

		//resetBegin();

		getData(map);	
	}






/////////////////////////////
// load a dataset on click //
/////////////////////////////
	// load agricultural data when page loads
	$('#document').ready(function() 
	{
		PAGE 		= 'data/agriculture.geojson';
		ABREVIATION = 'agr';

		removeLayers();

		// create the sequenceing controls
		createSequenceControls(ATTRIBUTES);
	});

	// load agricultural data
	$('#agriculture').click(function() 
	{
		PAGE 		= 'data/agriculture.geojson';
		ABREVIATION = 'agr';

		removeLayers();
	});

	// load arts data
	$('#arts').click(function()
	{
		PAGE 		= 'data/arts.geojson';
		ABREVIATION = 'arts';

		removeLayers();
	});

	// load construction data
	$('#construction').click(function()
	{
		PAGE 		= 'data/construction.geojson';
		ABREVIATION = 'con';

		removeLayers();
	});

	// load education data
	$('#education').click(function()
	{
		PAGE 		= 'data/education.geojson';
		ABREVIATION = 'edu';

		removeLayers();
	});

	// load finance data
	$('#finance').click(function()
	{
		PAGE = 'data/finance.geojson';
		ABREVIATION = 'fin';

		removeLayers();
	});

	// load information data
	$('#information').click(function()
	{
		PAGE = 'data/information.geojson';
		ABREVIATION = 'info';

		removeLayers();
	});

	// load manufacturing data
	$('#manufacturing').click(function()
	{
		PAGE = 'data/manufacturing.geojson';
		ABREVIATION = 'man';

		removeLayers();
	});


	// load professional data
	$('#professional').click(function()
	{
		PAGE = 'data/professional.geojson';
		ABREVIATION = 'pro';

		removeLayers();
	});

	// load public administration data
	$('#public').click(function()
	{
		PAGE = 'data/public.geojson';
		ABREVIATION = 'pub';

		removeLayers();
	});

	// load retail data
	$('#retail').click(function()
	{
		PAGE = 'data/retail.geojson';
		ABREVIATION = 'ret';

		removeLayers();
	});

	// load transportation data
	$('#transportation').click(function()
	{
		PAGE = 'data/transportation.geojson';
		ABREVIATION = 'tran';

		removeLayers();
	});

	// load wholesale retail data
	$('#wholesale').click(function() 
	{
		PAGE = 'data/wholesale.geojson';
		ABREVIATION = 'whole';

		removeLayers();
	});

	// load the other category
	$('#other').click(function()
	{
		PAGE = 'data/other.geojson';
		ABREVIATION = 'other';

		removeLayers();
	});







////////////////////////////
// get data from a datset //
////////////////////////////

	function getData(map)
	{
		// get the data from the geojson file
		$.ajax(PAGE,
		{
			dataType: "json",
			success: function(response)
			{
				// attributes is an array of an individual industry by year e.g. ['con2008', 'con2009', ....]
				var attributes = processData(response);

				// set the global attributes
				ATTRIBUTES = attributes;

				// set the global attributes for an industry
				INDUSTRYDATA = processData(response);
	
				// call function to create proportional symbols
				createPropSymbols(response, map, attributes);
			}
		});
	};








////////////////////////////////////////////////////////
// create an array of attributes for a given industry //
// to be used in point to layer                       //
////////////////////////////////////////////////////////
	function processData(data)
	{
		// attributes is an array of an individual industry by year e.g. ['con2008', 'con2009', ....]
		var attributes = [];

		// would list all properties associated with the first attribute 
		var properties = data.features[0].properties;


		//push each attribute name into attributes array
		for (var attribute in properties)
		{
			if(attribute.indexOf(ABREVIATION) > -1)
			{
				attributes.push(attribute);
				//console.log(attribute);
			}
		}
		return attributes;
	}







////////////////////////////////////////////////////////
// turn attributes and values into a layer of markers //
////////////////////////////////////////////////////////

	// create a geojson layer
	function createPropSymbols(data,map,attributes)
	{
		L.geoJson(data,
		{
			pointToLayer: function(feature,latlng)
			{
				return pointToLayer(feature,latlng,attributes);
			}
		})
		.addTo(map);
	}


	function pointToLayer(feature, latlng, attributes)
	{

		// list the attribute at index 0 e.g. con2008
		var attribute = attributes[0];
		//console.log(typeof attribute);
		var attributeValue;


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



		if(BEGIN == 0)
		{
			attributeValue = Number(feature.properties[attribute]);
			// console.log(attribute);
			// console.log(typeof attribute);
			// console.log(attributeValue);
			// console.log(typeof attributeValue);			
		}
		else
		{

			var attributeValue1 = Number(feature.properties[BEGIN]);
			var attributeValue2 = Number(feature.properties[END]);
			var difference = attributeValue1 - attributeValue2;
			difference = Math.abs(Number(difference.toFixed(1)));
			attributeValue = difference;
			console.log(BEGIN);
			console.log(END);
			console.log(difference);
			console.log(typeof difference);
		}


		// determine attribute value for each feature e.g. for attribute at index 0, value is 7.7
		//var attributeValue = Number(feature.properties[attribute]);

		// determine radius for markers based on attribute value
		console.log('calculate radius has triggered')
		geojsonMarkers.radius = calculatePropRadius(attributeValue);

		// create the circle markers
		var marker = L.circleMarker(latlng,geojsonMarkers);

		// build popup content string
		var popupContent = "<p><b>City:</b> " + feature.properties.city_name + "</p><p><b>" + 'Percent agriculture: ' + ":</b> " + attributeValue + '%' + "</p>";

		// bind the popup to the circle marker
		marker.bindPopup(popupContent,
		{
			offset: new L.Point(0, -geojsonMarkers.radius),
			closeButton: false		
		});

		// event listeners to open popup on hover
	    marker.on(
	    {
	        mouseover: function()
	        {
	            this.openPopup();
	        },
	        mouseout: function()
	        {
	            this.closePopup();
	        }
	    });

		return marker;
	}


	// calculate the radius of the proportional symbol
	function calculatePropRadius(attributeValue)
	{
		// set the scale factor
		var scaleFactor = 50;

		// set area based on the attribute value and the scale factor
		var area = attributeValue * scaleFactor;

		// calculate radius using area
		var radius = Math.sqrt(area/Math.PI);
		console.log(radius);

		console.log('finished calc radius prop')

		return radius;
	}







//////////////////////////////
// create sequence controls //
//////////////////////////////

	// set slider attributes
	$('.range-slider').attr(
	{
		max: 6,
		min: 0,
		value: 0,
		step: 1
	});

	// create the sequencing controls
	function createSequenceControls(attributes)
	{
		$('.skip').click(function()
		{
		    // get the old index value
		    var index = $('.range-slider').val();

		    // increment or decrement depending on button clicked
		    if ($(this).attr('id') == 'forward')
		    {
		        index++;

		        // go back to first attribute after last attribute
		        index = index > 6 ? 0 : index;
		    } else if ($(this).attr('id') == 'reverse')
		    {
		        index--;

		        // go back to last attribute after first attribute
		        index = index < 0 ? 6 : index;
		    };

		    // update slider
		    $('.range-slider').val(index);

		    // call updata prop symbols
		   	updatePropSymbols(map, ATTRIBUTES[index]);
		});

		$('.range-slider').on('input', function()
		{
			// get the value of the index based on position of range slider
		    var index = $(this).val();

		    // call update symbols
		    updatePropSymbols(map, ATTRIBUTES[index]);
		});		
	}







//////////////////////////////////////////////////////
// update proportional symbols when slider is moved //
//////////////////////////////////////////////////////

	function updatePropSymbols(map, attribute)
	{
	    map.eachLayer(function(layer)

	    {
	        if (layer.feature && layer.feature.properties[attribute])
	        {
	            //access feature properties
	            var props = layer.feature.properties;

	            //update each feature's radius based on new attribute values
	            var radius = calculatePropRadius(props[attribute]);
	            layer.setRadius(radius);

	            //add city to popup content string
	            var popupContent = "<p><b>City:</b> " + props.city_name + "</p>";

			    //original popupContent changed to panelContent...Example 2.2 line 1
			    //var panelContent = "<p><b>City:</b> " + feature.properties.city_name + "</p>";

	            //add formatted attribute to panel content string
	            popupContent += "<p><b>Workfore Percentage " + ":</b> " + props[attribute] + " Percent</p>";

	            //replace the layer popup
	            layer.bindPopup(popupContent, 
	            {
	                offset: new L.Point(0,-radius)
	            });
	        };
	    });
	};






////////////////////////////////////////////////////////
// get the indexed values of the begin and end inputs //
////////////////////////////////////////////////////////
	
	// get the value for the begining year
	$('#begin li').on('click', function()
	{
		$('#yearOne').val($(this).text());
	});

	// get the value for the ending year
	$('#end li').on('click', function()
	{
		$('#yearTwo').val($(this).text());
	});

	// get the values for the two years on submit
	$('#years').on('click', function()
	{
		var yearOne = Number($('#yearOne').val());
		var yearTwo = Number($('#yearTwo').val());
		var yearIndex = [2008,2009,2010,2011,2012,2013,2014];
		var begin =  yearIndex.indexOf(yearOne);
		var end = yearIndex.indexOf(yearTwo);

		// convert begin and end to a number
		begin = Number(begin);
		end = Number(end);

		// get the indexed values of begin and end
		BEGIN = INDUSTRYDATA[begin];
		END = INDUSTRYDATA[end];

		// call removelayers and output the map
		removeLayers();
	})





