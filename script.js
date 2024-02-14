var map = L.map('map', {
  center: [0, 0],
  zoom: 3,
  minZoom: 3,
  maxZoom: 7,
  attributionControl: false
});

L.tileLayer('background.png').addTo(map);

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
  var logoImage = document.createElement('img');
  logoImage.id = 'logoImage';
  logoImage.src = 'logo.png';
  logoImage.alt = 'Custom Logo';
  logoContainer.appendChild(logoImage);

  map.on('zoomend', function () {
    var currentZoom = map.getZoom();
    var opacity = currentZoom >= 4 ? 0.25 : (currentZoom === 3 ? 1 : 1);
    logoImage.style.transition = 'opacity 0.5s ease-in-out';
    logoImage.style.opacity = opacity;
  });

  return logoContainer;
};

customLogo.addTo(map);

document.addEventListener('keydown', function(event) {
  if (event.key === 'F12') {
    console.log('Clicked at:', map.getCenter());

    var devModeMessage = document.createElement('div');
    devModeMessage.textContent = 'Developer mode activated';
    devModeMessage.style.position = 'fixed';
    devModeMessage.style.bottom = '10px';
    devModeMessage.style.left = '10px'; // Change to '10px' for bottom left position
    devModeMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    devModeMessage.style.padding = '5px 10px';
    devModeMessage.style.borderRadius = '5px';
    devModeMessage.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
    devModeMessage.style.zIndex = '9999';

    document.body.appendChild(devModeMessage);
    map.on('click', function (e) {
      console.log('Clicked at:', e.latlng);
    });
  }
});

var home = new L.Icon({
  iconUrl: 'orange.png',
  iconSize: [30, 40],
  iconAnchor: [14, 39],
  popupAnchor: [1, -29],
});
L.marker([-14.0, -29.3], { icon: home }).addTo(map)
  .bindPopup("<b>Home</b><br>175 68 731");
