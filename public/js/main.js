var map;
var active_layer="none";

var water_close = getCloseRestaurants(0.05, coastline);
var church_close = getCloseRestaurants(0.1, church);
//Initializing the map

var basemapUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
var basemapUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF0aGlsZG8iLCJhIjoiY2lrdHZvMHdsMDAxMHdvbTR0MWZkY3FtaCJ9.u4bFYLBtEGNv4Qaa8Uaqzw';


function setMap() {

      console.log('Loading map');
      map = L.map('map').setView([58.972, 5.733], 16);
      //Set view takes two parameters;
            //1. The coordinates for the center of the map
            //2. The zoom level. Zoomlevel is from 0 -> 22, where 22 is zoomed in an 0 is zoomed out

      //Adding the base map. Base map decides how the background map looks like
     L.tileLayer(basemapUrl).addTo(map);
}

function handleFeatures(feature, layer){
        addPopUp(feature, layer);
        setIcon(feature, layer);
}

function addPopUp(feature, layer) {
    // does this feature have a property named name?
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
    }else{
        layer.bindPopup("Unknown name");
    }
}

function setIcon(feature, layer){
    console.log("Setting icon");
    // layer.setIcon(new L.Icon)
    layer.setIcon(restIcon)
}

var restIcon = new L.Icon({
     iconUrl: 'https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/eat-circle-orange-512.png',
     shadowSize:   [50, 64],
     iconSize: [30, 30],
     iconAnchor: [13, 27],
     popupAnchor:  [1, -24]
 });

function getCloseRestaurants(km_dist, area){
    var buffered = turf.buffer(area, km_dist);
    var ptsWithin = turf.within(rest, buffered);
    return ptsWithin;
}

function show_water_close_restaurants(){
    remove_active_layer();
    active_layer = "water"
    L.geoJSON(water_close, {
          onEachFeature: handleFeatures,
    }).addTo(map);
}
function show_church_close_restaurants(){
    remove_active_layer();
    active_layer = "church"
    L.geoJSON(church_close, {
          onEachFeature: handleFeatures,
    }).addTo(map);
}

function show_all_restaurants(){
    //Adding geoJSON layer to the map:
    //L.geoJSON(rest)
    //.addTo(map);
    remove_active_layer();
    active_layer = "all"
    L.geoJSON(rest, {
          onEachFeature: handleFeatures,
    }).addTo(map);
}

function remove_active_layer(){
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
    L.tileLayer(basemapUrl).addTo(map);
}

function btn_click(type){
    change_enabled_button(type)
    console.log("button clicked");
    if(type =="all"){
        console.log(type);
        show_all_restaurants()
    }else if(type =="water"){
        show_water_close_restaurants()
        console.log(type);
    }else if(type=="church"){
        show_church_close_restaurants()
        console.log(type);
    }
}

function change_enabled_button(change_to){
    if(active_layer == "none"){
        console.log("none");
    }else{
        console.log("Removing current enabled button");
        document.getElementById(active_layer).className="";
    }
    // }else if(active_layer == "all"){
    //     document.getElementById("all").className = "";
    // }else if(active_layer == "water"){
    //     document.getElementById("water").className = "";
    // }else if(active_layer == "church"){
    //     document.getElementById("church").className = "";
    // }
    document.getElementById(change_to).className="active";
}

window.onload = setMap;
