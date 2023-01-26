import {actions} from '../ActionTypes/Types'
import { points } from '../../Points/points'
import { defaultState } from '../defaultstate'
export const RoomReducer = (state = defaultState, action) =>{
    switch(action.type){
        case actions.SET_ROOM:
              return action.room
        default: return state
    }


}