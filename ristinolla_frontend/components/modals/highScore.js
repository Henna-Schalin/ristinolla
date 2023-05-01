
import '../../App.css'
import '@fontsource/roboto/500.css'
import HighScoreTable from './tables/highScoreTable'
import React, { useState, useEffect } from 'react'


const HighScore = ({ handleClose }) => {

    const [movesModalOpen, setMovesModalOpen] = useState(false)
    const [gameMoves, setGameMoves] = useState([])

    const handleRowClick = (player1, player2, winner, moves) => {
        setMovesModalOpen(true)
        setGameMoves(moves)
    }

    const handleMovesClose = () => {
        setMovesModalOpen(false)
    }

    return (
        <>
            <HighScoreTable handleRowClick={handleRowClick} handleClose={handleClose} />
        </>
    )
}
export default HighScore