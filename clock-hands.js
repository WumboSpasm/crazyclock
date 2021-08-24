/*
    Crazy Clock
    Clock Hand-ler (clock-hands.js)
    Operates the hands of the clock using Canvas.
*/

function clockDisplay() {
    let canvas = document.querySelector('#crazyClock'),
        clock = canvas.getContext('2d'),
        timeData = [msYear, msMonth, msDay, msHour, msMinute, msSecond],
        multiplierData = [msYearTotal, msMonthTotal, msDayTotal, msHourTotal, msMinuteTotal, msSecondTotal],
        prevHandMarker = -1;
    
    // Resizes the canvas to the entire viewport without distorting the output
    canvas.width = window.innerWidth,
    canvas.height = window.innerHeight;
    
    // Viewport-dependent variables
    let centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        lineSize = (canvas.width < canvas.height) ? (canvas.width / -12) : (canvas.height / -12);
    
    clock.clearRect(0, 0, canvas.width, canvas.height);
    
    clock.lineWidth = (canvas.width + canvas.height) / 750,
    clock.lineCap = 'round';
    
    // Draws the beginning marker
    clock.beginPath();
    clock.arc(centerX, centerY, (canvas.width + canvas.height) / 1000, 0, Math.PI * 2);
    clock.stroke();
    
    // Rotates a given hand by a certain amount of degrees
    function rotateHand(i) {
        return (Math.PI / 180) * (timeData[i] * (360 / multiplierData[i]));
    }
    
    // Draws hand and at the endpoint of the preceding hand (or the center if one doesn't exist)
    function drawHand(i) {
        // Appends centermost hand to center
        if (prevHandMarker == -1) {
            clock.translate(centerX, centerY);
            clock.rotate(rotateHand(i));
        } else {
            clock.translate(0, lineSize);
            // This is needed or else the hand will strike zero at arbitrary angles
            clock.rotate(rotateHand(i) - rotateHand(prevHandMarker));
        }
    
        clock.beginPath();
        clock.moveTo(0, 0);
        clock.lineTo(0, lineSize);
        
        clock.stroke();
        prevHandMarker = i;
    }
    
    // Loops through each hand and calls the drawHand() function if they're checked
    clock.save();
    for (i = 0; i < 6; i++) {
        if (document.querySelector(checkboxId[i]).checked)
            drawHand(i);
    }
    clock.restore();
    
    requestAnimationFrame(clockDisplay);
}