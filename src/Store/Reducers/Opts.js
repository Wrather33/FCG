import {actions} from '../ActionTypes/Types'
import { points } from '../../Points/points'
import { defaultState } from '../defaultstate'
export const OptsReducer = (state = defaultState, action) =>{
    switch(action.type){
        case actions.CH_CNT:
              return {...state, count: +action.count}
              case actions.CH_SIZE:
                return {...state, size: +action.size}
                case actions.CH_TYPE:
                    return {...state, type: action.tp}
        default: return state
    }


}