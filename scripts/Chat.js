const Config = require("./Config")

module.exports = class Chat{
    constructor(){
        this.MAX_CHAT_MESSAGE = Config.m_maxChatMessage
        this.messages = [this.MAX_CHAT_MESSAGE]
    }

    getInfo(){
        return this.messages;
    }


}