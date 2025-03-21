import { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import Description from "./Description";
import DieList from "./Dice";
import RollDice from "./RollDice";
import Confetti from "./Confetti";

function randomDieNumber() {
    return Math.floor(Math.random() * 6) + 1
}

export default function Main() {
    const [diceList,  setDiceList] = useState(() => generateAllNewDice())
    const [freezeTarget, setFreezeTarget] = useState(randomDieNumber())

    function generateAllNewDice() {        
        return new Array(10)
            .fill(0)
            .map(() => ({
                "value": randomDieNumber(),
                "isHeld": false,
                id: uuid4()
            }))
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

    
    function RollNext() {
        const updatedList = diceList.map((item) => {
            if (item.isHeld === false) {
                item.value = randomDieNumber()
            }
            return item
        })
        setDiceList(updatedList)
    }

    function isGameOver() {
        let counter = 0
        diceList.map((item) => {
            if (item.isHeld === true)
                counter += 1
        })
        return counter === diceList.length ? true : false
    }

    function ResetBoard() {
        setDiceList(generateAllNewDice())
        setFreezeTarget(randomDieNumber())
    }

    return <>
    {isGameOver() === true && <Confetti />}
    <Description></Description>
    <hr />
    <h2>Freeze Target: {freezeTarget}</h2>
    <div className="game-container">
    <DieList diceList={diceList} freezeButton={freezeButton}></DieList>
    <RollDice diceList={diceList} isGameOver={isGameOver} ResetBoard={ResetBoard} RollNext={RollNext}></RollDice>
    </div>
    </>
}