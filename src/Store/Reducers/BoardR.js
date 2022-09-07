import {defaultstate} from '../defaultstate'
import {actions} from '../ActionTypes/Types'
import {points} from '../../Points/points'
import {getState} from "react-redux"
import {store} from '../../Store/store'

export const BoardReducer = (state = [], action) =>{
    switch(action.type){
      case actions.SET_ACTIVE: 
      return [
        ...state,
        action.card
      ]
      case actions.SET_BEATEN:
        state.map(c=>{
          if(c.suit === action.card.suit){

          }
          else if(action.card.suit === store.getState().suit){
            action.card.value += points.ACE
          }
        })
      case actions.SET_CLEAR:
      default: return state
    }
  }