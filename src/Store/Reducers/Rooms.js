import { defaultState } from '../defaultstate'
import {actions} from '../ActionTypes/Types'
export const RoomsReducer = (state = defaultState, action) =>{
    switch(action.type){
      case actions.CH_LIST:
        return action.rooms
      default: return state
    }
  }