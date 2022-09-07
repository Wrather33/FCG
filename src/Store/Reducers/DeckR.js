import {defaultstate} from '../defaultstate'
import { actions } from '../ActionTypes/Types'
export const DeckReducer = (state = defaultstate.deck, action) =>{
    switch(action.type){
      case actions.DC_ADD:
        return [
          ...state,
          action.card
        ]

      case actions.DC_REM:
        return state.filter(c=> c.code !== action.card.code)
      default: return state
    }
  }