'use strict';

const { Client } = require('pg')

const mqtt = require('mqtt')

const insertIntoMessagesQuery = 'INSERT INTO messages(message) VALUES($1) RETURNING *'

const client = mqtt.connect('mqtt://mqtt:1883')

const pgClient = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
})

client.on('connect', () => {

  pgClient.connect()

  console.log('Connected')

  client.subscribe('presence')

  client.on('message', async (topic, message) => {

    var messageContent = message.toString()

    console.log('Received ' + messageContent)

    const dbData = [];

    dbData.push(messageContent)    

    await pgClient.query(insertIntoMessagesQuery, dbData)
      .then(res => {
        console.log(res.rows[0])
      })
      .catch(e => console.error(e.stack))

    if (messageContent.split(' ')[1] == 5) disconnect()
  })
})

function disconnect() {  
  pgClient.end()
  client.end()
  console.log('Disconnected')
}

