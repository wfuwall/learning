import React from 'react';
import ReactDOM from 'react-dom';
// ref的用法 1、第一种用法 ref=字符串
class Sum extends React.Component{
	add = () => {
		let numA = this.refs.numA.value;
		let numB = this.refs.numB.value;
		let result = parseFloat(numA) + parseFloat(numB);
		this.refs.result.value = result;
	}
	render() {
		return (
			<>
				<input type="number" ref="numA"/>+<input type="number" ref="numB"/>
				<button onClick={this.add}>=</button><input type="number" ref="result"/>
			</>
		)
	}
}
// 2、第二种用法 ref=函数
class Sum1 extends React.Component{
	add = () => {
		let numA = this.numA.value;
		let numB = this.numB.value;
		let result = parseFloat(numA) + parseFloat(numB);
		this.result.value = result;
	}
	render() {
		return (
			<>
				<input type="number" ref={input => this.numA = input}/>+<input type="number" ref={input => this.numB = input}/>
				<button onClick={this.add}>=</button><input type="number" ref={input => this.result = input}/>
			</>
		)
	}
}
// 第三种用法 React.createRef() 函数, 这种方法是最新的，也是今后使用最多的
class Sum2 extends React.Component{
	constructor() {
		super();
		this.numA = React.createRef();
		this.numB = React.createRef();
		this.result = React.createRef();
	}
	add = () => {
		let numA = this.numA.current.value;
		let numB = this.numB.current.value;
		let result = parseFloat(numA) + parseFloat(numB);
		this.result.current.value = result;
	}
	render() {
		return (
			<>
				<input type="number" ref={this.numA}/>+<input type="number" ref={this.numB}/>
				<button onClick={this.add}>=</button><input type="number" ref={this.result}/>
			</>
		)
	}
}
ReactDOM.render(<Sum2/>, document.getElementById('root'));