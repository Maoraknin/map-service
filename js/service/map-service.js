'use strict'


const LOCATION_KEY = 'locationDB'
const USER_KEY = 'userDB'

var gSavedLocations
var gCurrCords

function changeMarkerPosition(marker) {
    var latlng = new google.maps.LatLng(gCurrCords.lat, gCurrCords.lng);
    marker.setPosition(latlng);
}

function onMapClick() {
    var name = prompt('please describe location')

   

    let date = new Date();
    let current_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    let current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let date_time = current_date + " " + current_time;

    if (!name) name = 'elhanan'
    const chosenLocation = {
        name: name,
        id: makeId(),
        time: date_time,
        lat: gCurrCords.lat,
        lng: gCurrCords.lng
    }

    // var marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(   chosenLocation.lat, chosenLocation.lng),
    //     map
    // })
    gSavedLocations.push(chosenLocation)
    saveToStorage(LOCATION_KEY, gSavedLocations)

}


function locationDelete(id) {
    const locations = loadFromStorage(LOCATION_KEY)
    var idxForDelete = locations.findIndex(location => location.id === id)
    locations.splice(idxForDelete, 1)
    saveToStorage(LOCATION_KEY, locations)
    gSavedLocations = locations
    
}

function getSavedLocations() {
    if (loadFromStorage(LOCATION_KEY)) gSavedLocations = loadFromStorage(LOCATION_KEY)
    else gSavedLocations = []
}

function getStartCords() {
    return loadFromStorage(USER_KEY).mapCords
}

function getLocationCordsById(id){
    console.log(id);
    console.log(gSavedLocations);
    console.log('here',gSavedLocations.find(location => id === location.id));
    return gSavedLocations.find(location => id === location.id)
}

function getStartCords() {
    const startCords = loadFromStorage(USER_KEY).mapCords
    gCurrCords = {
        lat: +startCords[0],
        lng: +startCords[1],
    }

    return gCurrCords
}