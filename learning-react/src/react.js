class Component {
	static isReactComponent = true;
	constructor(props) {
		this.props = props;
	}
}
function ReactElement(type, props) {
	let element = {type, props};
	return element;
}
function createElement(type, config, children) {
	let propsName;
	let props = {};
	for (propsName in config) { // 把config的属性复制到props中，保证config的属性不会被修改
		props[propsName] = config[propsName];
	}
	let childrenLength = arguments.length -2; // 获取子元素的个数
	if (childrenLength === 1) {
		props.children = children;
	} else if (childrenLength > 1) { // Array.from将类数组转化为数组
		props.children = Array.from(arguments).slice(2);
	}
	return ReactElement(type, props);
}

export default {
	createElement,
	Component
}