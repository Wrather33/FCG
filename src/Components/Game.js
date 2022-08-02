import { useState, useEffect } from "react"
import Form from './Form'
import Board from './Board'
import styles from './Main.module.css'
import shortid from "shortid"
import {firstNames} from "@faykah/first-names-en";

function Game(){
    const [game, setgame] = useState({
        start: false,
        decksize: 36,
        jokers: false,
        type: 'Подкидной',
        cards: [],
        suit: '',
        count: 2,
        player: {
        name: 'guest',
        wins: 0,
        draws: 0,
        losses: 0,
        cards: [],
        choose: '',
        move: false
        },
        bots: []
    })
    function givecards(player, count, setter, cards){
      let newdeck = Object.assign({}, player)
      for(let i=0; i<count; i++){
        newdeck.cards.push(cards.shift())
      }
      setter(player, newdeck)
    }
    function changename(name){
      let newname = Object.assign({}, game)
      newname.player.name = name
      setgame(newname)
    }
    function process(){
      
    }
    function checkgame(){
        if(game.player.name){
            let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1&jokers_enabled=${game.jokers}`
            fetch(url).then( res => {
            return res.json()}).then(res=>{return fetch(`https://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=${res.remaining}`).then(
              r=>{return r.json()}).then(r=>{
                givecards(game, r.cards.length, setgame, r.cards)
                setgame({...game, ...{start: !game.start}})
                process()
              })})}
              
              else{
                alert('Имя не может быть пустым!')
              }
    }
    return <div className={styles.Main}>{game.start ? <Board game={game} setgame={setgame}/>
    : <Form game={game} setgame={setgame} checkgame={checkgame} changename={changename}/>}</div>
}
export default Game