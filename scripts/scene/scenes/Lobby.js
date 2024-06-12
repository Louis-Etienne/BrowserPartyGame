const Scene = require("../Scene");
const Timer = require("../../utils/Timer.js");
const Config = require("../../Config.js");

module.exports = class Lobby extends Scene{
    constructor()
    {
        super()
        this.timer = new Timer();
        
    }
    
    getState(){
        return Config.m_appState.LOBBY
    }

    join(p_io, p_socket, p_thisRoom){
        this.allReadyCallback(p_io, p_socket, p_thisRoom)
    }

    allReadyCallback(p_io, p_socket, p_thisRoom){
        this.updateTimer(
            p_io, 
            p_socket, 
            p_thisRoom.m_playerList, 
            p_thisRoom)
    }

    getInfo(){
        return {
            timer: this.timer.counter,
            state : this.getState(),
        }
    }

    updateTimer = (p_io, p_socket, p_playerList, p_thisRoom)=>{
        if (p_playerList.allReady()){
            this.timer.Start(()=>{
                if(this.timer.counter > 2){
                    this.timer.Reset()
                    p_thisRoom.changeScene('GameRoom', p_io, p_socket)
                }
                else{
                    this.timer.counter += 1
                    p_thisRoom.sendRoomInfo(p_io, p_socket)
                }

            })
        }
        else{
            this.timer.Reset()
        }
    }
    
    catchEvents(p_io, p_socket, p_playerList, p_thisRoom, p_this){

        function setPlayerColor(p_newColor){
            p_playerList.changeColor(p_socket, p_newColor)
            p_thisRoom.sendRoomInfo(p_io, p_socket)
        }

        function setPlayerReady(p_newReady){
            p_playerList.changeReady(p_socket, p_newReady)
            p_this.updateTimer(p_io, p_socket, p_playerList, p_thisRoom)
            p_thisRoom.sendRoomInfo(p_io, p_socket)
        }

        p_socket.on('lobby_new_color', setPlayerColor)
        p_socket.on('lobby_ready', setPlayerReady)
    }

    destroy(){
        
    }
}