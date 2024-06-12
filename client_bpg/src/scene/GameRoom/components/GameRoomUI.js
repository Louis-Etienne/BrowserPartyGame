import "../GameRoom.css"
import "./GameRoomBig.css"
import "./GameRoomSmall.css"
import { GameScoreboard, GameChat } from "./GameRoomInteractables"

export function GameRoomTop({players, roomID}) {
    function OnClickQuit() {
        window.location.reload()
    }

    function OnClickCopy() {
        navigator.clipboard.writeText(roomID);
    }

    return (
        <div className="gameroom_top">
            <div className="gameroom_top_left"
                onClick={OnClickQuit}>
                Quit
            </div>
            <div className="gameroom_top_middle">
                <div>
                    <span style={{ color: "#FF0000" }}>B</span>
                    <span style={{ color: "#00FF00" }}>P</span>
                    <span style={{ color: "#0000FF" }}>G</span>
                </div>
            </div>
            <div className="gameroom_top_right">
                <div className="gameroom_top_number">
                    {Object.keys(players).length}/8
                </div>

                <div className="gameroom_top_right_copy"
                    onClick={OnClickCopy}>
                    Copy Room ID
                </div>
            </div>

        </div>
    );
}

export function GameRoomBig({players, canvas, messages, thisPlayer}){
    return (
        <div className="gameroom_big">
            <div className="gameroom_big_players">
                <GameScoreboard players={players}/>
            </div>
            <div className="gameroom_big_screen">
                {canvas}
            </div>
            <div className="gameroom_big_chat">
                <GameChat  thisPlayer={thisPlayer}
                    messages={messages}/>
            </div>
        </div>
    );
}

export function GameRoomSmall({ canvas, players, messages, thisPlayer }) {
    return (
        <div className="gameroom_small">
            <div className="gameroom_small_screen">
                {canvas}
            </div>
            <div className="gameroom_small_interactable">
                <div className="gameroom_small_players">
                    <GameScoreboard players={players}/>
                </div>
                <div className="gameroom_small_chat">
                    <GameChat messages={messages} thisPlayer={thisPlayer}/>
                </div>
            </div>
        </div>
    );
}