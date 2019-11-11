import React from 'react'

const Main = (props) => {
  return (
    <div>
      <p>현재 값: {props.value}</p>
      <button onClick={() => props.decrement(1)}>-</button>
      <button onClick={() => props.increment(1)}>+</button>
    </div>
  )
}

export default Main
