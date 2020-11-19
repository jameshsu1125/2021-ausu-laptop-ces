import React from 'react';
import './cursor.less';

import $ from 'jquery';

export default class cursor extends React.Component {
	constructor(props) {
		super(props);

		const root = this;

		this.tr = {
			init() {
				this.c = $(root.refs.main);
				this.ico = $(root.refs.ico);
				return this;
			},
			evt() {
				$(document).mousemove((e) => {
					let x = e.clientX,
						y = e.clientY,
						w = this.c.width() * -0.5,
						h = this.c.height() * -0.5;
					this.c.css({
						left: x + w + 'px',
						top: y + h + 'px',
					});
				});
			},
			on() {
				this.ico.addClass('on');
			},
			off() {
				this.ico.removeClass('on');
			},
		};
	}

	componentDidMount() {
		this.tr.init().evt();
	}

	on() {
		this.tr.on();
	}

	off() {
		this.tr.off();
	}

	render() {
		return (
			<div ref='main' className='cursor'>
				<div ref='ico' className='ico'></div>
			</div>
		);
	}
}
