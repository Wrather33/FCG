import shortid from "shortid"
export const rooms = []

export const defaultState = {
  user: {
    id: '',
    name: '',
    auth: false,
  },
  rooms: {},
  opts: {
    size: 36,
    count: 2,
    type: 'подкидной'
  },
  room: {
    users: [],
    messages: [],
    opts: {}
  }
}

/*rooms inside server not in state*/
/*export const defaultState = {
  player: {
  name: 'guest',
  auth: false,
  id: '',
  cards: [],
  choose: '',
  move: '',
  wins: 0,
  draws: 0,
  losses: 0,
},
  opts: {
  size: 36,
  type: 'Подкидной',
  suit: '',
  count: 2,
  round: 0,
  start: false,
  players: [],
  deck: [],
  bin: [],
  board: [],
  }
}*/

/*id: shortid.generate(),
  name: 'guest',
  cards: [],
  choose: '',
  move: '',
  type: 'player',
  wins: 0,
  draws: 0,
  losses: 0,
  connect: false*/
