const Lobby = require("./scenes/Lobby")
const GameRoom = require("./scenes/GameRoom")

module.exports = class SceneManager{
    constructor(){
        this.m_allScenes = {Lobby: new Lobby(), GameRoom: new GameRoom()}
        this.m_scene = this.m_allScenes['Lobby']
    }

    getInfo(){
        return this.m_scene.getInfo()
    }

    join(p_io, p_socket, p_thisRoom){
        this.m_scene.join(p_io, p_socket, p_thisRoom)
    }

    allReadyCallback(p_io, p_socket, p_thisRoom){
        this.m_scene.allReadyCallback(p_io, p_socket, p_thisRoom)
    }

    catchEvents(p_io, p_socket, p_playerList, p_thisRoom){
        for(const scene in (this.m_allScenes)){
            this.m_allScenes[scene].catchEvents(
                p_io, 
                p_socket, 
                p_playerList, 
                p_thisRoom, 
                this.m_allScenes[scene],
            )
        }
    }

    destroy(){
        for(const scene in (this.m_allScenes)){
            this.m_allScenes[scene].destroy()
        }
    }
}