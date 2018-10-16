/* globals wx:false */

import React from 'react'
import { ThemeContext, V } from './ctx'
import Test from './test'

import axios from 'axios'

import "./style.css"


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
        <V.Consumer>
            {x => <div>{x}</div>}
        </V.Consumer>
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
            ip: "none",
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

    handleClick = async (i) => {
        // axios.get("http://ip.tyio.net").then(rsp => {
        //     this.setState({ip: rsp.data})
        // })

        let resp
        await sleep()
        resp = await axios.get("http://ip.tyio.net")
        this.setState({ ip: resp.data })
        const squares = this.currentSquares.slice()  // make a copy
        if (this.winner || squares[i]) {
            return
        }

        squares[i] = this.nextPlayer

        const stepNumber = this.state.stepNumber + 1
        const history = this.state.history.slice(0, stepNumber)
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
        return <div>
            <div className="game">
                <div className="game-board">
                    <V.Provider value={this.state.stepNumber}>
                        <Board
                            squares={this.currentSquares}
                            onClick={this.handleClick}
                        />
                    </V.Provider>
                </div>

                <div className="game-info">
                    <div>{this.info}</div>
                    <ol>{this.moves}</ol>
                </div>

            </div>

            <button onClick={test}>WX</button>
            <Test />
            <div>{this.state.ip}</div>
        </div>
    }

}

function test() {
    console.log("test")
    if (window.__wxjs_environment) {
        wx.miniProgram.navigateTo({ url: "/pages/logs/logs" })
    }
}

// ========================================

function sleep(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

!async function () {
    await sleep(1000)
    let resp = await fetch("http://ip.tyio.net")
    let text = await resp.text()
    console.log(text)
}()

export default App
