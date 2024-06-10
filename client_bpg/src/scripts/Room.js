
import PlayerList from "./PlayerList"
import SceneManager from "./SceneManager"
import Chat from "./Chat"

export default class Room{
    constructor(p_roomInfo, p_personnalID){
        this.id = p_roomInfo.id
        this.playerList = new PlayerList(p_roomInfo.playerList)
        this.sceneManager = new SceneManager(p_roomInfo.sceneManager)
        this.chat = new Chat(p_roomInfo.chat)
        this.colors = p_roomInfo.colors

        for (const player in this.playerList.getPlayers()){
            const pInfo = this.playerList.getPlayers()[player]
            if(pInfo.m_id == p_personnalID)
                this.thisPlayer = pInfo
        }
    }

    getIsAllReady(){
        for(const player in this.playerList.getPlayers()){
            if(!this.playerList.getPlayers()[player].getReady()){
                return false
            }
        }
        return true
    }
}
