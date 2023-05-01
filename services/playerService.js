import axios from 'axios'
const baseUrl = '/api/players'

export const playerService = {
    getAllPlayers,
    savePlayer,
    checkPassword,
    getPlayerByName,
    getGamesForPlayers,
}

function getAllPlayers() {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

function getPlayerByName(playerName) {
    const request = axios.get(baseUrl + '/checkPlayer/' + playerName)
    return request.then(response => response.data)
}

function savePlayer(newPlayer) {
    const request = axios.post(baseUrl, JSON.stringify(newPlayer), {
        headers: { 'Content-Type': 'application/json' }
    })
    return request.then(response => response.data)
}

function checkPassword(thisPlayer) {
    return axios.post(baseUrl + '/checkPassword', JSON.stringify(thisPlayer), {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            if (response.data.message === "Password matched") {
                return "ok"
            } else {
                alert(`Password for ${thisPlayer.name} is incorrect`)
                return "error"
            }
        })
        .catch(error => {
            console.error(error)
            return "error"
        })
}

function getGamesForPlayers() {
    const request = axios.get(baseUrl + '/stats')
    return request.then(response =>
        response.data
    )
}