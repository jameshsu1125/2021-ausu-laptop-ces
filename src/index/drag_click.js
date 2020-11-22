const { UserAgent } = require('lesca');
const $ = require('jquery');
let isPress = false,
	isExtraPrss = false,
	isPageEnd = true,
	isScorllBarClicked = false;

let x, y, mx, my, main, content;
let cx = 0,
	ey = 0;

let dy_pool = 0,
	frame = 0,
	isExtrad = false,
	extraFn = () => {};

let barY;

module.exports = {
	init(c, d) {
		main = $(c);
		content = $(d.refs.main);
		this.isPress = false;
		this.evt();
	},
	resize() {
		cx = 0;
		ey = 0;
		content.css({
			left: '0px',
		});
		$('.extra-container').css({
			'margin-left': '0px',
		});
	},
	down(e) {
		isPress = true;
		x = mx = e.clientX || e.targetTouches[0].clientX;
		y = my = e.clientY || e.targetTouches[0].clientY;
		cx = parseInt(content.css('left'));

		let parent = e.target.parentElement;
		let isScrolling = false;
		while (parent.className != 'main') {
			if (parent.className == 'extra-container') {
				isScrolling = true;
				barY = parseInt($('.extra-bar').css('margin-top'));
				ey = parseInt($('.extra-container').css('margin-top'));
			}
			parent = parent.parentElement;
		}
		isExtraPrss = isScrolling;

		if (e.target.className == 'extra-bar') {
			barY = parseInt($('.extra-bar').css('margin-top'));
			ey = parseInt($('.extra-container').css('margin-top'));
			isScorllBarClicked = true;
		}
	},
	move(e) {
		if (e.cancelable) if (!e.defaultPrevented) e.preventDefault();
		if (!isPress) return;

		mx = e.clientX || e.targetTouches[0].clientX;
		my = e.clientY || e.targetTouches[0].clientY;

		let dx = mx - x,
			dy = my - y;

		let max = 0,
			min;

		if (isScorllBarClicked) {
			let es = $('.extra-bar'),
				eb = $('.extra-body'),
				ec = $('.extra-container');
			let barDy = barY + dy,
				total = eb.height() + parseInt(eb.css('padding-top')) + parseInt(eb.css('padding-bottom')) - es.height() - 10;

			if (barDy < 5) barDy = 5;
			else if (barDy > total) barDy = total;

			console.log(total);

			es.css({ 'margin-top': barDy + 'px' });

			min = Math.abs(eb.height() - ec.height());
			let gap = window.innerWidth > 731 ? 5 : 20;
			let po = Math.abs(barDy / total),
				es_top = 0 - min * po + gap;
			ec.css('top', es_top + 'px');

			return;
		}

		if (isExtraPrss) {
			let cdy = ey + dy;
			let ec = $('.extra-container'),
				eb = $('.extra-body');
			min = eb.height() - ec.height();
			if (cdy > max) cdy = 0;
			else if (cdy < min) cdy = min;

			if (ec.length > 0) {
				ec.css({
					'margin-top': cdy + 'px',
				});
			}
			// scroll-bar
			let es = $('.extra-bar');
			let po = Math.abs(cdy / min);
			let total = eb.height() + parseInt(eb.css('padding-top')) + parseInt(eb.css('padding-bottom')) - es.height() - 10;
			let es_top = 5 + total * po;
			es.css('top', es_top + 'px');
		} else {
			let cdx = cx + dx,
				cw = content.width() || parseInt(content.css('padding-right'));
			min = window.innerWidth - cw;
			if (cdx > max) cdx = 0;
			else if (cdx < min) cdx = min;
			content.css({
				left: cdx + 'px',
			});

			clearTimeout(frame);
			frame = setTimeout(() => {
				isExtrad = false;
			}, 100);
			if (dy < -200) {
				if (isExtrad) return;
				isExtrad = true;
				extraFn();
			}
		}
	},
	up(e) {
		isPress = false;
		isScorllBarClicked = false;
		if (Math.abs(x - mx) < 10 && Math.abs(y - my) < 10) {
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
	},
	addExtra(fn) {
		extraFn = fn;
	},
	evt() {
		TouchEvent.get = this.down;
		if (UserAgent.get() === 'mobile') {
			document.addEventListener('touchmove', (e) => this.move(e), {
				passive: false,
				capture: false,
			});
			document.addEventListener('touchend', (e) => this.up(e));
		} else {
			document.addEventListener('mousemove', (e) => this.move(e));
			document.addEventListener('mouseup', (e) => this.up(e));
		}

		$(window).scroll(function () {
			if ($(window).scrollTop() + $(window).height() == $(document).height()) isPageEnd = true;
			else isPageEnd = false;
		});

		require('mouse-wheel')((dx, dy, dz, e) => {
			if (isPageEnd && dy > 3) {
				dy_pool += dy;

				clearTimeout(frame);
				frame = setTimeout(() => {
					dy_pool = 0;
					isExtrad = false;
				}, 100);

				if (dy_pool > 200) {
					if (isExtrad) return;
					isExtrad = true;
					extraFn();
				}
			}

			let parent = e.target.parentElement,
				max = 0,
				ec = $('.extra-container'),
				eb = $('.extra-body'),
				min = eb.height() - ec.height();

			while (parent.className != 'main') {
				if (parent.className == 'extra-container') {
					let py = parseInt(ec.css('margin-top'));
					py -= dy;
					if (py > max) py = 0;
					else if (py < min) py = min;

					ec.css({
						'margin-top': py + 'px',
					});

					let es = $('.extra-bar');
					let po = Math.abs(py / min);
					let total = eb.height() + parseInt(eb.css('padding-top')) + parseInt(eb.css('padding-bottom')) - es.height() - 10;
					let es_top = 5 + total * po;
					es.css('top', es_top + 'px');

					barY = parseInt($('.extra-bar').css('margin-top'));
					ey = parseInt($('.extra-container').css('margin-top'));
				}
				parent = parent.parentElement;
			}
		});
	},
};
