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
    
    if (!name) return false
    

    const chosenLocation = {
        name: name,
        id: makeId(),
        time: getTime(),
        lat: gCurrCords.lat,
        lng: gCurrCords.lng
    }

    // var marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(   chosenLocation.lat, chosenLocation.lng),
    //     map
    // })
    gSavedLocations.push(chosenLocation)
    saveToStorage(LOCATION_KEY, gSavedLocations)
    return true

}


function locationDelete(id) {
    const locations = loadFromStorage(LOCATION_KEY)
    var idxForDelete = locations.findIndex(location => location.id === id)
    locations.splice(idxForDelete, 1)
    saveToStorage(LOCATION_KEY, locations)
    gSavedLocations = locations

}

function getTime(){
    let date = new Date();
    let current_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    let current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let date_time = current_date + " " + current_time;
    return date_time
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

function getSavedLocations() {
    if (loadFromStorage(LOCATION_KEY) && loadFromStorage(LOCATION_KEY).length) gSavedLocations = loadFromStorage(LOCATION_KEY)
    else {
        const startCords = getStartCords()
        startCords.name = 'Start location'
        startCords.id = makeId()
        
        startCords.time = getTime()
        // console.log(startCords);
        // const cordsObj = {startCords.lat, startCords[lng]}
        gSavedLocations = [startCords]
        saveToStorage(LOCATION_KEY, gSavedLocations)
    }
    return gSavedLocations
}


function getLocationCordsById(id) {
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