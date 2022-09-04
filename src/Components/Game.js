import { useState, useEffect } from "react"
import Form from './Form'
import Table from './Table'
import styles from './Main.module.css'
import shortid from "shortid"
import {firstNames} from "@faykah/first-names-en";
import { useDispatch, useSelector, getState} from "react-redux"
import {store} from '../Store/store'
import {points} from './points'
import { players } from "../Store/players"

function Game(){
  const dispatch = useDispatch()
  const opts = useSelector(state=>state)
  function take(id){
    setmove(id+2)
  }
  function throwcard(){

  }
  function attack(){

  }
  function defend(){

  }
  function checkgame(){

  }
  function round(id){
    if(!store.getState().players.find(p=>p.move)){
    for(let i=0; i<store.getState().players.length; i++){
    cards(store.getState().deck, 6-store.getState().players[i].cards.length, "GV_CARDS_TO", 'card', store.getState().players[i].id)
  }

  let fp = {
    value: 'ACE'
  }
  store.getState().players.forEach(p => {
    p.cards.forEach(c=>{
      if(c.suit === store.getState().suit){
        if(points[c.value] < points[fp.value]){
          fp = c
        }
      }
    })
    }); 

    let id = store.getState().players.find(p => {
      if(p.cards.includes(fp)){
      return true
    }
  })
  if(id){
    setmove(id.id)
  }
  else{
    setmove(store.getState().players[Math.floor(Math.random()*store.getState().players.length)].id)
  }


  }
  else{

  }
  }
  function setmove(id){
    for(let i=0; i<store.getState().players.length; i++){
    changer("SET_MOVE", {id: store.getState().players[i].id, move: 'throw'})
    }
    changer("SET_MOVE", {id: id, move: 'attack'})
    for(let i=0; i<store.getState().players.length; i++){
    if(store.getState().players[i].move === 'attack'){
      if(store.getState().players[i+1]){
      changer("SET_MOVE", {id: store.getState().players[i+1].id, move: 'defend'})
      }
      else{
        changer("SET_MOVE", {id: store.getState().players[0].id, move: 'defend'})
      }
    }
    }
  }

    function cards(cards, count, move, prop, id){
      for(let i=0; i<count; i++){
        changer(move, {[prop]: cards.shift(), id: id})
      }
    }

    function changer(type, obj){
      dispatch(Object.assign({type: type}, obj))
    }
    function createbots(count){
     for(let i=0; i<count-1; i++){
      addplayer(firstNames[Math.floor(Math.random()*firstNames.length)])
     }
    }
    function addplayer(name){
      let bot = {
      id: shortid.generate(),
      name: name,
      cards: [],
      choose: '',
      move: '',
      type: 'bot',
      }
      changer("ADD_PLAYER", {player: bot})

    }
    function removeplayer(id){
      changer("RE_PLAYER", {id: id})
    }

    function start(){
        if(opts.players.find(p=>p.type === 'human').name){
            let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
            fetch(url).then( res => {
            return res.json()}).then(res=>{
              return fetch(`https://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=${res.remaining}`).then(
              r=>{return r.json()}).then(r=>{
                let arr = [...r.cards.filter(c =>
                  {switch(opts.size) {
                  case 24: 
                  return c.value >= 9 || isNaN(c.value)
                  case 36:
                  return c.value >= 6 || isNaN(c.value)
                  default:
                    return c.value
                  }})]
                  cards(arr, arr.length, "DC_ADD", 'card')
                  changer("CH_ST", {suit: store.getState().deck[store.getState().deck.length-1].suit})
                  createbots(store.getState().count)
                  changer("CH_START", {start: true})
                  round()
                  
                  
                  /*players*/
                  /*move*/
                  /*givecards*/
                  /*changer("CH_START", 'start', true)*/
                  
                
              })})}
              
              else{
                alert('Имя не может быть пустым!')
              }
    }
    console.log(opts)
    return <div className={styles.Main}>{opts.start ? <Table changer={changer}/>
    : <Form start={start} changer={changer}/>}</div>
}

export default Game


/*function givecards(id){
      let pls = Object.assign([], players)
      let idx = pls.indexOf(pls.find(p => p.move))
      pls.forEach(p=>{
        if(pls.indexOf(p) >= idx && p.id !== id){
          let ostatok = 6-p.cards.length
          for(let i =0; i<ostatok;i++){
            if(game.cards.length){
            p.cards.push(game.cards.shift())}
          }
        }
      })
      pls.forEach(p=>{
        if(pls.indexOf(p) < idx && p.id !== id){
          let ostatok = 6-p.cards.length
          for(let i =0; i<ostatok;i++){
            if(game.cards.length){
            p.cards.push(game.cards.shift())}
          }
        }
      })
      setplay(pls)
    }*/