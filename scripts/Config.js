
module.exports = {

        SCENES_NAME : {
            Lobby : "Lobby",
            GameRoom : "GameRoom",
        },

        PLAYER_COLORS : {
            red:'#e6261f', orange:'#eb7532',
            yellow:'#f7d038', green:'#a3e048',
            turquoise: '#49da9a', blue:'#34bbe6',
            purple: '#4355db', pink: '#d23be7',
        },

        GAMES : {
            
        },

        MAX_PLAYERS : 8,

        MAX_CHAT_MESSAGE : 10,

        APP_STATE : Object.freeze({
            MAINMENU : 0,
            LOBBY : 1,
            GAMEROOM: 2,
        })

};