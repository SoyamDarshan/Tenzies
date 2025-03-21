

export default function RollDice(props) {
    const gameOver = props.isGameOver()
    return <button onClick={!gameOver ? props.RollNext : props.ResetBoard}>{gameOver ? "New Game" : "Roll Dice"}</button>
}
