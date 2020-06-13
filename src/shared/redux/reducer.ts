import { combineReducers } from 'redux'
import auth from './auth/reducer'

const rootReducer = combineReducers({
  auth,
})

export type GlobalState = ReturnType<typeof rootReducer>

export default rootReducer
