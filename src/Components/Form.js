import styles from './Form.module.css'
import shortid from 'shortid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {ChangeCount, ChangeName, ChangeSize, ChangeType} from '../Store/ActionCreators/actioncreators'
function Count(props){
    let arr = []
    if(props.count < props.cnt){
        setTimeout(() =>{props.changer(ChangeCount(props.count))})
    }
    for(let i=2; i<=props.count; i++){
        if(i == props.cnt){
            arr.push(
                <div key={shortid.generate()}>
                <input type='radio' name='count' defaultChecked value={i} onChange={(e)=>
                    props.changer(ChangeCount(e.target.value))}></input>
                <label>{i}</label></div>)
        }
        else{
        arr.push(
            <div key={shortid.generate()}>
            <input type='radio' name='count' value={i} onChange={(e)=>{
                   props.changer(ChangeCount(e.target.value))}}></input>
            <label>{i}</label></div>)}
        }
    return <div className={styles.counts}>{arr}</div>
}

function Form(props){
    const opts = useSelector(state => state);
    return <div className={styles.Form}>
        <h1>Fool Card Game</h1>
        <h2>Your name?</h2>
        <input value={opts.players.find(p=>p.type === 'human').name} onChange={(e)=>{ props.changer(ChangeName(opts.players.find(p=>p.type === 'human').id, e.target.value))}}></input>
        <h2>Decksize?</h2>
        <input type='radio' name='decksize' value={24} onChange={(e)=>props.changer(ChangeSize(e.target.value))}></input>24
        <input type='radio' name='decksize' defaultChecked value={36} onChange={(e)=>props.changer(ChangeSize(e.target.value))}></input>36
        <input type='radio' name='decksize' value={52} onChange={(e)=>{props.changer(ChangeSize(e.target.value))}}></input>52
        <h2>Count of players</h2>
        <Count count={opts.size/6} styles={props.styles} changer={props.changer} cnt={opts.count}/><br></br>
        <h2>Тип игры?</h2>
    <input type='radio' name='typegame' defaultChecked value={'Подкидной'} onChange={(e)=>props.changer(ChangeType(e.target.value))}></input>Подкидной
    <input type='radio' name='typegame' value={'Переводной'} onChange={(e)=>props.changer(ChangeType(e.target.value))}></input>Переводной<br></br>
    <button className={styles.submit} onClick={()=>
    {props.start()}}>Начать игру!</button>
    </div>
}
export default Form