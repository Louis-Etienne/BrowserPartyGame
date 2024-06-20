const Config = require("./Config")
const log = require("./ServerLog")
const Room = require("./Room")

module.exports = class RoomList{
    constructor(){
        this.m_rooms = {}
    }

    destroy(){}

    catchEvents(p_io, p_socket){
        this._connectionEvents(p_io, p_socket)
    }

    evictPlayerAndRoom(p_io, p_socket){
        log(`Disconnect ${p_socket.id}`)
        const ID = p_socket.roomID
        if (ID){
            if(this.m_rooms[ID]){
                const length = this.m_rooms[ID].getPlayerList().getPlayerCount();
                if(length > 1){
                    this.m_rooms[ID].remove(p_io, p_socket);
                    if(this.m_rooms[ID].getPlayerList().allReady()){
                        this.m_rooms[ID].getSceneManager().allReadyCallback(
                            p_io, p_socket, this.m_rooms[ID]
                        )
                    }
                }
                else{
                    log(`Delete room ${ID}`);
                    this.m_rooms[ID].destroy();
                    delete this.m_rooms[ID];
                }
            }
        }
    }

    canJoinRoom(p_socket, p_roomID){
        log(`${p_socket.id} trying to join room : ${p_roomID}`)
        if(this.m_rooms[p_roomID] && p_roomID != p_socket.id){
            const length = this.m_rooms[p_roomID].getPlayerList().getPlayerCount()
            if(length < Config.MAX_PLAYERS){
                return true;
            }
            else{
                p_socket.emit("home_page_error_roomfull")
            }
        }
        else{
            p_socket.emit("home_page_error_badroom")
        }
        return false;
    }

    createRoom(p_roomID){
        log(`Creating room ${p_roomID}`)
        this.m_rooms[p_roomID] = new Room(p_roomID)
    }

    joinRoom(p_io, p_socket, p_roomID, p_playerName){
        log(`${p_playerName} joinning room ${p_roomID}`)
        p_socket.roomID = p_roomID /*custom var ID on the socket for readability*/
        p_socket.join(p_roomID)
        this.m_rooms[p_roomID].join(p_io, p_socket, p_playerName)
        this._relayEventsToRooms(p_io, p_socket)
    }

    _relayEventsToRooms(p_io, p_socket){
        const ID = p_socket.roomID
        if(ID){
            this.m_rooms[ID].catchEvents(p_io, p_socket)
        }
    }

    _connectionEvents(p_io, p_socket){
        const socket_disconnect = ()=>{
            this.evictPlayerAndRoom(p_io, p_socket)
        }

        const socket_create_room = (p_arg)=>{
            const playerID = p_socket.id;
            const username = p_arg.name;

            this.createRoom(playerID)
            this.joinRoom(p_io, p_socket, playerID, username)
        }

        const socket_join_room = (p_arg)=>{
            const roomID = p_arg.roomID
            const username = p_arg.name
            if(this.canJoinRoom(p_socket, roomID))
                this.joinRoom(p_io, p_socket, roomID, username)
            
        }

        p_socket.on('disconnect', socket_disconnect);
        p_socket.on('join_room', socket_join_room);
        p_socket.on('create_room', socket_create_room);
    }


}