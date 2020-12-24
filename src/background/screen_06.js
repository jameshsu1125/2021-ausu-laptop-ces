import React from 'react';
import './screen_06.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class screen_06 extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.c = $(root.refs.c);
				this.i = $(root.refs.i);
			},
			in() {
				this.c.css('display', 'none');
				this.i.addClass('play');
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
			<div ref='main' className='screen_06'>
				<div ref='c'></div>
				<div ref='i'></div>
			</div>
		);
	}
}
