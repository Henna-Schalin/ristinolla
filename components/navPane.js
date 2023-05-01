import Grid from '@mui/material/Grid'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ScoreboardOutlinedIcon from '@mui/icons-material/ScoreboardOutlined'
import ListIcon from '@mui/icons-material/FormatListNumberedRtlOutlined'
import React, { useState, useContext } from 'react'
import MyModal from './myModal'

const NavPane = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')

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
        <SettingsOutlinedIcon onClick={() => handleClick('settingsModal')} sx={{ fontSize: '50px', marginRight: '5px', marginLeft: '5px', zIndex: 1000 }} />
        <ScoreboardOutlinedIcon onClick={() => handleClick('highScore')} sx={{ fontSize: '50px', marginRight: '5px', marginLeft: '5px', zIndex: 1000 }} />
        <ListIcon onClick={() => handleClick('gameList')} sx={{ fontSize: '50px', marginRight: '5px', marginLeft: '5px', zIndex: 1000 }} />
      </Grid>
      <Grid container>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        </Grid>
      </Grid>
    </>
  )
}
export default NavPane