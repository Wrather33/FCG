import {defaultstate} from '../defaultstate'
import {actions} from '../ActionTypes/Types'
export const BinReducer = (state = defaultstate.bin, action) =>{
    switch(action.type){
      case actions.BN_ADD:
        return [
          ...state,
          action.card
        ]

      case actions.BN_REM:
        return state.filter(c=> c.code !== action.card.code)
      default: return state
    }
  }