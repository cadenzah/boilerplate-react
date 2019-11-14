import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Main from '../components/Main'

import * as appActions from '../redux/modules/app'

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
  appActions: bindActionCreators(appActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)
