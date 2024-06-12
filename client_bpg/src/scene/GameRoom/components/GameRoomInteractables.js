import { useRef } from "react";
import { socket } from "../../../socket";
import "./GameChat.css"
import "./GameScoreboard.css"
import crownImage from "./Images/crown.png"

export function GameChat({ thisPlayer, messages }) {
    const chatInput = useRef();

    function OnKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const message = chatInput.current.value;
            chatInput.current.value = ''
            socket.emit('chat_sendmessage',
                {
                    name: thisPlayer.getName(),
                    message: message,
                    color: thisPlayer.getColor()
                }
            )
        }
    }

    return (
        <div className="gamechat">
            <div className="gamechat_messages">
                {messages.map((message, index) => {
                    return <div className='gamechat_message' key={index}
                        style={{ backgroundColor: message.color }}>
                        <span>{message.name} :
                        </span> {message.message}
                    </div>
                })}
            </div>
            <div className="gamechat_input">
                <input type="text" maxLength={50}
                    onKeyDown={OnKeyDown} ref={chatInput}
                    style={{ backgroundColor: thisPlayer.getColor() }} />
            </div>
        </div>
    )
}

export function GameScoreboard({ players }) {
    return (
        <div className="gamescoreboard">
            {Object.values(players).map((player, index) => {
                return <GameScoreboardPlayer key={index} player={player} index={index} />
            })}
        </div>
    );
}

function GameScoreboardPlayer({ player, index }) {
    return (
        <div className="gamescoreboard_player" style={{ borderColor: player.color, borderWidth: '5px' }}>

            <div className="gamescoreboard_place" style={{ backgroundColor: player.getColor() }}>{index + 1}</div>
            {index === 0 && <div className="gamescoreboard_crown">
                <img src={crownImage}></img>
            </div>}
            <div className={player.getReady() ? "gamescoreboard_playername_ready" : "gamescoreboard_playername"}>
                {player.getName()}
            </div>
            <div className="gamescoreboard_values">values of the shit</div>

        </div>
    );
}