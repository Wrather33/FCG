import styles from './Deck.module.css'
import shirt from '../Images/Back.png'
import { useSelector } from 'react-redux'
function Deck(props){
    let suit = useSelector(state=>state.suit)
    let indent = 90
    let deck = props.deck.map((c, i)=>{
        indent -= 2
        return <div className={styles.Cover} key={c.code} style={{transform: `translateX(${indent}px)`}}><img src={i !== props.deck.length-1 ? shirt : c.image}></img></div>
    })
    return <div className={styles.Deck}><h2>Count: {deck.length}<br></br>Suit: {suit}</h2>{deck}</div>
}
export default Deck