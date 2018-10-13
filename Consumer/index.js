'use strict';

var mqtt = require('mqtt')
var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'test'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

var client = mqtt.connect('mqtt://mqtt:1883')

client.on('connect', function () {
  console.log('Connected')
  client.subscribe('presence')
  client.on('message', function (topic, message) {

    var messageContent = message.toString()

    console.log('Received ' + messageContent)

    if (messageContent.split(' ')[1] == 5) disconnect()

  })
})

function connectToDb() {

}

function disconnect() {    
  client.end()  
  console.log('Disconnected')
}

