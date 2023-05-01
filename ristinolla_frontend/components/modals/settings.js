
import '../../App.css'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import '@fontsource/roboto/500.css'
import { useState, useContext, useEffect } from 'react'
import { PlayerContext } from '../playerContext'
import { playerService } from '../../services/playerService'


const SettingsModal = ({ type, handleClose, playedGameId }) => {
    const [player1InputValue, setPlayer1InputValue] = useState('')
    const [player2InputValue, setPlayer2InputValue] = useState('')
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(false)
    const [checkedAI, setCheckedAI] = useState(true)
    const { player1, setPlayer1 } = useContext(PlayerContext)
    const { player2, setPlayer2 } = useContext(PlayerContext)
    const { player1Token, setPlayer1Token } = useContext(PlayerContext)
    const { player2Token, setPlayer2Token } = useContext(PlayerContext)
    const [player1PasswordValue, setPlayer1PasswordValue] = useState('')
    const [player2PasswordValue, setPlayer2PasswordValue] = useState('')
    const [password1OK, setPassword1OK] = useState(false)
    const [password2OK, setPassword2OK] = useState(false)


    //checks if both passwords are ok after handleClickfunction. If player2 is AI, the passwordOK for player2 is set to OK by default in the handleClick function.
    useEffect(() => {
        if (password1OK && password2OK) {
            handleClose()
        }
    }, [password1OK, password2OK])

    //checks if player already exists in db
    const checkPlayer = (playerName, playerPassword, index) => {
        playerService.getPlayerByName(playerName)
            .then(
                data => {
                    if (data === "yes") {
                        alert(playerName + ' already exists, pick another')
                    } else if (data === "no") {
                        createPlayer(playerName, playerPassword, index)
                    }
                }
            )
    }

    //creates a new player to db
    const createPlayer = (playerName, playerPassword, index) => {
        if (index === 1) {
            setPlayer1(playerName)
            setPassword1OK(true)
        } else if (index === 2) {
            setPlayer2(playerName)
            setPassword2OK(true)
        }
        const newPlayer = {
            name: playerName,
            passwordHash: playerPassword,
        }
        playerService.savePlayer(newPlayer)
    }

    //checks if password for the player is correct
    const checkPassword = (playerName, playerPassword, index) => {
        const thisPlayer = {
            name: playerName,
            enteredPassword: playerPassword,
        }
        playerService.checkPassword(thisPlayer)
            .then(result => {
                if (result === "ok" && index === 1) {
                    setPlayer1(thisPlayer.name)
                    setPassword1OK(true)
                } else if (result === "ok" && index === 2) {
                    setPlayer2(thisPlayer.name)
                    setPassword2OK(true)
                }
            })
            .catch(error => {
                console.error(error)
            })

    }

    //when the user clicks confirm, either checks passwords or checks if the player already exists and goes on to configure players.
    const handleClick = (event, index) => {
        if (checked1) {
            if (player1InputValue === '' || player1PasswordValue === '') {
                alert('Information is missing, please check that you have entered all the required information')
            } else {
                checkPlayer(player1InputValue, player1PasswordValue, 1)
            }
        } else if (!checked1) {
            if (player1InputValue === '' || player1PasswordValue === '') {
                alert('Information is missing, please check that you have entered all the required information')
            } else {
                checkPassword(player1InputValue, player1PasswordValue, 1)
            }
        }
        if (checked2 && !checkedAI) {
            if (player1InputValue === '' || player1PasswordValue === '' || player2InputValue === '' || player2PasswordValue === '') {
                alert('Information is missing, please check that you have entered all the required information')
            } else {
                checkPlayer(player2InputValue, player2PasswordValue, 2)
            }
        } else if (!checked1 && !checkedAI) {
            if (player1InputValue === '' || player1PasswordValue === '' || player2InputValue === '' || player2PasswordValue === '') {
                alert('Information is missing, please check that you have entered all the required information')
            } else {
                checkPassword(player2InputValue, player2PasswordValue, 2)
            }
        }
        if (checkedAI) {
            setPassword2OK(true)
        }
    }

    //handles the player name and password input changes
    const handleChange = (event, index) => {
        if (index === 1) {
            setPlayer1InputValue(event.target.value)
        } else if (index === 2) {
            setPlayer2InputValue(event.target.value)
        } else if (index === 3) {
            setPlayer1PasswordValue(event.target.value)
        } else if (index === 4) {
            setPlayer2PasswordValue(event.target.value)
        }
    }

    //handles switchchanges for if the opponent is AI and if players are new or existing
    const switchChange = (event, index) => {
        if (index === 1) {
            setChecked1(event.target.checked)
        } else if (index === 2) {
            setChecked2(event.target.checked)
        } else if (index === 3) {
            setCheckedAI(event.target.checked)
        }
    }

    //handles the select input. If the user sets one as "X" the other will be "O"
    const handleTokenChange = (event, index) => {
        if (index === 1) {
            setPlayer1Token(event.target.value === 'x' ? 0 : 1)
            setPlayer2Token(event.target.value === 'x' ? 1 : 0)
        }
        else if (index === 2) {
            setPlayer2Token(event.target.value === 'x' ? 0 : 1)
            setPlayer1Token(event.target.value === 'x' ? 1 : 0)
        }
    }

    return (
        <Grid container style={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
            {type !== 'gameEnd' &&
                <Grid container className="modalBlock" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px', marginBottom: '5px', marginTop: '100px' }}>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ fontFamily: 'roboto', fontSize: '1.5em', marginLeft: '50px' }}>AI opponent</div>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <InputLabel htmlFor="my-select" variant="outlined">Select Token for Player 1</InputLabel> */}
                        <Switch checked={checkedAI} onChange={(event) => switchChange(event, 3)} name="checked1" inputProps={{ 'aria-label': 'toggle switch' }} />
                    </Grid>
                </Grid>
            }
            <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px', marginBottom: '5px', }}>

                <Grid container spacing={2}>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ fontFamily: 'roboto', fontSize: '1.5em', marginLeft: '50px' }}>Player 1</div>
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <InputLabel style={{ marginTop: '9px' }}>Existing</InputLabel>
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', }}>
                        <Switch checked={checked1} onChange={(event) => switchChange(event, 1)} name="checked1" inputProps={{ 'aria-label': 'toggle switch' }} />
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-start', }}>
                        <InputLabel style={{ marginTop: '9px' }}>New</InputLabel>

                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <TextField value={player1InputValue} onChange={(event) => handleChange(event, 1)} id="player1-name" label="Player 1 name" variant="outlined" sx={{ width: '80%' }} />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <FormControl variant="outlined" sx={{ width: '80%' }}>
                            <InputLabel htmlFor="my-select" variant="outlined">{type === "gameEnd" ? "Token" : "Select Token for Player 1"}</InputLabel>
                            <Select disabled={type === "gameEnd" ? true : false} onChange={(event) => handleTokenChange(event, 1)} value={player1Token === 0 ? 'x' : 'o'} labelId="my-select" id="my-select" label={type === "gameEnd" ? "Token" : "Select Token for Player 1"}>
                                <MenuItem value={'x'}>X</MenuItem>
                                <MenuItem value={'o'}>O</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        {!checked1 &&
                            <TextField onChange={(event) => handleChange(event, 3)} id="player1-password" label="Insert Password" variant="outlined" type="password" sx={{ width: '80%' }} />
                        }
                        {checked1 &&
                            <TextField onChange={(event) => handleChange(event, 3)} id="player1-password" label="Set Password" variant="outlined" type="password" sx={{ width: '80%' }} />
                        }
                    </Grid>
                </Grid>
            </Grid>
            {type !== 'gameEnd' &&
                <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px', marginBottom: '5px', }}>

                    <Grid container spacing={2}>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{ fontFamily: 'roboto', fontSize: '1.5em', marginLeft: '50px', color: checkedAI ? 'grey' : 'black' }}>Player 2</div>
                        </Grid>
                        <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <InputLabel style={{ marginTop: '9px' }}>Existing</InputLabel>
                        </Grid>
                        <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', }}>
                            <Switch disabled={checkedAI ? true : false} checked={checked2} onChange={(event) => switchChange(event, 2)} name="checked2" inputProps={{ 'aria-label': 'toggle switch' }} />
                        </Grid>
                        <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-start', }}>
                            <InputLabel style={{ marginTop: '9px' }}>New</InputLabel>

                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <TextField disabled={checkedAI ? true : false} onChange={(event) => handleChange(event, 2)} id="player2-name" label="Player 2 name" variant="outlined" sx={{ width: '80%' }} />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <FormControl variant="outlined" sx={{ width: '80%' }}>
                                <InputLabel htmlFor="my-select" variant="outlined">Select Token for Player 2</InputLabel>
                                <Select onChange={(event) => handleTokenChange(event, 2)} value={player2Token === 0 ? 'x' : 'o'} disabled={checkedAI ? true : false} labelId="my-select" id="my-select" label="Select an option for Player 2">
                                    <MenuItem value={'x'}>X</MenuItem>
                                    <MenuItem value={'o'}>O</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            {!checked2 &&
                                <TextField disabled={checkedAI ? true : false} onChange={(event) => handleChange(event, 4)} id="player2-password" label="Insert Password" variant="outlined" type="password" sx={{ width: '80%' }} />
                            }
                            {checked2 &&
                                <TextField disabled={checkedAI ? true : false} onChange={(event) => handleChange(event, 4)} id="player2-password" label="Set Password" variant="outlined" type="password" sx={{ width: '80%' }} />
                            }
                        </Grid>
                    </Grid>

                </Grid>
            }
            <Button onClick={handleClick} variant="contained" size="medium" style={{ marginTop: '40px', width: '150px', height: '50px' }}>
                Confirm
            </Button>
        </Grid>
    )
}
export default SettingsModal