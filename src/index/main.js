import React from 'react';
import './main.less';
import Content from './content';
import Enter from './../enter/main';
import Lightbox from './../lightbox/main';
import Scrolling from './scrolling';

import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { UserAgent, TouchEvent } from 'lesca';
import $ from 'jquery';

export default class index extends React.Component {
	constructor(props) {
		super(props);
		this.state = { scrolling: false, enter: this.props.data.enter, lightbox: false, content: true, extra: false };
		TouchEvent.init();
	}

	componentDidMount() {
		this.pushExtraContent();
		this.resize();
		$(window).resize(() => this.resize());
	}

	pushExtraContent() {
		let isPageEnd = true;
		$(window).scroll(function () {
			if ($(window).scrollTop() + $(window).height() == $(document).height()) isPageEnd = true;
			else isPageEnd = false;
		});
		require('mouse-wheel')((dx, dy) => {
			if (isPageEnd && dy > 0) {
				if (!this.state.extra) this.setState({ extra: true });
			}
		});
	}

	resize() {
		if (this.refs.content.get_width_fit()) this.setState({ scrolling: true });
	}

	call_lightbox(index) {
		this.setState({ lightbox: false }, () => {
			this.setState({ lightbox: index });
		});
	}

	append_content() {
		if (this.state.content) {
			if (UserAgent.Mac.is() || UserAgent.get(false) === 'mobile') return <Content ref='content' data={this.props.data} call_lightbox={this.call_lightbox.bind(this)} />;
			else
				return (
					<Scrollbar>
						<Content ref='content' data={this.props.data} call_lightbox={this.call_lightbox.bind(this)} />
					</Scrollbar>
				);
		}
	}

	distory(key) {
		let p = {};
		p[key] = false;
		this.setState(p);
	}

	enter_end() {
		this.setState({ enter: false });
	}

	append_lightbox() {
		if (this.state.lightbox != false) return <Lightbox data={this.props.data.tips} index={this.state.lightbox} distory={this.distory.bind(this)} />;
	}

	append_enter() {
		if (this.state.enter) return <Enter data={this.props.data.enter} distory={this.enter_end.bind(this)} />;
	}

	append_scrolling() {
		if (this.state.scrolling) return <Scrolling distory={this.distory.bind(this)} />;
	}

	render() {
		return (
			<div className='main'>
				{this.append_content()}
				{this.append_enter()}
				{this.append_lightbox()}
				{this.append_scrolling()}
			</div>
		);
	}
}
