'use strict'

function getUserPref(key){
    return loadFromStorage(key)
}

function setChoice(userChoice){
    saveToStorage(USER_KEY, userChoice)
}

// src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBptu96GIZZdWzImEhQxFyCl1kpGWeJzzg"