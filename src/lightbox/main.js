import React from 'react';
import './main.less';
import './fonts/ROG/stylesheet.css';
import './../enter/fonts/Xolonium/stylesheet.css';

import $ from 'jquery';
import TouchEvent from 'lesca/lib/LESCA/Event/TouchEvent';
require('jquery-easing');
require('jquery.waitforimages');

export default class lightbox extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.data = this.props.data['tips-' + this.props.index];

		this.tr = {
			init() {
				this.bg.init();
				this.window.init();
				this.img.init();
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
			img: {
				init() {
					this.c = $(root.refs.img);
					this.c.css({
						background: `rgba(0, 0, 0, 0) url(${root.data.img}) no-repeat scroll center center / cover`,
					});
				},
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
					TouchEvent.add('.lightbox-close', () => {
						TouchEvent.remove('.lightbox-close');
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
						w = 1700,
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
									root.props.distory('lightbox');
								},
								easing: 'easeOutQuart',
							}
						);
				},
				evt() {
					TouchEvent.add('.lightbox-bg', () => {
						TouchEvent.remove('.lightbox-bg');
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

	componentWillUnmount() {
		TouchEvent.remove('.lightbox-bg');
		TouchEvent.remove('.lightbox-close');
	}

	componentDidMount() {
		this.tr.init().in();
	}

	append_list() {
		if (this.data.list) {
			return this.data.list.map((i, index) => <li key={index}>{i}</li>);
		}
	}

	render() {
		return (
			<div ref='main' className='lightbox'>
				<div ref='bg' className='lightbox-bg'></div>
				<div className='context'>
					<div ref='window' className='window'>
						<div className='nav'>
							C:\Windows\Security\Metadata_Extract.exe
							<div ref='close' className='lightbox-close'></div>
						</div>
						<div className='body'>
							<div className='box'>
								<div ref='img' className='img'></div>
							</div>
							<div className='box'>
								<div className='title'>
									<span ref='title'>{this.data.title}</span>
								</div>
								<div className='sub'>
									<span>{this.data.subTitle}</span>
								</div>
								<div className='list'>
									<ul>{this.append_list()}</ul>
								</div>
								<div className='buttons'>
									<div className='lightbox-see'>
										See More
										<div></div>
									</div>
									<div className='lightbox-buy'>
										Buy Now
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
