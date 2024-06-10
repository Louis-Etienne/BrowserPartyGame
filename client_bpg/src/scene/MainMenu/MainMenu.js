import { useState} from 'react';
import { HomePageTitle, HomePageTitleReduced } from './components/HomePageTitle';
import "./MainMenu.css"
import {socket} from "../../socket";
import { CreateRoomButton, ErrorManager, JoinRoomButton, NameInput } from './components/HomePageUI';


export default function MainMenu(){
    
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return(
        <div className='home_page'>
            <HomePageTitle/>
            <HomePageTitleReduced/>
            <div className='home_page_UI'>
                <NameInput p_setUsername={setUsername}/>
                <div>Quick Play</div>
                <CreateRoomButton p_username={username} p_setErrorMessage={setErrorMessage}/>
                <JoinRoomButton p_username={username} p_setErrorMessage={setErrorMessage}/>
                <ErrorManager p_errorMessage={errorMessage} p_setErrorMessage={setErrorMessage}/>
            </div>

        </div>
    );
}