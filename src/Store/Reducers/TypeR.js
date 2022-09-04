import {form} from '../form'
export const TypeReducer = (state = form.type, action) =>{
    switch(action.type){
      case "CH_TP":
        return action.tp
      default: return state
    }
  }