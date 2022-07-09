import styles from './Stats.module.css'
function Stats(props){
    return <div><div className={styles.Stats}>
        <p>Name: {props.player.name}</p>
        <p>Wins: {props.player.wins}</p>
        <p>Draws: {props.player.draws}</p>
        <p>Losses: {props.player.losses}</p></div></div>
}
export default Stats