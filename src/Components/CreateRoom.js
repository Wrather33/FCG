import styles from './CreateRoom.module.css'
import shortid from 'shortid'
import { useEffect } from 'react'
import {useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {ChangeCount, ChangeId, ChangeName, ChangeAuth, ChangeSize, ChangeType} from '../Store/ActionCreators/actioncreators'
import Table from './Table';
import {Routes, Route, Link, NavLink} from 'react-router-dom'
import button from './Buttons.module.css'
import { socket } from '../socket';
import Count from './Count'
import current from '../GetStore';

function CreateRoom(props){
    const opts = useSelector(state => state);
   
    return <div className={styles.Form}>
        <p>Your name?</p>
        <input type='text' value={current().user.name} onChange={(e)=>{ props.changer(ChangeName(e.target.value))}}></input>
        <p>Deck size?</p>
        <input type='radio' name='decksize' value={24} onChange={(e)=>props.changer(ChangeSize(e.target.value))}></input>24
        <input type='radio' name='decksize' defaultChecked value={36} onChange={(e)=>props.changer(ChangeSize(e.target.value))}></input>36
        <input type='radio' name='decksize' value={52} onChange={(e)=>{props.changer(ChangeSize(e.target.value))}}></input>52
        <p>Count of players</p>
        <Count count={opts.opts.size/6} changer={props.changer} cnt={opts.opts.count} ChangeCount={ChangeCount}/>
        <p>Type of game?</p>
        <input type='radio' name='typegame' defaultChecked value={'подкидной'} onChange={(e)=>props.changer(ChangeType(e.target.value))}></input>Подкидной
        <input type='radio' name='typegame' value={'переводной'} onChange={(e)=>props.changer(ChangeType(e.target.value))}></input>Переводной<br></br>
        <a className={styles.submit} onClick={(e)=>{ props.JoinGame(e, shortid.generate(), 'create')}}>Start Game!</a>
        </div>
}
export default CreateRoom