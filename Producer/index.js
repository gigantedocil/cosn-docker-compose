var mqtt = require('mqtt')
//var client = mqtt.connect('mqtt://127.0.0.1:1884')
var client = mqtt.connect('mqtt://mqtt:1883')

client.on('connect', function () {
    console.log("Connected")

    //client.publish('presence', 'Hello mqtt')
    var i = 0;
    var messageLoop = setInterval(
        () => {
            var message = "Message " + i.toString()
            console.log("Sending ", message)
            client.publish("presence", message)
            i += 1;
            if (i == 5) {
                console.log("Disconnected")
                client.end()
                clearInterval(messageLoop)
            }
        },
        3000
    )
})