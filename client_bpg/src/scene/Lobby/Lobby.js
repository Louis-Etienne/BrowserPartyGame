import "./Lobby.css"
import { LobbyTitle, LobbyTitleReduced, LobbyInfo, LobbyPlayers, LobbyUIFooter } from "./components/LobbyUI";


export default function Lobby({ p_roomInfo, p_personnalID }) {

    return (
        <div className="lobby">
            <LobbyTitle />
            <LobbyTitleReduced />
            <div className="lobby_UI">
                <LobbyInfo p_roomInfo={p_roomInfo} />
                <LobbyPlayers p_roomInfo={p_roomInfo} p_personnalID={p_personnalID} />
                <LobbyUIFooter p_roomInfo={p_roomInfo} />
            </div>

        </div>
    );
}