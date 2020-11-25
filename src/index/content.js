import React from 'react';
import Background from './../background/main';
import Tips from './../tips/main';
import Cursor from './cursor';
import { UserAgent } from 'lesca';

import $ from 'jquery';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		this.state = { background: this.props.data.background, cursor: UserAgent.get() == 'desktop' };
	}

	get_width_fit() {
		let w = parseInt($(this.refs.main).css('padding-right'));
		return w != 0;
	}

	get_height_fit() {
		let t = $(this.refs.main),
			h = t.height() || parseInt($(this.refs.main).css('padding-bottom'));
		return h - 50 < window.innerHeight;
	}

	append_background() {
		if (this.state.background) return <Background data={this.props.data.background} />;
	}

	append_tips() {
		if (this.props.data.tips) return <Tips call_lightbox={this.props.call_lightbox} data={this.props.data.tips} show_cursor={this.show_cursor.bind(this)} hide_cursor={this.hide_cursor.bind(this)} />;
	}

	show_cursor() {
		if (this.refs.cursor) this.refs.cursor.on();
	}

	hide_cursor() {
		if (this.refs.cursor) this.refs.cursor.off();
	}

	append_cursor() {
		if (this.state.cursor) return <Cursor ref='cursor' />;
	}

	render() {
		return (
			<div ref='main' className='content'>
				{this.append_background()}
				{this.append_tips()}
				{this.append_cursor()}
			</div>
		);
	}
}
