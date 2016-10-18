var mainBlock = document.querySelector('.main-block');


function getCoords(elem) {
	var box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}


function mixing(target) {
	var cutPoint = target.nextElementSibling;
	var oldReview = mainBlock.firstElementChild;

	mainBlock.insertBefore(oldReview, cutPoint);
	oldReview.className = 'thumb-bl';

	mainBlock.insertBefore(target, mainBlock.firstElementChild);
	target.className = 'review';
}


function mixingAnim(target) {
	var cutPoint = target.nextElementSibling;
	var oldReview = mainBlock.firstElementChild;
	var fantomImg = oldReview.querySelector('.thumb-img');
	var fantomParent = fantomImg.parentNode;

	var trackCoords = {};
	trackCoords.startPoint = getCoords(fantomImg);
	trackCoords.endPoint = getCoords(target);

// move fantomImg
	document.body.appendChild(fantomImg);

	fantomImg.style.right = fantomImg.style.bottom = 'auto';
	fantomImg.style.top = trackCoords.startPoint.top + 'px';
	fantomImg.style.left = trackCoords.startPoint.left + 'px';

	setTimeout(function(){
		fantomImg.style.top = trackCoords.endPoint.top + 'px';
		fantomImg.style.left = trackCoords.endPoint.left + 'px';
	}, 20);

// clear fantomImg
	setTimeout(function(){
		fantomImg.style.cssText = '';
		fantomParent.appendChild(fantomImg);
	}, 900);

//cut old .review and insert
	mainBlock.insertBefore(oldReview, cutPoint);
	oldReview.className = 'thumb-bl';

//new .review
	mainBlock.insertBefore(target, mainBlock.firstElementChild);
	target.className = 'review marg-shift';

	setTimeout(function(){ target.className = 'review' }, 20);
}


var sUsrAg = navigator.userAgent;
var windWidth;


mainBlock.onclick = function(event) {
	var target = event.target;
	if (target.className != 'thumb-bl') return;

	windWidth = document.documentElement.clientWidth;

	(windWidth < 620 || sUsrAg.indexOf('MSIE 9.0') > -1) ? mixing(target) : mixingAnim(target);
}


/* fix background short img */
if (document.body.scrollHeight > 1200) {
	document.body.style.backgroundAttachment = 'fixed';
}