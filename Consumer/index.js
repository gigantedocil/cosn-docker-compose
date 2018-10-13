var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://mqtt:1883')
// var client = mqtt.connect('mqtt://mqtt')

client.on('connect', function () {
  console.log("Connected")
  client.subscribe('presence')
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log("Received " + message.toString())
    // client.end()
  })
})

