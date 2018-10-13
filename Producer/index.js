var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://mqtt:1883')

client.on('connect', function () {
    
    console.log("Connected")

    var i = 1;
    var messageLoop = setInterval(
        () => {
            var message = "Message " + i.toString()
            console.log("Sending ", message)
            client.publish("presence", message)
            i += 1;
            if (i == 6) disconnect(messageLoop)
        },
        2000
    )
})

function disconnect(messageLoop) {    
    client.end()
    clearInterval(messageLoop)
    console.log("Disconnected")
}