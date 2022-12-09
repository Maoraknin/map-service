'use strict'

const USER_KEY = 'userDB'


function onInit() {
    const userPref = getUserPref(USER_KEY)
    document.body.style.color = userPref.textColor
    // console.log(loadFromStorage(USER_KEY).textColor);
    document.body.style.backgroundColor = userPref.bgColor
    document.querySelector('.user-greet').innerText = userPref.userName
}

function getUserChoice(ev) {
    ev.preventDefault()
    const elForm = document.querySelector('#user-form')
    const userName = elForm.querySelector('#name').value
    elForm.querySelector('#name').value = ''
    const textColor = elForm.querySelector('#text-color').value
    const zoom = elForm.querySelector('#zoom').value
    const bgColor = elForm.querySelector('#bg-color').value
    const mapCords = elForm.querySelector('#map-location').value.split(',')
    elForm.querySelector('#map-location').value = ''
    setUserChoice(userName, zoom, textColor, bgColor, mapCords)

}



function setUserChoice(userName, zoom, textColor, bgColor, mapCords) {
    document.body.style.backgroundColor = bgColor
    document.body.style.color = textColor
    const userChoice = { userName, zoom, textColor, bgColor, mapCords }
    setChoice(userChoice)
}

function showZoom(newVal) {
    document.getElementById('sZoom').innerHTML = newVal
}


