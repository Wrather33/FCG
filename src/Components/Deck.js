import styles from './Deck.module.css'
import shirt from '../Images/Back.png'
function Deck(props){
    let indent = 90
    let deck = props.cards.map((c, i)=>{
        indent -= 2
        return <div className={styles.Cover} key={c.code} style={{transform: `translateX(${indent}px)`}}><img src={i ? shirt : c.image}></img></div>
    })
    indent = 0
    return <div className={styles.Deck}>{deck}</div>
}
export default Deck