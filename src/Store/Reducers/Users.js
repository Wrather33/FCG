import { defaultState } from '../defaultstate'
import {actions} from '../ActionTypes/Types'
export const UsersReducer = (state = defaultState, action) =>{
    switch(action.type){
      case actions.SET_USERS:
        return action.u
      default: return state
    }
  }