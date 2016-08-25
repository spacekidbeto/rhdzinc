google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{"featureType":"water","elementType":"all","stylers":[{"hue":"#0B1E0C"},{"saturation":2},{"lightness":-89},{"visibility":"simplified"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"hue":"#0B1E0C"},{"saturation":26},{"lightness":-91},{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"hue":"#0B1E0C"},{"saturation":37},{"lightness":-92},{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"hue":"#0B1E0C"},{"saturation":6},{"lightness":-90},{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"hue":"#0B1E0C"},{"saturation":26},{"lightness":-91},{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"hue":"#00FF00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#00FF00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"hue":"#00FF00"},{"saturation":100},{"lightness":-35},{"visibility":"on"}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#00FF00"},{"saturation":100},{"lightness":-50},{"visibility":"on"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#00FF00"},{"saturation":100},{"lightness":-2},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"hue":"#00FF00"},{"saturation":100},{"lightness":-36},{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#00FF00"},{"saturation":100},{"lightness":50},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#00FF00"},{"saturation":100},{"lightness":-36},{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"hue":"#00FF00"},{"saturation":100},{"lightness":-41},{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[]}]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400),
        map: map,
        title: 'Snazzy!'
    });
}
