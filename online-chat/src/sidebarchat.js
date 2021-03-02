import { Avatar } from '@material-ui/core'
import React from 'react'
import "./sidebarchat.css"
function sidebarchat() {
    return <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info">
                <h2>Room name</h2>
                <p>last message</p>
            </div>
        </div>
    
}

export default sidebarchat
