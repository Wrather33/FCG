
import {SizeReducer} from './Reducers/SizeR'
import {CountReducer} from './Reducers/CountR'
import {TypeReducer} from './Reducers/TypeR'
import{DeckReducer} from './Reducers/DeckR'
import{SuitReducer} from './Reducers/SuitR'
import{StartReducer} from './Reducers/StartR'
import {PlayersReducer} from './Reducers/PlayersR'
import {BinReducer} from './Reducers/BinR'
import {createStore, combineReducers}  from 'redux';

const root = combineReducers({
  size: SizeReducer,
  count: CountReducer,
  type: TypeReducer,
  deck: DeckReducer,
  suit: SuitReducer,
  start: StartReducer,
  players: PlayersReducer,
  bin: BinReducer
})
export const store = createStore(root)
