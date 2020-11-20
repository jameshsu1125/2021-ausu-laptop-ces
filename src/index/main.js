import React from 'react';
import './main.less';
import Content from './content';
import Enter from './../enter/main';
import Lightbox from './../lightbox/main';
import Scrolling from './scrolling';
import Menu from './../menu/main';
import Extra from './../extra/main';

import { TouchEvent, UserAgent, EnterFrame } from 'lesca';
import $ from 'jquery';

export default class index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scrolling: false,
			enter: this.props.data.enter,
			lightbox: false,
			content: true,
			extra: false,
			menu: this.props.data.menu,
			more: this.props.data.more,
		};
		TouchEvent.init();
		this.isPageEnd = true;
	}

	componentDidMount() {
		this.pushExtraContent();
		this.resize();
		$(window).resize(() => this.resize());
		this.add_drag();
	}

	add_drag() {
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
			if (e.cancelable) if (!e.defaultPrevented) if (n != 'input' && n != 'button' && n != 'select') e.preventDefault();
			let px = e.clientX || e.targetTouches[0].clientX,
				dx = x - px;

			lx = Math.round(sx + dx);
			let max = $(document).width();
			if (lx < 0) lx = 0;
			else if (lx > max) lx = max;
			x2 = px;

			let py = e.clientY || e.targetTouches[0].clientY,
				dy = y - py;
			if (this.isPageEnd && dy > 100 && !this.state.extra) this.setState({ extra: true });
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
	}

	pushExtraContent() {
		let dy_pool = 0,
			frame = 0;
		$(window).scroll(function () {
			if ($(window).scrollTop() + $(window).height() == $(document).height()) this.isPageEnd = true;
			else this.isPageEnd = false;
		});
		require('mouse-wheel')((dx, dy) => {
			if (this.isPageEnd && dy > 3) {
				dy_pool += dy;

				clearTimeout(frame);
				frame = setTimeout(() => {
					dy_pool = 0;
				}, 30);

				if (!this.state.extra && dy_pool > 250) this.setState({ extra: true });
			}
		});
	}

	resize() {
		if (this.refs.content.get_width_fit()) this.setState({ scrolling: true });
	}

	call_lightbox(index) {
		this.setState({ lightbox: false }, () => {
			this.setState({ lightbox: index });
		});
	}

	append_content() {
		if (this.state.content) {
			return <Content ref='content' data={this.props.data} call_lightbox={this.call_lightbox.bind(this)} />;
		}
	}

	distory(key) {
		let p = {};
		p[key] = false;
		this.setState(p);
	}

	enter_end() {
		this.setState({ enter: false });
	}

	append_lightbox() {
		if (this.state.lightbox != false) return <Lightbox data={this.props.data.tips} index={this.state.lightbox} distory={this.distory.bind(this)} />;
	}

	append_enter() {
		if (this.state.enter) return <Enter data={this.props.data.enter} distory={this.enter_end.bind(this)} />;
	}

	append_scrolling() {
		if (this.state.scrolling) return <Scrolling distory={this.distory.bind(this)} />;
	}

	append_menu() {
		if (this.state.menu) return <Menu data={this.props.data.menu} />;
	}

	append_extra() {
		if (this.state.extra && this.state.more) return <Extra data={this.props.data.more} distory={this.distory.bind(this)} />;
	}

	render() {
		return (
			<div className='main'>
				{this.append_content()}
				{this.append_enter()}
				{this.append_scrolling()}
				{this.append_menu()}
				{this.append_lightbox()}
				{this.append_extra()}
			</div>
		);
	}
}
