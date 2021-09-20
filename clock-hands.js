/*
    Crazy Clock
    Clock Hand-ler (clock-hands.js)
    Operates the hands of the clock using Canvas.
*/

function clockDisplay() {
    let canvas = document.querySelector('#crazyClock'),
        clock = canvas.getContext('2d'),
        prevHandMarker = -1;
    
    // Resizes the canvas to the entire viewport without distorting the output
    if (canvas.width != window.innerWidth)
        canvas.width = window.innerWidth;
    if (canvas.height != window.innerHeight)
        canvas.height = window.innerHeight;
    
    // Viewport-dependent variables
    let centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        lineSize = 0,
        hands = document.querySelectorAll('#settings fieldset:first-child input');
    
    for (let i = 0; i < hands.length; i++)
        if (hands[i].checked) lineSize++;
    
    lineSize = Math.min(canvas.width, canvas.height) / (-lineSize * 2);
    
    clock.clearRect(0, 0, canvas.width, canvas.height);
    
    clock.lineWidth = Math.max(1, Math.min(canvas.width, canvas.height) / 250);
    clock.lineCap = 'round',
    clock.strokeStyle = styleFG;
    
    // Draws the beginning marker
    clock.beginPath();
    clock.arc(centerX, centerY, clock.lineWidth / 1.5, 0, Math.PI * 2);
    clock.stroke();
    
    // Rotates a given hand by a certain amount of degrees
    function rotateHand(i) {
        return (Math.PI / 180) * (ms[Object.keys(ms)[i + 1]] * (360 / ms.total[Object.keys(ms.total)[5 - i]]));
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