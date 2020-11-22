const $ = require('jquery');
const { EnterFrame, UserAgent } = require('lesca');
let isPageEnd = true;

function wheel() {
	let dy_pool = 0,
		frame = 0;
	$(window).scroll(function () {
		if ($(window).scrollTop() + $(window).height() == $(document).height()) isPageEnd = true;
		else isPageEnd = false;
	});
	require('mouse-wheel')((dx, dy) => {
		if (isPageEnd && dy > 3) {
			dy_pool += dy;

			clearTimeout(frame);
			frame = setTimeout(() => {
				dy_pool = 0;
			}, 100);

			if (!this.state.extra && dy_pool > 200) this.setState({ extra: true });
		}
	});
}

module.exports = function () {
	let x,
		x2,
		is = false,
		sx,
		tx = ($(document).width() - window.innerWidth) / 2,
		lx = tx;

	let y;

	TouchEvent.get = function (e) {
		x = x2 = e.clientX || e.targetTouches[0].clientX;
		is = true;
		sx = $('body, html').scrollLeft();

		y = e.clientY || e.targetTouches[0].clientY;
	};

	EnterFrame.init(() => {
		tx += (lx - tx) / 4;
		$('html, body').scrollLeft(tx);
	});

	this.move = (e) => {
		if (!is) return;
		let n = e.target.localName;

		let parent = e.target.parentElement;
		let isScrolling = false;

		while (parent.className != 'main') {
			if (parent.className == 'extra-body') isScrolling = true;
			parent = parent.parentElement;
		}

		if (e.cancelable)
			if (!e.defaultPrevented)
				if (n != 'input' && n != 'button' && n != 'select') {
					if (!isScrolling) e.preventDefault();
				}
		let px = e.clientX || e.targetTouches[0].clientX,
			dx = x - px;

		lx = Math.round(sx + dx);
		let max = $(document).width();
		if (lx < 0) lx = 0;
		else if (lx > max) lx = max;
		x2 = px;

		let py = e.clientY || e.targetTouches[0].clientY,
			dy = y - py;
		if (isPageEnd && dy > 100 && !this.state.extra) this.setState({ extra: true });
	};

	this.up = (e) => {
		is = false;
		if (Math.abs(x - x2) < 5) {
			let key = e.target.id + '_id';
			if (TouchEvent.db[key]) {
				TouchEvent.db[key](e);
				return;
			}

			key = e.target.className + '_class';
			if (TouchEvent.db[key]) {
				TouchEvent.db[key](e);
				return;
			}
		}
	};

	if (UserAgent.get() == 'mobile') {
		document.addEventListener('touchmove', this.move, {
			passive: false,
			capture: false,
		});
		document.addEventListener('touchend', this.up);
	} else {
		document.addEventListener('mousemove', this.move);
		document.addEventListener('mouseup', this.up);
	}
	wheel();
};
