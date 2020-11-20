import React from 'react';
import './scrolling.less';
import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class scrolling extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			o: 0,
			px: -100,
			s: 1.2,
			init() {
				this.c = $(root.refs.ico);
				this.tran();
			},
			in() {
				$(this)
					.animate(
						{ o: 1, s: 1 },
						{
							duration: 300,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					)
					.animate(
						{ px: 100 },
						{
							duration: 1000,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeInOutQuart',
						}
					)
					.animate(
						{ o: 0 },
						{
							duration: 300,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								root.props.distory('scrolling');
							},
							easing: 'easeInOutQuart',
						}
					);
			},
			tran() {
				this.c.css({
					transform: `scale(${this.s})`,
					'-webkit-transform': `scale(${this.s})`,
					'-moz-transform': `scale(${this.s})`,
					'-o-transform': `scale(${this.s})`,
					'-ms-transform': `scale(${this.s})`,
					opacity: this.o,
					left: this.px + 'px',
				});
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			waitForAll: true,
		});
	}

	render() {
		return (
			<div ref='main' className='scrolling'>
				<div ref='ico' className='ico'></div>
			</div>
		);
	}
}
