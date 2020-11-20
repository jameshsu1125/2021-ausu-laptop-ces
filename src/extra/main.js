import React from 'react';
import './main.less';

import Content from './content';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class extra extends React.Component {
	constructor(props) {
		super(props);

		let data = [];
		for (let i in this.props.data) {
			data.push(this.props.data[i]);
		}
		this.state = { content: data };

		const root = this;
		this.tr = {
			init() {
				this.bg.init();
				this.window.init();
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
								//$(root.refs.title).addClass('gradient');
								this.tran();
								this.evt();
							},
							easing: 'easeOutBack',
						}
					);
				},
				out() {
					//$(root.refs.title).removeClass('gradient');
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
					window.TouchEvent.add('.lightbox-close', () => {
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
					$(this)
						.delay(500)
						.animate(
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
					window.TouchEvent.add('.lightbox-bg', () => {
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
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			waitForAll: true,
		});
	}

	append_contents() {
		if (this.state.content) {
			return this.state.content.map((i, index) => <Content data={i} key={index} />);
		}
	}

	render() {
		return (
			<div className='extra'>
				<div ref='bg' className='bg'></div>
				<div className='context'>
					<div ref='window' ref='window' className='window'>
						<div className='nav'>
							C:\Windows\Security\Metadata_Extract.exe
							<div className='lightbox-close'></div>
						</div>
						<div className='body'>{this.append_contents()}</div>
					</div>
				</div>
			</div>
		);
	}
}
