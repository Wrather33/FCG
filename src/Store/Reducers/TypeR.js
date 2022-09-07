import {defaultstate} from '../defaultstate'
import {actions} from '../ActionTypes/Types'
export const TypeReducer = (state = defaultstate.type, action) =>{
    switch(action.type){
      case actions.CH_TP:
        return action.tp
      default: return state
    }
  }