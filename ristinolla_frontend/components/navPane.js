import Grid from '@mui/material/Grid'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ScoreboardOutlinedIcon from '@mui/icons-material/ScoreboardOutlined'
import ListIcon from '@mui/icons-material/FormatListNumberedRtlOutlined'
import React, { useState, useContext, useEffect } from 'react'
import MyModal from './myModal'

const NavPane = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)

  //Instruction animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowPrompt(true)
      setTimeout(() => {
        setShowPrompt(false)
      }, 5000)
    }, 10000)

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Opens modal depending on modalType
  const handleClick = (modalType) => {
    setModalOpen(true)
    setModalType(modalType)
  }

  const handleClose = () => {
    setModalOpen(false)
    setModalType('')
  }

  return (
    <>
      <Grid sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
        <MyModal modalOpen={modalOpen} handleClose={handleClose} style={{ zIndex: 2000 }} modalType={modalType} />
        <SettingsOutlinedIcon onClick={() => handleClick('settingsModal')} sx={{ fontSize: '70px', marginRight: '5px', marginLeft: '10px', zIndex: 1000 }} />
        <ScoreboardOutlinedIcon onClick={() => handleClick('highScore')} sx={{ fontSize: '70px', marginRight: '5px', marginLeft: '10px', zIndex: 1000 }} />
        <ListIcon onClick={() => handleClick('gameList')} sx={{ fontSize: '70px', marginRight: '5px', marginLeft: '10px', zIndex: 1000 }} />
      </Grid>
      <Grid container>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          {showPrompt && <p className="prompt">Open the scroll to begin</p>}
        </Grid>
      </Grid>
    </>
  )
}
export default NavPane