import React from 'react'
import './Main.css'

const Main = (props) => {
  return (
    <div className="main">
      <p>{props.value}</p>
      <div className="main-button-wrapper">
        <button onClick={props.decrement}>-</button>
        <button onClick={props.increment}>+</button>
      </div>
    </div>
  )
}

export default Main
