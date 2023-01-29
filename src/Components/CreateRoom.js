import styles from './CreateRoom.module.css'
import shortid from 'shortid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {ChangeCount, ChangeId, ChangeName, ChangeAuth, ChangeSize, ChangeType} from '../Store/ActionCreators/actioncreators'
import Table from './Table';
import {Routes, Route, Link, NavLink} from 'react-router-dom'
import button from './Buttons.module.css'
import { socket } from '../socket';
import Count from './Count'

function CreateRoom(props){
    const opts = useSelector(state => state);
    return <div className={styles.Form}>
        <h1>Fool Card Game</h1>
        <h2>Your name?</h2>
        <input value={opts.name} onChange={(e)=>{ props.changer(ChangeName(e.target.value))}}></input><br/>
        <h2>Deck size?</h2>
        <input type='radio' name='decksize' value={24} onChange={(e)=>props.changer(ChangeSize(e.target.value))}></input>24
        <input type='radio' name='decksize' defaultChecked value={36} onChange={(e)=>props.changer(ChangeSize(e.target.value))}></input>36
        <input type='radio' name='decksize' value={52} onChange={(e)=>{props.changer(ChangeSize(e.target.value))}}></input>52
        <h2>Count of players</h2>
        <Count count={opts.opts.size/6} changer={props.changer} cnt={opts.opts.count} ChangeCount={ChangeCount}/><br></br>
        <h2>Type of game?</h2>
        <input type='radio' name='typegame' defaultChecked value={'подкидной'} onChange={(e)=>props.changer(ChangeType(e.target.value))}></input>Подкидной
        <input type='radio' name='typegame' value={'переводной'} onChange={(e)=>props.changer(ChangeType(e.target.value))}></input>Переводной<br></br>
        <a className={button.buttons} onClick={(e)=>{ props.JoinGame(e, shortid.generate(), 'create')}}>Start Game!</a>
        </div>
}
export default CreateRoom