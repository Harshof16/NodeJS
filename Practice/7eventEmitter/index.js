const logEvents = require('./logEvents');       //custom module (which we made)

const EventEmitter = require('events');         //common core module

// class MyEmitter extends EventEmitter {};

//initialize object
const myEmitter  = new EventEmitter();

// emit is used to trigger an event
// on is used to add a callback function that's going to be executed when the event is triggered

//add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg))

setTimeout(() => {
    //Emit event
    myEmitter.emit('log', 'Log event emitted! ')
}, 2000)