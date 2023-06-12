import React, {useState, useEffect} from "react"
import Dice from "./Dice"
import MyConfetti from "./MyConfetti"
import { nanoid } from "nanoid"

export default function App() {

    const [diceData, setDiceData] = useState([]);
    const [hasWon, setHasWon] = useState(false)
    const [allLocked, setAllLocked] = useState(false)

    function initializeDiceData() {
        const initialNums = Array.from({ length: 10 }, randomNum);
        const initialState = initialNums.map(number => ({
            number: number,
            isLocked: false,
            diceId: nanoid()
        }));
        setDiceData(initialState)
    }

    useEffect(() => {
        initializeDiceData()
    }, [])

    useEffect(() => {
        if (allLocked) {
          checkHasWon();
        }
      }, [allLocked]);
      
    useEffect(() => {
    const lockedStatus = diceData.every(dice => dice.isLocked);
    setAllLocked(lockedStatus);
    }, [diceData]);

    const dices = diceData.map(dice => {
        return (
            <Dice 
                key={dice.diceId}
                handleDiceClick={handleDiceClick}
                number={dice.number}
                diceId={dice.diceId}
                isLocked={dice.isLocked}
            />
        )
    })

    function randomNum(){
        return Math.floor((Math.random() * 6) + 1)
    }
 
    function checkHasWon(){
        if (allLocked) {
            try {
                const firstDiceValue = diceData[0].number
                const hasSameValue = diceData.every(dice => dice.number === firstDiceValue)
                if (hasSameValue){
                    setHasWon(true)
                }
            } catch (firstDiceValue) {}
        }
    }

    function handleRollButtonClick() {
        setDiceData(prevData => {
            return prevData.map(dice => {
                return dice.isLocked ? dice : {...dice, "number": randomNum()} 
            })
        })
    }

    function handleDiceClick(id) {
        setDiceData(prevData => {
            return prevData.map(dice => {
                return dice.diceId == id ? {...dice, "isLocked": true} : dice
            })
        }) 
    }

    return (
        <main className="main-container">
            <div className="inner-div">
                <h1 className="title">Tenzies</h1>
                <h3 className="text-content">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
                <div className="dice-container">
                    {dices}
                </div>
                <button className="roll-button" onClick={allLocked ? initializeDiceData: handleRollButtonClick}>{allLocked ? "Reset" : "Roll"}</button>
                {hasWon && <MyConfetti/>}
            </div>
        </main>
    )
}