import styles from './Stats.module.css'
function Stats(props){
    return <div><div className={styles.Stats}>
        <p>Name: {props.game.player.name}</p>
        <p>Wins: {props.game.player.wins}</p>
        <p>Draws: {props.game.player.draws}</p>
        <p>Losses: {props.game.player.losses}</p></div></div>
}
export default Stats