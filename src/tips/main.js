import React from 'react';
import './main.less';
import Tip from './tip';

export default class tips extends React.Component {
	constructor(props) {
		super(props);
	}

	append_tip() {
		let op = [];
		for (let i in this.props.data) {
			op.push(<Tip key={i} name={i} call_lightbox={this.props.call_lightbox} show_cursor={this.props.show_cursor} hide_cursor={this.props.hide_cursor} />);
		}
		return op;
	}

	in() {
		this.refs.main.style.opacity = 1;
	}

	render() {
		return (
			<div ref='main' className='tips'>
				{this.append_tip()}
			</div>
		);
	}
}
