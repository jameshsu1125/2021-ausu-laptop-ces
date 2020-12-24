import React from 'react';
import './screen_08.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class screen_08 extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.c = $(root.refs.c);
				this.i = $(root.refs.i);
				this.i2 = $(root.refs.i2);
			},
			in() {
				this.c.css('display', 'none');
				this.i.addClass('play');
			},
			playAudio() {
				this.i.removeClass('play');
				this.i2.addClass('play2');
			},
			stopAudio() {
				this.i.addClass('play');
				this.i2.removeClass('play2');
			},
		};
	}

	playAudio() {
		this.tr.playAudio();
	}

	stopAudio() {
		this.tr.stopAudio();
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
			<div ref='main' className='screen_08'>
				<div ref='c'></div>
				<div ref='i'></div>
				<div ref='i2'></div>
			</div>
		);
	}
}
