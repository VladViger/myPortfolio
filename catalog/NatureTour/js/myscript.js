var selectArr = document.forms['srch-holiday'].querySelectorAll('select');
var sUsrAg = navigator.userAgent.indexOf('MSIE 8.0') > -1;

function selectDefaulter() {
    if (sUsrAg) return; // IE8 :/

    for (i=0, j=1; j < selectArr.length; j++) {
        if (selectArr[i].value == 'default') {

            selectArr[j].classList.contains('disabl') ? true : selectArr[j].classList.add('disabl');
            selectArr[j].disabled = true;

        } else {
            selectArr[j].classList.contains('disabl') ? selectArr[j].classList.remove('disabl') : false;
            selectArr[j].disabled = false;
            i += 1;
        }
    }
}

selectDefaulter();

document.forms['srch-holiday'].onchange = function(event) {
    var target = event.target;
    if (target.tagName != 'SELECT') return;
    selectDefaulter();
}