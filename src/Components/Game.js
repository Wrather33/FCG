import { useState, useEffect } from "react"
import Form from './Form'
import Board from './Board'
import styles from './Main.module.css'
import shortid from "shortid"
import {firstNames} from "@faykah/first-names-en";
import {opts} from './opts'
import { members } from "./opts"
import { type } from "@testing-library/user-event/dist/type"
import { useStateWithCallbackLazy } from 'use-state-with-callback';

function Game(){
    const [game, setgame] = useState(opts)
    const[players, setplay] = useStateWithCallbackLazy(members)

    function changename(name){
      let newname = Object.assign([], players)
      newname.find(p => p.type === 'human').name = name
      setplay(newname)
    }

    useEffect(() => {
      if(game.start && !players.find(p => p.ingame)){
      if(!players.find(p => p.type === 'bot')){ createbots(game.count) }
      if(players.find(p => p.type === 'bot') && !players.find(p=> p.move)){
        setmove(players[Math.floor(Math.random()*players.length)].id)
      }
      if(players.find(p=> p.move) && players.find(p=> !p.cards.length)){
        givecards()
      }
      if(players.find(p => !p.ingame) && !players.find(p=> !p.cards.length)){
        startgame(players)
      }
    }
  }, [players, game]);


    function createbots(count) {
      let bots = Object.assign([], players)
      for(let i=0; i<count-1; i++){
        let bot = {
          id: shortid.generate(),
          name: firstNames[[Math.floor(Math.random()*firstNames.length)]],
          cards: [],
          choose: '',
          move: false,
          type: 'bot',
          ingame: false
        }
        bots.push(bot)
      }
      setplay(bots)
    }

    function setchoose(card){

    }
    function setmove(id){
      setplay(state => state.map(p =>
        p.id === id ? {...p, move: true} : {...p, move: false}
      ));
    
    }
    function givecards(){
      let pls = Object.assign([], players)
      let idx = pls.indexOf(pls.find(p => p.move))
      pls.forEach(p=>{
        if(pls.indexOf(p) >= idx){
          let ostatok = 6-p.cards.length
          for(let i =0; i<ostatok;i++){
            if(game.cards.length){
            p.cards.push(game.cards.shift())}
          }
        }
      })
      pls.forEach(p=>{
        if(pls.indexOf(p) < idx){
          let ostatok = 6-p.cards.length
          for(let i =0; i<ostatok;i++){
            if(game.cards.length){
            p.cards.push(game.cards.shift())}
          }
        }
      })
      setplay(pls)
    }
    
    function startgame(players){
      let pls = Object.assign([], players)
      pls.forEach(p=>{p.ingame=true})
      setplay(pls)

    }
    function exitgame(id){

    }
    function checkgame(){
        if(players.find(p => p.type === 'human').name){
            let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1&jokers_enabled=${game.jokers}`
            fetch(url).then( res => {
            return res.json()}).then(res=>{return fetch(`https://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=${res.remaining}`).then(
              r=>{return r.json()}).then(r=>{
                setgame({...game, cards: game.cards.push(...r.cards.filter(c =>
                  {switch(+game.decksize) {
                  case 24: 
                  return c.value >= 9 || isNaN(c.value)
                  case 36:
                  return c.value >= 6 || isNaN(c.value)
                  default:
                    return c.value
                }}))})
                setgame({...game, ...{start: !game.start}})
              })})}
              
              else{
                alert('Имя не может быть пустым!')
              }
    }
    return <div className={styles.Main}>{players.find(p => p.ingame) ? <Board game={game} setgame={setgame} players={players} setplay={setplay}/>
    : <Form game={game} setgame={setgame} checkgame={checkgame} changename={changename} players={players} setplay={setplay}/>}</div>
}
export default Game