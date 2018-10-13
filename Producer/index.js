'use strict';

const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://mqtt:1883')

client.on('connect', function () {
    
    console.log('Connected')

    let i = 1;
    const messageLoop = setInterval(
        () => {
            const message = 'Message ' + i.toString()
            console.log('Sending ', message)
            client.publish('presence', message)
            i += 1;
            if (i == 6) disconnect(messageLoop)
        },
        2000
    )
})

function disconnect(messageLoop) {    
    client.end()
    clearInterval(messageLoop)
    console.log('Disconnected')
}