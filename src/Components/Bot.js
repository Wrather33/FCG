import { useDispatch, useSelector, getState} from "react-redux"
import { useState, useEffect } from "react"
import shortid from "shortid"
import BotCard from './BotCard'
import styles from './Bots.module.css'
function Bot(props){
    let start
    if(props.cards.length < 2){
        start = 0
    }
    else if(props.cards.length <= 8){
    start = -(props.cards.length)*10
    }
    else{
        start = -80
    }
    let end = Math.abs(start)
    let point = end*2/(props.cards.length-1)
    let cards = props.cards.map((c, i)=>{
            let d = start
            start += point
            return <BotCard key={shortid.generate()} deg={d} changer={props.changer} card={c}/>
        })
    return <div className={styles.Bot}><h2>{props.name}</h2>{cards}</div>

}
export default Bot