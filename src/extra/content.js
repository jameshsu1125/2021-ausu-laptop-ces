import React from 'react';

export default class content extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.refs.img.style.background = `rgba(0, 0, 0, 0) url('${this.props.data.img}') no-repeat scroll center center / cover`;
	}

	append_list() {
		return this.props.data.list.map((i, index) => <li key={index}>{i}</li>);
	}

	render() {
		return (
			<div className='row'>
				<div className='box'>
					<div ref='img' className='img'></div>
				</div>
				<div className='box'>
					<div className='ctx'>
						<div className='title'>
							<span>{this.props.data.title}</span>
						</div>
						<div className='sub'>
							<span>{this.props.data.subTitle}</span>
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
		);
	}
}
