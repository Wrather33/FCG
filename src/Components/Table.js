
import Stats from './Stats'
import Deck from './Deck'
import { useSelector } from 'react-redux'
import Player from './Player'
import Others from './Others'
import Board from './Board'
import { useParams, useNavigate, useLocation} from 'react-router'
import {socket} from '../socket.js'
function Table(props){
    let navigate = useNavigate()
    function goBack(){
        socket.emit('Room:delete', id)
        navigate(-1)
    }
    const { id } = useParams();
    return <div>{id}<button onClick={()=>{goBack()}}>Exit</button></div>
}
/*let deck = useSelector(state => state.deck)
    let bots = useSelector(st=>st.players.filter(p=>p.type === 'bot'))
    return <div>
    <Stats/>
    <Player changer={props.changer} funcs={props.funcs} />
    <Others bots={bots}/>
    <Board/>
    {<Bin/>}
    <Deck deck={deck}/></div>*/
export default Table