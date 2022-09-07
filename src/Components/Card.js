import { useDispatch, useSelector, getState} from "react-redux"
import { useState, useEffect } from "react"
import styles from "./Card.module.css"
import {SetChoice} from '../Store/ActionCreators/actioncreators'

function Card(props){
    return <div className={styles.PLCard} style={{transform: `rotate(${props.deg}deg)`}}><img src={props.img} onClick={()=>{props.changer(SetChoice(props.card, props.id))}}/></div>
}
export default Card