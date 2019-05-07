import React from 'react';
import ReactDOM from 'react-dom';
class Counter extends React.Component{
	constructor(props) {
		super(props);
		this.state = {number: 0}
	}

	add = ()=> {
		this.setState({number: this.state.number + 1});
		console.log(this.state.number)
		this.setState({number: this.state.number + 1});
		console.log(this.state.number)
		setTimeout(() => {
			this.setState({number: this.state.number + 1});
			console.log(this.state.number)
			this.setState({number: this.state.number + 1});
			console.log(this.state.number)
		})
	}
	render() {
	return (
		<button onClick={this.add}>{this.props.name} {this.state.number}</button>
	);
	}
}
ReactDOM.render(<Counter name="点一点"/>, document.getElementById('root'));