'use strict'

const conf = require('./config')
const alexia = require('alexia')
const app = alexia.createApp('TAW16')

app.onStart(() => 'Welcome to Madrid, say Hello My name is, to get started, or say Help to get more instructions')

app.customSlot('Name', ['Arkadi', 'Mark', 'Roman'])
app.intent('WelcomeIntent', 'Hello my name is {name:Name}', (slots, attr) => `Hello ${slots.name ? slots.name : ''} from Madrid!`)

app.intent('HelpIntent', 'Help', (slots, attr) => 'Say current sessions or next sessions for workshop schedule')

// app.saveSpeechAssets()

exports.skill = (event, context, callback) => {
  app.handle(event, data => {
        callback(null, data)
  })
}
