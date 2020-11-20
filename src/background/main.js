import React from 'react';
import './main.less';
import Screen_01 from './screen_01';
import Screen_02 from './screen_02';
import Screen_03 from './screen_03';
import Screen_04 from './screen_04';
import Screen_05 from './screen_05';
import Screen_06 from './screen_06';
import Screen_07 from './screen_07';
import Screen_08 from './screen_08';

export default class background extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.data;
	}

	append_screen_01() {
		if (this.state.animate_screen_1) return <Screen_01 />;
	}
	append_screen_02() {
		if (this.state.animate_screen_2) return <Screen_02 />;
	}
	append_screen_03() {
		if (this.state.animate_screen_3) return <Screen_03 />;
	}
	append_screen_04() {
		if (this.state.animate_screen_4) return <Screen_04 />;
	}
	append_screen_05() {
		if (this.state.animate_screen_5) return <Screen_05 />;
	}
	append_screen_06() {
		if (this.state.animate_screen_6) return <Screen_06 />;
	}
	append_screen_07() {
		if (this.state.animate_screen_7) return <Screen_07 />;
	}
	append_screen_08() {
		if (this.state.animate_screen_08) return <Screen_08 />;
	}

	render() {
		return (
			<div ref='main' className='background'>
				{this.append_screen_01()}
				{this.append_screen_02()}
				{this.append_screen_03()}
				{this.append_screen_04()}
				{this.append_screen_05()}
				{this.append_screen_06()}
				{this.append_screen_07()}
				{this.append_screen_08()}
			</div>
		);
	}
}
