
import '../../App.css'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import '@fontsource/roboto/500.css'
import { useState, useContext, useEffect } from 'react'
import { PlayerContext } from '../playerContext'
import { gameService } from '../../services/gameService'
import SettingsModal from './settings'


const GameEnd = ({ winModalOpen, handleWinClose, playedGameId, handleClose }) => {
    const { player1, setPlayer1 } = useContext(PlayerContext)
    const { player2, setPlayer2 } = useContext(PlayerContext)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [fetchingData, setFetchingData] = useState(false)
    const [winner, setWinner] = useState('')
    const [gameId, setGameId] = useState('')
    const [startingPlayer, setStartingPlayer] = useState('')

    //once playedGameId has been configured, the game will be fetched from the database once.
    useEffect(() => {
        if (winModalOpen && playedGameId && !fetchingData) {
            gameService.getGameById(playedGameId)
                .then(
                    data => {
                        setFetchingData(false)
                        setWinner(data.winner)
                        setStartingPlayer(data.startingPlayer)
                        setGameId(playedGameId)
                    }
                )
        }
    }, [winModalOpen, playedGameId, fetchingData])

    const handleSpanClick = () => {
        setSettingsOpen(true)
    }

    //if the player has not set a name, it can be done here and the game info will be updated accordingly. 
    const toggleSettings = () => {
        setSettingsOpen(false)
        if (startingPlayer === "Player 1") {
            gameService.updateGameById(gameId, player1, winner, player1)
        } else if (startingPlayer === "AI") {
            gameService.updateGameById(gameId, player1, winner, player2)
        }
    }

    //when close is clicked, modals will be closed. If no player has been set the game will be removed from the db. 
    const handleClick = () => {
        if (player1 === "Player 1") {
            if (window.confirm('Are you sure? Game will not be saved.')) {
                gameService.deleteGameById(gameId)
                handleClose()
                handleWinClose()
            } else {
                return
            }
        } else {
            handleClose()
            handleWinClose()
        }
    }

    //game will start over. If no player is set the game will be removed from the database. 
    const handlePlayAgain = () => {
        if (player1 === "Player 1") {
            if (window.confirm('Are you sure? Game will not be saved.')) {
                gameService.deleteGameById(gameId)
                handleWinClose()
            } else {
                return
            }
        } else {
            handleWinClose()
        }
    }

    const handleWinCloseWrapper = (gameId) => (event, reason) => {
        handleWinClose(event, reason, gameId, true)
    }

    return (
        <>
            <Modal
                open={winModalOpen}
                onClose={handleWinCloseWrapper(gameId)}
            >
                <Paper style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '700px',
                    height: 'auto',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 212, 144)',
                    outline: 'none',
                    padding: '40px',
                    borderRadius: '10px',
                    border: '7px outset black',
                }}>

                    <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            {winner !== "tie" && <p style={{ fontSize: '40px' }}>{winner} wins!</p>}
                            {winner === "tie" && <p style={{ fontSize: '40px' }}>It's a tie!</p>}
                        </Grid>
                        {player1 === "Player 1" &&
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                <p>If you want the game to be saved <span style={{ color: 'blue', fontFamily: 'Papyrus' }} onClick={handleSpanClick}>click here</span> to set a player name</p>
                            </Grid>
                        }
                        {settingsOpen &&
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <SettingsModal type={'gameEnd'} handleClose={toggleSettings} playedGameId={playedGameId} />
                            </Grid>
                        }
                        {!settingsOpen &&
                            <>
                                <Button onClick={handleClick} variant="contained" size="medium" style={{ marginTop: '40px', width: '150px', height: '50px', marginRight: '10px', backgroundColor: '#f7b89b', }}>
                                    Close
                                </Button>
                                <Button onClick={handlePlayAgain} variant="contained" size="medium" style={{ marginTop: '40px', width: '150px', height: '50px', marginLeft: '10px', backgroundColor: '#f7b89b' }}>
                                    Play again
                                </Button>
                            </>
                        }
                    </Grid>
                </Paper>
            </Modal>
        </>

    )
}
export default GameEnd