import {actions} from '../ActionTypes/Types'
import { points } from '../../Points/points'
import { defaultState } from '../defaultstate'
export const RoomReducer = (state = defaultState, action) =>{
    switch(action.type){
        case actions.SET_ROOM:
              return action.room
              case actions.SET_USERS:
                return {...state, users: action.u}
                case actions.NEW_MESSAGE:
                    return {...state, messages: [...state.messages, action.message]}
        default: return state
    }


}