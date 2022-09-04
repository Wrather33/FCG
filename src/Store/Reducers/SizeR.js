import {form} from '../form'
export const SizeReducer = (state = form.decksize, action) =>{
    switch(action.type){
      case "CH_SIZE":
        return +action.decksize
      default: return state
    }
  }