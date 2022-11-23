
const findMe = document.querySelector('#find')

let lat = 55.9392972
let lng = -2.9435644

const locations = [{ lat: 55.945780, lng: -2.866998, content: '<h4>Butterdean</h4> <h6>gets muddy in winter</h6>' },
{ lat: 55.930701, lng: -2.921282, content: '<h4>Winton Woods</h4> <h6>joins with many paths</h6>' },
{ lat: 55.972819, lng: -2.853851, content: '<h4>Longniddry Railway Path</h4> <h6>turn right, up to bridge, woods on both sides of path</h6>' },
{ lat: 55.907331, lng: -2.924495, content: '<h4>Woodhall</h4> <h6>Small wood, can cross field to bigger wood behind</h6>' },
{ lat: 55.977607, lng: -2.804241, content: '<h4>Hopetoun Monument</h4> <h6>Small wood with tower</h6>' },
{ lat: 55.864497, lng: -2.862029, content: '<h4>Humbie Woods</h4> <h6>Quiet. Plenty hills and water</h6>' },
{ lat: 55.921351, lng: -2.790156, content: '<h4>Bolton</h4> <h6>Fields, woods and a river</h6>' },
{ lat: 56.003338, lng: -2.871129, content: '<h4>Gosford Estate</h4> <h6>park at gosford bothy farm shop.  need to get permit from there?</h6>' },
{ lat: 55.982890, lng: -2.897139, content: '<h4>Longniddry Bents</h4> <h6>Beach</h6>' },
{ lat: 55.917358, lng: -2.935178, content: '<h4>Pencaitland Railway Path</h4> <h6></h6>' },
{ lat: 55.843234, lng: -2.990806, content: '<h4>Crichton Castle</h4> <h6> Can walk up to Vogrie from here </h6>' },
{ lat: 56.039949, lng: -2.829222, content: '<h4>Gullane</h4> <h6>Dog friendly beach and sand dunes</h6>' },
{ lat: 55.970916, lng: -2.421857, content: '<h4>Skateraw, Barns Ness, Whitesands</h4> <h6>Quiet beaches, lots of paths around</h6>' }]

// get current location
const locOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

function success(position) {
    console.log(position)
    // let crd = position.coords
    lat = position.coords.latitude
    lng = position.coords.longitude

    console.log('lat/lng', lat, lng)
}

function error(e) {
    console.log(e, `uh oh...problem. I cant find you..`)
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(success, error, locOptions)
}

findMe.addEventListener('click', () => {
    getLocation()
    map.setCenter({ lat, lng })
    // TODO - add a marker with different icon for user location


})




const platform = new H.service.Platform({
    'apikey': 'XtmWmU1uRRWm1B9M95BPbFQ1eVw8mJATJkb1nI73VXI'
});


// Obtain the default map types from the platform object:
// Instantiate (and display) a map object:
const defaultLayers = platform.createDefaultLayers();

const map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        zoom: 12,
        center: { lat: lat, lng: lng }
    });

// Enable the event system on the map instance:
const mapEvents = new H.mapevents.MapEvents(map);

// Add event listener:
map.addEventListener('tap', (evt) => {
    // Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type, evt);
});

// Instantiate the default behavior, providing the mapEvents object:
const behavior = new H.mapevents.Behavior(mapEvents);

// Create the default UI:
const ui = H.ui.UI.createDefault(map, defaultLayers);


// var svgMarkup = '<svg width="24" height="24" ' +
//     'xmlns="http://www.w3.org/2000/svg">' +
//     '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
//     'height="22" /><text x="12" y="18" font-size="12pt" ' +
//     'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
//     'fill="white">&#57426</text></svg>';

// // Create an icon, an object holding the latitude and longitude, and a marker:
// var icon = new H.map.Icon(svgMarkup)

// Create a marker icon from an image URL:
var icon = new H.map.Icon('icons/pawprint.png')
console.log({ icon })
let newMark = new H.map.Marker({ lat: lat, lng: lng }, { icon: icon })
map.addObject(newMark)


locations.forEach(location => {
    let marker = new H.map.Marker({ lat: location.lat, lng: location.lng });

    marker.addEventListener('tap', () => {
        // Create an info bubble object at a specific geographic location:
        let bubble = new H.ui.InfoBubble({ lat: location.lat, lng: location.lng }, {
            content: location.content
        });
        // Add info bubble to the UI:
        ui.addBubble(bubble);
    })
    // Add the marker to the map:
    map.addObject(marker);
})
// add a marker, add a click (tap) listener, which creates an info bubble with details of route



/*
[{lat,lng,content},{lat,lng,content}]
for each locatiomn opbject,
    do above and pass in from object
*/
