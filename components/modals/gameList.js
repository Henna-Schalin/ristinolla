
import '../../App.css'
import '@fontsource/roboto/500.css'
import GameListTable from './tables/gameListTable'
import React, { useState, useEffect } from 'react'
import MovesModal from './movesModal'

const GameList = ({ handleClose }) => {

    const [movesModalOpen, setMovesModalOpen] = useState(false)
    const [gameMoves, setGameMoves] = useState([])
    const [gameStarter, setGameStarter] = useState('')
    const [rowPlayer1, setRowPlayer1] = useState('')
    const [rowPlayer2, setRowPlayer2] = useState('')
    const [token1, setToken1] = useState('')
    const [token2, setToken2] = useState('')
    const [gameId, setGameId] = useState('')


    //sets the data for the table
    const handleRowClick = (rowplayer1, rowplayer2, winner, moves, startingPlayer, token1, token2, id) => {
        setMovesModalOpen(true)
        setGameMoves(moves)
        setGameStarter(startingPlayer)
        setRowPlayer1(rowplayer1)
        setRowPlayer2(rowplayer2)
        setToken1(token1)
        setToken2(token2)
        setGameId(id)
    }

    //initializes data when modal is closed
    const handleMovesClose = () => {
        setGameMoves([])
        setGameId('')
        setMovesModalOpen(false)
    }

    return (
        <>
            <GameListTable handleRowClick={handleRowClick} handleClose={handleClose} />
            <MovesModal
                movesModalOpen={movesModalOpen}
                handleClose={handleMovesClose}
                gameMoves={gameMoves}
                gameStarter={gameStarter}
                rowPlayer1={rowPlayer1}
                rowPlayer2={rowPlayer2}
                token1={token1}
                token2={token2}
                gameId={gameId}
            />

        </>
    )
}
export default GameList