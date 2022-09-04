
import {players} from '../players'
export const PlayersReducer = (state = players, action) =>{
    switch(action.type){
      case "ADD_PLAYER":
        return [
          ...state,
          action.player
        ]
        case "RE_PLAYER":
          return state.filter(p=> p.id !== action.id)
        case "CH_USR_NM": 
        return state.map(p=> p.type === "human" ? {...p, name: action.username} : p)
        case "GV_CARDS_TO":
          return state.map(p=> p.id === action.id ? {...p, cards: [...p.cards, action.card]} : p)
        case "TK_CARDS_FROM":
        case "SET_CH":
          return state.map(p=> p.id === action.id ? {...p, choose: action.choose} : p)
        case "SET_MOVE":
          return state.map(p=> p.id === action.id ? {...p, move: action.move} : p)

      default: return state
    }
  }