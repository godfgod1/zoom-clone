import http from 'http';
import SocketIO from "socket.io";
// import WebSocket from 'ws';
import express from "express";


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
//! catchall url 유저가 다른 URL 이동하려는거 방지
app.get('/*',(req,res)=>res.redirect('/'))


//app listen으로 http가 서버에게 접근
// app.listen(3000, handleListen);

const httpServer = http.createServer(app)
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((e)=>{
    console.log(`Socket Event:${e}`)
  })
  socket.on("enter_room", (roomName,  done) => {
    socket.join(roomName)
    done()
  });
});

// const wss = new WebSocket.Server({server})
/*
function onSocketClose() {
  console.log("Disconnected from the Browser ❌");
}
const sockets = [ ];
wss.on("connection",(socket)=>{
    // 각 브라우저 연결
    sockets.push(socket)
    console.log("Connect to Browser ")
    socket.on("close", onSocketClose);

    socket.on("message",(message)=>{
      //각 브라우저에게 메세지 전달
      sockets.forEach((aSocket) => aSocket.send(message))
    })
    socket.send('hello')
})
server.listen(3000, handleListen)
*/
const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
