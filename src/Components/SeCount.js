import shortid from 'shortid'
import styles from './Counts.module.css'
import MaxOfArray from '../MaxOfArray'
function SeCount(props){
    let arr = []
    for(let i=2; i<=props.count; i++){
        arr.push(
            <div key={shortid.generate()}>
            <input type='checkbox' name='count' checked={props.cnt.includes(`${i}`)} value={i} 
            onChange={(e)=>{
                   props.handleSubmit(e.target.value, 'count')}}></input>{i}</div>)}
    return <div className={styles.counts}>{arr}</div>
}
export default SeCount