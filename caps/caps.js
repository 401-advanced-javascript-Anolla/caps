'use strict';

const net = require('net');
const uuidv4 = require('uuid').v4;

require('dotenv').config();
const PORT = process.env.PORT || 3001;
const server = net.createServer();
server.listen(PORT, () => console.log(`${PORT} is running`));

const socketPool = {};

server.on('connection', (socket)=> {

  const id = `Socket-${uuidv4()}`;
  
  socketPool[id] = socket;
  
  socket.on('data', (buffer)=> dispatchEvent(buffer));
  
  socket.on('error', (error)=> console.log(`Socket error ${error}`));
  
  socket.on('end', (end) => {
    console.log(`connection ended ${end}`);
    delete socketPool[id];
  });
});

// take the string message from the buffer
function dispatchEvent(buffer) {
  // console.log('Buffer', JSON.parse(buffer));
  const message = JSON.parse(buffer.toString().trim());
  if(message.event && message.payload){
    broadcast(message);
  }
}

// sending the message to all connected clients
function broadcast(message) {
  // console.log('Message', message);
  const payload = JSON.stringify(message);
  // console.log('Payload', payload);
  for (let socket in socketPool) {
    // emit the message to all the clients
    socketPool[socket].write(payload); ////////
  }
}


// server error
server.on('error', (e) => console.log('SERVER ERROR', e.message));