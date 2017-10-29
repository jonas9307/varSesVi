	
	
	function getResults() {
		var latitude = 57.708501;
		var longitude = 11.936911;
		var radius = "500" // meters
		var type = "food";
		var keywords = [];
		var input = "Göteborg";
        var options = {
            types: ['(cities)']
        };

        var autocomplete = new google.maps.places.Autocomplete(input, options);
		// var places = getNearbyPlaces((latitude, longitude, radius, type, keywords));0
		
	}
	
	function getNearbyPlaces(latitude, longitude, radius, type, keywords) {
		var apiKey = "AIzaSyCuipMVrzTRGdSX_eyD-yrqLISVq1YIO2s";
		var theUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=" + apiKey
		var testString = httpGet(theUrl);
		document.getElementById("Results").innerHTML = testString;
	}
	
	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp = new XDomainRequest();
		xmlHttp.open( "GET", theUrl); // false for synchronous request
		xmlHttp.send();
		return xmlHttp.responseText;
	}
		
	
	

		// $.getJSON(theUrl, function(data) {
			// testString = String(data);
		// });
		
		