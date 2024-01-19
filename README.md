## Troubleshooting

### The mapbox won't work at all, check the following:

- Hierarchy of leaflet files matter: `leaflet.css` then `leaflet.js`, the rest of the files must be below `leaflet.js`
- Map container must have a `width`, `height` and `z-index`. It should also be correctly referenced in the `map` instance option

### Map won't display after changing the image:

- The images folder must be in the same directory as `leaflet.css`. 
- Dimension (`h` and `w`) values of the image url in index.js **must be exact pixel height and width of the image** in order for the map to correctly overlay inside the mapbox.
- Check and configure `minZoom` and `maxZoom` in order to find the right rendering setting of the map.

### Markers are not placed on respective positions after changing the image:

- After changing the map image, leaflet will re-calculate the bounds of the mapbox. Unfortunately, the markers positions are only relative to the previous image, so you have to deal on the marker re-positioning manually.

For more info on leafletJS installation visit: https://leafletjs.com/download.html