import {OptsReducer} from './Reducers/Opts'
import {LoginReducer} from './Reducers/Login'
import {RoomReducer} from './Reducers/Room'
import {SearchReducer} from './Reducers/Search'
import {createStore, combineReducers}  from 'redux';
import { defaultState } from './defaultstate'

const root = combineReducers({
  user: LoginReducer,
  rooms: RoomReducer,
  opts: OptsReducer,
})
export const store = createStore(root, defaultState)
