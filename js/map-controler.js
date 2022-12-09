'use strict'

var gMap

function onInit() {
    getSavedLocations()
    const startCords = getStartCords()
    initMap(startCords.lat, startCords.lng)
    const userPref = getUserPref(USER_KEY)
    document.body.style.color = userPref.textColor
    document.body.style.backgroundColor = userPref.bgColor
    renderLocation()

}


///////////////////////////////////////////////


function initMap(lat = 32, lng = 35) {
    var elMap = document.querySelector('.map')
    var options = {
        center: { lat, lng },
        zoom: +getUserPref(USER_KEY).zoom
    }

    var map = new google.maps.Map(
        elMap,
        options
    )

    gMap = map


    new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map
    })


    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: { lat, lng },
    });

    infoWindow.open(map);

    map.addListener("click", (mapsMouseEvent) => {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });

        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );


        infoWindow.open(map);
        gCurrCords = JSON.parse(infoWindow.content)
        // marker.position = gCurrCords
        if(onMapClick()){
            renderLocation()
            renderMarkers(map)
        }
    
    });

    renderMarkers(map)

}

// function deleteMarker(id){
//     const location = getLocationCordsById(id)
//     var marker = new google.maps.Marker({
//         position: new google.maps.LatLng(lat, lng),
//         map
//     })
//     // new google.maps.Marker({
//     //     position: new google.maps.LatLng(location.lat, location.lng),
//     //     map: null
//     // })
//     console.log(location.lat, location.lng);

// }

function renderMarkers(map) {
    const places = getSavedLocations()
    console.log(places);
    places.forEach(place => {
        new google.maps.Marker({
            name: place.name,
            position: { lat: +place.lat, lng: +place.lng },
            map,
        })
    })
}

function onLocationDelete(id) {
    // deleteMarker(id)
    locationDelete(id)
    renderLocation()
    renderMarkers(gMap)
}

function onShowLocation(id) {
    const location = getLocationCordsById(id)
    initMap(location.lat, location.lng)

}


function renderLocation() {
    const locations = loadFromStorage(LOCATION_KEY)
    var strHtml = locations.map(location => {
        return `<div class="location-card card">
            <h5>${location.name}</h5>
            <p class="card-text">Save:    ${location.time}.</p>
            <a class="btn btn-danger card-btn" onclick="onLocationDelete('${location.id}')">delete location</a>
            <a class="btn btn-warning card-btn" onclick="onShowLocation('${location.id}')">Show location 📍</a>
        </div>`
    })
    document.querySelector('.location-container').innerHTML = strHtml.join()
}


function getPosition() {

    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }

    // One shot position retrieval...
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
    renderMarkers(map)

    // ...or continous watch
    // navigator.geolocation.watchPosition(showLocation, handleLocationError)
}

function showLocation(position) {

    console.log(position)
    const { latitude: lat, longitude: lng, accuracy } = position.coords

    document.getElementById("latitude").innerHTML = lat
    document.getElementById("longitude").innerHTML = lng

    initMap(lat, lng)
}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError")

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message
            break
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message
            break
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location."
            break
    }
}




