import shortid from "shortid"
export const defaultstate = {
    size: 36,
    type: 'Подкидной',
    suit: '',
    count: 2,
    round: 0,
    start: false,
    deck: [],
    bin: [],
    board: [],
    players : [{
      id: shortid.generate(),
      name: 'guest',
      cards: [],
      choose: '',
      move: '',
      type: 'human',
      wins: 0,
      draws: 0,
      losses: 0
      }]
  }