import shortid from "shortid"
export const opts = {
    decksize: 36,
    jokers: false,
    type: 'Подкидной',
    suit: '',
    count: 2,
    start: false
  }
  export const player = [{
    id: shortid.generate(),
    name: 'guest',
    cards: [],
    choose: '',
    move: 'wait',
    type: 'human',
    wins: 0,
    draws: 0,
    losses: 0
    }]