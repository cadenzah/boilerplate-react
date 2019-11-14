import React from 'react'
import './SimpleCounter.css'

const SimpleCounter = (props) => {
  return (
    <div className="simple-counter">
      <p>{props.value}</p>
      <div className="simple-counter-button-wrapper">
        <button onClick={props.decrement}>-</button>
        <button onClick={props.increment}>+</button>
      </div>
    </div>
  )
}

export default SimpleCounter
