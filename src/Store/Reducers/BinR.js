
export const BinReducer = (state = [], action) =>{
    switch(action.type){
      case "BN_ADD":
        return [
          ...state,
          action.card
        ]

      case "BN_REM":
        return state.filter(c=> c.code !== action.card.code)
      default: return state
    }
  }