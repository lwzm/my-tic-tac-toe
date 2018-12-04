/* globals wx: false */

import React, { useState, useEffect, useContext, useMemo } from 'react'

import "./style.css"


const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


const Square = ({ value, onClick }) => <button className="square" onClick={onClick}>
    {value}
</button>


function Board({ squares, onClick }) {
    const renderSquare = (i) => <Square
        value={squares[i]}
        onClick={() => onClick(i)}
    />

    return <div>
        <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
        </div>
        <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
        </div>
        <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
        </div>
    </div>
}


export default function () {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [step, setStep] = useState(0)

    const currentSquares = history[step]

    let winner = null
    for (const line of lines) {
        const [a, b, c] = line.map((idx) => currentSquares[idx])
        if (a && a === b && a === c) {
            winner = a
        }
    }

    const nextPlayer = step % 2 === 0 ? "X" : "O"

    const handleClick = (idx) => {
        const squares = currentSquares.slice()  // make a copy
        if (winner || squares[idx]) {
            return
        }

        squares[idx] = nextPlayer

        const n = step + 1
        const his = history.slice(0, n)
        his.push(squares)

        setStep(n)
        setHistory(his)
    }

    const info = winner ?
        "Winner: " + winner :
        "Next player: " + nextPlayer

    const moves = history.map((_, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start'
        return <li key={move}>
            <button onClick={() => setStep(move)}>{desc}</button>
        </li>
    })

    return <div className="game">
        <Board
            className="game-board"
            squares={currentSquares}
            onClick={handleClick}
        />
        <div className="game-info">
            <div>{info}</div>
            <ol>{moves}</ol>
        </div>
    </div>
}