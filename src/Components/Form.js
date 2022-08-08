import styles from './Form.module.css'
import shortid from 'shortid'
import { useEffect } from 'react'
function Count(props){
    let arr = []
    if(props.count < props.game.count){
        setTimeout(() =>props.setgame({...props.game, ...{count: props.count}}))
    }
    for(let i=2; i<=props.count; i++){
        if(i == props.game.count){
            arr.push(
                <div key={shortid.generate()}>
                <input type='radio' name='count' defaultChecked value={i} onChange={(e)=>
                    props.setgame({...props.game, ...{count: e.target.value}})}></input>
                <label>{i}</label></div>)
        }
        else{
        arr.push(
            <div key={shortid.generate()}>
            <input type='radio' name='count' value={i} onChange={(e)=>{
                    props.setgame({...props.game, ...{count: e.target.value}})}}></input>
            <label>{i}</label></div>)}
        }
    return <div className={styles.counts}>{arr}</div>
}

function Form(props){
    return <div className={styles.Form}>
        <h1>Fool Card Game</h1>
        <h2>Your name?</h2>
        <input value={props.players.find(p => p.type === 'human').name} onChange={(e)=>{props.changename(e.target.value)}}></input>
        <h2>Decksize?</h2>
        <input type='radio' name='decksize' value={24} onChange={(e)=>props.setgame({...props.game, ...{decksize: e.target.value}})}></input>24
        <input type='radio' name='decksize' defaultChecked value={36} onChange={(e)=>props.setgame({...props.game, ...{decksize: e.target.value}})}></input>36
        <input type='radio' name='decksize' value={52} onChange={(e)=>props.setgame({...props.game, ...{decksize: e.target.value}})}></input>52
        <input type='checkbox' name='jokers' checked={props.game.jokers} onChange={(e)=>props.setgame({...props.game, ...{jokers: e.target.checked}})}></input>Jokers
        <h2>Count of players</h2>
        <Count count={props.game.decksize/6} styles={props.styles} setgame={props.setgame} game={props.game}/><br></br>
        <h2>Тип игры?</h2>
    <input type='radio' name='typegame' defaultChecked value={'Подкидной'} onChange={(e)=>props.setgame({...props.game, ...{type: e.target.value}})}></input>Подкидной
    <input type='radio' name='typegame' value={'Переводной'} onChange={(e)=>props.setgame({...props.game, ...{type: e.target.value}})}></input>Переводной<br></br>
    <button className={styles.submit} onClick={()=>
    {props.checkgame()}}>Начать игру!</button>
    </div>
}
export default Form