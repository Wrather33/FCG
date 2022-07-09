import styles from './Stats.module.css'
import Stats from './Stats'
function Board(props){
    return <div><Stats game={props.game} setgame={props.setgame} player={props.player} setplayer={props.setplayer}/></div>
}
export default Board