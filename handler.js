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

app.onStart(() => 'Welcome to Madrid! Ask, Next session in topic, to get started, or say Help to get more instructions')
app.intent('HelpIntent', 'Help', () => 'Say, current or next session in topic, for workshop schedule. Workshop topics are ' +
    topics.join(', '))

const topics = uniq(tt.map(s => s.topic))
app.customSlot('Topic', topics)
app.customSlot('When', ['current', 'next'])
const find_topic_sessions = (when, topic) => {
    // const now = 1478616600001
    const now = Date.now()
    const found =  tt.find(session => session.topic === topic &&
        (when === 'next' ?
            session.start >= now :
            session.start <= now && session.end >= now))
    if (found === undefined) {
        return `Sorry, I cannot find ${topic} sessions`
    } else {
        return `${when} session in ${topic} is ${found.title} by ${found.speakers} in room ${found.room}`
    }
}
app.intent('TopicIntent', '{when:When} session in {topic:Topic}', (slots, attr) => find_topic_sessions(slots.when, slots.topic))

const random_lambda_fact = () => conf.lambda_facts[0]
app.intent('LambdaIntent', ['For lambda facts', 'Some lambda facts'], () => random_lambda_fact())

// app.saveSpeechAssets()

exports.skill = (event, context, callback) => {
    if (typeof(event.body) == 'string') {
        console.log(event.body)
        callback(null, { 'echo': JSON.parse(event.body) })
    } else {
        console.log(util.inspect(event, { depth: null }))
        app.handle(event, data => {
            callback(null, data)
        })
    }
}
