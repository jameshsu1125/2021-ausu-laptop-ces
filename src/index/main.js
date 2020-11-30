import React from 'react';
import './main.less';
import Content from './content';
import Enter from './../enter/main';
import Lightbox from './../lightbox/main';
import Scrolling from './scrolling';
import Menu from './../menu/main';
import Extra from './../extra/main';
import Events from './events';
import Youtube from './../youtube/main';

import { TouchEvent, Landscape } from 'lesca';

import $ from 'jquery';

export default class index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scrolling: false,
			enter: this.props.data.enter,
			lightbox: false,
			content: false,
			extra: false,
			menu: false,
			more: this.props.data.more,
			youtube: false,
		};
		TouchEvent.init();
	}

	componentDidMount() {
		$('.index').css('display', 'block');
	}

	get_extra() {
		if (this.refs.extra) return this.refs.extra.refs;
		else return false;
	}

	addExtra() {
		if (!this.state.extra && !this.state.lightbox) this.setState({ extra: true });
	}

	resize() {
		if (!this.refs.content) return;
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
		if (key == 'lightbox') Events.isFrezz(true);
	}

	enter_end() {
		this.refs.content.refs.background.in();
		this.setState({ enter: false, menu: this.props.data.menu }, () => {
			Events.init(this.refs.main, this.refs.content.refs.main, this.addExtra.bind(this), this.get_extra.bind(this));

			this.resize();
			$(window).resize(() => this.resize());
		});
	}

	enter_ready() {
		this.setState({ content: true });
	}

	append_lightbox() {
		if (this.state.lightbox != false) {
			Events.isFrezz(false);
			return <Lightbox data={this.props.data.tips} index={this.state.lightbox} distory={this.distory.bind(this)} add_youtube={this.add_youtube.bind(this)} />;
		}
	}

	append_enter() {
		if (this.state.enter) return <Enter ready={this.enter_ready.bind(this)} data={this.props.data.enter} distory={this.enter_end.bind(this)} />;
	}

	append_scrolling() {
		if (this.state.scrolling) return <Scrolling distory={this.distory.bind(this)} />;
	}

	append_menu() {
		if (this.state.menu) return <Menu data={this.props.data.menu} />;
	}

	append_extra() {
		if (this.state.extra && this.state.more) return <Extra ref='extra' data={this.props.data.more} distory={this.distory.bind(this)} add_youtube={this.add_youtube.bind(this)} />;
	}

	add_youtube(url) {
		this.setState({ youtube: url });
	}

	append_youtube() {
		if (this.state.youtube) return <Youtube data={this.state.youtube} distory={this.distory.bind(this)} />;
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
				{this.append_youtube()}
				<Landscape dw={731} />
			</div>
		);
	}
}
