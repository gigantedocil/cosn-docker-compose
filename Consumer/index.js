var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://mqtt:1883')

client.on('connect', function () {
  console.log("Connected")
  client.subscribe('presence')
  client.on('message', function (topic, message) {

    var messageContent = message.toString()

    console.log("Received " + messageContent)

    if (messageContent.split(" ")[1] == 5) disconnect()

  })
})

function disconnect() {    
  client.end()  
  console.log("Disconnected")
}

