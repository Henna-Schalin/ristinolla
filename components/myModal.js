import '../App.css'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import '@fontsource/roboto/500.css'
import SettingsModal from './modals/settings'
import GameList from './modals/gameList'
import HighScore from './modals/highScore'
import React, { useState, useEffect } from 'react'
import { gameService } from '../services/gameService'

const MyModal = ( {modalOpen, handleClose, modalType, setPlayer1} ) => {
    const [games, setGames] = useState([])

    // Fetches all games from the database
    useEffect(() => {
        gameService.getAllGames()
            .then(
                data => {
                    setGames(data)
                }
            )
    }, [])

    return (
        <>
        
        <Modal
           open={modalOpen}
           onClose={handleClose} 
        >
            <Paper className="stone" style={{
                display: 'flex',
                justifyContent: 'center',
                width: '700px',
                height: '850px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                outline: 'none',
                padding: '40px',
            }}>
            {modalType === 'settingsModal' &&
            <SettingsModal type={'initial'} handleClose={handleClose}/>
            }
            {modalType === 'gameList' &&
            <GameList handleClose={handleClose}/>
            }
            {modalType === 'highScore' &&
            <HighScore handleClose={handleClose}/>
            }
            </Paper>
        </Modal>
        </>
    )
}

export default MyModal