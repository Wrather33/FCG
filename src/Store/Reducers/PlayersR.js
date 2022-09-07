import {actions} from '../ActionTypes/Types'
export const PlayersReducer = (state = [], action) =>{
    switch(action.type){
      case actions.ADD_PLAYER:
        return [
          ...state,
          action.player
        ]
        case actions.RE_PLAYER:
          return state.filter(p=> p.id !== action.id)
        case actions.CH_USR_NM:
          return state.map(p=> p.id === action.id ? {...p, name: action.name} : p)
        case actions.GV_CARDS_TO:
          return state.map(p=> p.id === action.id ? {...p, cards: [...p.cards, action.card]} : p)
        case actions.TK_CARDS_FROM:
        case actions.SET_CH:
          return state.map(p=> p.id === action.id ? {...p, choice: action.choice} : p)
        case actions.SET_MOVE:
          return state.map(p=> p.id === action.id ? {...p, move: action.move} : p)

      default: return state
    }
  }

  /*state.map(p=> p.id === action.id ? {...p, name: action.username} : p)*/