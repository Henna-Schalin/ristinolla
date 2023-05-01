import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { PlayerContextProvider, PlayerContext } from './components/playerContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <PlayerContextProvider>
        <App />
    </PlayerContextProvider>)