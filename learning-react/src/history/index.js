import React from 'react';
import ReactDOM from 'react-dom';

// <h1 id="myTitle" className="title" style={{color: 'red', fontSize: '50px'}}>hello <span>world</span></h1>
function Welcome(props) {
	return React.createElement('h1', {}, 'hello', props.name, props.age)
}
class Welcome1 extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		return React.createElement('h1', {}, 'hello', this.props.name, this.props.age)
	}
}
// let element = React.createElement('h1', {id: 'myTitle', className: 'title', style: {color: 'red', fontSize: '50px'}}, 'hello', React.createElement('span', {}, 'world'));
// console.log(element);
let element = React.createElement(Welcome1, {name: 'world', age: 10});
ReactDOM.render(element, document.getElementById('root'));
