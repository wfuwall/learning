function render(element, parentNode) {
	if (typeof element === 'string' || typeof element === 'number') { // 说明是文本节点或者数字
		parentNode.appendChild(document.createTextNode(element));
		return;
	}
	let {type, props} = element;
	let domElement = document.createElement(type); // 创建元素
	for (let propName in props) { // 循环props，对特殊的属性名进行特殊处理
		if (propName === 'className') {
			domElement.className = propName;
		} else if (propName === 'style') {
			let styleObj = props.style;
			// for (let styleName in styleObj) {
			// 	domElement.style[styleName] = styleObj[styleName];
			// }
			let cssText = Object.keys(styleObj).map(attr => {
				return `${attr.replace(/([A-Z])/g, function() {return '-' + arguments[1].toLowerCase()})}:${styleObj[attr]}`;
			}).join(';');
			console.log(cssText)
			domElement.style.cssText = cssText;
		} else if (propName === 'children') {
			let children = Array.isArray(props.children) ? props.children : [props.children];
			children.forEach(item => render(item, domElement));
		} else {
			domElement.setAttribute(propName, props[propName])
		}
	}  
	parentNode.appendChild(domElement);
}

export default {
	render
}