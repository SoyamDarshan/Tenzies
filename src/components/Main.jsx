import { useState } from "react";
import { v4 as uuid4 } from "uuid";
import Description from "./Description";

function randomDieNumber() {
    return Math.floor(Math.random() * 6) + 1
}


export default function Main() {

    function DieList(props) {
        return <div className="display-numbers">
                {props.diceList.map((element) => {
                    return <BoxButton key={element.id} id={element.id} isHeld={element.isHeld} value={element.value} freezeButton={props.freezeButton}></BoxButton>})}
                </div>
    }

    function BoxButton(props) {
        return <button id={props.id} onClick={props.freezeButton} className={props.isHeld ? "green-button" : "blue-button"}>{props.value}</button>
    }

    function isGameOver() {
        let counter = 0
        diceList.map((item) => {
            if (item.isHeld === true)
                counter += 1
        })
        return counter === diceList.length ? true : false
    }

    function RollNext() {
        const updatedList = diceList.map((item) => {
            if (item.isHeld === false) {
                item.value = randomDieNumber()
            }
            return item
        })
        setDiceList(updatedList)
    }

    function ResetBoard() {
        setDiceList(generateAllNewDice())
        setFreezeTarget(randomDieNumber())
    }

    function RollDice() {
        const gameOver = isGameOver()
        return <button onClick={!gameOver ? RollNext : ResetBoard}>{gameOver ? "New Game" : "Roll Dice"}</button>
    }

    function freezeButton(event) {
        const id = event.currentTarget.getAttribute('id')
        const updatedItems = diceList.map(item => {
            if (item.id === id && item.isHeld === false && item.value === freezeTarget) {
                item.isHeld = !item.isHeld
            }
            return item
        }
        )
        setDiceList(updatedItems)
    }

    function generateAllNewDice() {        
        return new Array(10)
            .fill(0)
            .map(() => ({
                "value": randomDieNumber(),
                "isHeld": false,
                id: uuid4()
            }))
    }

    const [diceList,  setDiceList] = useState(() => generateAllNewDice())
    const [freezeTarget, setFreezeTarget] = useState(randomDieNumber())
    return <>
    <Description></Description>
    <hr />
    <h2>Freeze Target: {freezeTarget}</h2>
    <div className="game-container">
    <DieList diceList={diceList} freezeButton={freezeButton}></DieList>
    <RollDice></RollDice>
    </div>
    </>
}