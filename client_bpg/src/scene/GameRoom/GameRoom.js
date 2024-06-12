import useScreenShort from "../../helper/useScreenShort";
import "./GameRoom.css"
import { GameRoomBig, GameRoomSmall, GameRoomTop } from "./components/GameRoomUI";


export default function GameRoom({p_roomInfo, canvas}){
    
    const isScreenShort = useScreenShort()

    return(
        <div className="gameroom_container">
            <div className="gameroom">
                <GameRoomTop players={p_roomInfo.playerList.getPlayers()}
                    roomID={p_roomInfo.getID()}/>
                {!isScreenShort && <GameRoomBig players={p_roomInfo.playerList.getPlayers()} canvas={canvas}
                    messages={p_roomInfo.chat.messages} thisPlayer={p_roomInfo.thisPlayer}/>}
                {isScreenShort && <GameRoomSmall players={p_roomInfo.playerList.getPlayers()} canvas={canvas}
                    messages={p_roomInfo.chat.messages} thisPlayer={p_roomInfo.thisPlayer}/>}
            </div>
        </div>
    );
}