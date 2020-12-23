import React from 'react';
import './main.less';
import './fonts/ROG/stylesheet.less';
import './../enter/fonts/Xolonium/stylesheet.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import ReactHtmlParser from 'react-html-parser';
import Buy from './buy';

export default class lightbox extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.data = this.props.data['tips-' + this.props.index];

		this.state = { buy: false };

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
					let img_url = typeof root.data.content.img == 'string' ? root.data.content.img : root.data.content.img[0].img;

					this.c = $(root.refs.img);
					this.c.css({
						background: `rgba(0, 0, 0, 0) url(${img_url}) no-repeat scroll center center / cover`,
					});

					if (typeof root.data.content.img != 'string') {
						this.classname = `img_${new Date().getTime()}`;
						this.c.attr('id', this.classname);
						this.c.css('cursor', 'pointer');

						TouchEvent.add('#' + this.classname, () => {
							if (root.data.content.img[0].url.indexOf('youtu') >= 0) root.props.add_youtube(root.data.content.img[0].url);
							else if (root.data.content.img[0].url.split('#').length > 1) window.location.href = root.data.content.img[0].url;
							else window.open(root.data.content.img[0].url);

							let layer = root.data.content.img[0].dataLayer;
							if (layer) {
								try {
									layer = eval(`[${layer}]`)[0] || false;
								} catch (e) {}
								window.dataLayer = window.dataLayer || [];
								window.dataLayer.push(layer);
							}
						});
					}
				},
			},
			window: {
				s: 1,
				o: 0,
				top: 0,
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
						{ o: 0, top: 0 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
							},
							easing: 'easeOutQuart',
						}
					);
				},
				upper() {
					if (window.innerWidth <= 731) return;
					$(this).animate(
						{ top: -175 },
						{
							duration: 300,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.evt();
							},
							easing: 'easeOutQuart',
						}
					);
				},
				lower() {
					if (window.innerWidth <= 731) return;
					$(this).animate(
						{ top: 0 },
						{
							duration: 300,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.evt();
							},
							easing: 'easeOutQuart',
						}
					);
				},
				evt() {
					TouchEvent.add('.lightbox-close', () => {
						TouchEvent.remove('.lightbox-close');
						root.setState({ buy: false });
						root.tr.out();
					});

					TouchEvent.add('.lightbox-see', () => {
						if (root.data['see-more'][0].url.indexOf('#') >= 0) window.location.href = root.data['see-more'][0].url;
						else window.open(root.data['see-more'][0].url);

						let layer = root.data['see-more'][0].dataLayer;
						if (layer) {
							try {
								layer = eval(`[${layer}]`)[0] || false;
							} catch (e) {}
							window.dataLayer = window.dataLayer || [];
							window.dataLayer.push(layer);
						}
					});

					TouchEvent.add('.lightbox-buy', () => {
						root.setState({ buy: true });
						this.upper();
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

					let sh = 723;
					if (window.innerHeight - 125 < sh) {
						let ss = (window.innerHeight - 125) / sh;
						s = Math.min(s, ss);
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
								root.props.distory('lightbox');
							},
							easing: 'easeOutQuart',
						}
					);
				},
				evt() {
					TouchEvent.add('.lightbox-bg', () => {
						TouchEvent.remove('.lightbox-bg');
						root.setState({ buy: false });
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
		TouchEvent.remove('.lightbox-see');
	}

	componentDidMount() {
		this.tr.init().in();
	}

	append_list() {
		if (this.data.content.list) {
			return this.data.content.list.map((i, index) => <li key={index}>{ReactHtmlParser(i)}</li>);
		}
	}

	distory() {
		this.setState({ buy: false });
	}

	append_desktop_buy() {
		if (this.state.buy && this.data['buy-now']) {
			if (window.innerWidth > 731) return <Buy low={this.lower.bind(this)} distory={this.distory.bind(this)} data={this.data['buy-now']} pxy={$('.lightbox-buy').offset()} />;
		}
	}

	lower() {
		this.tr.window.lower();
	}

	append_mobile_buy() {
		if (this.state.buy && this.data['buy-now']) {
			if (window.innerWidth <= 731) return <Buy low={this.lower.bind(this)} distory={this.distory.bind(this)} data={this.data['buy-now']} pxy={$('.lightbox-buy').offset()} />;
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
									<div ref='title'>{ReactHtmlParser(this.data.content.title)}</div>
								</div>
								<div className='sub'>
									<span>{ReactHtmlParser(this.data.content.subTitle)}</span>
								</div>
								<div className='list'>
									<ul>{this.append_list()}</ul>
								</div>
								<div className='buttons'>
									<div className='lightbox-see'>
										{this.data['see-more'][0].name || 'See More'}
										<div></div>
									</div>
									<div className='lightbox-buy'>
										Buy Now
										<div></div>
									</div>
								</div>
							</div>
						</div>
						{this.append_desktop_buy()}
					</div>
				</div>
				{this.append_mobile_buy()}
			</div>
		);
	}
}
