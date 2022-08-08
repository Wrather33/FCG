import styles from './Stats.module.css'
import Stats from './Stats'
import Deck from './Deck'
function Board(props){
    return <div><Stats game={props.game} setgame={props.setgame} players={props.players} setplay={props.setplay}/>
    {/*players*/}
    {/*field 3 states*/}
    {/*beaten*/}
    <Deck cards={props.game.cards}/></div>
}
export default Board