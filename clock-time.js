/*
    Crazy Clock
    Time Handler (clock-time.js)
    Handles time-keeping variables.
*/

// Variables declared in the global scope so they can be accessed by other scripts
let currentTime,
    year,
    month,
    dayOfMonth,
    daysInMonth,
    dayOfYear,
    daysInYear,
    hour,
    minute,
    second,
    period,
    msTime,
    msSecondTotal,
    msMinuteTotal,
    msHourTotal,
    msDayTotal,
    msMonthTotal,
    msYearTotal,
    msSecond,
    msMinute,
    msHour,
    msDay,
    msMonth,
    msYear;

// Updates the time every frame
function timeHandler() {
    currentTime = new Date(/*'1970-01-01T00:00:00.000'*/);
    // Formatted time data (for text display)
    year          = currentTime.getFullYear(),
    month         = currentTime.getMonth(),
    dayOfMonth    = currentTime.getDate(),
    daysInMonth   = [31, (year % 4 == 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    daysInYear    = (year % 4 == 0) ? 366 : 365,
    hour          = currentTime.getHours(),
    minute        = currentTime.getMinutes(),
    second        = currentTime.getSeconds(),
    period        = (hour >= 12) ? 'PM' : 'AM',
    // Millisecond time data (for clock)
    msTime        = currentTime.getTime() - (currentTime.getTimezoneOffset() * 60 * 1000),
    msSecondTotal = 1000,
    msMinuteTotal = 60000,
    msHourTotal   = 3600000,
    msDayTotal    = 86400000,
    // This is giving incorrect values at the very beginning of the month
    msMonthTotal  = msDayTotal * daysInMonth[month],
    msYearTotal   = msDayTotal * daysInYear,
    msSecond      = currentTime.getMilliseconds(),
    msMinute      = msTime % msMinuteTotal,
    msHour        = msTime % msHourTotal,
    msDay         = msTime % msDayTotal,
    msMonth       = msTime % msMonthTotal,
    msYear        = msTime % msYearTotal;
    
    requestAnimationFrame(timeHandler);
}
timeHandler();