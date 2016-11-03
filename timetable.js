
const util = require('util')

const precalc_timeslot = function(off, year, day, time_def, session_def) {
    const time = time_def.split('-')
    const session = session_def.split('/').map(s => s.trim())
    const ms = (year, day, time) => Date.parse(util.format('%s-%sT%s:00', year, day, time)) + (-off*3600*1000)
    const s = {
        'start': ms(year, day, time[0]),
        'end': ms(year, day, time[1])
    }
    // title / room / speaker(s) / topic
    switch (session.length) {
        case 4: s.topic = session[3]
        case 3: s.speakers = session[2]
        case 2: s.room = session[1]
        case 1: default: s.title = session[0]
    }
    return s
}

exports.precalc = function(timetable) {
    const concat = (a, b) => a.concat(b)
    return Object.keys(timetable.sessions).map(day => {
        const day_sessions = timetable.sessions[day]
        return Object.keys(day_sessions).map(time => {
            const timeslot = day_sessions[time]
            return typeof(timeslot) == 'string' ?
                [precalc_timeslot(timetable.utc_offset, timetable.year, day, time, timeslot)] :
                timeslot.map(session => precalc_timeslot(timetable.utc_offset, timetable.year, day, time, session))
        })
    }).reduce(concat, []).reduce(concat, [])
}
