import React from 'react';
import './main.less';
import './fonts/Xolonium/stylesheet.css';

export default class enter extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		setTimeout(() => {
			this.props.distory();
		}, 100);
	}

	render() {
		return (
			<div ref='main' className='enter'>
				<div className='txt'>
					<div className='container'>
						<div className='l'></div>
						<div className='title'>{this.props.data}</div>
						<div className='r'></div>
					</div>
					<div className='container'>
						<div className='b'></div>
					</div>
					<div className='enter_btn'></div>
				</div>
			</div>
		);
	}
}
