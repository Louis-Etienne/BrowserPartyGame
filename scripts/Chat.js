const Config = require("./Config")

module.exports = class Chat{
    constructor(){
        this.MAX_CHAT_MESSAGE = Config.MAX_CHAT_MESSAGE
        this.messages = [this.MAX_CHAT_MESSAGE]
    }

    getInfo(){
        return this.messages;
    }


}