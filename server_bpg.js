const express = require("express");
const path = require('path');
const http = require('http');
const socket_io = require('socket.io');

const app = express();
const httpServer = http.createServer(app);


/******************************
 * SERVER SOCKET.IO HANDLING
 ******************************/
const io = new socket_io.Server(httpServer,{
    cors:{
        origin: "http://localhost:3000"
    } 
});


/******************************
 * SERVER EXPRESS HANDLING
 ******************************/
app.use(express.static(path.join(__dirname, 'client_bpg', 'dist')));
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client_bpg', 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
httpServer.listen(port, ()=>{
    console.log('SERVER : starting');
    console.log(`SERVER : listening on port ${port}`);
});