import {defaultstate} from '../defaultstate'
import {actions} from '../ActionTypes/Types'
export const SizeReducer = (state = defaultstate.size, action) =>{
    switch(action.type){
      case actions.CH_SIZE:
        return +action.size
      default: return state
    }
  }