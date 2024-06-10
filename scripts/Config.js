
module.exports = {

        m_scenes_name : {
            Lobby : "Lobby",
            GameRoom : "GameRoom",
        },

        m_player_colors : {
            red:'#e6261f', orange:'#eb7532',
            yellow:'#f7d038', green:'#a3e048',
            turquoise: '#49da9a', blue:'#34bbe6',
            purple: '#4355db', pink: '#d23be7',
        },

        m_games : {
            
        },

        m_maxPlayer : 8,

        m_maxChatMessage : 10,

        m_appState : Object.freeze({
            MAINMENU : 0,
            LOBBY : 1,
            GAMEROOM: 2,
        })

};