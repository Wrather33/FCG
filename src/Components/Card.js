import { useDispatch, useSelector, getState} from "react-redux"
import { useState, useEffect } from "react"
import styles from "./Card.module.css"

function Card(props){
    return <div className={styles.PLCard} style={{transform: `rotate(${props.deg}deg)`}}><img src={props.img} onClick={()=>{props.changer("SET_CH", {id: props.id, choose: props.card})}}/></div>
}
export default Card