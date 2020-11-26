import React from 'react';
import './main.less';

import Link from './link';

export default class main extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props.data);
	}

	componentDidMount() {
		//script
	}

	append() {
		return this.props.data.map((e, i) => {
			return <Link key={i} data={e} index={i} show_cursor={this.props.show_cursor} hide_cursor={this.props.hide_cursor} />;
		});
	}

	render() {
		return <div className='links'>{this.append()}</div>;
	}
}
