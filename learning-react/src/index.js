import React from 'react';
import ReactDOM from 'react-dom';
class LifeCycle extends React.Component{
	static defaultProps = {
		name: '计数器'
	}
	constructor(props) {
		super(props);
		this.state = {number: 0};
		console.log('1、constructor')
	}
	componentWillMount() {
		console.log('2、组件将要被挂载');
	}
	componentDidMount() {
		console.log('4、组件已经被挂载')
	}
	shouldComponentUpdate() {
		console.log('询问组件是否要更新')
		return true;
	}
	componentWillUpdate() {
		console.log('5、组件将要被更新')
	}
	componentDidUpdate() {
		console.log('6、组件更新完成')
	}
	add = () => {
		this.setState({number: this.state.number + 1});
	}
	render() {
		console.log('3、render函数执行，也就是挂载')
		return (
			<div style={{border: '5px solid red', padding: '5px'}}>
				<p>{this.state.number}</p>
				<button onClick={this.add}>+</button>
				<SubCounter number={this.state.number}/>
			</div>
		)
	}
}
class SubCounter extends React.Component{
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.number%3 === 0) {
			return true;
		} else {
			return false;
		}
	}
	componentWillReceiveProps() {
		console.log('子组件props属性变化');
	}
	componentWillUnmount() {
		console.log('组件将要被卸载');
	}
	render() {
		console.log('子组件render函数执行');
		return (
			<div style={{border: '5px solid green'}}>
				<p>{this.props.number}</p>
			</div>
		)
	}
}
ReactDOM.render(<LifeCycle />, document.getElementById('root'));