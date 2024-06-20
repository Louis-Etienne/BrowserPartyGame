import {useEffect, useState} from 'react'
import {socket} from './socket'
import "./index.css" 
import {Config} from './helper/Config'
import MainMenu from './scene/MainMenu/MainMenu'
import Lobby from './scene/Lobby/Lobby'
import GameRoom from './scene/GameRoom/GameRoom'
import Room from './scripts/Room'
import Canvas from './scene/GameRoom/components/Canvas'

function App() {
  const [roomInfo, setRoomInfo] = useState()
  const [appState, setAppState] = useState(Config.APP_STATE.MAINMENU)
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
      {appState === Config.APP_STATE.MAINMENU && <MainMenu/>}
      {appState === Config.APP_STATE.LOBBY
        && <Lobby p_roomInfo={roomInfo} p_personnalID={personnalID}/>}
      {appState === Config.APP_STATE.GAMEROOM 
        && <GameRoom p_roomInfo={roomInfo} canvas={<Canvas/>}/>}
    </div>
  );
}

export default App;
