
export default class Player{
    constructor(p_playerInfo){
        this.m_id = p_playerInfo.m_id;
        this.m_name = p_playerInfo.m_name;
        this.m_roomID = p_playerInfo.m_roomID;
        this.m_color = p_playerInfo.m_color;
        this.m_ready = p_playerInfo.m_ready
        this.m_score = p_playerInfo.m_score;
    }

    getID(){
        return this.m_id
    }

    getName(){
        return this.m_name
    }

    getRoomID(){
        return this.m_roomID
    }

    getColor(){
        return this.m_color
    }

    getReady(){
        return this.m_ready
    }

    getScore(){
        return this.m_score
    }
}