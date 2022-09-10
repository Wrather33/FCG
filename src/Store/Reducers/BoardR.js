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
        return state.map(c=> c.code === action.code ? {...c, beaten: action.card} : c)
      case actions.SET_CLEAR:
      default: return state
    }
  }