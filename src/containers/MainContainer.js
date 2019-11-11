import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Main from '../components/base/Main'

import * as actions from '../redux/modules/app'

const MainContainer = (props) => {
  return (
    <>
      <Main
        increment={props.actions.increment}
        decrement={props.actions.decrement}
        value={props.value} />
    </>
  )
}

const mapStateToProps = ({ app }) => ({
  value: app.value
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)
