import { playerService } from "../services/playerService"


export const checkWin = (moves, player) => {

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


    // Check if any of the winning rows are completely occupied by the current player
    for (let i = 0; i < winningRow.length; i++) {
        const row = winningRow[i]

        if (moves.map(x => Number(x)).includes(row[0]) && moves.map(x => Number(x)).includes(row[1]) && moves.map(x => Number(x)).includes(row[2])) {
            return player
        }
    }

    // Return null if no winning condition is met
    return null
}

export const checkWinRow = (moves, player) => {

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


    // Check if any of the winning rows are completely occupied by the current player
    for (let i = 0; i < winningRow.length; i++) {
        const row = winningRow[i]

        if (moves.map(x => Number(x)).includes(row[0]) && moves.map(x => Number(x)).includes(row[1]) && moves.map(x => Number(x)).includes(row[2])) {
            return row
        }
    }

    // Return null if no winning condition is met
    return null
}

