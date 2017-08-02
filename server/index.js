'use strict';
const app = require('./app');
const db = require('../db');
const ProfileController = require('./controllers').Profiles;
const GameController = require('./controllers').Games;
const PORT = process.env.port || 3000;
var osc = require('node-osc');

let server = app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});


var io = require('socket.io')(server);
var oscServer = new osc.Server(5000);
var map = {},
  queue = [],
  dataPoints = {},
  playing = [],
  clients = {},
  leaderBoard = {head: null, tail: null},
  top = [];


// create a leaderboard
(function() {

  ProfileController.getAll(null, null, ({models}) => {
    console.log('creating the leader board');

    let arr = [];
    models.forEach(({attributes: {id}, attributes: {games_won}, attributes: {display}}) => {
      arr[games_won] = arr[games_won] || [];
      arr[games_won].push({id, display, games_won});
    });


    let lastNode = {};
    leaderBoard.tail = lastNode;
    let lastArr = arr[arr.length - 1];
    leaderBoard.head = lastArr[lastArr.length - 1];

    arr.forEach(arr => {
      arr.forEach(node => {
        leaderBoard[node.id] = node;
        lastNode.prev = node;
        node.next = lastNode;
        lastNode = node;
      });
    });

    leaderBoard.tail = leaderBoard.tail.prev;
    leaderBoard.tail.next = null;
  });

  leaderBoard.changed = true;
})();

let getTop = function(num) {

  if(leaderBoard.changed || num > top.length - 1) {
    let node = leaderBoard.head,
      arr = [];
    for (let i = 0; node && i < num; i++, node = node.next) {
      let {display, games_won} = node;
      arr.push({display, games_won});
    }

    return top[num] = arr;
  }

  return top[top.length - 1].slice(0, num);
};

// update the leader board with a new win
let updateLeaderBoard = function(id, display) {
  leaderBoard.changed = true;
  let node;
  if(!leaderBoard[id]) { // user doesn't exist, add to tail
    node = {id, display, games_won: 1};
    leaderBoard.tail.next = node;
    node.prev = leaderBoard.tail;
    node.next = null;
    leaderBoard.tail = node;
    return;
  }

  // user exists already, update their score
  node = leaderBoard[id];
  node.games_won++;
  while(node.prev && node.games_won > node.prev.games_won) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.next = node.prev;
    node.prev = node.prev.prev;
  }

  if(!node.prev) {
    leaderBoard.head = node;
  }
};

//PLAYER CONNECTS
io.sockets.on('connection', function(socket) {

  let num = 5;
  socket.on('leaderBoard', () => {
    let arrTop = top[num];
    if(!arrTop || leaderBoard.changed) {
      arrTop = getTop(num);
    }

    socket.emit('leaderBoard', {top: arrTop});
  });

  socket.on('gameOver', ({winner, loser, key, winnerName}) => {

    // if(!playing[key]) { return; } // already handled this game
    // playing[key] = null; //stop the game

    GameController.addGame(winner, loser); //update the db

    // update user games played and wins
    [[winner, true], [loser, false]].forEach(player => {
      ProfileController.updateScore(player[0], player[1]);
    });

    // update the leader board, if win
    updateLeaderBoard(winner, winnerName);

    socket.emit('leaderBoard', {top: getTop(5)});
  });

  socket.on('streamConnection', ({ name, serial }) => {
    console.log('connection starting to stream');
    clients[serial] = { serial, name, socketId: socket.id, isPlaying: false };
    console.log(clients[serial]);

  });

  socket.on('startPlaying', ({ serial }) => {
    console.log('clients serial is ', serial, ' client is ', clients[serial]);
    if (!clients[serial] || clients[serial].isPlaying) { return; } // if no client or client is playing, end

    console.log('connecting serial ', clients[serial]);
    clients[serial].isPlaying = true;
    queue.push(clients[serial]); // new player, add to queue
    if (queue.length >= 2) {
      startPlaying(queue.shift(), queue.shift());
    }
  });
});

//PLAYER STREAMS DATA
oscServer.on('message', function(msg, { port }) {

  if (msg[0] === '/muse/config') {
    var config = JSON.parse(msg[1]);
    let serial = config.serial_number.split('-')[2];
    if (!clients[serial]) { return; }

    if (!map[port]) { // check if doesn't exist
      map[port] = clients[serial];
      map[port].port = port;
    }

  } else {

    if (msg[0] === '/muse/elements/experimental/mellow') {

      if (!map[port]) { return; }
      if (!map[port].isPlaying) { // client is not playing yet. stream them just their data
        io.to(map[port].socketId).emit('testConnection', msg[1] * 100);
      }
      dataPoints[port] = dataPoints[port] || [];
      dataPoints[port].push(msg[1]);
    }

    if (msg[0] === '/muse/elements/horseshoe') {
      if (!map[port]) { return; }
      if (!map[port].isPlaying) { // client is not playing yet. stream them just their data
        io.to(map[port].socketId).emit('signalStrength', [msg[1], msg[2], msg[3], msg[4]]);
      }
    }
  }
});


let startPlaying = function(player1, player2) {
  console.log('game started for players');
  console.log('player1 ', player1);
  console.log('player2 ', player2);

  player1.pair = player2;
  player2.pair = player1;

  let key = playing.push([player1, player2]);
  [player1, player2].forEach((player, index) => {
    console.log('start streaming for ', player.name, ' on socket ', player.socketId);
    io.to(player.socketId).emit('matched', { opponent: player.pair.name, left: !index, key: --key });
  });

};


// get the player's points
let getPoints = function({ port }) {

  if (!dataPoints[port] || !dataPoints[port].length) { return 0; }
  var points = dataPoints[port].shift();

  return points;
};

let updateGame = function() {
  if (!playing.length) { return; }

  let pointsA = 0,
    pointsB = 0;

  playing.forEach((objPlayers) => {
    if(!objPlayers) { return; }
    let [player1, player2] = objPlayers;

    pointsA = getPoints(player1);
    pointsB = getPoints(player2);

    let difference = pointsA - pointsB;

    [player1, player2].forEach(player => {
      let calmScore = null;
      calmScore = getPoints(player) * 100;
      console.log('calmScore', calmScore, player.port);
      io.to(player.socketId).emit('score', { difference, calmScore });
    });

  });
};

setInterval(updateGame, 200);
