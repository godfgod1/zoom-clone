const socket = io();

const welcome = document.getElementById('welcome')
const form = welcome.querySelector('form');
const room = document.getElementById('room')
let roomName;
room.hidden = true;

function showRomm(){
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`
}

function handleRoomSubmit(e){
  e.preventDefault()
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRomm);
  roomName = input.value;
  input.value = ""
}

form.addEventListener("submit", handleRoomSubmit);
/*
const messageList =  ul = document.querySelector("ul")
const messageForm =  from = document.querySelector("form") 

// 클라이언트에 서버를 연결
const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open",()=>{
    console.log("Connect to Server ")
})

socket.addEventListener('message',(message)=>{
    console.log("New message: ", message.data)
})

socket.addEventListener("close",()=>{
    console.log("Disconnected from server ")
})

function handleSubmit(e){
  e.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value=''
}

messageForm.addEventListener("submit", handleSubmit);
*/