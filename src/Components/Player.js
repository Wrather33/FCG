import { useDispatch, useSelector, getState} from "react-redux"
import { useState, useEffect } from "react"
import styles from './Player.module.css'
import style from './Card.module.css'
import Card from './Card'
import shortid from "shortid"

function Player(props){
    let player = useSelector(st=>st.players.find(p=>p.type === 'human'))
    let board = useSelector(st=>st.board)
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
    const moves = () =>{
        let buttons = []
        if(player.choice && player.move === 'attack'){
            buttons.push(<button onClick={()=>{props.process(player.move)}}>Attack</button>)
            if(board.length){
                buttons.push(<button onClick={()=>{props.process('finish')}}>Finish</button>)
            }
        }
        return <div>{buttons}</div>
    }
    return <div className={styles.Player}><div className={styles.choose}>{player.choice && <h2>{player.choice.value} {player.choice.suit}</h2>}{moves()}</div>{cards}</div>

}

export default Player