import React from 'react';
import './main.less';
import './fonts/ROG/stylesheet.css';
import './../enter/fonts/Xolonium/stylesheet.css';

import $ from 'jquery';
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
						'margin-top': this.top + 'px',
					});
				},
				reszie() {
					let s,
						w = 1700,
						h = 1200;
					s = window.innerWidth / w;

					if (window.innerWidth <= 768) {
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

	componentWillUnmount() {
		window.TouchEvent.remove('.lightbox-bg');
		window.TouchEvent.remove('.lightbox-close');
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			waitForAll: true,
		});
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
							<div className='lightbox-close'></div>
						</div>
						<div className='body'>
							<div className='box'>
								<div ref='img' className='img'></div>
							</div>
							<div className='box'>
								<div className='title'>
									<span>{this.data.title}</span>
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
