import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // 原本是react的内部模块，后被独立出来
// prop-types的用法
class Person  extends React.Component{
	static defaultProps = { // 默认属性
		isMarried: true
	}
	static propTypes = { // 属性校验规则
		name: PropTypes.string.isRequired,
		age: PropTypes.number.isRequired,
		gender: PropTypes.oneOf(['男', '女']),
		isMarried: PropTypes.bool,
		hobby: PropTypes.arrayOf(PropTypes.string),
		position: PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number
		})
	}
	render() {
		return (
			<div>{this.props.name}</div>
		)
	}
}
let props = {
	name: '张三', // 姓名是字符串 必填 
	age: 18, // 年龄是数字  必填  并且不小于 18岁
	gender: '男', // 性别  必填  只能是男/女
	isMarried: true, // 是否已婚  是一个布尔值
	hobby: ['swimming', 'eating'], // 爱好  字符串数组
	position: {x: 100, y: 100} // 拥有x和y属性的对象
}
ReactDOM.render(<Person {...props}/>, document.getElementById('root'));