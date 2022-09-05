import { useDispatch, useSelector, getState} from "react-redux"
import { useState, useEffect } from "react"
import styles from './Player.module.css'
import style from './Card.module.css'
import Card from './Card'
import shortid from "shortid"
import { players } from "../Store/players"

function Player(props){
    let player = useSelector(st=>st.players.find(p=>p.type === 'human'))
    let start
    if(player.cards.length < 2){
        start = 0
    }
    else if(player.cards.length <= 8){
    start = -(player.cards.length)*10
    }
    else{
        start = -80
    }
    let end = Math.abs(start)
    let point = end*2/(player.cards.length-1)
    let cards = player.cards.map((c, i)=>{
            let d = start
            start += point
            return <Card img={c.image} key={shortid.generate()} deg={d} changer={props.changer} id={player.id} card={c}/>
        })
    return <div className={styles.Player}><div className={style.choose}><h2>{player.choose.value} {player.choose.suit}</h2></div>{cards}</div>

}

export default Player