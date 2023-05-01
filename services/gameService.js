import axios from 'axios'
const baseUrl = '/api/games'

export const gameService = {
    getAllGames,
    saveGame,
    getGameById,
    updateGameById,
    deleteGameById,
}

function getAllGames() {
    const request = axios.get(baseUrl)
    return request.then(
        response => response.data
    )
}

function saveGame(newGame) {
    const request = axios.post(baseUrl, JSON.stringify(newGame), {
        headers: { 'Content-Type': 'application/json' }
    })
    return request.then(response => {
        return response.data
    }).catch(error => {
        console.error('Failed to save game:', error)
        throw error
    })
}

function getGameById(gameId) {
    const request = axios.get(baseUrl + '/checkGame/' + gameId)
    return request.then(response =>
        response.data
    )
}

function updateGameById(gameId, playerName, winner, startingPlayer) {
    const request = axios.put(baseUrl + '/updatePlayer/' + gameId, { playerName, winner, startingPlayer })
    return request.then(response =>
        response.data
    )
}

function deleteGameById(gameId) {
    const request = axios.delete(baseUrl + '/checkGame/' + gameId)
    return request.then(response =>
        response.data
    )
}