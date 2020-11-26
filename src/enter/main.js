import React from 'react';
import './main.less';
import './fonts/Xolonium/stylesheet.css';
import Player from 'lesca-react-video-playsinline';
import { skip_enter } from './../config';
import $ from 'jquery';

export default class enter extends React.Component {
	constructor(props) {
		super(props);
		this.state = { player: false };
	}

	componentDidMount() {
		this.w = $(this.refs.main).width() || parseInt($(this.refs.main).css('padding-right'));
		this.h = window.innerHeight;
		this.setState({ player: true });

		// ? position x
		this.resize();
		$(window).resize(() => this.resize());

		// ? skip video for debug
		if (skip_enter) {
			setTimeout(() => {
				this.props.distory();
			}, 500);
		}
	}

	resize() {
		let x = (window.innerWidth - this.w) * 0.5;
		$(this.refs.main).css('left', x + 'px');
	}

	onend() {
		this.props.distory();
	}

	append_player() {
		if (this.state.player) return <Player ref='player' autoplay={true} onend={this.onend.bind(this)} width={this.w} height={this.h} url={{ mp4: require('./video/20201125_CES_Intro_Video.mp4') }} />;
	}

	render() {
		return (
			<div ref='main' className='enter'>
				{this.append_player()}
			</div>
		);
	}
}
