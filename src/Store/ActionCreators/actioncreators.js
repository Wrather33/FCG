import {actions} from '../ActionTypes/Types';
export const ChangeName = (id, name) => (
    {type: actions.CH_USR_NM, id: id, name: name}
)
export const ChangeSize = (size) =>(
    {type: actions.CH_SIZE, size}
)
export const ChangeCount = (count) =>(
    {type: actions.CH_CNT, count}
)
export const ChangeType = (tp) =>(
    {type: actions.CH_TP, tp}
)
export const ChangeSuit = (suit) =>(
    {type: actions.CH_ST, suit}
)
export const ChangeStart = (start) =>(
    {type: actions.CH_START, start}
)
export const AddDeck = (card) =>(
    {type: actions.DC_ADD, card}
)
export const ReDeck = (code) =>(
    {type: actions.DC_ADD, code}
)
export const ReBin = (code) =>(
    {type: actions.DC_ADD, code}
)
export const AddBin = (card) =>(
    {type: actions.DC_ADD, card}
)
export const AddPlayer = (player) => (
    {type: actions.ADD_PLAYER, player}
)
export const GVcardsTo = (card, id) => (
    {type: actions.GV_CARDS_TO, card: card, id: id}
)
export const TKcardsFROM = (card, id) =>(
    {type: actions.TK_CARDS_FROM, card: card, id: id}
)
export const RePlayer = (id) => (
    {type: actions.RE_PLAYER, id}
)
export const SetChoice = (choice, id)=>(
    {type: actions.SET_CH, choice: choice, id: id}
)
export const SetMove = (move, id)=>(
    {type: actions.SET_MOVE, move: move, id: id}
)