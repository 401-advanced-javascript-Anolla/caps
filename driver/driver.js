'use strict';

const net = require('net');
// this help with getting the user input from the CLI
// const inquirer = require('inquirer');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;

client.connect(PORT, HOST, () => {
  console.log('driver connected');
});

client.on('data', eventHandler);

function eventHandler(data){
  let event = JSON.parse(data.toString());
  if(event.event === 'pickup') setTimeout(pickupHandler, 1000, event);
  if(event.event === 'inTransit') setTimeout(deliveredHandler, 3000, event);
}

function pickupHandler(event){
  console.log(`Picking up ${event.payload.orderID}`);
  event.event = 'inTransit';
  let transitMessage =  JSON.stringify(event);
  client.write(transitMessage);
}

function deliveredHandler(event){
  event.event = 'delivered';
  let deliveredMessage = JSON.stringify(event);
  client.write(deliveredMessage);
}
