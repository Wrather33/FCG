import shortid from 'shortid'
import styles from './Counts.module.css'
function Count(props){
    let arr = []
    if(props.count < props.cnt){
        setTimeout(() =>{props.changer(props.ChangeCount(props.count))})
    }
    for(let i=2; i<=props.count; i++){
        if(i == props.cnt){
            arr.push(
                <div key={shortid.generate()}>
                <input type='radio' name='count' defaultChecked value={i} onChange={(e)=>
                    props.changer(props.ChangeCount(e.target.value))}></input>
                <label>{i}</label></div>)
        }
        else{
        arr.push(
            <div key={shortid.generate()}>
            <input type='radio' name='count' value={i} onChange={(e)=>{
                   props.changer(props.ChangeCount(e.target.value))}}></input>
            <label>{i}</label></div>)}
        }
    return <div className={styles.counts}>{arr}</div>
}
export default Count