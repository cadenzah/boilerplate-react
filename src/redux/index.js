// 스토어를 생성하는 함수를 내보낸다
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './modules'

const store = createStore(rootReducer)

export default store
