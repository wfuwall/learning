import React from 'react';
import ReactDOM from 'react-dom';
// react新版生命周期
class LifeCycle extends React.Component{
	static defaultProps = {
		name: '计数器'
	}
	constructor(props) {
		super(props);
		this.state = {number: 0};
	}
	add = () => {
		this.setState({number: this.state.number + 1});
	}
	render() {
		return (
			<div style={{border: '5px solid red', padding: '5px'}}>
				<p>{this.props.name}{this.state.number}</p>
				<button onClick={this.add}>+</button>
				<SubCounter number={this.state.number}/>
			</div>
		)
	}
}
class SubCounter extends React.Component{
	constructor(props) {
		super(props);
		this.state = {number: 0};
	}
	// 根据新的属性对象派生状态对象    新的属性对象   旧的状态对象
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.number%2 === 0) {
			return {number: prevState.number + nextProps.number*2};
		} else {
			return {number: prevState.number + nextProps.number*3};
		}
	}
	render() {
		return (
			<div style={{border: '5px solid green'}}>
				<p>{this.state.number}</p>
			</div>
		)
	}
}
ReactDOM.render(<LifeCycle />, document.getElementById('root'));