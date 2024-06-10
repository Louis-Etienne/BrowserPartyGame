
module.exports = class Player{
    constructor(p_id, p_name, p_roomID, p_color){
        this.m_id = p_id;
        this.m_name = p_name;
        this.m_roomID = p_roomID;
        this.m_color = p_color;
        this.m_ready = false;
        this.m_score = 0;
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

    setColor(p_newColor){
        this.m_color = p_newColor
    }

    getReady(){
        return this.m_ready
    }

    setReady(p_newReady){
        this.m_ready = p_newReady
    }

    getScore(){
        return this.m_score
    }
}