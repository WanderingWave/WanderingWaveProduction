'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.port || 3000;
// var server = require('http').Server(app); // add
var osc = require('node-osc');

//change it back to app

var server = app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});
var io = require('socket.io')(server);

var oscServer = new osc.Server(5000);

io.sockets.on('connection', function(socket) {

    var map = {}

    oscServer.on('message', function(msg, rinfo) {

        //grab the pairing and add to the map
        if (msg[0] === '/muse/config') {
            var config = JSON.parse(msg[1])
            map[rinfo.port] = config.serial_number.split('-')[2]
            console.log('message', { data: msg, serial: map[rinfo.port] })
        }

        //emit information to client
        socket.emit('hello', { data: msg, serial: map[rinfo.port] });
    });

});


