const config = require("./Config")
const express = require('express')
const path = require('path')
const http = require('http')
const socket_io = require('socket.io')
const RoomList = require("./RoomList")
const log = require("./ServerLog")

module.exports = class Server{
    
    constructor(){
        this.m_roomList = new RoomList()
        this._init_server()
        this._init_socket()
    }


    run(){
        this._run_socket()
        this._run_server()
    }

    _run_server(){
        this.app.use(express.static(path.join(__dirname, '..', 'client_bpg', 'build')));
        this.app.get('/', (req, res)=>{
            res.sendFile(path.join(__dirname, '..', 'client_bpg', 'build', 'index.html'))
        });
        const port = process.env.PORT || 3000;
        this.httpServer.listen(port, ()=>{
            log('Starting');
            log(`Listening on port ${port}`);
        })
    }

    _run_socket(){
        this.io.on('connection', (socket)=>{
            this.m_roomList.catchEvents(this.io, socket)
        })
    }

    _init_server(){
        this.app = express()
        this.httpServer = http.createServer(this.app)
    }

    _init_socket(){
        this.io = new socket_io.Server(this.httpServer, {
            cors:{
                origin:"http://localhost:3000"
            }
        });
    }
}
