const Chat = require("./Chat")
const Config = require("./Config")
const PlayerList = require("./PlayerList")
const SceneManager = require("./scene/SceneManager")

module.exports = class Room{
    constructor(p_roomID){
        this.m_playerList = new PlayerList()
        this.m_sceneManager = new SceneManager()
        this.m_chat = new Chat()
        this.m_id = p_roomID
    }

    destroy(){
        this.m_sceneManager.destroy()
    }

    join(p_io, p_socket, p_playerName){
        this.m_playerList.add(p_socket, p_playerName)
        this.m_sceneManager.join(p_io, p_socket, this)
        this.sendRoomInfo(p_io, p_socket)
    }

    remove(p_io, p_socket){
        this.m_playerList.remove(p_socket)
        this.sendRoomInfo(p_io, p_socket)
    }

    changeScene(p_newScene, p_io, p_socket){
        this.m_sceneManager.m_scene = this.m_sceneManager.m_allScenes[p_newScene]
        this.sendRoomInfo(p_io, p_socket)
    }

    catchEvents(p_io, p_socket){
        this.m_sceneManager.catchEvents(p_io, p_socket, this.m_playerList, this);
    }

    sendRoomInfo(p_io, p_socket){
        p_io.to(this.m_id).emit('send_room_info', {
            id : this.m_id,
            playerList : this.m_playerList.getInfo(),
            sceneManager : this.m_sceneManager.getInfo(),
            chat : this.m_chat.getInfo(),
            colors : Config.m_player_colors,
        });
    }
}