/*import {actions} from '../ActionTypes/Types'
import { points } from '../../Points/points'
import { defaultState } from '../defaultstate'
export const SearchReducer = (state = defaultState.search, action) =>{
    switch(action.type){
        case actions.SE_INIT:
            return {...state, size: action.size, count: action.count, type: action.tp}
            case actions.SE_CLR:
            return {}
        case actions.SE_CNT:
            let count = state.count
            let cvalue = +action.count
            if(count.includes(cvalue)){
                if(count.length-1){
                    count = count.filter(val => val !== cvalue);
                }
            }
            else{
                count.push(cvalue)
            }
              return {...state, count: count}

              case actions.SE_SIZE:
                let size = state.size
                let svalue = +action.size
                if(size.includes(svalue)){
                    if(size.length-1){
                    size = size.filter(val => val !== svalue);
                    }
                }
                else{
                    size.push(svalue)
                }
                return {...state, size: size}
                case actions.SE_TYPE:
                    let type = state.type
                    let tvalue = action.tp.toLowerCase()
                    if(type.includes(tvalue)){
                        if(type.length-1){
                            type = type.filter(val => val !== tvalue);
                        }
                    }
                    else{
                        type.push(tvalue)
                    }
                    return {...state, type: type}
        default: return state
    }


}*/