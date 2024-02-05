var map = L.map('map', {
  center: [0, 0],
  zoom: 3,
  minZoom: 3,
  maxZoom: 5,
  attributionControl: false
});

L.tileLayer('background.png', {
}).addTo(map);

var imageUrl = 'map.png';

var aspectRatio = 1920 / 1080;

var width = 180;
var height = width / aspectRatio;

var imageBounds = [[-height / 2, -width / 2], [height / 2, width / 2]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);

map.scrollWheelZoom.enable();

var maxBounds = imageBounds;
map.setMaxBounds(maxBounds);

var customLogo = L.control({
  position: 'bottomright'
});

customLogo.onAdd = function () {
  var logoContainer = L.DomUtil.create('div', 'custom-logo');
  logoContainer.innerHTML = '<img id="logoImage" src="logo.png" alt="Custom Logo">';

  map.on('zoom', function () {
    var logoImage = document.getElementById('logoImage');

    var currentZoom = map.getZoom();
    var maxZoom = map.getMaxZoom();
    var opacity = 2.2 - (currentZoom / 2.5);

    logoImage.style.transition = 'opacity 0.5s ease-in-out';

    logoImage.style.opacity = opacity;
  });

  return logoContainer;
};

customLogo.addTo(map);

//Debug
map.on('click', function (e) {
 console.log('Clicked at:', e.latlng);
});

//Marker area

var home  = new L.Icon({
  iconUrl: 'orange.png',
  iconSize: [30, 40],
  iconAnchor: [14, 39],
  popupAnchor: [1, -29],
});
L.marker([-14.0, -29.3], { icon: home }).addTo(map)
  .bindPopup("<b>Home</b><br>175 68 731");