import React from 'react';
import './main.less';
import './fonts/Xolonium/stylesheet.less';
import './fonts/TradeGothicLT/stylesheet.less';
import Player from 'lesca-react-video-playsinline';
import { skip_enter, Client, Require } from './../config';
import $ from 'jquery';
import { Loading, UserAgent, Hash } from 'lesca';

export default class enter extends React.Component {
	constructor(props) {
		super(props);
		this.state = { player: false, loading: false };

		this.video_url = UserAgent.get() === 'mobile' ? require('./video/20201224_Intro_Video_Mobile.mp4') : require('./video/20201224_Intro_Video.mp4');
		this.video_url = Require(this.video_url);

		this.video_delay_play_time = parseInt(Hash.get('time')) || 1800;
	}

	componentDidMount() {
		this.resize = () => {
			let imgw = Client[UserAgent.get()].widht,
				imgh = Client[UserAgent.get()].height,
				vh = window.innerHeight - require('./../config').asus_ui_height,
				rh = vh / imgh,
				vw = imgw * rh;
			this.w = parseInt($(this.refs.main).css('padding-right'));
			this.h = window.innerHeight - require('./../config').asus_ui_height;
			let x = (window.innerWidth - this.w) * 0.5;

			$(this.refs.main).css({
				left: x + 'px',
				'padding-right': vw + 'px',
			});
			if (this.refs.player) this.refs.player.setSize(this.w, this.h);
		};

		this.resize();
		this.setState({ player: true }, () => {
			this.resize();
			window.addEventListener('resize', this.resize);
			this.k = setInterval(() => {
				this.resize();
			}, 10);
			setTimeout(() => {
				clearInterval(this.k);
			}, 1000);
		});
		// ? skip video for debug
		if (skip_enter) {
			setTimeout(() => {
				this.props.distory();
			}, 500);
		}
	}

	componentWillUnmount() {
		this.setState({ player: false });
		window.removeEventListener('resize', this.resize);
	}

	onend() {
		this.props.distory();
	}

	ready() {
		this.props.ready();
		setTimeout(() => {
			this.refs.player.goto(0);
			this.refs.player.show();
			this.refs.player.play();
		}, this.video_delay_play_time);
	}

	update(e, t, s) {
		if (s == 2 && !this.state.loading) this.setState({ loading: true });
		else if (s != 2 && this.state.loading) this.setState({ loading: false });
	}

	append_player() {
		if (this.state.player)
			return (
				<Player
					ref='player'
					ready={this.ready.bind(this)}
					loop={false}
					autoplay={false}
					onend={this.onend.bind(this)}
					width={this.w}
					height={this.h}
					url={{ mp4: this.video_url }}
					onupdate={this.update.bind(this)}
					hide={true}
				/>
			);
	}

	append_loading() {
		if (this.state.loading) return <Loading />;
	}

	render() {
		return (
			<div ref='main' className='enter'>
				{this.append_player()}
				{this.append_loading()}
			</div>
		);
	}
}
