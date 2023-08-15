import {Square} from './Square.jsx'

export function WinnerModal ( {winner, resetGame}) {
    if ( winner === null) return null

    const winnerText = winner === false ? 'Empate' : 'Gano'
    return (
        
              <section className="winner">
                <div className="text">
                   <h2>{winnerText}</h2>
                   <header className="win">
                    {winner && <Square>{winner}</Square>}
                   </header>
                   <footer>
                    <div className="restart" onClick={resetGame}>Empezar de nuevo</div>
                   </footer>
    
                </div>
             
     
              </section>
              
    )
              
    
}