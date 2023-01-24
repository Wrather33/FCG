import {actions} from '../ActionTypes/Types'
import { points } from '../../Points/points'
import { defaultState } from '../defaultstate'
export const LoginReducer = (state = defaultState, action) =>{
    switch(action.type){
      case actions.CH_USR_NM:
        return {...state, name: action.name}
        case actions.CH_ID:
        return {...state, id: action.id}
        case actions.CH_AUTH:
            return {...state, auth: action.status}
      default: return state
    }
  }

  /* case actions.RE_PLAYER:
          return state.filter(p=> p.id !== action.id)
        case actions.CH_USR_NM:
          return state.map(p=> p.id === action.id ? {...p, name: action.name} : p)
        case actions.GV_CARDS_TO:
          return state.map(p=> p.id === action.id ? {...p, cards: [...p.cards, action.card]} : p)
        case actions.TK_CARDS_FROM:
          return state.map(p=> p.id === action.id ? {...p, cards: p.cards.filter(c=>c.code !== action.card.code)} : p)
        case actions.SET_CH:
          return state.map(p=> p.id === action.id ? {...p, choice: action.choice} : p)
        case actions.SET_MOVE:
          return state.map(p=> p.id === action.id ? {...p, move: action.move} : p)
        case actions.SORT_CARDS:
          return state.map(p=> p.type === action.player ? {...p, cards: p.cards.sort(function(a, b) {return points[a.value] - points[b.value]})} : p)*/