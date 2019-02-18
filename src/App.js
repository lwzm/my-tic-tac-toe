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

function calculateWinner(squares) {
    for (const line of lines) {
        const [a, b, c] = line.map((idx) => squares[idx])
        if (a && a === b && a === c) {
            return a
        }
    }
}

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
    const [step, setStep] = useState(0)
    const [history, setHistory] = useState(useMemo(() => [Array(9).fill(null)], []))

    useEffect(() => {
        document.title = nextPlayer
    })

    const currentSquares = history[step]
    const winner = calculateWinner(currentSquares)
    const nextPlayer = step % 2 === 0 ? "X" : "O"

    function clickSquare(idx) {
        const squares = currentSquares.slice()  // make a copy
        if (winner || squares[idx]) {
            return
        }

        squares[idx] = nextPlayer

        const n = step + 1
        const his = history.slice(0, n)
        his.push(squares)

        setHistory(his)
        setStep(n)
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
            onClick={clickSquare}
        />
        <div className="game-info">
            <div>{info}</div>
            <ol>{moves}</ol>
        </div>
    </div>
}