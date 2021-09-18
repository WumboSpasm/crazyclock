/*
    Crazy Clock
    Time Handler (clock-time.js)
    Handles time-keeping variables.
*/

// Variables declared in the global scope so they can be accessed by other scripts
let now = () => { return new Date(/*'1970-01-01T00:00:00.000'*/) },
    time = {
        get year()          { return now().getFullYear() },
        get month()         { return now().getMonth() },
        get dayOfMonth()    { return now().getDate() },
        get daysInMonth()   { return [31, (this.year % 4 == 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] },
        get daysInYear()    { return (this.year % 4 == 0) ? 366 : 365 },
        get hour()          { return now().getHours() },
        get minute()        { return now().getMinutes() },
        get second()        { return now().getSeconds() },
        get period()        { return (this.hour >= 12) ? 'PM' : 'AM' }
    },
    // Millisecond time data
    ms = {
        get time()          { return now().getTime() - (now().getTimezoneOffset() * 60 * 1000) },
        get year()          { return this.time % this.total.year },
        get month()         { return this.time % this.total.month },
        get day()           { return this.time % this.total.day },
        get hour()          { return this.time % this.total.hour },
        get minute()        { return this.time % this.total.minute },
        get second()        { return now().getMilliseconds() },
        total: {
            second:         1000,
            minute:         60000,
            hour:           3600000,
            day:            86400000,
            get month()     { return this.day * time.daysInMonth[time.month] }, // Needs fix
            get year()      { return this.day * time.daysInYear },              // Needs fix
        }
    };