import '../App.css'
import parchment from '../img/parchment.svg'
import calligraphy from '../img/calligraphy.png'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import RistinollaCell from './ristinollaCell'
import { checkWin } from './checkWin'
import { checkWinRow } from './checkWin'
import { PlayerContext } from './playerContext'
import { gameService } from '../services/gameService'
import GameEnd from './modals/gameEnd'
import { AiPlayer } from './aiPlayer'
import WinImg from './winImg'
import Grow from '@mui/material/Grow'


import React, { useState, useEffect, useContext } from 'react'

const Ristinolla = ({ gameOpen, handleClose }) => {
    const lockedInitial = [false, false, false, false, false, false, false, false, false]
    const [locked, setLocked] = useState(lockedInitial)
    const imageInitial = [
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false]
    ]
    const [showImage, setShowImage] = useState(imageInitial)
    const [player, setPlayer] = useState(1)
    const { player1, setPlayer1 } = useContext(PlayerContext)
    const { player2, setPlayer2 } = useContext(PlayerContext)
    const { player1Token, setPlayer1Token } = useContext(PlayerContext)
    const { player2Token, setPlayer2Token } = useContext(PlayerContext)
    const initialArray = []
    const [playerOneMoves, setPlayerOneMoves] = useState([])
    const [playerTwoMoves, setPlayerTwoMoves] = useState([])
    const [allMovesList, setAllMovesList] = useState([])
    const [allMoves, setAllMoves] = useState(0)
    const [winModalOpen, setWinModalOpen] = useState(false)
    const [playedGameId, setPlayedGameId] = useState(null)
    const [winningRow, setWinningRow] = useState('')
    const [startingPlayer, setStartingPlayer] = useState('')
    const [gameEnd, setGameEnd] = useState(false)
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [tiesScore, setTiesScore] = useState(0)

    //checks for win after each move, also checks if there are 9 moves and makes the game tied if there is no winner.
    useEffect(() => {
        const playerOneResult = checkWin(playerOneMoves, 1) // checks for player1 win
        const playerTwoResult = checkWin(playerTwoMoves, 2) // checks for player2 win

        if (playerOneResult !== null) { // if player1 wins, sets the winningrow and animates the line. Also initializes the game for db push
            setGameEnd(true)
            setPlayer1Score(player1Score + 1);
            setLocked([true, true, true, true, true, true, true, true, true])
            const winrow = checkWinRow(playerOneMoves, 2)
            setTimeout(() => {
                setWinningRow(winrow)
            }, 200)
            const winner = player1
            const newGame = {
                player1,
                player2,
                allMovesList,
                winner,
                startingPlayer,
                player1Token,
                player2Token,
            }
            handleEnd(newGame)
        } else if (playerTwoResult !== null) { // if player2 wins, sets the winningrow and animates the line. Also initializes the game for db push
            setGameEnd(true)
            setPlayer2Score(player2Score + 1);
            setLocked([true, true, true, true, true, true, true, true, true])
            const winrow = checkWinRow(playerTwoMoves, 2)
            setTimeout(() => {
                setWinningRow(winrow)
            }, 200)
            const winner = player2
            const newGame = {
                player1,
                player2,
                allMovesList,
                winner,
                startingPlayer,
                player1Token,
                player2Token,
            }
            handleEnd(newGame)
        } else if (allMoves === 9) { // if it's a tie, sets the winner as 'tie'. Also initializes the game for db push
            setTiesScore(tiesScore + 1);
            const winner = 'tie'
            const tiedGame = {
                player1,
                player2,
                allMovesList,
                winner,
                startingPlayer,
                player1Token,
                player2Token,
            }
            handleEnd(tiedGame)
        }
    }, [playerOneMoves, playerTwoMoves, allMoves])

    //checks if the other player is AI and handles the AI's moves based on starting player
    useEffect(() => {
        if (startingPlayer === player1 && player2 === "AI" && allMovesList.length > 0 && allMovesList.length % 2 !== 0 && allMoves < 9) {
            setTimeout(() => {
                handleAIMoves()
            }, Math.floor(Math.random() * (500 - 100 + 1)) + 100)

        } else if (startingPlayer === player2 && allMovesList.length === 0) {
            setTimeout(() => {
                handleAIMoves()
            }, Math.floor(Math.random() * (500 - 100 + 1)) + 100)
        } else if (startingPlayer === player2 && player2 === "AI" && allMovesList.length % 2 === 0 && allMoves < 9) {
            setTimeout(() => {
                handleAIMoves()
            }, Math.floor(Math.random() * (500 - 100 + 1)) + 100)
        }
    }, [allMovesList])

    //checks if player2 / player1 is changed and if it is their turn to start, changes startingPlayer accordingly.
    //additionally checks if starting player has not yet been set and sets it
    useEffect(() => {
        if (player2 !== 'AI' && startingPlayer === 'AI') {
            setStartingPlayer(player2)
        } else if (player2 !== 'Player 1' && startingPlayer === 'Player 1') {
            setStartingPlayer(player1)
        }
        else if (startingPlayer === '') {
            setStartingPlayer(player1)
        }
    }, [player2, player1])

    //handles playerclicks on the board, sets the showing images and locks respective cells from the board.
    const handleClick = (index) => {

        if (player === 1 && !locked[index]) {
            const updatedShowImage = [...showImage]
            const updateLocked = [...locked]
            updatedShowImage[index][player1Token] = true
            setShowImage(updatedShowImage)
            updateLocked[index] = true
            setLocked(updateLocked)
            setPlayerOneMoves([...playerOneMoves, [index]])
            setAllMovesList(prevMoves => [...prevMoves, index])
            setPlayer(2)
            setAllMoves(allMoves + 1)
        } else if (player === 2 && !locked[index] && player2 !== "AI") {
            const updatedShowImage = [...showImage]
            const updateLocked = [...locked]
            updatedShowImage[index][player2Token] = true
            setShowImage(updatedShowImage)
            updateLocked[index] = true
            setLocked(updateLocked)
            setPlayerTwoMoves([...playerTwoMoves, [index]])
            setAllMovesList(prevMoves => [...prevMoves, index])
            setPlayer(1)
            setAllMoves(allMoves + 1)
        }
        else {
            console.log('locked!')
        }
    }

    const handleWinClose = (event, reason, gameId, closeModal) => {
        if (reason && (reason == "backdropClick" || reason == "escapeKeyDown")) {
            if (player1 === "Player 1") {
                if (window.confirm('Are you sure? Game will not be saved.')) {
                    gameService.deleteGameById(gameId)
                } else {
                    return
                }
            }
        }
        setWinModalOpen(false)
    }

    // handles the game ending. Saves game to db and initializes the board after. 
    const handleEnd = (newGame) => {
        gameService.saveGame(newGame)
            .then(
                data => {
                    setPlayedGameId(data.id)
                    setTimeout(() => {
                        setShowImage(imageInitial)
                        setLocked(lockedInitial)
                        setWinModalOpen(true)
                        setPlayerOneMoves(initialArray)
                        setPlayerTwoMoves(initialArray)
                        setAllMovesList(initialArray)
                        setAllMoves(0)
                        setWinningRow('')
                    }, 1200)
                    if (startingPlayer === player1) {
                        setStartingPlayer(player2)
                    } else if (startingPlayer === player2) {
                        setStartingPlayer(player1)
                    }
                }
            )
    }

    // handles the moves if opponent is AI
    const handleAIMoves = () => {
        const index = AiPlayer(locked, playerTwoMoves, playerOneMoves)
        const updatedShowImage = [...showImage]
        const updateLocked = [...locked]
        updatedShowImage[index][player2Token] = true
        setShowImage(updatedShowImage)
        updateLocked[index] = true
        setLocked(updateLocked)
        setPlayerTwoMoves([...playerTwoMoves, [index]])
        setAllMovesList(prevMoves => [...prevMoves, index])
        setAllMoves(allMoves + 1)
        setPlayer(1)
    }

    return (
        <>
            <GameEnd winModalOpen={winModalOpen} handleWinClose={handleWinClose} playedGameId={playedGameId} handleClose={handleClose} />
            <Modal
                open={gameOpen}
                onClose={handleClose}
            >
                <Grow in={gameOpen}
                >
                    <Grid className="game-modal" style={{
                        display: 'flex',
                        width: '730px',
                        height: '1000px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'transparent',
                        outline: 'none',
                        '@media (maxWidth: 767px)': {
                            transform: 'scale(0.8)',
                            width: '80%',
                            height: '80%'
                        }
                    }}>
                        <img src={parchment} className="parchment" />
                        <img src={calligraphy} className="calligraphy" />
                        <WinImg winningRow={winningRow}></WinImg>

                        <Grid container className="calligraphy2" sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
                            <Grid sx={{ height: '275px', width: '730px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                                {player === 1 && <p style={{position: 'absolute', top: 210}}>{player1}'s turn!</p>}
                                {player === 2 && <p style={{position: 'absolute', top: 210}}>{player2}'s turn!</p>}
                            </Grid>
                            <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <RistinollaCell handleClick={handleClick} showImage={showImage} index={0} bottom={0} height={'150px'} width={'150px'} />
                                <RistinollaCell handleClick={handleClick} showImage={showImage} index={1} bottom={0} height={'150px'} width={'150px'} />
                                <RistinollaCell handleClick={handleClick} showImage={showImage} index={2} bottom={0} height={'150px'} width={'150px'} />
                            </Grid>
                            <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <RistinollaCell handleClick={handleClick} showImage={showImage} index={3} bottom={40} height={'150px'} width={'150px'} />
                                <RistinollaCell handleClick={handleClick} showImage={showImage} index={4} bottom={40} height={'150px'} width={'150px'} />
                                <RistinollaCell handleClick={handleClick} showImage={showImage} index={5} bottom={40} height={'150px'} width={'150px'} />
                            </Grid>
                            <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <RistinollaCell handleClick={handleClick} showImage={showImage} index={6} bottom={65} height={'150px'} width={'150px'} />
                                <RistinollaCell handleClick={handleClick} showImage={showImage} index={7} bottom={65} height={'150px'} width={'150px'} />
                                <RistinollaCell handleClick={handleClick} showImage={showImage} index={8} bottom={65} height={'150px'} width={'150px'} />
                            </Grid>
                            <Grid sx={{ height: '275px', width: '730px', position: 'relative', bottom: 30, marginLeft: '220px' }}>
                                <p>
                                <span>{player1}'s wins: </span><span style={{position: 'absolute', right: 250}}>{player1Score}</span><br></br>
                                <span>{player2}'s wins: </span><span style={{position: 'absolute', right: 250}}>{player2Score}</span><br></br>
                                <span>Ties: </span><span style={{position: 'absolute', right: 250}}>{tiesScore}</span>
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grow>
            </Modal>
        </>
    )
}

export default Ristinolla