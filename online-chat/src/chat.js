import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined, Send} from "@material-ui/icons"
import React, { useState } from 'react'
import "./chat.css"
import axios from './axios'
function Chat({messages}) {
    const [input,setInput] = useState('')
    const sendMessage = async (e) =>{
        e.preventDefault();

        axios.post("/api/messages/new",{
            "message": input,
            "name": 'Erfan',
            "received": true,
            "timestamp": new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit"}),
        })
    }


    return <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>last seen at...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (

                <p className={`chat_message ${message.received && "chat_reciver"}`}>
                    <span className="chat_name">{message.name}</span>
                        {message.message}
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                </p>
                ))}

            </div>
            <div className="chat_footer">
                <InsertEmoticon/>
                <form>
                    <input
                    value={input}
                    onChange = {e => setInput(e.target.value)}  
                    placeholder="Type a message" 
                    type="text" />
                    <button type="submit" onClick={sendMessage}>
                        <Send/>
                    </button>
                </form>
            </div>
        </div>

}

export default Chat
