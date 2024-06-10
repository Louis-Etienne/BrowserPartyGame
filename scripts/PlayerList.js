const Config = require("./Config");
const Player = require("./Player");
const log = require("./ServerLog");

module.exports = class PlayerList{
    constructor(){
        this.m_players = {}

    }

    getPlayerCount(){
        return Object.keys(this.m_players).length;
    }

    add(p_socket, p_playerName){
        const roomID = p_socket.roomID
        let newColor = this.getUnusedColor();
        this.m_players[p_socket.id] = new Player(
            p_socket.id, 
            p_playerName, 
            roomID,
            newColor,
        )
    }

    remove(p_socket){
        delete this.m_players[p_socket.id];
    }

    allReady(){
        for (const id in this.m_players){
            if (!this.m_players[id].getReady()){
                return false
            }
        }
        return true
    }

    getUnusedColor(){
        const allColors = this.getAllColors();
        for(const color of Object.values(Config.m_player_colors)){
            if(!allColors.has(color)){
                return color;
            }
        }
    }

    changeColor(p_socket, p_newColor){
        const allColors = this.getAllColors();
        if(!allColors.has(p_newColor)){
            this.m_players[p_socket.id].setColor(p_newColor)
        }
    }

    changeReady(p_socket, p_newReady){
        this.m_players[p_socket.id].setReady(p_newReady)
    }

    getAllColors(){
        const colors = new Set()
        for(const player of this.getPlayerValueList()){
            colors.add(player.getColor())
        }
        return colors;
    }

    getInfo(){
        return this.m_players
    }

    getPlayerValueList(){
        return Object.values(this.m_players)
    }

    getPlayerIDList(){
        return Object.keys(this.m_players)
    }
}