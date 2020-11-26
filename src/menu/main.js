import React from 'react';
import './main.less';
import './../enter/fonts/Xolonium/stylesheet.css';

import $ from 'jquery';
require('jquery-easing');

export default class menu extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			o: 0,
			is: true,
			time: 200,
			init() {
				this.c = $(root.refs.ctx);
				this.btn = $(root.refs.close);
				this.ham = $(root.refs.ham);
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
				this.ham.css('opacity', 0);
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
				this.ham.css('opacity', 1);
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
				this.ham.css('opacity', 1);
			},
		};
	}

	componentDidMount() {
		this.tr.init();

		TouchEvent.add('.ham', () => {
			this.tr.switch();
		});

		TouchEvent.add('.menu-close-container', () => {
			this.tr.switch();
			console.log('a');
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
					<div ref='bg'></div>
					<div></div>
					<div>{this.props.data[i].name}</div>
					<div className={`menu_${i}`}></div>
				</div>
			);
			TouchEvent.add(`.menu_${i}`, () => {
				if (this.props.data[i].url.split('#').length > 1) window.location.href = this.props.data[i].url;
				else window.open(this.props.data[i].url);
			});
		}
		return op;
	}

	render() {
		return (
			<div className='menu'>
				<div ref='ctx' className='context'>
					{this.append()}
					<div className='menu-close'>
						<div class='menu-close-container'>
							<div class='leftright'></div>
							<div class='rightleft'></div>
							<label class='close'>close</label>
						</div>
					</div>
				</div>
				<div ref='ham' className='ham'></div>
			</div>
		);
	}
}
