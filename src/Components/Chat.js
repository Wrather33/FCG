import current from '../GetStore'
import styles from '../Components/Chat.module.css'
import { useState } from 'react'
import {socket} from '../socket'
import shortid, { characters } from 'shortid'
import { NewMessage } from '../Store/ActionCreators/actioncreators'
function Chat(props){
    const [messageValue, setMessageValue] = useState()
    let roomId = current().room.roomId
    let users = current().users
    let userName = current().user.name
    let messages = current().messages
    const SendMessage = () =>{
        let msg = {
            userName: userName,
            roomId: roomId,
            text: messageValue
        }
        socket.emit('Room:New_Message', msg)
        setMessageValue('')
    }
    let list = users.map(u=>{
        return <li key={u.id}>{u.name}</li>
    })
    messages = messages.map(m=>{
        return <div key={shortid.generate()} className={styles.message}>
            <p>{m.text}</p>
        </div>

    })
    return <div className={styles.Chat}>
        <div className={styles.Users}><p>Online: {`${users.length}`}</p>{list}</div>
        <div className={styles.ChatWrap}><div className={styles.Messages}>
        {messages}
        </div>
        <textarea value={messageValue} onChange={(e)=>{setMessageValue(e.target.value)}}></textarea>
        <button onClick={()=>SendMessage()}>Отправить</button>
        </div>
        </div>
}
export default Chat