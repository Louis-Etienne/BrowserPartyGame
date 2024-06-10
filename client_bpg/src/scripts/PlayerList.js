import Player from "./Player"

export default class PlayerList{
    constructor(p_playerList){
        this.m_players = {}
        for (const player in p_playerList){
            this.m_players[player] = new Player(p_playerList[player])
        }
    }

    getPlayers(){
        return this.m_players;
    }

    getPlayersValue(){
        return Object.values(this.m_players)
    }

    getLength(){
        return Object.keys(this.m_players).length;
    }
}