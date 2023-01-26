import { defaultState } from '../defaultstate'
import {actions} from '../ActionTypes/Types'
export const MessagesReducer = (state = defaultState, action) =>{
    switch(action.type){
      case actions.NEW_MESSAGE:
        return [...state, action.message]
      default: return state
    }
  }