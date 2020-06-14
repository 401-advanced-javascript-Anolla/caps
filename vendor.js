'use strict';

require('dotenv').config();
const events = require('./events.js');
const faker = require('faker');

function deliveredHandler (payload){
  console.log('Thank you');
}

events.on('delivered', deliveredHandler);

setInterval(() => { 
// order
  let storeName = process.env.STORE_NAME;
  let orderId = faker.random.number();
  let customerName = faker.name.findName();
  let address = faker.address.streetAddress();
  
  events.emit('pickup', { storeName, orderId, customerName, address});
}, 5000);

