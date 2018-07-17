import React from 'react'

import "./style.css"


function Square({value, onClick}) {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    )
}


function Board({squares, onClick}) {
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


class App extends React.Component {
    lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    constructor(props) {
        super(props)
        this.state = {
            history: [
                Array(9).fill(""),
            ],
            stepNumber: 0,
        }
    }

    get nextPlayer() {
        return this.state.stepNumber % 2 === 0 ? "X" : "O"
    }

    get currentSquares() {
        return this.state.history[this.state.stepNumber]
    }

    get winner() {
        const squares = this.currentSquares
        for (const line of this.lines) {
            const [a, b, c] = line.map((idx) => squares[idx])
            if (a && a === b && a === c) {
                return a
            }
        }
        return ""
    }

    get info() {
        const winner = this.winner
        const status = winner ?
            "Winner: " + winner :
            "Next player: " + this.nextPlayer
        return status
    }

    get moves() {
        return this.state.history.map((_, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start'
            return <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        })
    }

    handleClick = (i) => {
        const squares = this.currentSquares.slice()  // make a copy
        if (this.winner || squares[i]) {
            return
        }
        const stepNumber = this.state.stepNumber + 1
        const history = this.state.history.slice(0, stepNumber)
        squares[i] = this.nextPlayer
        history.push(squares)
        this.setState({
            history,
            stepNumber,
        })
    }

    jumpTo(stepNumber) {
        this.setState({
            stepNumber,
        })
    }

    render() {
        return <div className="game">
            <div className="game-board">
                <Board
                    squares={this.currentSquares}
                    onClick={this.handleClick}
                />
            </div>
            <div className="game-info">
                <div>{this.info}</div>
                <ol>{this.moves}</ol>
            </div>
        </div>
    }

}

// ========================================


export default App
