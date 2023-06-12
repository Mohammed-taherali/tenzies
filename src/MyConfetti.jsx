import React from "react"
import Confetti from "react-confetti"

export default function MyConfetti() {
    const confettiWidth = window.innerWidth
    const confettiHeight = window.innerHeight
    
    return (
        <Confetti
            width={confettiWidth}
            height={confettiHeight}
            gravity={0.025}
        />
    )
}