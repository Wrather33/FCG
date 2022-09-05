import Bot from './Bot'
import { useDispatch, useSelector, getState} from "react-redux"
import { useState, useEffect } from "react"
import styles from './Bots.module.css'
import shortid from 'shortid'
function Others(props){
    let bots = props.bots.map(b=>{
        return <Bot key={shortid.generate()} cards={b.cards} name={b.name}/>
    })
    return <div className={styles.Bots}>{bots}</div>
}
export default Others