import shortid from 'shortid';
import styles from './Board.module.css'
const { useSelector } = require("react-redux");

function Board(props){
    let board = useSelector(st=>st.board)
    board = board.map(c=>{
        if(!c.beaten){
        return <div key={shortid.generate()} className={styles.BoardCard}><img src={c.active.image}></img></div>
        }
        else{
            return <div className={styles.BoardCard} key={shortid.generate()}><img src={c.active.image} style={{transform: `rotate(-20deg)`}}></img>
            <img src={c.beaten.image} style={{transform: `rotate(20deg)`}}></img></div>
        }
    })
    return <div className={styles.Board}>{board}</div>
}
export default Board