import styles from './Stats.module.css'
import { useDispatch, useSelector, getState} from "react-redux"
function Stats(props){
    let player = useSelector(s=>s.players.find(p=>p.type === "human")) 
    return <div><div className={styles.Stats}>
        <p>Name: {player.name}</p>
        <p>Wins: {player.wins}</p>
        <p>Draws: {player.draws}</p>
        <p>Losses: {player.losses}</p></div></div>
}
export default Stats