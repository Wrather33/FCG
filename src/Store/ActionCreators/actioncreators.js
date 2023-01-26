import {actions} from '../ActionTypes/Types';
export const ChangeAuth = (status)=>(
    {type: actions.CH_AUTH, status}
)
export const ChangeName = (name) => (
    {type: actions.CH_USR_NM, name}
)
export const ChangeId = (id) => (
    {type: actions.CH_ID, id}
)
export const ChangeList = (rooms)=>(
    {type: actions.CH_LIST, rooms}
)
export const ChangeCount = (count) =>(
    {type: actions.CH_CNT, count}
)
export const ChangeSize = (size) =>(
    {type: actions.CH_SIZE, size}
)
export const ChangeType= (tp) =>(
    {type: actions.CH_TYPE, tp}
)
export const SetUsers= (u) =>(
    {type: actions.SET_USERS, u}
)
export const NewMessage= (message) =>(
    {type: actions.NEW_MESSAGE, message}
)
export const SetRoom = (room)=>(
    {type: actions.SET_ROOM, room}
)
/*
export const SearchCount = (count) =>(
    {type: actions.SE_CNT, count}
)
export const SearchSize = (size) =>(
    {type: actions.SE_SIZE, size}
)
export const SearchType = (tp) =>(
    {type: actions.SE_TYPE, tp}
)
export const SearchInit = (size, count, tp) =>(
    {type: actions.SE_INIT, size: size, count: count, tp: tp}
)
export const SearchClear = () =>(
    {type: actions.SE_CLR}
)*/


