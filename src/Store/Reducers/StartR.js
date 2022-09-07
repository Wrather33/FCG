import {defaultstate} from '../defaultstate'
export const StartReducer = (state = defaultstate.start, action) =>{
    switch(action.type){
      case "CH_START":
        return action.start
      default: return state
    }
  }