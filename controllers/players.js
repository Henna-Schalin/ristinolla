const playerRouter = require('express').Router()
const Player = require('../models/player')
const Game = require('../models/game')
const bcrypt = require('bcrypt')

playerRouter.get('/api/players', (request, response) => {
    Player.find({}).then(players => {
        response.json(players)
    })
})

playerRouter.post('/api/players', async (request, response, next) => {
    try {
        const body = request.body
        const name = body.name
        const passwordHash = await bcrypt.hash(body.passwordHash, 10)
        const player = new Player({ name, passwordHash })
        const savedPlayer = await player.save()
        response.status(201).json(savedPlayer)
    } catch (error) {
        console.log('error')
    }
})

playerRouter.post('/api/players/checkPassword', (req, res) => {
    const playerName = req.body.name
    const enteredPassword = req.body.enteredPassword

    Player.findOne({ name: playerName })
        .then(player => {
            if (!player) {
                return res.status(400).json({ message: "Player not found" })
            }
            bcrypt.compare(enteredPassword, player.passwordHash)
                .then(isMatch => {
                    if (isMatch) {
                        return res.json({ message: "Password matched" })
                    } else if (!isMatch) {
                        return res.json({ message: "Incorrect password" })
                    }
                })
                .catch(err => {
                    return res.status(500).json({ message: "Internal server error" })
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: "Internal server error" })
        })
})

playerRouter.get('/api/players/checkPlayer/:name', (req, res) => {

    const playerName = req.params.name
    Player.findOne({ name: playerName })
        .then(player => {
            if (!player) {
                res.send("no")
            } else {
                res.send("yes")
            }
        })
})

playerRouter.get('/api/players/stats', async (request, response) => {
    try {
        const players = await Player.find()
        const stats = players.map(async player => {
            const playerGames = await Game.find({ $or: [{ player1: player.name }, { player2: player.name }] })

            let numWins = 0
            let numLosses = 0
            let numTies = 0

            playerGames.forEach(game => {
                if (game.winner === player.name) {
                    numWins++
                } else if (game.winner === 'tie') {
                    numTies++
                } else {
                    numLosses++
                }
            })

            return {
                name: player.name,
                numGames: playerGames.length,
                numWins,
                numLosses,
                numTies
            }
        })

        const playerStats = await Promise.all(stats)

        response.json(playerStats)
    } catch (error) {
        console.error(error)
        response.status(500).send('Server Error')
    }
})

module.exports = playerRouter