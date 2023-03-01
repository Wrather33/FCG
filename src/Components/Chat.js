import current from '../GetStore'
import styles from '../Components/Chat.module.css'
import { useState } from 'react'
import {socket} from '../socket'
import shortid, { characters } from 'shortid'
import { NewMessage } from '../Store/ActionCreators/actioncreators'
import {useRef, useEffect} from "react"
function Chat(props){
    const [messageValue, setMessageValue] = useState()
    let roomId = current().room.roomId
    let users = Object.entries(current().room.users)
    let list = []
    let userName = current().user.name
    let messages = current().room.messages
    const divRef = useRef();

    useEffect(()=>{
        if(divRef.current){
        divRef.current.scrollTo(0, divRef.current.scrollHeight)
        }
    }, [messages])
    const SendMessage = () =>{
        let msg = {
            userName: userName,
            roomId: roomId,
            text: messageValue,
            time: new Date().toLocaleTimeString('en-GB')
        }
        if(msg.text){
        props.changer(NewMessage(msg))
        socket.emit('Room:New_Message', msg)
        setMessageValue('')
        }
        else{
            alert('Message cannot be empty!')
        }
    }
    for (const [key, value] of users) {
        list.push(<li key={key}>{value.name}</li>)
    }
    messages = messages.map(m=>{
        return <div key={shortid.generate()} className={`${styles.message} ${userName === m.userName ? styles.mymsg : styles.opmsg}`}>
           <span>{m.userName} :</span>
           <p>{m.text}</p>
           <span className={styles.time}>{m.time}</span>
        </div>

    })
    return <div className={styles.Chat}>
        <div className={styles.Users}><p>Online: {users.length}</p><ul>{list}</ul></div>
        <div className={styles.ChatWrap}><div ref={divRef} className={styles.Messages}>
        {messages}
        </div>
        <div className={styles.sender}>
        <textarea value={messageValue} onChange={(e)=>{setMessageValue(e.target.value)}}></textarea>
        <button onClick={()=>SendMessage()}>&#9993;</button></div>
        </div>
        </div>
}
export default Chat