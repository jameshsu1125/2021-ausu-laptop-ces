import React from 'react';
import Background from './../background/main';
import Tips from './../tips/main';
import Links from './../links/main';
import Cursor from './cursor';
import { UserAgent } from 'lesca';
import { Client } from './../config';

import $ from 'jquery';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		this.state = { background: this.props.data.background, cursor: UserAgent.get() == 'desktop' };
	}

	componentDidMount() {
		this.resize = () => {
			let imgw = Client.desktop.widht,
				imgh = Client.desktop.height,
				vh = window.innerHeight - 120,
				rh = vh / imgh,
				vw = imgw * rh;
			$(this.refs.main).css('padding-right', vw + 'px');
		};
		this.resize();
		window.addEventListener('resize', this.resize);
	}

	get_width_fit() {
		let main_w = $(this.refs.main).width() || parseInt($(this.refs.main).css('padding-right')),
			main_r = main_w / $(this.refs.main).height(),
			window_r = window.innerWidth / window.innerHeight;
		return main_r > window_r;
	}

	get_height_fit() {
		let t = $(this.refs.main),
			h = t.height() || parseInt($(this.refs.main).css('padding-bottom'));
		return h - 50 < window.innerHeight;
	}

	append_background() {
		if (this.state.background) return <Background ref='background' data={this.props.data.background} />;
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

	append_links() {
		if (this.props.data.links) return <Links data={this.props.data.links} show_cursor={this.show_cursor.bind(this)} hide_cursor={this.hide_cursor.bind(this)} />;
	}

	render() {
		return (
			<div ref='main' className='content'>
				{this.append_background()}
				{this.append_tips()}
				{this.append_links()}
				{this.append_cursor()}
			</div>
		);
	}
}
