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
let settings = document.querySelectorAll("#settings fieldset"),
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
    styleFG,
    styleBG;
function changeColor() {
    switch (bgColor.selectedIndex) {
        case 1:
            styleFG = '#000000',
            styleBG = '#b0d0ff';
            break;
        case 2:
            styleFG = '#000000',
            styleBG = '#ffb0d0';
            break;
        case 3:
            styleFG = '#000000',
            styleBG = '#ffffff';
            break;
        case 4:
            styleFG = '#ffffff',
            styleBG = '#000000';
            break;
        default:
            styleFG = '#000000',
            styleBG = '#d0ffb0';
            break;
    }
    
    document.body.style.color = styleFG,
    document.body.style.backgroundColor = styleBG,
    document.querySelector('#moreInfo').style.backgroundColor = styleBG + 'cc';
    
    settingsColor = document.querySelectorAll('fieldset');
    for (let i = 0; i < settingsColor.length; i++) {
        settingsColor[i].style.backgroundColor = styleBG + 'cc';
        settingsColor[i].style.borderColor = styleFG;
    }
    separatorColor = document.querySelectorAll('hr');
    for (let i = 0; i < separatorColor.length; i++)
        separatorColor[i].style.borderTop = '1px solid ' + styleFG;
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
            ? time.year + '-'
            + prependZero(time.month + 1, 2) + '-'
            + prependZero(time.dayOfMonth, 2) + ' ' : '')
        + (document.querySelector('#timeText').checked
            ? prependZero(time.hour, 2) + ':'
            + prependZero(time.minute, 2) + ':'
            + prependZero(time.second, 2) : '')
        + ((document.querySelector('#msSecondText').checked 
        && !document.querySelector('#msSecondText').disabled) ? '.'
            + prependZero(ms.second, 3) : '')
        + ((document.querySelector('#periodText').checked
        && !document.querySelector('#periodText').disabled) ? ' '
            + time.period : '')
    else
        timeText.textContent 
        = (document.querySelector('#dateText').checked
            ? (time.month + 1) + '/'
            + time.dayOfMonth + '/'
            + time.year + ' ' : '')
        + (document.querySelector('#timeText').checked
            ? altHour(time.hour) + ':'
            + prependZero(time.minute, 2) + ':'
            + prependZero(time.second, 2) : '')
        + ((document.querySelector('#msSecondText').checked 
        && !document.querySelector('#msSecondText').disabled) ? '.'
            + prependZero(ms.second, 3) : '')
        + ((document.querySelector('#periodText').checked
        && !document.querySelector('#periodText').disabled) ? ' '
            + time.period : '');
    
    // Handles the debug display
    if (document.querySelector('#debugText').checked)
        debug.textContent = 'SEC ' + ms.second + '\n'
                          + 'TOT ' + ms.total.second + '\n'
                          + 'FRC ' + (ms.second / ms.total.second).toFixed(9) + '\n\n'
                          
                          + 'MIN ' + ms.minute + '\n'
                          + 'TOT ' + ms.total.minute + '\n'
                          + 'FRC ' + (ms.minute / ms.total.minute).toFixed(9) + '\n\n'
                          
                          + 'HOU ' + ms.hour + '\n'
                          + 'TOT ' + ms.total.hour + '\n'
                          + 'FRC ' + (ms.hour / ms.total.hour).toFixed(9) + '\n\n'
                          
                          + 'DAY ' + ms.day + '\n'
                          + 'TOT ' + ms.total.day + '\n'
                          + 'FRC ' + (ms.day / ms.total.day).toFixed(9) + '\n\n'
                          
                          + 'MON ' + ms.month + '\n'
                          + 'TOT ' + ms.total.month + '\n'
                          + 'FRC ' + (ms.month / ms.total.month).toFixed(9) + '\n\n'
                          
                          + 'YEA ' + ms.year + '\n'
                          + 'TOT ' + ms.total.year + '\n'
                          + 'FRC ' + (ms.year / ms.total.year).toFixed(9) + '\n\n'
                          
                          + 'OFF ' + now().getTimezoneOffset() + '\n\n'
                          
                          + 'ALL ' + ms.time;
    else
        debug.textContent = '';
    
    requestAnimationFrame(textDisplay);
}
textDisplay();