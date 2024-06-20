const Config = require("../../Config");
const Scene = require("../Scene");

module.exports = class GameRoom extends Scene{
    constructor(){
        super()
    }

    getState(){
        return Config.APP_STATE.GAMEROOM
    }

    join(p_io, p_socket, p_thisRoom) {
        
    }

    allReadyCallback(p_io, p_socket, p_thisRoom) {
        
    }

    getInfo(){
        return {
            state : this.getState(),
        }
    }

    catchEvents(p_io, p_socket, p_playerList, p_thisRoom){

        function chatSendMessage(p_message){
            p_thisRoom.getChat().addMessage(p_message)
            p_thisRoom.sendRoomInfo(p_io, p_socket)
        }

        p_socket.on('chat_sendmessage', (message)=>{chatSendMessage(message)})
    }

    destroy(){

    }
}