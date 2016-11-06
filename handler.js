'use strict'

const util = require('util')
const conf = require('./config')
const timetable = require('./timetable')
const alexia = require('alexia')
const app = alexia.createApp('TAW16')

const tt = timetable.precalc(conf.timetable)
// console.log(tt)
const uniq = (arr) => arr
    .filter(elem => elem != undefined)
    .sort()
    .reduce((acc, elem) => acc.length ? (acc[0] === elem ? acc : [elem].concat(acc)) : [elem], [])

app.onStart(() => 'Welcome to Madrid, ask, Next session in topic, to get started, or say Help to get more instructions')
app.intent('HelpIntent', 'Help', () => 'Say current sessions or next session in topic for workshop schedule. Workshop topics are ' +
    topics.join(', '))

const topics = uniq(tt.map(s => s.topic))
app.customSlot('Topic', topics)
const find_topic_sessions = (topic) => {
    const now = 1478625000000
    // const now = Date.now()
    const found = tt.find(session => session.start <= now && session.topic === topic)
    if (found === undefined) {
        return `Sorry, I cannot find ${topic} sessions`
    } else {
        return `Next in ${topic} is ${found.title} by ${found.speakers} in room ${found.room}`
    }
}
app.intent('TopicIntent', 'Next session in {topic:Topic}', (slots, attr) => find_topic_sessions(slots.topic))

const random_lambda_fact = () => conf.lambda_facts[0]
app.intent('LambdaIntent', ['For lambda facts', 'Some lambda facts'], () => random_lambda_fact())

// app.saveSpeechAssets()

exports.skill = (event, context, callback) => {
  app.handle(event, data => {
        callback(null, data)
  })
}
