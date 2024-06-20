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

    }

    destroy(){

    }
}