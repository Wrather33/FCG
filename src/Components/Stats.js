import styles from './Stats.module.css'
function Stats(props){
    
    return <div><div className={styles.Stats}>
        <p>Name: {props.players.find(p => p.type === 'human').name}</p>
        <p>Wins: {props.players.find(p => p.type === 'human').wins}</p>
        <p>Draws: {props.players.find(p => p.type === 'human').draws}</p>
        <p>Losses: {props.players.find(p => p.type === 'human').losses}</p></div></div>
}
export default Stats