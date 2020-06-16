'use strict';

require('dotenv').config();
const faker = require('faker');
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;


client.connect(PORT, HOST, () => {
  console.log('Vandor connected');
  randomOrder();
  client.on('data', (data) => {
    const event = JSON.parse(data);
    if (event.event === 'delivered') {
      console.log('thank you for delivering',event.payload.orderId);
    }
  });
  // client.on('close', () => console.log('Connection Closed'));
});



function randomOrder(){
  setInterval(() => { 
    // order
    let payload=
    { storeName : process.env.STORE_NAME,
      orderId : faker.random.number(),
      customerName : faker.name.findName(),
      address : faker.address.streetAddress(),
    };
    
    let message = JSON.stringify({
      event:'pickup',
      payload:payload,
    });
    client.write(message);
    randomOrder();
  }, 5000);
}

client.on('error', (err) => console.log(`logger Client error ${err.message}`));