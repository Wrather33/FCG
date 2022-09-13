import { useState, useEffect } from "react"
import Form from './Form'
import Table from './Table'
import styles from './Main.module.css'
import shortid from "shortid"
import {firstNames} from "@faykah/first-names-en";
import { useDispatch, useSelector, getState} from "react-redux"
import {store} from '../Store/store'
import {points} from '../Points/points'
import {AddDeck, AddPlayer, ChangeSuit, ChangeStart, GVcardsTo, SetMove, SetActive, TKcardsFROM, SortCards, SetBeaten, NextRound, SetChoice} from '../Store/ActionCreators/actioncreators'
import { BoardReducer } from "../Store/Reducers/BoardR"
function Game(){
  const dispatch = useDispatch()
  const opts = useSelector(state=>state)

  function average(cards)
{
  let sum = 0
  let i = 0
  while(i < cards.length){
    sum += checksuit(cards[i])
    i++
  }
  return sum/cards.length
}

  function current(){
    return store.getState()
  }

  function finish(){
    /*id+1 throw*/
  }
  function UpdateChoice(id){
    if(current().players.find(p=>p.id === id).cards.length){
      changer(SetChoice(current().players.find(p=>p.id === id).cards[0], id))
      }
      else{
        changer(SetChoice('', id))
      }
  }

  function checksuit(card){
    if(card.suit === current().suit){
      return points[card.value] += points['ACE']
    }
    else{
      return points[card.value]
    }
  }

  function attack(id, card){
    if(current().round <= 1 && current().board.length <= 4 || current().round >= 2 && current().board.length <= 5){
      if(current().players.find(p=>p.id === id).type === 'human'){
        if(!current().board.length || current().board.find(c=> c.active.value === card.value || c.beaten.value === card.value)){
          let newcard = {
            active: card,
            beaten: '',
            code: card.code
          }
          changer(TKcardsFROM(card, id))
          changer(SetActive(newcard))
          UpdateChoice(id)
          let defender = current().players.find(p=>p.move === 'defend')
          defend(defender.id)
      }
      else{
        alert('This card cannot be thrown!')
      }
    }
    else{

    }

    }
    else{
      alert('The board is full!')
    }
  }
  function defend(id, card){
    let player = current().players.find(p=>p.id === id)
    if(player.type === 'human'){

    }
    else{
      
      let ToBeat = current().board.find(c=>!c.beaten)
      if(ToBeat){
        let beaten = player.cards.find(c=> checksuit(c) > checksuit(ToBeat.active) && (c.suit === ToBeat.active.suit || c.suit === opts.suit))
          if(beaten){
            changer(SetChoice(beaten, id))
            changer(TKcardsFROM(current().players.find(p=>p.id === id).choice, id))
            changer(SetBeaten(current().players.find(p=>p.id === id).choice, ToBeat.code))
            let NotBeat = current().board.find(c=>!c.beaten)
            if(NotBeat){
              defend(id)
            }
          }
          else{
            
          }
      }
    }

  }
  function round(id){
    if(!current().players.find(p=>p.move)){
    for(let i=0; i<current().players.length; i++){
    cards(current().deck, 6-current().players[i].cards.length, GVcardsTo, current().players[i].id)}
    let fp = {
    value: 'ACE'  }
    current().players.forEach(p => {
    p.cards.forEach(c=>{
      if(c.suit === current().suit){
        if(points[c.value] < points[fp.value]){
          fp = c
        }
      }
    })
    }); 
    let suiter = current().players.find(p => {
      if(p.cards.includes(fp)){
      return true
    }
  })
  if(suiter){
    setmove(suiter.id)
  }
  else{
    setmove(current().players[Math.floor(Math.random()*current().players.length)].id)
  }
  }
  else{

  }
  changer(NextRound(!current().start))
  let walker = current().players.find(c=> c.move === 'attack')
  if(walker && walker.type === 'bot'){
    attack(walker.id)
  }
}
  function setmove(id){
    for(let i=0; i<current().players.length; i++){
    changer(SetMove('throw', current().players[i].id))
    }
    changer(SetMove('attack', id))
    for(let i=0; i<current().players.length; i++){
    if(current().players[i].move === 'attack'){
      if(current().players[i+1]){
      changer(SetMove('defend', current().players[i+1].id))
      }
      else{
        changer(SetMove('defend', current().players[0].id))
      }
    }
    }
    changer(SortCards('bot'))
    console.log(average(current().players.find(p=>p.type === 'human').cards))
  }

    function cards(cards, count, action, id){
      for(let i=0; i<count; i++){
        changer(action(cards.shift(), id))
      }
    }

    function changer(action){
      dispatch(action)
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
      choice: '',
      move: '',
      type: 'bot',
      }
      changer(AddPlayer(bot))

    }
    function removeplayer(id){
      
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
                  cards(arr, arr.length, AddDeck)
                  changer(ChangeSuit(current().deck[current().deck.length-1].suit))
                  createbots(current().count)
                  changer(ChangeStart(!current().start))
                  round()
                          
              })})}
              
              else{
                alert('Имя не может быть пустым!')
              }
    }
    console.log(opts)
    let funcs = {
      attack: attack,
    }
    return <div className={styles.Main}>{opts.start ? <Table changer={changer} funcs={funcs}/>
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
    