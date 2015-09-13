// grouping input .tell
$('.tel-group').groupinputs();

var tel_3 = $('.tel-group.t3')[0];
var tel_3_val_length = 0;

tel_3.oninput = function(event) {

    if ( tel_3.value.length < tel_3_val_length ) {
        tel_3_val_length = tel_3.value.length;
        return;
    }

    switch(tel_3.value.length) {
        case 4:
            tel_3.value = tel_3.value.substr(0,3) + '-' + tel_3.value.substr(3,1);
            break;
        case 7:
            tel_3.value = tel_3.value.substr(0,6) + '-' + tel_3.value.substr(6,1);
            break;
    }

    tel_3_val_length = tel_3.value.length;
}


// counter time
function openingDateCounter(endYear, endMonth, endDate, endHour, endMin, endSec) {
    var openingDate = new Date();
    openingDate.setFullYear(endYear);
    openingDate.setMonth(endMonth - 1);
    openingDate.setDate(endDate);
    openingDate.setHours(endHour);
    openingDate.setMinutes(endMin);
    openingDate.setSeconds(endSec);

    var elemDays = document.getElementById('day');
    var elemHours = document.getElementById('hours');
    var elemMin = document.getElementById('minutes');
    var elemSec = document.getElementById('second');

    function counting() {
        var nowDate = new Date();
        var diff, diffDays, diffHours, diffMin, diffSec;

        diff = (openingDate - nowDate)/1000;
        if (diff < 0) {
            clearInterval(timerId);
            return;
        }

        diffDays = Math.floor(diff/86400);
        diffHours = Math.floor( (diff - diffDays*86400)/3600 );
        diffMin = Math.floor( (diff- diffDays*86400 - diffHours*3600)/60 );
        diffSec = Math.floor(diff - diffDays*86400 - diffHours*3600 - diffMin*60);

        elemDays.innerHTML = diffDays;
        elemHours.innerHTML = diffHours;
        elemMin.innerHTML = diffMin;
        elemSec.innerHTML = diffSec;
    }

    var timerId = setInterval( function() {counting()}, 500);
    
}

openingDateCounter(2015, 7, 6, 23, 4, 0);


// smooth scrolling
$('a[href^="#sec"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().top}, 1000);
    return false;
});


// slider
function getStyle(elem) {
  return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;  //for IE8
}

function slidersRunner(containerEl, ratio) {
    var childsNumb = containerEl.getElementsByTagName('IMG').length;
    var block = Math.round((containerEl.clientWidth )/childsNumb);
    var shift = parseInt(getStyle(containerEl).left) - block*ratio;
    var minShift = containerEl.parentNode.clientWidth - block*childsNumb;

    if (shift > 0) shift = minShift;
    if (shift < minShift) shift = 0;

    containerEl.style.left = shift + 'px';
}

document.body.onclick = function(event) {
    event = event || window.event;
    var target = event.target;

    if (target.parentNode.className != 'slider' &&
        target.className != 'arrow-left' &&
        target.className != 'arrow-right') {
        return;
    }

    var containerEl = target.parentNode.querySelector('.sl-container');
    switch(target.className) {
        case 'arrow-left':
            slidersRunner(containerEl, -1);
            break;
        case 'arrow-right':
            slidersRunner(containerEl, 1);
            break;
    }

    return false;
}