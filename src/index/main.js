import React from 'react';
import './main.less';
import Content from './content';
import Enter from './../enter/main';
import Lightbox from './../lightbox/main';
import Scrolling from './scrolling';
import Menu from './../menu/main';
import Extra from './../extra/main';
import Events from './events';

import { TouchEvent } from 'lesca';

import $ from 'jquery';

export default class index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scrolling: false,
			enter: this.props.data.enter,
			lightbox: false,
			content: true,
			extra: false,
			menu: this.props.data.menu,
			more: this.props.data.more,
		};
		TouchEvent.init();
	}

	componentDidMount() {
		Events.init(this.refs.main, this.refs.content.refs.main, this.addExtra.bind(this), this.get_extra.bind(this));
		this.resize();
		$(window).resize(() => this.resize());
	}

	get_extra() {
		if (this.refs.extra) return this.refs.extra.refs;
		else return false;
	}

	addExtra() {
		if (!this.state.extra) this.setState({ extra: true });
	}

	resize() {
		if (this.refs.content.get_width_fit()) this.setState({ scrolling: true });
		this.setState({ extra: false });
		Events.resize();
	}

	call_lightbox(index) {
		this.setState({ lightbox: false }, () => {
			this.setState({ lightbox: index });
		});
	}

	append_content() {
		if (this.state.content) {
			return <Content ref='content' data={this.props.data} call_lightbox={this.call_lightbox.bind(this)} />;
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

	append_menu() {
		if (this.state.menu) return <Menu data={this.props.data.menu} />;
	}

	append_extra() {
		if (this.state.extra && this.state.more) return <Extra ref='extra' data={this.props.data.more} distory={this.distory.bind(this)} />;
	}

	render() {
		return (
			<div ref='main' className='main'>
				{this.append_content()}
				{this.append_enter()}
				{this.append_scrolling()}
				{this.append_menu()}
				{this.append_lightbox()}
				{this.append_extra()}
			</div>
		);
	}
}
