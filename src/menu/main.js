import React from 'react';
import './main.less';
import './../enter/fonts/Xolonium/stylesheet.css';

import $ from 'jquery';
require('jquery-easing');

import TouchEvent from 'lesca/lib/LESCA/Event/TouchEvent';

export default class menu extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			o: 0,
			is: true,
			time: 500,
			init() {
				this.c = $(root.refs.ctx);
				this.btn = $(root.refs.close);
			},
			isRun() {
				return window.innerWidth <= 731;
			},
			switch() {
				if (this.is) this.open();
				else this.close();
				this.is = this.is ? false : true;
			},
			open() {
				this.c.css('display', 'flex');
				$(this).animate(
					{ o: 1 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => this.tran(),
						easing: 'easeOutQuart',
					}
				);
			},
			close() {
				$(this).animate(
					{ o: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							this.c.removeAttr('style');
						},
						easing: 'swing',
					}
				);
			},
			tran() {
				this.c.css({
					opacity: this.o,
				});
			},
			reset() {
				this.is = true;
				this.c.removeAttr('style');
			},
		};
	}

	componentDidMount() {
		this.tr.init();

		TouchEvent.add('.ham', () => {
			this.tr.switch();
		});

		TouchEvent.add('.menu-close', () => {
			console.log('aaa');
			this.tr.switch();
		});

		this.resize();
		$(window).resize(() => this.resize());
	}

	resize() {
		this.tr.reset();
	}

	append() {
		let op = [];
		for (let i in this.props.data) {
			op.push(
				<div className='menu-button' key={i}>
					<div></div>
					<div></div>
					<div>{this.props.data[i].name}</div>
					<div className={i}></div>
				</div>
			);
			TouchEvent.add(`.${i}`, () => {
				window.open(this.props.data[i].url);
			});
		}
		return op;
	}

	render() {
		return (
			<div className='menu'>
				<div ref='ctx' className='context'>
					{this.append()}
					<div ref='close' className='menu-close'>
						<div></div>
					</div>
				</div>
				<div className='ham'></div>
			</div>
		);
	}
}
