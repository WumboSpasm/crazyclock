/*
    Crazy Clock
    Meta Handler (clock-meta.js)
    Provides functionality to the text display as well as settings.
*/

// Adds leading zeroes before a value in order to line up numbers of different digits
function prependZero(value, newLength) {
    while (value.toString().length < newLength)
        value = '0' + value;
    return value;
}

// Converts 24-hour notation to 12-hour notation
function altHour(hour) {
    // Switch statements can't performantly handle inequalities :(
    if (hour == 0)
        return 12
    else if (hour > 12)
        return hour - 12
    else
        return hour;
}

// Displays/hides the settings GUI if the settings text is clicked; also handles the infobox
let settings = document.querySelectorAll("#settings > fieldset"),
    settingsToggle = document.querySelector('#settingsToggle'),
    infobox = document.querySelector("#moreInfo"),
    infoToggle = document.querySelector('#infoToggle');
function toggleSettings() {
    for (let i = 0; i < settings.length; i++)
        if (settings[i].style.visibility != 'visible')
            settings[i].style.visibility = 'visible',
            settingsToggle.style.fontWeight = 'bold'
        else {
            settings[i].style.visibility = 'hidden',
            settingsToggle.style.fontWeight = 'normal';
            if (infobox.style.visibility = 'visible')
                infobox.style.visibility = 'hidden',
                infoToggle.style.fontWeight = 'normal';
        }
}
settingsToggle.addEventListener('click', toggleSettings);

// Displays/hides the infobox
function toggleInfo() {
    if (infobox.style.visibility != 'visible')
        infobox.style.visibility = 'visible',
        infoToggle.style.fontWeight = 'bold'
    else
        infobox.style.visibility = 'hidden',
        infoToggle.style.fontWeight = 'normal';
}
infoToggle.addEventListener('click', toggleInfo);

// Changes the background based on selection
let bgColor = document.querySelector('#bgColor'),
    styleText,
    styleBG,
    styleFS,
    styleFilter;
function changeColor() {
    switch (bgColor.selectedIndex) {
        case 1:
            styleText   = '#000000',
            styleBG     = '#b0d0ff',
            styleFS     = '#b0d0ffcc',
            styleFilter = 'initial';
            break;
        case 2:
            styleText   = '#000000',
            styleBG     = '#ffb0d0',
            styleFS     = '#ffb0d0cc',
            styleFilter = 'initial';
            break;
        case 3:
            styleText   = '#000000',
            styleBG     = '#ffffff',
            styleFS     = '#ffffffcc',
            styleFilter = 'initial';
            break;
        case 4:
            styleText   = '#ffffff',
            styleBG     = '#000000',
            styleFS     = '#000000aa',
            styleFilter = 'invert(1)';
            break;
        default:
            styleText   = '#000000',
            styleBG     = '#d0ffb0',
            styleFS     = '#d0ffb0cc',
            styleFilter = 'initial';
            break;
    }
    
    document.body.style.color = styleText,
    document.body.style.backgroundColor = styleBG,
    document.querySelector('#moreInfo').style.backgroundColor = styleFS,
    document.querySelector('#crazyClock').style.filter = styleFilter,
    
    settingsColor = document.querySelectorAll('#settings fieldset');
    for (let i = 0; i < settingsColor.length; i++)
        settingsColor[i].style.backgroundColor = styleFS;
}
changeColor();
bgColor.addEventListener('input', changeColor);

// Gets current checkbox data
let checkboxId = ['#yearHand',
                  '#monthHand',
                  '#dayHand',
                  '#hourHand',
                  '#minuteHand',
                  '#secondHand',
                  '#dateText',
                  '#timeText',
                  '#msSecondText',
                  '#periodText',
                  '#altText',
                  '#debugText'];

// Reads hash data from the URL if it exists on page load
if (window.location.hash) {
    // Converts the hash back to binary, but it cuts off all zeroes at the beginning if they exist
    let hashData = parseInt(window.location.hash.substr(2), 16).toString(2);
    // This loop fixes it
    while (hashData.length < 12)
        hashData = '0' + hashData;
    
    // Loops through the binary string and sets the checkbox states accordingly
    for (let i = 0; i < checkboxId.length; i++)
        if (hashData[i] == 1)
            document.querySelector(checkboxId[i]).checked = true
        else
            document.querySelector(checkboxId[i]).checked = false;
    
    // Grabs background color value and applies it
    bgColor.selectedIndex = window.location.hash[1];
    changeColor();
}

// Generates a hash that stores checkbox data and background color
let saveSettings = document.querySelector('#saveSettings');
function generateHash() {
    let binHash = '';
    // Creates a binary string representing the state of each checkbox
    for (let i in checkboxId)
        binHash += document.querySelector(checkboxId[i]).checked ? 1 : 0;
    
    // Converts the binary to hex and adds it to the current URL as a hash
    window.location.hash = bgColor.selectedIndex + parseInt(binHash, 2).toString(16);
    
    saveSettings.textContent = 'Done!',
    saveSettings.style.fontWeight = 'bold';
    setTimeout(
        function() {
            saveSettings.textContent = 'Save',
            saveSettings.style.fontWeight = 'normal';
        }, 1000
    );
}
saveSettings.addEventListener('click', generateHash);

// Grabs relevant info about the current time and displays it on the page
let timeText = document.querySelector('#currentTime'),
    debug = document.querySelector('#debug');
function textDisplay() {
    // Disables extra time-related toggles if the time is not being displayed
    if (!document.querySelector('#timeText').checked)
        document.querySelector('#msSecondText').disabled = true,
        document.querySelector('#periodText').disabled = true;
    else
        document.querySelector('#msSecondText').disabled = false,
        document.querySelector('#periodText').disabled = false;
    
    // Updates the page with statistics on the current time based on which options are toggled
    // This code is beyond saving but hey, it works
    if (!document.querySelector('#altText').checked)
        timeText.textContent 
        = (document.querySelector('#dateText').checked
            ? year + '-'
            + prependZero(month + 1, 2) + '-'
            + prependZero(dayOfMonth, 2) + ' ' : '')
        + (document.querySelector('#timeText').checked
            ? prependZero(hour, 2) + ':'
            + prependZero(minute, 2) + ':'
            + prependZero(second, 2) : '')
        + ((document.querySelector('#msSecondText').checked 
        && !document.querySelector('#msSecondText').disabled) ? '.'
            + prependZero(msSecond, 3) : '')
        + ((document.querySelector('#periodText').checked
        && !document.querySelector('#periodText').disabled) ? ' '
            + period : '')
    else
        timeText.textContent 
        = (document.querySelector('#dateText').checked
            ? (month + 1) + '/'
            + dayOfMonth + '/'
            + year + ' ' : '')
        + (document.querySelector('#timeText').checked
            ? altHour(hour) + ':'
            + prependZero(minute, 2) + ':'
            + prependZero(second, 2) : '')
        + ((document.querySelector('#msSecondText').checked 
        && !document.querySelector('#msSecondText').disabled) ? '.'
            + prependZero(msSecond, 3) : '')
        + ((document.querySelector('#periodText').checked
        && !document.querySelector('#periodText').disabled) ? ' '
            + period : '');
    
    // Handles the debug display
    if (document.querySelector('#debugText').checked)
        debug.textContent = 'SEC ' + msSecond + '\n'
                          + 'TOT ' + msSecondTotal + '\n'
                          + 'FRC ' + (msSecond / msSecondTotal).toFixed(9) + '\n\n'
                          
                          + 'MIN ' + msMinute + '\n'
                          + 'TOT ' + msMinuteTotal + '\n'
                          + 'FRC ' + (msMinute / msMinuteTotal).toFixed(9) + '\n\n'
                          
                          + 'HOU ' + msHour + '\n'
                          + 'TOT ' + msHourTotal + '\n'
                          + 'FRC ' + (msHour / msHourTotal).toFixed(9) + '\n\n'
                          
                          + 'DAY ' + msDay + '\n'
                          + 'TOT ' + msDayTotal + '\n'
                          + 'FRC ' + (msDay / msDayTotal).toFixed(9) + '\n\n'
                          
                          + 'MON ' + msMonth + '\n'
                          + 'TOT ' + msMonthTotal + '\n'
                          + 'FRC ' + (msMonth / msMonthTotal).toFixed(9) + '\n\n'
                          
                          + 'YEA ' + msYear + '\n'
                          + 'TOT ' + msYearTotal + '\n'
                          + 'FRC ' + (msYear / msYearTotal).toFixed(9) + '\n\n'
                          
                          + 'OFF ' + currentTime.getTimezoneOffset() + '\n\n'
                          
                          + 'ALL ' + msTime;
    else
        debug.textContent = '';
    
    requestAnimationFrame(textDisplay);
}
textDisplay();