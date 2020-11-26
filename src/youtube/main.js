import React from 'react';
import './main.less';

export default class youtube extends React.Component {
	constructor(props) {
		super(props);

		this.url;
		let u = this.get('v', this.props.data);
		if (u) this.url = u;
		else {
			let v = this.props.data.split(' ').join('').split('/');
			this.url = v[v.length - 1];
		}
	}

	get(t, u) {
		var hash = u.split('?');
		if (hash.length < 2) {
			return false;
		} else {
			var p = hash[1].split('&');
			for (var i in p) {
				var key = p[i].split('=')[0];
				if (t == key) {
					return p[i].split('=')[1];
				}
			}
			return false;
		}
	}

	componentDidMount() {
		TouchEvent.add('.youtube_background', () => {
			this.close();
		});
		TouchEvent.add('.youtube_close', () => {
			this.close();
		});
	}

	close() {
		this.props.distory('youtube');
	}

	componentWillUnmount() {
		TouchEvent.remove('.youtube_background');
		TouchEvent.remove('.youtube_close');
	}

	render() {
		return (
			<div className='youtube'>
				<div className='youtube_background'></div>
				<div className='youtube_close'>
					<div></div>
				</div>
				<div className='youtube_content'>
					<div className='youtube_container'>
						<iframe
							src={`https://www.youtube.com/embed/${this.url}`}
							frameBorder='0'
							autoPlay
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen></iframe>
					</div>
				</div>
			</div>
		);
	}
}
