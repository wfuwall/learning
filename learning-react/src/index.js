import React from './react';
import ReactDOM from './react-dom';

// <h1 id="myTitle" className="title" style={{color: 'red', fontSize: '50px'}}>hello <span>world</span></h1>
let element = React.createElement('h1', {id: 'myTitle', className: 'title', style: {color: 'red', fontSize: '50px'}}, 'hello', React.createElement('span', {}, 'world'));
console.log(element);
ReactDOM.render(element, document.getElementById('root'));
