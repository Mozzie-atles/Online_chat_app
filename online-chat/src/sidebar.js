import React from 'react'
import "./sidebar.css"
import TextsmsIcon from '@material-ui/icons/Textsms';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Avatar ,IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Sidebarchat from './sidebarchat';

function sidebar() {
    return <div className="sidebar">

            <div className="sidebar_header">

                <IconButton>
                    <Avatar src="https://media-exp1.licdn.com/dms/image/C4D35AQF3HAM4VoHCSw/profile-framedphoto-shrink_100_100/0/1611836644428?e=1614632400&v=beta&t=4iIGn568_SfT2Ggh8FYvoS1C8TUWJ9aKsKFt_q0wq3I"/>
                </IconButton>

                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon   />
                    </IconButton>

                    <IconButton>
                        <TextsmsIcon />
                    </IconButton>

                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchIcon />
                    <input placeholder="Search contact" type="text"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <Sidebarchat />
                <Sidebarchat />
                <Sidebarchat />
            </div>
        </div>
    
}

export default sidebar
