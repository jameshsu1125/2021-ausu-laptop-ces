import React from 'react';

import { Howl, Howler } from 'howler';

export default class link extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//script
		this.className = `link_${this.props.index}`;

		if (this.props.data.dataLayer) {
			try {
				this.dataLayer = eval(`[${this.props.data.dataLayer}]`)[0] || false;
			} catch (e) {}
		}

		this.is = false;
	}

	componentDidMount() {
		TouchEvent.add('.' + this.className, (e) => {
			let mp3 = this.props.data.url.indexOf('.mp3') >= 0;
			if (mp3) this.playMp3();
			else if (this.props.data.url.indexOf('#') >= 0) window.location.href = this.props.data.url;
			else window.open(this.props.data.url);

			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push(this.dataLayer);
		});
	}

	playMp3() {
		if (this.is) {
			this.is = false;
			this.sound.stop();
			this.props.stopAudio();
		} else {
			this.is = true;
			if (this.sound) {
				this.sound.play();
				this.props.playAudio();
			} else {
				this.sound = new Howl({
					src: [this.props.data.url],
					autoplay: true,
					loop: true,
					volume: 1,
					onload: () => {
						this.props.playAudio();
					},
				});
			}
		}
	}

	mouseover() {
		this.props.show_cursor();
	}

	mouseout() {
		this.props.hide_cursor();
	}

	render() {
		return <div className={this.className} onMouseOut={this.mouseout.bind(this)} onMouseOver={this.mouseover.bind(this)}></div>;
	}
}
