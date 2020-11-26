import React from 'react';

export default class link extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//script
		this.className = `link_${this.props.index}`;
	}

	componentDidMount() {
		TouchEvent.add('.' + this.className, (e) => {
			window.open(this.props.data.url);
		});
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
