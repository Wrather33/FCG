import shortid from "shortid"
export const players = [{
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