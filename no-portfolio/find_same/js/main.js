/*
	There could be a XMLHttpRequest to 'https://kde.link/test/' and then parse of data.
	But No 'Access-Control-Allow-Origin' header is present on the requested resource...

	I have tried ¯\_(ツ)_/¯
*/
var IMAGES = [
	'https://kde.link/test/0.png',
	'https://kde.link/test/1.png',
	'https://kde.link/test/2.png',
	'https://kde.link/test/3.png',
	'https://kde.link/test/4.png',
	'https://kde.link/test/5.png',
	'https://kde.link/test/6.png',
	'https://kde.link/test/7.png',
	'https://kde.link/test/8.png',
	'https://kde.link/test/9.png'
];

/*
	Build table
*/
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://kde.link/test/get_field_size.php');
xhr.send();

xhr.onreadystatechange = function(e) {
	if (this.readyState != 4) return;

	if (this.status != 200) {
		alert('Server Error!');
		return;
	}
	
	var tabSize = JSON.parse(this.responseText);
	createTab(tabSize.height, tabSize.width);
}

function createTab(height, width) {
	var rows = height || 4;
	var colls = width || 4;

	var playField = document.getElementById('playField');
	var tbody = document.createElement('TABLE');

	for (var i = 0; i < rows; i++) {
		var tr = document.createElement('TR');
		tbody.appendChild(tr);

		for (var j = 0; j < colls; j++) {
			var td = document.createElement('TD');
			tbody.rows[i].appendChild(td);
		}
	}

	var imgArr = createImgArr(IMAGES, rows*colls);
	shuffleArr(imgArr);
	fillTab(tbody, imgArr);
	playField.appendChild(tbody);
}

function createImgArr(source, num) {
	var imgArr = [];
	var sl = source.length;
	var imgSrc;

	for (var i = 1; i <= num/2; i++) {
		if (sl < i) sl = sl + source.length;
		imgSrc = source[sl - i];

		imgArr.push(imgSrc);
		imgArr.push(imgSrc);
	}

	return imgArr;
}

function shuffleArr(arr) {
	var i = arr.length;
	var j, t;

	while (i) {
		j = Math.floor((i--) * Math.random());
		t = arr[i];
		arr[i] = arr[j];
		arr[j] = t;
	}
}

function fillTab(table, source) {
	var pos = 0;
	for (var i = 0, r = table.rows.length; i < r; i++) {
		for (var j = 0, c = table.rows[0].cells.length; j < c; j++) {

			var img = document.createElement('IMG');
			img.src = source[pos++];
			table.rows[i].cells[j].appendChild(img);
		}
	}
}

/*
	Timer
*/
var clock = document.getElementById('clock');
var timerId;

function startTimer(inputEl) {
	var timer = hours = munutes = seconds = 0;

	var tId = setInterval(function() {
		timer++;
		hours = Math.floor(timer/3600);
		minutes = Math.floor( (timer - hours*3600)/60 );
		seconds = timer - hours*3600 - minutes*60;

		if (hours < 10) hours = '0' + hours;
		if (minutes < 10) minutes = '0' + minutes;
		if (seconds < 10) seconds = '0' + seconds;

		inputEl.innerHTML = hours + ':' + minutes + ':' + seconds;
	}, 1000);

	return tId;
}

function stopTimer(tId) {
	clearTimeout(tId);
}

/*
	Events
*/
var same = 0;
document.getElementById('playField').addEventListener('click', function(e) {
	var target = e.target;
	if (target.tagName != 'TD') return;
	if (target == same) return;
	if (target.classList.contains('hidden')) return;

	target.classList.add('visible');

	if (!same) {
		same = target;
		return;
	} else if (same.querySelector('img').src == target.querySelector('img').src) {
		target.classList.add('hidden');
		same.classList.add('hidden');
	}
	var tempSame = same;
	setTimeout(function() {
		target.classList.remove('visible');
		tempSame.classList.remove('visible');
	}, 500);
	
	same = 0;
});

document.getElementById('playField').addEventListener('click', function() {
	if (!timerId) {
		timerId = startTimer(clock);
		document.getElementById('signBoard').innerHTML = 'Game started!';
	}

	if (this.querySelectorAll('td').length == this.querySelectorAll('.hidden').length) {
		stopTimer(timerId);
		document.getElementById('signBoard').innerHTML = 'You win. Congratulation!';
		this.classList.add('go-out');
	}
});