import React from 'react';
import './main.less';

import Content from './content';
import Buy from './buy';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { UserAgent } from 'lesca';

export default class extra extends React.Component {
	constructor(props) {
		super(props);

		let data = [];
		for (let i in this.props.data) {
			data.push(this.props.data[i]);
		}

		this.state = { content: data, bar: UserAgent.get() == 'desktop' ? false : true, buy: false };

		const root = this;
		this.tr = {
			init() {
				this.bg.init();
				this.window.init();
				return this;
			},
			in() {
				this.bg.in();
				this.window.in();
			},
			out() {
				this.bg.out();
				this.window.out();
			},
			window: {
				s: 1,
				o: 0,
				top: 500,
				time: 500,
				init() {
					this.c = $(root.refs.window);
					this.close = $(root.refs.close);
					this.reszie();
					$(window).resize(() => this.reszie());
				},
				in() {
					$(this).animate(
						{ o: 1, top: 0 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.evt();
							},
							easing: 'easeOutBack',
						}
					);
				},
				out() {
					$(this).animate(
						{ o: 0, top: 500 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.evt();
							},
							easing: 'easeInBack',
						}
					);
				},
				evt() {
					TouchEvent.add('.extra-close', () => {
						root.tr.out();
					});
				},
				tran() {
					this.c.css({
						transform: `scale(${this.s})`,
						'-webkit-transform': `scale(${this.s})`,
						'-moz-transform': `scale(${this.s})`,
						'-o-transform': `scale(${this.s})`,
						'-ms-transform': `scale(${this.s})`,
						opacity: this.o,
						'margin-top': Math.round(this.top) + 'px',
					});
				},
				reszie() {
					let s,
						w = 1500,
						h = 1200;
					s = window.innerWidth / w;

					if (window.innerWidth <= 731) {
						if (window.innerHeight > 1000) s = 1;
						else s = window.innerHeight / h;
					}

					this.s = s;
					this.tran();
				},
			},
			bg: {
				o: 0,
				time: 500,
				init() {
					this.c = $(root.refs.bg);
					this.tran();
				},
				in() {
					$(this).animate(
						{ o: 1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.evt();
							},
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
								root.props.distory('extra');
							},
							easing: 'easeOutQuart',
						}
					);
				},
				evt() {
					TouchEvent.add('.extra-bg', () => {
						root.tr.out();
					});
				},
				tran() {
					this.c.css({
						opacity: this.o,
					});
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init().in();
		if (UserAgent.get() == 'desktop') {
			TouchEvent.preventDefault = false;
			$(this.refs.body).css({
				'overflow-y': 'scroll',
			});
		}
	}

	componentWillUnmount() {
		TouchEvent.preventDefault = true;
	}

	append_contents() {
		if (this.state.content) {
			return this.state.content.map((i, index) => <Content data={i} index={index} key={index} add_youtube={this.props.add_youtube} add_buy={this.addBuyNow.bind(this)} />);
		}
	}

	addBuyNow(e) {
		this.buy_index = e;
		this.setState({ buy: true });
	}

	append_bar() {
		if (this.state.bar) return <div ref='bar' className='extra-bar'></div>;
	}

	distory() {
		this.setState({ buy: false });
	}

	append_buy() {
		if (this.state.buy && this.buy_index != undefined) return <Buy distory={this.distory.bind(this)} index={0} data={this.state.content[this.buy_index]['buy-now']} />;
	}

	render() {
		return (
			<div className='extra'>
				<div ref='bg' className='extra-bg'></div>
				<div className='context'>
					<div ref='window' ref='window' className='window'>
						<div className='nav'>
							C:\Windows\Security\Product_Backdoor.exe
							<div ref='close' className='extra-close'></div>
						</div>
						<div ref='body' className='extra-body'>
							<div ref='container' className='extra-container'>
								{this.append_contents()}
							</div>
							{this.append_bar()}
						</div>
					</div>
					{this.append_buy()}
				</div>
			</div>
		);
	}
}
