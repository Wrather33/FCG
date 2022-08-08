import shortid from "shortid"
export const opts = {
    start: false,
    decksize: 36,
    jokers: false,
    type: 'Подкидной',
    cards: [],
    suit: '',
    count: 2
  }
  export const members = [{
    id: shortid.generate(),
    name: 'guest',
    cards: [],
    choose: '',
    move: false,
    type: 'human',
    ingame: true,
    wins: 0,
    draws: 0,
    losses: 0,
    }]