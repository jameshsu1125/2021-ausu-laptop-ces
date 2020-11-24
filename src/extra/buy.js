import React from 'react';
import './buy.less';

import $ from 'jquery';
require('jquery-easing');

export default class buy extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.tr = {
			o: 0,
			time: 500,
			init() {
				this.c = $(root.refs.main);
				if (root.props.isLast) this.c.css('top', '-=310px');
				this.tran();
				this.in();
			},
			in() {
				$(this).animate(
					{ o: 1 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => this.tran(),
						easing: 'easeOutQuart',
					}
				);
			},
			out() {
				$(this).animate(
					{ o: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							root.props.distory();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			tran() {
				this.c.css({
					opacity: this.o,
				});
			},
		};
	}

	componentDidMount() {
		this.tr.init();

		for (let i in this.props.data) {
			TouchEvent.add('.' + this.props.data[i].name + '_' + this.props.index, () => {
				if (this.props.data[i].url.split('#').length > 1) window.location.href = this.props.data[i].url;
				else window.open(this.props.data[i].url);
			});
		}

		TouchEvent.add('.close-container_' + this.props.index, () => {
			this.tr.out();
		});

		this.resize();
		$(window).resize(() => this.resize());
	}

	resize() {
		let tar = $(this.refs.g),
			s;
		if (window.innerWidth <= 731) s = window.innerHeight / 1000;
		else s = 1;
		tar.css({
			transform: `scale(${s})`,
			'-webkit-transform': `scale(${s})`,
			'-moz-transform': `scale(${s})`,
			'-o-transform': `scale(${s})`,
			'-ms-transform': `scale(${s})`,
		});
	}

	componentWillUnmount() {
		for (let i in this.props.data) {
			TouchEvent.remove('.' + this.props.data[i].name + '_' + this.props.index);
		}
		TouchEvent.remove('.close-container_' + this.props.index);
	}

	append() {
		return this.props.data.map((i, index) => (
			<div key={index} className='buy-box'>
				<div className={i.name + '_' + this.props.index}>{i.name}</div>
			</div>
		));
	}

	render() {
		return (
			<div ref='main' className='buy'>
				<div ref='g' className='grid'>
					{this.append()}
				</div>
				<div class={'close-container_' + this.props.index}>
					<div class='leftright'></div>
					<div class='rightleft'></div>
					<label class='close'>close</label>
				</div>
			</div>
		);
	}
}
