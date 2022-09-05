import { useDispatch, useSelector, getState} from "react-redux"
import { useState, useEffect } from "react"
import Back from '../Images/Back.png'
import styles from "./Card.module.css"

function Card(props){
    return <div className={styles.BotCard} style={{transform: `rotate(${props.deg}deg)`}}><img src={Back}/></div>
}
export default Card