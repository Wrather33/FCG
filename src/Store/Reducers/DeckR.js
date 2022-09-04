
export const DeckReducer = (state = [], action) =>{
    switch(action.type){
      case "DC_ADD":
        return [
          ...state,
          action.card
        ]

      case "DC_REM":
        return state.filter(c=> c.code !== action.card.code)
      default: return state
    }
  }