import Vue from 'vue';
import socketio from "socket.io-client";
import VueSocketio from 'vue-socket.io';
import sailsio from 'sails.io.js';

const io = sailsio(socketio);

// try to reconnect if connection is lost
io.sails.reconnection = true;

io.sails.url = //'http://192.168.20.56:1337'; // or process.env.BASE_URL
  "http://localhost:1337/" 
// Remember this must match te same array in config/sockets.js (server config)
io.sails.transports = ['websocket'];

Vue.use(new VueSocketio({
  debug: true,
  connection: io.socket
}));
