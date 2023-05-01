import { createContext, useState } from 'react'

const PlayerContext = createContext()

const PlayerContextProvider = ({ children }) => {
  const [player1, setPlayer1] = useState('Player 1')
  const [player2, setPlayer2] = useState('AI')
  const [player1Token, setPlayer1Token] = useState(0)
  const [player2Token, setPlayer2Token] = useState(1)


  return (
    <PlayerContext.Provider value={{
      player1, setPlayer1,
      player2, setPlayer2,
      player1Token, setPlayer1Token,
      player2Token, setPlayer2Token
    }}>

      {children}

    </PlayerContext.Provider>
  )
}

export { PlayerContext, PlayerContextProvider }