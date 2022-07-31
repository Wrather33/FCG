import styles from './Deck.module.css'
import shirt from '../Images/Back.png'
function Deck(props){
    let indent = 90
    console.log(props.cards)
    let deck = props.cards.map((c, i)=>{
        indent -= 2
        return <div className={styles.Cover} key={c.code} style={{transform: `translateX(${indent}px)`}}><img src={i !== props.cards.length-1 ? shirt : c.image}></img></div>
    })
    return <div className={styles.Deck}>{deck}</div>
}
export default Deck