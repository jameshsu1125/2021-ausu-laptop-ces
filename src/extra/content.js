import React from 'react';
import Buy from './buy';
import ReactHtmlParser from 'react-html-parser';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		this.state = { buy: false };
	}

	componentDidMount() {
		this.refs.img.style.background = `rgba(0, 0, 0, 0) url('${this.props.data.content.img}') no-repeat scroll center center / cover`;
		TouchEvent.add('.extra-see', () => {
			window.open(this.props.data['see-more'][0].url);
		});

		TouchEvent.add('.extra-buy_' + this.props.index, () => {
			if (window.innerWidth > 731) this.setState({ buy: true });
			else this.props.add_buy(this.props.index);
		});
	}

	append_list() {
		return this.props.data.content.list.map((i, index) => <li key={index}>{ReactHtmlParser(i)}</li>);
	}

	distory() {
		this.setState({ buy: false });
	}

	append_buy() {
		if (this.state.buy && this.props.data['buy-now'].length > 0)
			return <Buy index={this.props.index} isLast={this.props.index == this.props.data['buy-now'].length} distory={this.distory.bind(this)} data={this.props.data['buy-now']} />;
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
							<div>{ReactHtmlParser(this.props.data.content.title)}</div>
						</div>
						<div className='sub'>
							<span>{ReactHtmlParser(this.props.data.content.subTitle)}</span>
						</div>
						<div className='list'>
							<ul>{this.append_list()}</ul>
						</div>
						<div className='buttons'>
							<div className='extra-see'>
								{this.props.data['see-more'][0].name || 'See More'}
								<div></div>
							</div>
							<div className={'extra-buy_' + this.props.index}>
								Buy Now
								<div></div>
							</div>
							{this.append_buy()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
