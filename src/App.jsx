import { useState } from "react"
import confetti  from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS} from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { saveGameToStorage, resetGameToStorage } from "./logic/storage/storage"

function App() {
const [board, setBoard] = useState( () => {
  const boardFromStorage = window.localStorage.getItem('board')
  return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
})

const [turn, setTurn] = useState( () => {
  const turnFromStorage = window.localStorage.getItem('turn')
  return turnFromStorage ??  TURNS.X})

const [winner, setWinner]= useState(null)

 

const updateBoard=(index) => {
  //no actualizar la posicion si ya tiene algo
  //si en el indice ya hay algo, no escribas

  if (board[index] || winner) return

  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  setTurn(newTurn)

  saveGameToStorage({ board: newBoard,
  newTurn })
  
  
  const newWinner = checkWinner(newBoard)
  if(newWinner) {
    confetti()
    setWinner(newWinner)
  } else if (checkEndGame(newBoard)){
    setWinner(false)
  }
}

const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
  resetGameToStorage()
}
  return (
    <main className="main">
      <h1>Tic Tac Toe </h1>
      <div className="restart-turn" onClick={resetGame}>Reiniciar partida</div>
      <section className="game">
        { 
          board.map((_, index) => {
            return (
             <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }

      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>

      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    
    </main>
   
  )
}

export default App
