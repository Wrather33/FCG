import {defaultstate} from '../defaultstate'
import {actions} from '../ActionTypes/Types'
export const CountReducer = (state = defaultstate.count, action) =>{
    switch(action.type){
      case actions.CH_CNT:
        return +action.count
      default: return state
    }
  }