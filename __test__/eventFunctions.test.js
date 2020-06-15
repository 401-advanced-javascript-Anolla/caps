'use stritc';

const events = require('../events');

const caps =require('../caps');

let consoleSpy = jest.spyOn(console, 'log').mockImplementation();

describe('events middleware', () => {

  it('delivered', () => {
    let order = {
      storeName: 'store',
      orderId: 'orderID',
      customerName: 'name',
      address: 'address',
    };
    events.emit('delivered', order);
    expect(consoleSpy).toHaveBeenCalledWith('Thank you');
  });

  it('in transit', () => {
    let order = {
      storeName: 'store',
      orderId: 'orderID',
      customerName: 'name',
      address: 'address',
    };
    events.emit('in-transit', order);
    expect(consoleSpy).toHaveBeenCalledWith('Thank you');
  });
  
  it('pickup', () => {
    let data = {
      storeName: 'store',
      orderId: 'orderID',
      customerName: 'name',
      address: 'address',
    };
    events.emit('pickup', data);
  
    expect(consoleSpy).toHaveBeenCalled();
  });
  
});