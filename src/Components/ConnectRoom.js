import { connect, useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef, useLayoutEffect, componentDidMount} from "react"
import { Link, NavLink, Route, Routes, useSearchParams, useNavigate, generatePath } from "react-router-dom";
import button from './Buttons.module.css'
import connectstyles from './ConnectRoom.module.css'
import Table from './Table';
import CreateRoom from './CreateRoom'
import shortid from 'shortid'
import {ChangeName, ChangeList} from '../Store/ActionCreators/actioncreators'
import {socket} from '../socket.js'
import current from '../GetStore'
import SearchForm from './SearchForm'
import { store } from "../Store/store";
import MaxOfArray from '../MaxOfArray'
import { useCallback } from 'react'
import SeCount from './SeCount'
function ConnectRoom(props){
    const [searchParams, setSearchParams] = useSearchParams()
    const [params, setparams] = useState(false)
    let username = current().user.name
    let opts = useSelector(state => state)
    let data = Object.entries(opts.rooms)
    let rooms = [];
    function myentries(params){
        const obj = {}
        for (const key of params.keys()) {
            obj[key] = params.getAll(key)
        }
        return obj
      }
    function handleSubmit(value, action){
        let params = Object.assign({}, myentries(searchParams))
        if(params[action].includes(value)){
          if(params[action].length-1){
          let result = params[action].filter(n => n !== value)
          params[action] = result
          setSearchParams(params)
          }
        }
        else{
          params[action].push(value)
          setSearchParams(params)
        }
      }
    useEffect(()=>{
        if(MaxOfArray(searchParams.getAll('size'))/6 < MaxOfArray(searchParams.getAll('count'))){
            let count = searchParams.getAll('count').filter(n=> n <= MaxOfArray(searchParams.getAll('size'))/6)
            if(!count.length){
                count.push(MaxOfArray(searchParams.getAll('size'))/6)
            }
            let size = searchParams.getAll('size')
            let tp = searchParams.getAll('tp')
            let dat = {
                size: size,
                count: count,
                tp: tp
            }
            setSearchParams(dat)
        }
        if(!params){
            if(!searchParams.toString()){
                let dat = {
                size: [24, 36, 52],
                count: [2, 3, 4, 5, 6, 7, 8],
                tp: ['подкидной', 'переводной']}
                setSearchParams(dat)
                }
                else{
                    let size = searchParams.getAll('size').map(n => parseInt(n)).filter(n => n === 24 || n === 36 || n === 52)
                    if(!size.length){
                        size.push(24, 36, 52)
                    }
                    let count = searchParams.getAll('count').map(n => parseInt(n)).filter(n => { 
                        return n >= 2 && n <= Math.floor(MaxOfArray(size)/6)
                    })
                    if(!count.length){
                        for(let i=2; i<=Math.floor(MaxOfArray(size)/6); i++){
                            count.push(i)
                        }
                    }
                    let type = searchParams.getAll('tp').filter(n => n.toLowerCase() === 'переводной' || n.toLowerCase() === 'подкидной')
                    if(!type.length){
                        type.push('переводной', 'подкидной')
                    }
                    let dat = {
                        size: size,
                        count: count,
                        tp: type
                    }
                    setSearchParams(dat)
                }
            setparams(true)  
        }
    }, [setSearchParams, searchParams.toString(), searchParams, params, searchParams.getAll('size'), searchParams.getAll('count')])

    if(data.length){
        for (const [key, value] of data) {
            let len = Object.keys(value.users).length
            if((len && len < value.opts.count) && searchParams.getAll('size').includes(`${value.opts.size}`)
            && searchParams.getAll('count').includes(`${value.opts.count}`)
            && searchParams.getAll('tp').includes(value.opts.type)){
            rooms.push(<li key={key} 
                onClick={(e)=>{ props.JoinGame(e, key, 'connect')}}>{Object.values(value.users).find(u=>u.type === 'host').name} {Object.keys(value.users).length}/{value.opts.count}
                </li>)
        }}
    }
    return <div>
    <div className={connectstyles.ConnectRoom}>
    <p>Your name?</p>
    <input name="username" value={username} onChange={(e)=>{ props.changer(ChangeName(e.target.value))}}/>
    <p>Deck size?</p>
              <input type='checkbox' name='decksize' checked={searchParams.getAll('size').includes('24')} value={24} onChange={(e)=>{handleSubmit(e.target.value, 'size')}}></input>24
              <input type='checkbox' name='decksize' checked={searchParams.getAll('size').includes('36')} value={36} onChange={(e)=>{handleSubmit(e.target.value, 'size')}}></input>36
              <input type='checkbox' name='decksize' checked={searchParams.getAll('size').includes('52')} value={52} onChange={(e)=>{handleSubmit(e.target.value, 'size')}}></input>52
              <p>Count of Players?</p>
              <SeCount count={Math.floor(MaxOfArray(searchParams.getAll('size'))/6)} changer={props.changer} cnt={searchParams.getAll('count')} handleSubmit={handleSubmit}/><br></br>
              <p>
              Type of game?
              </p>
              <input type="checkbox" name="gametype" checked={searchParams.getAll('tp').includes('подкидной')} value='подкидной' onChange={(e)=>{handleSubmit(e.target.value, 'tp')}}></input>Подкидной
              <input type="checkbox" name="gametype" checked={searchParams.getAll('tp').includes('переводной')} value='переводной' onChange={(e)=>{handleSubmit(e.target.value, 'tp')}}></input>Переводной
    {!rooms.length ? <p className={connectstyles.warn}>Rooms not found. Create your own room <NavLink to='/CreateGame'>here.</NavLink></p> :
    <ul className={connectstyles.rooms}>{rooms}</ul>}</div></div>
}
export default ConnectRoom
/*let rooms = JSON.parse(localStorage.getItem('list')).map((r)=>{
        return <div key={r}><NavLink to={`/Game/${r}`}>{r}</NavLink></div>
    })*/
/*<div key={shortid.generate()}><Routes>
        <Route path={`/Game/:id`} component={<Table start={props.start} changer={props.changer} funcs={props.funcs}/>}></Route>
        </Routes></div>
        {!rooms.length ? <div key={shortid.generate()}className={button.warn}><h1>There are no rooms at the moment.<br></br>
            You can create your own room <NavLink to='/CreateGame'>here.</NavLink></h1>:<div>{rooms}</div>
            <Routes>
            <Route path='/CreateGame' element={<CreateRoom id={shortid.generate()} start={props.start} changer={props.changer}/>}></Route></Routes></div></div>*/