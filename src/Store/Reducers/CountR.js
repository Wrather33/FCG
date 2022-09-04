import {form} from '../form'
export const CountReducer = (state = form.count, action) =>{
    switch(action.type){
      case "CH_CNT":
        return +action.count
      default: return state
    }
  }