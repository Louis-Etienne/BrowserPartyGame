import "./PlayerBlock.css"
import { PlayerBlockOther, PlayerBlock } from "./PlayerBlock"
import { socket } from "../../../socket";

export function LobbyTitle() {
    return (
        <div className="lobby_title">
            <div><span style={{ color: "#FF0000" }}>B</span>rowser</div>
            <div><span style={{ color: "#00FF00" }}>P</span>arty</div>
            <div><span style={{ color: "#0000FF" }}>G</span>ame</div>
        </div>
    );
}

export function LobbyTitleReduced() {
    return (
        <div className="lobby_title_reduced">
            <div>
                <span style={{ color: "#FF0000" }}>B</span>
                <span style={{ color: "#00FF00" }}>P</span>
                <span style={{ color: "#0000FF" }}>G</span>
            </div>
        </div>
    );
}

export function LobbyInfo({ p_roomInfo }) {

    function OnClickCopyID() {
        const roomID = p_roomInfo.id
        navigator.clipboard.writeText(roomID);
    }

    return (
        <div className="lobby_UI_roomid">
            Lobby : {p_roomInfo.playerList.getLength()}/8
            <div className="lobby_UI_roomid_container">
                <div className="lobby_UI_roomid_ID">
                    <div>ROOM ID : </div>
                    <div><i>{p_roomInfo.id}</i></div></div>
                <div className="lobby_UI_roomid_button"
                    onClick={OnClickCopyID}>copy</div>
            </div>
        </div>
    );
}

export function LobbyPlayers({ p_roomInfo, p_personnalID }) {
    return (
        <>
            {
                p_roomInfo.playerList.getPlayersValue().map((player, index) => {

                    if (player.m_id == p_personnalID) {
                        return <PlayerBlock key={index}
                            p_player={player} p_roomColors={p_roomInfo.colors} />
                    }
                    else {
                        return <PlayerBlockOther key={index} p_player={player} />
                    }
                })
            }
        </>
    );
}

export function LobbyUIFooter({ p_roomInfo }) {

    function OnClickToggleReady(){
        const isReady = p_roomInfo.thisPlayer.getReady();
        socket.emit('lobby_ready', !isReady);

     }

    return (
        <div className="lobby_UI_footer">
            {!p_roomInfo.thisPlayer.getReady() &&
                <div onClick={OnClickToggleReady}
                    className="lobby_UI_footer_start"> ready</div>}

            {!p_roomInfo.thisPlayer.getReady() && !p_roomInfo.getIsAllReady() &&
                <div className="lobby_UI_footer_info" style={{ color: '#00FF00' }}
                > ready up!</div>}

            {p_roomInfo.thisPlayer.getReady() &&
                <div onClick={OnClickToggleReady}
                    className="lobby_UI_footer_stop">cancel</div>}

            {p_roomInfo.thisPlayer.getReady() && !p_roomInfo.getIsAllReady() &&
                <div className="lobby_UI_footer_info" style={{ color: '#FF0000' }}>
                    waiting for other players</div>}

            {p_roomInfo.getIsAllReady() &&
                <div className="lobby_UI_footer_info" style={{ color: '#00FF00' }}>
                    {4 - p_roomInfo.sceneManager.scene.timer}</div>}
        </div>
    );
}





