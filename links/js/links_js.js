var parts = document.querySelector('.page-nav');

parts.onclick = function(event) {
	var target = event.target;
	if (target.tagName !== 'LABEL' || target.classList.contains('active')) return;
	var temp = parts.querySelector('.active');
	if (temp) temp.classList.remove('active');
	target.classList.add('active');
}

var filters = document.querySelectorAll('.filter');

for (i=0; filters.length > i; i++) {

	filters[i].onclick = function(event) {
		var target = event.target;
		if (target.tagName !== 'A') return;
		target.classList.toggle('active');
		filtration(target);
		return false;
	}
}

function filtration(target) {
	if (!target.dataset.filter) return;
	var wrapBlock = target.parentNode;

	while(!wrapBlock.classList.contains('main-bl')) {
		wrapBlock = wrapBlock.parentNode;
	}

	var filteredEl = wrapBlock.querySelectorAll('.links-list a');
	var offcastEl = wrapBlock.querySelectorAll('.links-list a.filtered-el');
	var filterNames = [];
	var temp1 = wrapBlock.querySelectorAll('.filter .active[data-filter]');

	for (var i=0; temp1.length > i; i++) {
		filterNames.push(temp1[i].dataset.filter.toLowerCase());
	}

	for (i=0; offcastEl.length > i; i++) {
		offcastEl[i].classList.remove('filtered-el');
	}

	if (filterNames.length === 0) return;

	var a;
	for (i=0; filteredEl.length > i; i++) {

		filteredEl[i].dataset.filter ? 
			a = filteredEl[i].dataset.filter.toLowerCase().split(' ') : 
			filteredEl[i].classList.add('filtered-el');

		arrCompare(a, filterNames) ?
			true :
			filteredEl[i].classList.add('filtered-el');
	}
	a = undefined;
}

function arrCompare(arr1, arr2) {
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
	for (var i1=0; arr1.length > i1; i1++) {
		for (var i2=0; arr2.length > i2; i2++) {
			if (arr1[i1] === arr2[i2]) return true;
		}
	}
	return false;
}