import React from 'react';
import './main.less';
import Background from './../background/main';

export default class index extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.data;
		console.log(this.state);
	}

	append_background() {
		if (this.state.background) return <Background />;
	}

	append_tips() {
		if (this.state.tips) {
			let op = [];
			for (let i in this.state.tips) {
				op.push(<div key={i}>{i}</div>);
			}
			return op;
		}
	}

	render() {
		return (
			<div className='main'>
				{this.append_background()}
				{this.append_tips()}
			</div>
		);
	}
}
