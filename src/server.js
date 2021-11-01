import http from 'http';
import WebSocket from 'ws';

import express from "express";


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
//! catchall url 유저가 다른 URL 이동하려는거 방지
app.get('/*',(req,res)=>res.redirect('/'))

const handleListen = () => console.log("Listening on http://localhost:3000");
//app listen으로 http가 서버에게 접근
// app.listen(3000, handleListen);

const server = http.createServer(app)
const wss = new WebSocket.Server({server})

// function handleConnection (socket){
//     console.log(socket)
// }

wss.on("connection",(socket)=>{
    // console.log(socket)
    console.log("Connect to Browser ")
    socket.send('hello')
    socket.on("message",(message)=>{
        console.log(message.toString('utf8'))
    })
    socket.on("close",()=>{
        console.log("Disconnected from Browser ")
    })
})

server.listen(3000, handleListen)