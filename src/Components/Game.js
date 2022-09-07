import { useState, useEffect } from "react"
import Form from './Form'
import Table from './Table'
import styles from './Main.module.css'
import shortid from "shortid"
import {firstNames} from "@faykah/first-names-en";
import { useDispatch, useSelector, getState} from "react-redux"
import {store} from '../Store/store'
import {points} from '../Points/points'
import {AddDeck, AddPlayer, ChangeSuit, ChangeStart, GVcardsTo, SetMove, SetActive, TKcardsFROM, SortCards} from '../Store/ActionCreators/actioncreators'
function Game(){
  const dispatch = useDispatch()
  const opts = useSelector(state=>state)
  function process(type, card, id){
    if(type === 'attack'){
      if(store.getState().players.find(p=>p.id === id).type === 'human'){
        if(!store.getState().board.length || store.getState().board.find(c=> c.active.value === card.value || c.beaten.value === card.value)){
          let newcard = {
            active: card,
            beaten: '',
            id: shortid.generate()
          }
          changer(TKcardsFROM(card, id))
          changer(SetActive(newcard))
          let defender = store.getState().players.find(p=>p.move === 'defend')
          if(defender.cards.find()){

          }
      }
      else{
        alert('This card cannot be thrown!')
      }
    }
    else{

    }
    /*if attack - defend by card or take*/
  }}
  
  function round(id){
    
    if(!store.getState().players.find(p=>p.move)){
    for(let i=0; i<store.getState().players.length; i++){
    cards(store.getState().deck, 6-store.getState().players[i].cards.length, GVcardsTo, store.getState().players[i].id)}
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
    changer(SetMove('throw', store.getState().players[i].id))
    }
    changer(SetMove('attack', id))
    for(let i=0; i<store.getState().players.length; i++){
    if(store.getState().players[i].move === 'attack'){
      if(store.getState().players[i+1]){
      changer(SetMove('defend', store.getState().players[i+1].id))
      }
      else{
        changer(SetMove('defend', store.getState().players[0].id))
      }
    }
    }
    changer(SortCards('bot'))
    process()
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
      choose: '',
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
                  changer(ChangeSuit(store.getState().deck[store.getState().deck.length-1].suit))
                  createbots(store.getState().count)
                  changer(ChangeStart(!store.getState().start))
                  round()
                          
              })})}
              
              else{
                alert('Имя не может быть пустым!')
              }
    }
    console.log(opts)
    return <div className={styles.Main}>{opts.start ? <Table changer={changer} process={process}/>
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


    /*if(type === 'attack' && store.getState().players.find(p=>p.id === id).type === 'human'){
      if(!store.getState().board.length || store.getState().board.find(c=> c.active.value === card.value || c.beaten.value === card.value)){
      let newcard = {
        active: card,
        beaten: '',
        id: shortid.generate()
      }
      changer(SetActive(newcard))
      if(store.getState().players.find(p=>p.id === id).type){
        changer(SetBeaten(card, id))
      }
      else if('reverse'){

      }
      else if('take'){

      }
      }
      
    }*/