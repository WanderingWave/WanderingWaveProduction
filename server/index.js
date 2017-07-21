'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.port || 3000;
var osc = require('node-osc');

//app
let server = app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

var io = require('socket.io')(server);
var oscServer = new osc.Server(5000);
var map = {}, queue = [], dataPoints = {}, playing = [], clients = {};

let startPlaying = function(player1, player2) {
  console.log('game started');
  player1.pair = player2;
  player2.pair = player1;

  [player1, player2].forEach(player => {
    io.to(player.socketId).emit('matched', player.pair.name);
  });

  playing.push([player1, player2]);
};

// get the player's points
let getPoints = function({port}) {
  let points = dataPoints[port].reduce((sum, value) => sum + value, 0);
  dataPoints[port] = [];
  return points;
};

let updateGame = function() {
  if(!playing.length) { return; }

  let pointsA = 0, pointsB = 0;
  playing.forEach(([player1, player2])  => {
    pointsA = getPoints(player1);
    pointsB = getPoints(player2);

    let difference = (pointsA - pointsB) % 10;
    [player1, player2].forEach(player => io.to(player.socketId).emit('score', difference));
    console.log('player one position moves by ', difference);
  });

};

setInterval(updateGame, 100);

oscServer.on('message', function(msg, {port}) {

  if(msg[0] === '/muse/config') {
    var config = JSON.parse(msg[1]);
    let serial = config.serial_number.split('-')[2];
    console.log('this is the serial ',serial);
    if(!clients[serial]) { return; }
    console.log('client with serial ', serial, ' exists');

    if (!map[port]) { // check if doesn't exist
      map[port] = clients[serial];
      map[port].port = port;
      queue.push(map[port]); // new player, add to queue
      if(queue.length >= 2) {
        startPlaying(queue.shift(), queue.shift());
      }
    }

  } else if (msg[0] === '/muse/elements/experimental/mellow') {
    if(!map[port]) { return; }; // port doesn't exist
    dataPoints[port] = dataPoints[port] || [];
    dataPoints[port].push(msg[1]);
  }
});

io.sockets.on('connection', function(socket) {

  socket.on('connectPlayers', ({serial, name}) => {
    console.log('new player connecting... ', name, ' on serial ', serial);
    clients[serial] = {serial, name, socketId: socket.id};
  });

  // socket.on('gameOver', ({gameid}) => {
  //
  //
  // });

});
