const { UserAgent } = require('lesca');
const $ = require('jquery');

let press = false,
	click_target = 'none',
	page_end = true,
	barPress = false;

let x, y, mx, my, dx, dy;

let container, background;
let content_x;

let extra_dy_force = 0,
	extra_dy_force_max = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 300 : 800,
	call_extra_fn,
	get_extra_ref,
	extra_reset_timeout,
	extra_content_pushed = false;

let bar_y, container_y;

let isPressExtra = (e) => {
		let parent = e.target.parentElement;
		while (parent.className != 'main') {
			if (parent) {
				if (parent.className == 'extra-container') {
					return true;
				}
				parent = parent.parentElement;
			}
		}
		return false;
	},
	isPressBar = (e) => {
		if (e.target.className == 'extra-bar') return true;
		else return false;
	};

module.exports = {
	init(main, content, fn1, fn2) {
		container = $(main);
		background = $(content);
		call_extra_fn = fn1;
		get_extra_ref = fn2;

		let w = background.width() || parseInt(background.css('padding-right')),
			content_x = (window.innerWidth - w) / 2;

		if (content_x < 0) {
			background.delay(500).animate({ left: content_x + 'px' }, 1000, 'swing', () => this.evt());
		}
		this.down({ target: content, clientX: 0, clientY: 0, targetTouches: [{ clientX: 0, clientY: 0 }] });
		press = false;
	},
	down(e) {
		press = true;

		x = mx = e.clientX || e.targetTouches[0].clientX;
		y = my = e.clientY || e.targetTouches[0].clientY;

		// get target of clicked
		if (isPressExtra(e)) click_target = 'extra';
		else if (isPressBar(e)) click_target = 'bar';
		else click_target = 'none';

		// save background content x
		content_x = parseInt(background.css('left'));

		// save extra data
		const refs = get_extra_ref();
		if (refs) {
			let bar = refs.bar,
				container = refs.container;
			bar_y = parseInt($(bar).css('margin-top'));
			container_y = parseInt($(container).css('margin-top'));
		}
	},
	move(e) {
		if (e.cancelable) if (!e.defaultPrevented) e.preventDefault();
		if (!press) return;

		try {
			mx = e.clientX || e.targetTouches[0].clientX;
			my = e.clientY || e.targetTouches[0].clientY;
		} catch {}

		dx = mx - x;
		dy = my - y;

		switch (click_target) {
			case 'none':
				this.move_background(e);
				if (dy * -1 > 200) {
					extra_content_pushed = true;
					call_extra_fn();
				}
				break;
			case 'extra':
				this.move_extra_by_body(e);
				break;
			case 'bar':
				this.move_extra_by_bar(e);
				break;
		}
	},
	set_container_by_percent(p) {
		const refs = get_extra_ref();
		if (refs) {
			let container = $(refs.container),
				body = $(refs.body);
			let totol = container.outerHeight() - body.outerHeight() + 40;
			container.css('margin-top', 0 - totol * p + 'px');
		}
	},
	set_bar_by_percent(p) {
		const refs = get_extra_ref();
		if (refs) {
			let bar = $(refs.bar),
				body = $(refs.body);
			let totol = body.outerHeight() - bar.outerHeight() - 10;
			bar.css('margin-top', totol * p + 'px');
		}
	},
	move_extra_by_bar(e) {
		if (UserAgent.get() === 'desktop') return;
		const refs = get_extra_ref();
		if (refs) {
			let bar = refs.bar,
				container = refs.container,
				body = refs.body;

			// set bar py
			let y = bar_y + dy * 1.4,
				totol = $(body).outerHeight() - $(bar).height() - 10;
			if (y < 0) y = 0;
			else if (y > totol) y = totol;
			$(bar).css('margin-top', y + 'px');

			// use y set v to percent
			let p = y / totol;
			this.set_container_by_percent(p);
		}
	},
	move_extra_by_body(e) {
		if (UserAgent.get() === 'desktop') return;
		const refs = get_extra_ref();
		if (refs) {
			let bar = refs.bar,
				container = $(refs.container),
				body = $(refs.body);

			// set container y
			let y = container_y + dy,
				totol = container.outerHeight() - body.outerHeight() + 40;

			if (y > 0) y = 0;
			else if (y < totol * -1) y = totol * -1;
			container.css('margin-top', y + 'px');

			//use y set v to bar
			let p = (y / totol) * -1;
			this.set_bar_by_percent(p);
		}
	},
	move_background(e) {
		let px = content_x + dx,
			cw = background.width() || parseInt(background.css('padding-right')),
			max = 0,
			min = window.innerWidth - cw;

		if (px > max) px = 0;
		else if (px < min) px = min;

		if (window.innerWidth > cw) px = (window.innerWidth - cw) * 0.5;

		background.css({
			left: px + 'px',
		});
	},
	resize() {
		this.move_background();
	},
	up(e) {
		press = false;
		this.click_evt(e);
	},
	click_evt(e) {
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
			if ($(window).scrollTop() + $(window).height() == $(document).height()) page_end = true;
			else page_end = false;
		});
		require('mouse-wheel')((dx, dy, dz, e) => this.wheel(dx, dy, dz, e));
	},
	wheel(dx, dy, dz, e) {
		// Extra content event handler

		if (page_end && dy > 0) {
			extra_dy_force += dy;

			// reset force
			clearTimeout(extra_reset_timeout);
			extra_reset_timeout = setTimeout(() => {
				extra_dy_force = 0;
				extra_content_pushed = false;
			}, 30);

			// force max to turn on
			//console.log(extra_dy_force, extra_dy_force_max);
			if (extra_dy_force > extra_dy_force_max) {
				if (extra_content_pushed) return;
				extra_content_pushed = true;
				call_extra_fn();
			}
		}
	},
};
