import {defaultstate} from '../defaultstate'
import {actions} from '../ActionTypes/Types'
export const RoundReducer = (state = defaultstate.round, action) =>{
    switch(action.type){
      case actions.NXT_RND:
        return state + 1
      default: return state
    }
  }