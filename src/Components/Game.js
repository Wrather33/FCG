import { useState } from "react"
import Form from './Form'
import Board from './Board'
import styles from './Main.module.css'
function Game(){
    const [game, setgame] = useState({
        start: false,
        decksize: 36,
        jokers: false,
        type: 'Подкидной',
        cards: [],
        suit: '',
        count: 2
    })
    const [player, setplayer] = useState({
        name: 'guest'
    })
    return <div className={styles.Main}>{game.start ? <Board/> : <Form game={game} setgame={setgame} player={player} setplayer={setplayer}/>}</div>
}
export default Game