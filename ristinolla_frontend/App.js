import calligraphy from './img/calligraphy.png'
import './App.css'
import Grid from '@mui/material/Grid'
import Ristinolla from './components/ristinolla'
import NavPane from './components/navPane'
import scroll from './img/scroll.svg'
import React, { useState, useContext, useEffect } from 'react'
import backgroundpic from './img/backgroundpic.svg'
import CursorEvent from './components/cursorEvent'
import { PlayerContextProvider, PlayerContext } from './components/playerContext'


const App = () => {

  const [gameOpen, setGameOpen] = useState(false)
  const { player1, setPlayer1 } = useContext(PlayerContext)
  const { player2, setPlayer2 } = useContext(PlayerContext)

  const handleClick = () => {
    setGameOpen(true)
  }

  const handleClose = () => {
    setGameOpen(false)
  }

  return (
    <div>
      <img src={backgroundpic} className="bgpic" />
      <NavPane />
      <img className="scroll" src={scroll} onClick={handleClick}></img>
      {gameOpen &&
        <CursorEvent />
      }
      <Ristinolla gameOpen={gameOpen} handleClose={handleClose} />
    </div>
  )
}

export default App