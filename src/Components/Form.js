import CreateRoom from './CreateRoom'
import ConnectRoom from './ConnectRoom'
import shortid from 'shortid'
import {Routes, Route, Link, Navigate, NavLink} from 'react-router-dom'
import Table from './Table';
import styles from './Buttons.module.css'
import { socket } from '../socket';

function Form(props){
    
    return (
        <div className={styles.buttonwrap}>
            
            <NavLink to='/CreateGame' className={window.location.pathname.startsWith('/JoinGame') ? styles.buttons : styles.disabled}>
                Create Game</NavLink><br></br>
            <NavLink to='/JoinGame' className={window.location.pathname.startsWith('/CreateGame') ? styles.buttons : styles.disabled}>Join Game</NavLink>
        </div>
        )
  
}
/*<Route path={`/Game/:id`} element={<Table/>}></Route>*/
export default Form