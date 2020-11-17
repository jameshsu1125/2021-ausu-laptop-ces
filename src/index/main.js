import React from 'react';
import './main.less';

export default class index extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props.data);
	}

	render() {
		return <div className='index'></div>;
	}
}
