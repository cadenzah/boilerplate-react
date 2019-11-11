import { createAction, handleActions } from 'redux-actions'

const EXAMPLE_INCREASE = 'app/EXAMPLE_INCREASE'
const EXAMPLE_DECREASE = 'app/EXAMPLE_DECREASE'

export const increment = createAction(EXAMPLE_INCREASE)
export const decrement = createAction(EXAMPLE_DECREASE, value => ({ value }))

const initialState = {
  value: 0
}

export default handleActions({
  [EXAMPLE_INCREASE]: (state, action) => ({
    value: state.value + action.payload
  }),
  [EXAMPLE_DECREASE]: (state, action) => ({
    value: state.value - action.payload.value
  }),
}, initialState)
