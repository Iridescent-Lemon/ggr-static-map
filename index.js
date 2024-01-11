const items = document.querySelectorAll(".accordion li.accordion-item button"),
  onlineGSList = document.querySelectorAll(".list-1 li"),
  stoGSList = document.querySelectorAll(".list-2 li");

let onlineGSLocationData = [
  { lat: -13, lng: 25, title: 'Gogoro Experience Center Greenbelt 4', address: 'Globe Tower BGC, Taguig' },
  { lat: -8, lng: 28, title: 'The Globe Tower GoStation', address: 'Phoenix Shaw Boulevard' },
  { lat: -10, lng: 26, title: 'The Globe Tower GoStation', address: 'Gogoro Experience Center Greenbelt 4' },
  { lat: -14, lng: 28, title: 'The Globe Tower GoStation', address: 'Puregold Makati' },
  { lat: -21.50, lng: 23.25, title: 'The Globe Tower GoStation', address: 'Puregold Parañaque' },
], stoGSLocationData = [
  { lat: -10, lng: 22, title: 'Gogoro', address: 'Globe Tower BGC, Taguig' },
  { lat: -11, lng: 25, title: 'Ayala GoStation', address: 'Puregold Parañaque' },
  { lat: -12, lng: 29, title: 'The Globe Tower GoStation', address: 'Gogoro Experience Center Greenbelt 4' },
  { lat: -6, lng: 30, title: 'Puregold Makati', address: 'Puregold Makati' },
  { lat: -18, lng: 25, title: 'Phoenix', address: 'Phoenix Shaw Bouleletd' },
  { lat: -5, lng: 20, title: 'Phoenix', address: 'Globe Tower BGC, Taguig' },
  { lat: -8, lng: 23, title: 'Phoenix', address: 'Puregold Parañaque' },
  { lat: -11, lng: 21, title: 'Phoenix', address: 'Gogoro Experience Center Greenbelt 4' },
  { lat: -9, lng: 19, title: 'Phoenix', address: 'Puregold Makati' },
  { lat: -17, lng: 26, title: 'Phoenix', address: 'Phoenix Shaw Bouleletd' },
  { lat: -15, lng: 31, title: 'Phoenix', address: 'Puregold Makati' },
  { lat: -14, lng: 26, title: 'Phoenix', address: 'Phoenix Shaw Bouleletd' },
];

// -- Powered by LeafletJS --

// Create the map
let map = L.map('gogoro-map', {
  crs: L.CRS.Simple,
  minZoom: 4.5,
  maxZoom: 7.964,
  center: [1696, 2500],
  zoom: 0,
  zoomControl: false,
  touchZoom: true,
  scrollWheelZoom: true,
  doubleClickZoom: false,
  boxZoom: false,
});

// Exact dimensions of the image
let w = 5000,
  h = 3392,
  url = './src/images/gostationmap.png';

// Calculate the edges of the image, in coordinate space
let southWest = map.unproject([0, h], map.getMaxZoom() - 1),
  northEast = map.unproject([w, 0], map.getMaxZoom() - 1),
  bounds = new L.LatLngBounds(southWest, northEast);

// Add the image overlay so that it covers the entire map
L.imageOverlay(url, bounds).addTo(map);

// Tell Leaflet that the map is exactly as big as the image
map.setMaxBounds(bounds);

// Enable touch events to pass through the map
map.getContainer().style.touchAction = 'auto';

// Custom Icons
let onlineGSMarkerIcon = L.divIcon({
  html: `<svg viewBox="0 0 400 400" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><style>.st2{fill:#fff}</style><linearGradient id="a" x1="99.76" x2="303.04" y1="51.99" y2="312.44" gradientUnits="userSpaceOnUse"><stop stop-color="#3EF9B2" offset="0"/><stop stop-color="#3EF9B0" offset=".22"/><stop stop-color="#3CF8A9" offset=".3"/><stop stop-color="#39F79E" offset=".35"/><stop stop-color="#36F68F" offset=".39"/><stop stop-color="#2CF159" offset=".78"/></linearGradient><path d="M197.51 17.87c-88.01 0-159.36 71.35-159.36 159.36 0 77.24 54.95 141.64 127.89 156.25l30.95 48.64 31.53-48.55c73.17-14.43 128.36-78.94 128.36-156.35 0-88-71.35-159.35-159.37-159.35z" style="fill-rule:evenodd;clip-rule:evenodd;fill:url(#a)"/><path class="st2" d="M193.38 192.15c-17.19 18.99-32.42 34.87-52.22 34.87-25.97 0-47.1-21.18-47.1-47.21s21.13-47.21 47.1-47.21c20.77 0 35.78 16.65 56.57 39.69l7.26 8.04c19 21.06 32.72 36.27 48.93 36.27 9.33 0 18.59-3.74 25.43-10.25a36.26 36.26 0 0 0 11.2-26.53c0-17.69-13.98-36.79-36.56-36.79-14.97 0-26.72 11.64-45.43 32.31l-7-7.79c17.88-19.77 32.58-34.94 52.43-34.94 25.89 0 46.96 21.18 46.96 47.21a46.64 46.64 0 0 1-14.43 34.09 47.72 47.72 0 0 1-32.6 13.12c-20.83 0-35.86-16.65-56.65-39.7l-7.26-8.04c-18.99-21.05-32.71-36.25-48.85-36.25-20.23 0-36.7 16.5-36.7 36.79s16.46 36.79 36.7 36.79c14.86 0 27.06-12.19 45.2-32.21l7.02 7.74z"/><path class="st2" d="M234.3 177.41h39.14v4.81H234.3zm-90.73-17.21h-4.81v17.2h-17.17v4.82h17.17v17.2h4.81v-17.2h17.16v-4.82h-17.16z"/></svg>`,
  className: "marker",
  iconSize: [40, 40],
  popupAnchor: [0, -5],
}),
  stoGSMarkerIcon = L.divIcon({
    html: `<svg viewBox="0 0 400 400" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><circle class="st0" cx="200" cy="200" r="129.97"/><path d="M245.21 243.05c-11.5 0-18.42-3.9-27.87-11.56l-44.55-47.97c-3.92-3.72-10.6-8.6-17.98-8.6-13.15 0-23.85 11.26-23.85 25.08 0 13.83 10.7 25.09 23.85 25.09 6.09 0 10.68-2.91 17.51-8.59l6.69-5.59L189.6 225l-6.68 5.57c-7.57 6.31-15.98 12.47-28.11 12.47-22.56 0-40.91-19.3-40.91-43.04s18.36-43.06 40.91-43.06c10.15 0 20.46 4.72 29.82 13.64l44.04 47.51c6.85 5.45 10.27 6.99 16.54 6.99 13.15 0 23.84-11.26 23.84-25.09 0-20.38-23.26-34.71-41.98-16.32l-6.25 6.1-11.62-13.15 6.25-6.12c9.19-9 19.21-13.57 29.77-13.57 22.56 0 40.88 19.32 40.88 43.06 0 23.76-18.33 43.06-40.89 43.06z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#fff"/></svg>`,
    className: "marker",
    iconSize: [30, 30],
    popupAnchor: [0.5, -1],
  });

// Create a marker for each location and bind a popup
let onlineGSMarkers = onlineGSLocationData.map(function (location) {
  return L.marker([location.lat, location.lng], {
    icon: onlineGSMarkerIcon,
    autoPanOnFocus: true
  })
    .addTo(map)
    .bindPopup(`<div class="mini-popup"><h1>${location.title}</h1><p>${location.address}</p></div>`, {
      closeButton: false
    });
}),
  stoGSMarkers = stoGSLocationData.map(function (location) {
    return L.marker([location.lat, location.lng], {
      icon: stoGSMarkerIcon,
      autoPanOnFocus: true
    })
      .addTo(map)
      .bindPopup(`<div class="mini-popup"><h1>${location.title}</h1><p>${location.address}</p></div>`, {
        closeButton: false
      });
  });

// Accordion functionality
function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }

  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }

}

// Listeners

items.forEach(item => item.addEventListener('click', toggleAccordion));

// Add mouseover event listener to each li
onlineGSList.forEach(function (li, index) {
  li.addEventListener('mouseover', function () {
    let marker = onlineGSMarkers[index];
    let markerLatLng = marker.getLatLng();

    // Calculate the maximum zoom level that would still allow the marker to be visible
    let zoom = map.getBoundsZoom(bounds.extend(markerLatLng), false);

    // Set the view to the marker's location, using the calculated zoom level
    map.setView(markerLatLng, zoom, { animate: true });

    marker.openPopup();
  });
});

// Add mouseover event listener to each li
stoGSList.forEach(function (li, index) {
  li.addEventListener('mouseover', function () {
    let marker = stoGSMarkers[index];
    let markerLatLng = marker.getLatLng();

    // Calculate the maximum zoom level that would still allow the marker to be visible
    let zoom = map.getBoundsZoom(bounds.extend(markerLatLng), false);

    // Set the view to the marker's location, using the calculated zoom level
    map.setView(markerLatLng, zoom, { animate: true });

    marker.openPopup();
  });
});

// Add 'popupopen' event listener to the map
map.on('popupopen', function(e) {
  let zoomValue = map.getZoom();
  let popUpCoordinates = map.project(e.popup._latlng);

  popUpCoordinates.y -= e.popup._container.clientHeight / zoomValue;
  map.setView(map.unproject(popUpCoordinates), zoomValue, {animate: true});
});