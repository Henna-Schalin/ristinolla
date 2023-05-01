import React, { useState, useEffect, useContext } from 'react'

export const AiPlayer = (locked, playerTwoMoves, playerOneMoves) => {

  const winningRow = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  const aiMoves = playerTwoMoves.flat()
  const playerMoves = playerOneMoves.flat()

  // Prioritizes the middle of the board or the top right corner first and returns the value if available
  if (!locked[4]) {
    return 4
  } else if (locked[4] && aiMoves.length === 0) {
    return 2
  }

  // Checks for winning move if none of the prioritized cells are available, returns the value if available
  for (let i = 0; i < winningRow.length; i++) {
    const [a, b, c] = winningRow[i]
    if (!locked[a] && aiMoves.includes(b) && aiMoves.includes(c)) {
      return a
    } else if (!locked[b] && aiMoves.includes(a) && aiMoves.includes(c)) {
      return b
    } else if (!locked[c] && aiMoves.includes(a) && aiMoves.includes(b)) {
      return c
    }
  }

  // Checks for blocking move if no winning move available, returns the value if available
  for (let i = 0; i < winningRow.length; i++) {
    const [a, b, c] = winningRow[i]
    if (!locked[a] && playerMoves.includes(b) && playerMoves.includes(c)) {
      return a
    } else if (!locked[b] && playerMoves.includes(a) && playerMoves.includes(c)) {
      return b
    } else if (!locked[c] && playerMoves.includes(a) && playerMoves.includes(b)) {
      return c
    }
  }

  // Or makes a random move if neither blocking or winning move available, and finally returns the random value
  let possibleMoves = []
  for (let i = 0; i < locked.length; i++) {
    if (!locked[i]) {
      possibleMoves.push(i)
    }
  }

  let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

  return move
}
