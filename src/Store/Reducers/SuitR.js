import {defaultstate} from '../defaultstate'
export const SuitReducer = (state = defaultstate.suit, action) =>{
    switch(action.type){
      case "CH_ST":
        return action.suit
      default: return state
    }
  }