import {form} from '../form'
export const SuitReducer = (state = form.suit, action) =>{
    switch(action.type){
      case "CH_ST":
        return action.suit
      default: return state
    }
  }