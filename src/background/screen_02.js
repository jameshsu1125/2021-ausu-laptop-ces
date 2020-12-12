import React from 'react';
import './screen_02.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class screen_02 extends React.Component {
	constructor(props) {
		super(props);

		const root = this;

		this.tr = {
			index: 0,
			col_len: 143,
			max: 144,
			init() {
				this.c = $(root.refs.img);
				this.tran();
			},
			in() {
				this.c.css('display', 'block');
				//this.loop();
			},
			loop() {
				this.index = 0;
				$(this).animate(
					{ index: this.max },
					{
						duration: (this.max / 18) * 1000,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							this.in();
						},
						easing: 'linear',
					}
				);
			},
			tran() {
				let index = Math.floor(this.index),
					col = index % this.col_len,
					x = (col / this.col_len) * 100;
				this.c.css({
					'background-position': `0% ${x}%`,
				});
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			each: (e) => {},
			waitForAll: true,
		});
	}

	render() {
		return (
			<div ref='main' className='screen_02'>
				<div></div>
				<div ref='img'></div>
			</div>
		);
	}
}
