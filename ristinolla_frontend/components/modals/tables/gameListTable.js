import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import React, { useState, useEffect } from 'react'
import { gameService } from '../../../services/gameService'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import moment from 'moment'


export default function GameListTable({ handleRowClick, handleClose }) {

  const [games, setGames] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const itemsPerPage = 8

  //get games from db
  useEffect(() => {
    gameService.getAllGames()
      .then(
        data => {
          setGames(data)
        }
      )
  }, [])

  //tabledata and pagination
  const data = {
    rows: games
      .slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
      .map(x => (
        {
          id: x._id,
          player1: x.player1,
          player2: x.player2,
          winner: x.winner,
          moves: x.moves,
          createdAt: moment(x.createdAt, 'MMMM Do YYYY, h:mm:ss a').format('YYYY-MM-DD HH:mm:ss'),
          startingPlayer: x.startingPlayer,
          player1Token: x.player1Token,
          player2Token: x.player2Token,
        }
      ))
      .sort((a, b) => new Date(moment(b.createdAt, 'MMMM Do YYYY, h:mm:ss a')) - new Date(moment(a.createdAt, 'MMMM Do YYYY, h:mm:ss a')))
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleClick = () => {
    handleClose()
  }


  return (
    <TableContainer sx={{ padding: '30px', paddingTop: '90px' }}>
      <Grid item xs={12} sx={{ height: '50px', display: 'flex', justifyContent: 'center' }}>
        <h1>List of all games</h1>
      </Grid>
      <Grid item xs={12} sx={{ height: '50px', display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
        <h4>Click on the row to see what moves were made</h4>
      </Grid>
      <Table sx={{ width: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }}>Player 1</TableCell>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }} >Player 2</TableCell>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }}>Winner</TableCell>
            <TableCell sx={{ color: 'rgb(255, 212, 144)' }}>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row) => (
            <TableRow
              onClick={() => handleRowClick(row.player1, row.player2, row.winner, row.moves, row.startingPlayer, row.player1Token, row.player2Token, row.id)}
              key={row.id}
              hover
              sx={{
                '&:last-child td, &:last-child th': { border: 0 }, '&.MuiTableRow-hover': {
                  '&:hover': {
                    backgroundColor: 'rgba(255, 212, 144, 0.8)',
                  },
                },
              }}
            >
              <TableCell >{row.player1}</TableCell>
              <TableCell >{row.player2}</TableCell>
              <TableCell >{row.winner}</TableCell>
              <TableCell >{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={games.length}
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
