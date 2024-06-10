import {useEffect, useState} from 'react'
import {socket} from './socket'
import "./index.css" 
import { AppState } from './helper/enums'
import MainMenu from './scene/MainMenu/MainMenu'
import Lobby from './scene/Lobby/Lobby'
import GameRoom from './scene/GameRoom'
import Room from './scripts/Room'

function App() {
  const [roomInfo, setRoomInfo] = useState()
  const [appState, setAppState] = useState(AppState.MAINMENU)
  const [personnalID, setPersonnalID] = useState()

  useEffect(()=>{
    socket.on('connect', ()=>{
      setPersonnalID(socket.id)
    })
    socket.on('send_app_state', (p_appState)=>{
      setAppState(p_appState)
    })
    socket.on('send_room_info', (p_roomInfo)=>{
      console.log(p_roomInfo)
      setRoomInfo(new Room(p_roomInfo, socket.id))
      const newState = p_roomInfo.sceneManager.state 
      setAppState(newState)
    })

    return ()=>{
      socket.off('connect')
      socket.off('send_room_info')
      socket.off('send_app_state')
    }
  },[])

  return (
    <div className="app">
      {appState === AppState.MAINMENU && <MainMenu/>}
      {appState === AppState.LOBBY && 
      <Lobby p_roomInfo={roomInfo} p_personnalID={personnalID}/>}
      {appState === AppState.GAMEROOM && <GameRoom/>}
    </div>
  );
}

export default App;
