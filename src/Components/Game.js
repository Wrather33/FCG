import { useState } from "react"
import Form from './Form'
import Board from './Board'
import styles from './Main.module.css'
function Game(){
    const [game, setgame] = useState({
        start: false,
        decksize: 36,
        jokers: false,
        type: 'Подкидной',
        cards: [],
        suit: '',
        count: 2
    })
    const [player, setplayer] = useState({
        name: 'guest',
        wins: 0,
        draws: 0,
        losses: 0,
        cards: [],
        choose: '',
        move: false
    })
    function checkgame(){
        if(player.name){
            let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
            if(game.jokers){
              url += `&jokers_enabled=true`
            }
            fetch(url).then( res => {
            return res.json()}).then(res=>{return fetch(`https://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=${res.remaining}`).then(
              r=>{return r.json()}).then(r=>{
                setgame({...game, ...{start: !game.start}})
              })})}
              
              else{
                alert('Имя не может быть пустым!')
              }
    }
    const [robots, setrobots] = useState([])
    return <div className={styles.Main}>{game.start ? <Board game={game} setgame={setgame} player={player} setplayer={setplayer}/> 
    : <Form game={game} setgame={setgame} player={player} setplayer={setplayer} checkgame={checkgame}/>}</div>
}
export default Game