import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from '../pages'

// catalog for all routings
const App = (props) => {
  return (
    <div>
      <Route exact path="/" component={Home} />
    </div>
  )
}

export default App
