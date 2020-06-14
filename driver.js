'use strict';

const events = require('./events.js');

events.on('pickup', pickupHandler);
events.on('in transit', inTansitHandler);

function pickupHandler(payload) {
  setTimeout(() => {
    console.log('DRIVER: picked up [ORDER_ID]', payload.orderId);
    events.emit('in transit', payload);
  },1000);
}
  
function inTansitHandler(payload) {
  setTimeout(() => {
    console.log('delivered', payload);
    events.emit('delivered', payload);
  }, 3000);
}