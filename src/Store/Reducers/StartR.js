import {form} from '../form'
export const StartReducer = (state = form.start, action) =>{
    switch(action.type){
      case "CH_START":
        return action.start
      default: return state
    }
  }