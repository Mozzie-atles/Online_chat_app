import React, { useEffect, useState } from "react"
import './App.css';
import Sidebar from "./sidebar"
import Chatbar from "./chat"
import Pusher from 'pusher-js'
import axios from "./axios"
function App() {
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    axios.get('/message/sync')
        .then(res => {
          setMessages(res.data)
        })
  },[])


  useEffect(()=>{
    const pusher = new Pusher('33a90d7918fe102f7049', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newmsg) => {
      setMessages([...messages,newmsg]);
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe();
    }
  },[messages])

  console.log(messages)

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chatbar messages={messages}/>
      </div>
    </div>
  );
}

export default App;
