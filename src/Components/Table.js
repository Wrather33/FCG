
import Stats from './Stats'
import Deck from './Deck'
import { useSelector } from 'react-redux'
import Player from './Player'
function Table(props){
    let deck = useSelector(state => state.deck)
    return <div>
    <Stats/>
    <Player changer={props.changer}/>
    {/*bots*/}
    {/*<Board/>*/}
    {/*<Bin/>*/}
    <Deck deck={deck}/></div>
}
export default Table