import React from 'react';
import './screen_05.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class screen_05 extends React.Component {
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
			finished: () => this.props.ready(),
			each: (e) => {},
			waitForAll: true,
		});
	}

	in() {
		this.tr.in();
	}

	render() {
		return (
			<div ref='main' className='screen_05'>
				<div ref='c'></div>
				<div ref='i'></div>
			</div>
		);
	}
}
