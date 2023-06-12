import React from "react"

export default function Dice(props) {

    function handleClick() {
        props.handleDiceClick(props.diceId)
    }

    return (
        <div className={props.isLocked ? "dice green" : "dice"} onClick={handleClick}>
            {props.number}
        </div>
    )
}