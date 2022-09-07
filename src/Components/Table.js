
import Stats from './Stats'
import Deck from './Deck'
import { useSelector } from 'react-redux'
import Player from './Player'
import Others from './Others'
function Table(props){
    let deck = useSelector(state => state.deck)
    let bots = useSelector(st=>st.players.filter(p=>p.type === 'bot'))
    return <div>
    <Stats/>
    <Player changer={props.changer} process={props.process}/>
    <Others bots={bots}/>
    {/*bots*/}
    {/*<Board/>*/}
    {/*<Bin/>*/}
    <Deck deck={deck}/></div>
}
export default Table