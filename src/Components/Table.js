
import Stats from './Stats'
import Deck from './Deck'
import { useSelector } from 'react-redux'
import Player from './Player'
import Others from './Others'
import Board from './Board'
import { useParams, useNavigate, useLocation} from 'react-router'
import {socket} from '../socket.js'
import current from '../GetStore'
import Chat from './Chat'
function Table(props){
    let navigate = useNavigate()
    let {id} = useParams()
    function goBack(){
        socket.emit('Room:delete', id)
        navigate(-1)
    }
    return <div><Chat changer={props.changer}/></div>
}
/*let deck = useSelector(state => state.deck)
<button onClick={()=>{goBack()}}>Exit</button>
    let bots = useSelector(st=>st.players.filter(p=>p.type === 'bot'))
    return <div>
    <Stats/>
    <Player changer={props.changer} funcs={props.funcs} />
    <Others bots={bots}/>
    <Board/>
    {<Bin/>}
    <Deck deck={deck}/></div>*/
export default Table