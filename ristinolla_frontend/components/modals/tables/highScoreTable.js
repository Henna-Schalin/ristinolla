import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import React, { useState, useEffect } from 'react'
import { gameService } from '../../../services/gameService'
import { playerService } from '../../../services/playerService'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'


const HighScore = ({ handleRowClick, handleClose }) => {

  const [playerGames, setPlayerGames] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const itemsPerPage = 7

  //gets the games of players and launces removePlayers, that removes the two default/undefined players from the table
  useEffect(() => {
    playerService.getGamesForPlayers()
      .then(data => {
        removePlayers(data)
      })
  }, [])


  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  //Removing the default undefined players from the list
  const removePlayers = (data) => {
    const removeDefault = 'Player 1'
    const removeAI = 'AI'

    const updatedPlayerGames = data.filter(player => {
      return player.name !== removeDefault && player.name !== removeAI
    })
    setPlayerGames(updatedPlayerGames)
  }

  //tabledata and pagination
  const data = {
    rows: playerGames
      .slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
      .filter((x) => x.name !== 'Player 1' && x.name !== 'AI')
      .map(x => (
        {
          name: x.name,
          numGames: x.numGames,
          numWins: x.numWins,
          numLosses: x.numLosses,
          numTies: x.numTies,
          ratio: x.numGames > 0 ? (x.numWins / x.numGames).toFixed(2) : 0,
          winRatio: x.numGames > 0 ? x.numWins / x.numGames : 0,
        }
      ))
      .sort((a, b) => {
        if (a.winRatio === -1 && b.winRatio === -1) {
          return 0
        }
        if (a.winRatio === -1) {
          return 1
        }
        if (b.winRatio === -1) {
          return -1
        }
        return b.winRatio - a.winRatio
      })
      .map((x, i) => ({
        ...x,
        rank: x.winRatio === -1 ? null : i + 1,
      })),
  }

  const handleClick = () => {
    handleClose()
  }

  return (
    <TableContainer sx={{ padding: '30px', paddingTop: '90px' }}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <h1 >Scoreboard</h1>
      </Grid>
      <Table sx={{ width: '100%' }} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }}>Rank</TableCell>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }}>Player</TableCell>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }}>Number Of Games</TableCell>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }}>Number Of Wins</TableCell>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }}>Number Of Losses</TableCell>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }}>Number Of Ties</TableCell>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }}>Win ratio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row) => (
            <TableRow
              onClick={() => handleRowClick(row.player1, row.player2, row.winner, row.moves)}
              key={row.player1}
              hover
              sx={{
                '&:last-child td, &:last-child th': { border: 0 }, '&.MuiTableRow-hover': {
                  '&:hover': {
                    backgroundColor: 'rgba(255, 212, 144, 0.8)',
                  },
                },
              }}
            >
              <TableCell >{row.rank}</TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.numGames}</TableCell>
              <TableCell >{row.numWins}</TableCell>
              <TableCell >{row.numLosses}</TableCell>
              <TableCell >{row.numTies}</TableCell>
              <TableCell >{row.ratio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={playerGames.length}
        rowsPerPage={itemsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        sx={{ color: 'rgb(255, 212, 144)' }}
      />
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick} variant="contained" size="medium" style={{ marginTop: '40px', width: '150px', height: '50px' }}>
          Close
        </Button>
      </Grid>
    </TableContainer>

  )
}

export default HighScore