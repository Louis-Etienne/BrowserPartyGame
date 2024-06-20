const Config = require("./Config")

module.exports = class Chat{
    constructor(){
        this.MAX_CHAT_MESSAGE = Config.MAX_CHAT_MESSAGE
        this.m_messages = []
    }

    getInfo(){
        return this.m_messages;
    }

    addMessage(p_message){
        if (this.m_messages.length >= this.MAX_CHAT_MESSAGE){
            this.m_messages.shift()
        }
        this.m_messages.push(p_message)
    }


}