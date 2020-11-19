import React from 'react';

export default class tip extends React.Component {
	constructor(props) {
		super(props);
		//script
	}

	componentDidMount() {
		this.delay = true;
		window.TouchEvent.add('.' + this.props.name + '_evt', (e) => {
			if (!this.delay) return;
			this.delay = false;

			let index = this.props.name.slice(5);
			this.props.call_lightbox(index);

			setTimeout(() => {
				this.delay = true;
			}, 500);
		});
	}

	mouseover() {
		this.props.show_cursor();
	}

	mouseout() {
		this.props.hide_cursor();
	}

	render() {
		return (
			<div className={this.props.name}>
				<div onMouseOut={this.mouseout.bind(this)} onMouseOver={this.mouseover.bind(this)} className={this.props.name + '_evt'}></div>
				<div></div>
			</div>
		);
	}
}
