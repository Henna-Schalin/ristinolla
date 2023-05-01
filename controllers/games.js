const gameRouter = require('express').Router()
const Game = require('../models/game')
const moment = require('moment')


gameRouter.get('/api/games', async (request, response) => {
    try {
        const games = await Game.find({}).populate('moves')
        const formattedGames = games.map(game => {
            const formattedDate = moment(game.createdAt).format('MMMM Do YYYY, h:mm:ss a')
            return {
                ...game.toObject(),
                createdAt: formattedDate
            }
        })
        response.json(formattedGames)
    } catch (error) {
        console.error(error)
        response.status(500).send('Server Error')
    }
})

gameRouter.post('/api/games', (request, response) => {

    const body = request.body
    if (body.player1 === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    const game = new Game({
        player1: body.player1,
        player2: body.player2,
        moves: body.allMovesList,
        winner: body.winner,
        startingPlayer: body.startingPlayer,
        player1Token: body.player1Token,
        player2Token: body.player2Token,
    })

    game.save().then(savedGame => {
        response.json(savedGame)
    })
})


gameRouter.get('/api/games/checkGame/:id', (req, res) => {
    const playedGame = req.params.id
    console.log(playedGame)
    Game.findById(playedGame)
        .then(game => {
            if (!game) {
                res.send("error")
            } else {
                res.json(game)
                console.log('game', game)
            }
        })
})

gameRouter.put('/api/games/updatePlayer/:id', (req, res) => {
    console.log('updateplauyer', req.body)
    const gameId = req.params.id
    const startingPlayer = req.body.startingPlayer
    const updatedPlayer = req.body.playerName
    const gameWinner = req.body.winner
    const updatedWinner = gameWinner === 'Player 1' ? updatedPlayer : gameWinner === 'AI' ? 'AI' : gameWinner

    Game.findByIdAndUpdate(gameId, { player1: updatedPlayer, winner: updatedWinner, startingPlayer: startingPlayer }, { new: true })
        .then(game => {
            if (!game) {
                res.send("error")
            } else {
                res.json(game)
            }
        })
        .catch(err => {
            res.send("error")
        })
})

gameRouter.delete('/api/games/checkGame/:id', (req, res) => {
    const gameId = req.params.id
    console.log(gameId)
    Game.findByIdAndDelete(gameId)
        .then((game) => {
            if (!game) {
                res.send('error')
            } else {
                res.send('Game deleted successfully')
                console.log('game deleted', game)
            }
        })
        .catch((err) => {
            console.log(err)
            res.send('error')
        })
})

module.exports = gameRouter