// 리듀서들을 합쳐서 (combineReducer) 내보낸다
// 액션과 대응하는 리듀서에 따라 각각 별도의 파일 유지
import { combineReducers } from 'redux'
import app from './app'

export default combineReducers({
  app
})
