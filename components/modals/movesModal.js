import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import calligraphy from '../../img/calligraphy.png'
import parchment from '../../img/parchment.svg'
import Grid from '@mui/material/Grid'
import RistinollaCell from '../ristinollaCell'
import React, { useState, useEffect, useContext } from 'react'

const MovesModal = ({ movesModalOpen, handleClose, gameMoves, gameStarter, rowPlayer1, rowPlayer2, token1, token2, gameId }) => {

    let init = false
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
    const [timeouts, setTimeouts] = useState([])

    const startingToken = gameStarter === rowPlayer1 ? token1 : token2
    const opponentToken = gameStarter === rowPlayer1 ? token2 : token1
    const opponent = gameStarter === rowPlayer1 ? rowPlayer2 : rowPlayer1

    const listItems = gameMoves.map((move, index) =>
        index % 2 === 0 ? (
            <li>Player: {gameStarter}, Move: {move}</li>
        ) : (
            <li>Player: {opponent}, Move: {move}</li>
        )
    )

    //checks that the component has been initialized properly and starts the animation/shows the moves
    useEffect(() => {

        init = JSON.stringify(showImage) === JSON.stringify(imageInitial) ? true : false
        if (movesModalOpen && init) {
            handleMovesAnimation()
        } else {
            setShowImage(imageInitial)
            for (let i = 0; i < gameMoves.length; i++) {
                const imageToShow = parseInt(gameMoves[i])
                const pictureToShow = i % 2 === 0 || i === 0 ? startingToken : opponentToken
                setShowImage(prevState => {
                    const newState = [...prevState]
                    newState[imageToShow][pictureToShow] = true
                    return newState
                })
            }
        }
    }, [movesModalOpen])

    //opens the moves one by one on the board in the game's sequence
    const handleMovesAnimation = () => {

        for (let i = 0; i < gameMoves.length; i++) {
            const timeout = setTimeout(() => {
                const imageToShow = parseInt(gameMoves[i])
                const pictureToShow = i % 2 === 0 || i === 0 ? startingToken : opponentToken
                setShowImage(prevState => {
                    const newState = [...prevState]
                    newState[imageToShow][pictureToShow] = true
                    return newState
                })
            }, i * 1000)
            setTimeouts(prevTimeouts => [...prevTimeouts, timeout])

            setTimeout(() => {
                setTimeouts([])
            }, 10000)
        }
    }

    //let's the user run the animation again if it has finished
    const runAgain = () => {
        if (timeouts.length !== 0) {
            alert('Animation is running, please wait')
        } else {
            setShowImage(imageInitial)
            setTimeout(() => {
                handleMovesAnimation()
            }, 2000)
        }
    }

    //clears any remaining timeouts before closing
    const handleMovesClose = () => {
        if (timeouts.length !== 0) {
            for (let i = 0; i < timeouts.length; i++) {
                clearTimeout(timeouts[i])
            }
            setTimeouts([])
        }
        setTimeout(() => {
            handleClose()
        }, 800)
    }


    return (

        <Modal
            open={movesModalOpen}
            onClose={handleClose}
        >
            <Paper style={{
                display: 'flex',
                justifyContent: 'center',
                width: '500px',
                height: '750px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255, 212, 144)',
                outline: 'none',
                border: '7px outset black',
                paddingBottom: '40px',
                paddingTop: '0px !important',
                borderRadius: '10px'
            }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <Grid item xs={12} sx={{}}>
                        <p style={{ fontSize: '25px' }}>Game moves</p>
                        <ol style={{}}>
                            {listItems}
                        </ol>
                    </Grid>
                </Grid>
                <div
                    style={{
                        width: '40px',
                        display: 'flex',
                        height: '300px',
                        width: '500px',
                        // height: '1000px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '60%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        // backgroundColor: 'transparent',
                        // outline: 'none',
                    }}
                >
                    <img src={parchment} className="parchment-in-modal" />
                    <img src={calligraphy} className="calligraphy-in-modal" />

                    <Grid container sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', marginLeft: '70px' }}>
                        <Grid sx={{ height: '80px', width: '100%' }}></Grid>
                        <Grid sx={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'center' }}>
                            <RistinollaCell type={'miniature'} showImage={showImage} index={0} height={'40px'} width={'40px'} />
                            <RistinollaCell type={'miniature'} showImage={showImage} index={1} height={'40px'} width={'40px'} />
                            <RistinollaCell type={'miniature'} showImage={showImage} index={2} height={'40px'} width={'40px'} />
                        </Grid>
                        <Grid sx={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'center' }}>
                            <RistinollaCell type={'miniature'} showImage={showImage} index={3} width={'40px'} />
                            <RistinollaCell type={'miniature'} showImage={showImage} index={4} width={'40px'} />
                            <RistinollaCell type={'miniature'} showImage={showImage} index={5} width={'40px'} />

                        </Grid>
                        <Grid sx={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'center' }}>
                            <RistinollaCell type={'miniature'} showImage={showImage} index={6} width={'40px'} />
                            <RistinollaCell type={'miniature'} showImage={showImage} index={7} width={'40px'} />
                            <RistinollaCell type={'miniature'} showImage={showImage} index={8} width={'40px'} />
                        </Grid>
                        <Grid sx={{ height: '80px', width: '100%' }}></Grid>
                    </Grid>

                </div>
                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleMovesClose} variant="contained" size="medium" style={{ marginTop: '40px', width: '150px', height: '50px', position: 'absolute', bottom: 40, left: 50 }}>
                        Close
                    </Button>
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={runAgain} variant="contained" size="medium" style={{ marginTop: '40px', width: '150px', height: '50px', position: 'absolute', bottom: 40, right: 50 }}>
                        Show moves
                    </Button>
                </Grid>
            </Paper>
        </Modal>


    )
}
export default MovesModal