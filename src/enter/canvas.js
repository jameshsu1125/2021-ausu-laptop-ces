import React from 'react';

export default class canvas extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.c = root.refs.main;
				this.c.width = window.innerWidth;
				this.c.height = window.innerHeight;
				this.ctx = this.c.getContext('2d');
				this.ctx.globalAlpha = 1;

				let img = new Image();
				img.onload = () => {
					this.fill(img);
					this.img = new Image();
					this.img.onload = () => {
						this.play();
					};
					this.img.src = this.c.toDataURL('image/jpeg', 0.5);
				};

				img.src = require('./img/01_kv.jpg');
			},
			play() {
				this.draw();
				// this.frame = setInterval(() => {
				// 	this.clear();
				// 	this.draw();
				// 	this.drawRandom();
				// }, 500);
			},
			clear() {
				this.ctx.clearRect(0, 0, this.c.width, this.c.height);
			},
			draw() {
				this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
			},
			fill(e) {
				let s = Math.max(this.c.width / e.width, this.c.height / e.height),
					x = this.c.width / 2 - (e.width / 2) * s,
					y = this.c.height / 2 - (e.height / 2) * s,
					w = e.width * s,
					h = e.height * s;
				this.ctx.drawImage(e, x, y, w, h);
			},
			drawRandom() {
				let ry = Math.random() * this.img.height;
				let rh = Math.random() * 10;
				this.ctx.drawImage(this.img, 0, ry, this.img.width, this.img.height);
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	componentWillUnmount() {
		//script
	}

	render() {
		return <canvas ref='main'></canvas>;
	}
}
