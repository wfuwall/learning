let batchingStrategy = {
	isBatchingUpdates: false, // 默认是非批量更新
	dirtyComponents: [], // 脏组件 组件的状态和界面上显示的不一样
	batchedUpdates() {
		this.dirtyComponents.forEach(component => component.updateComponent());
	}
}
class Transaction {
	constructor(wrappers) {
		this.wrappers = wrappers;
	}
	perform(anyMethod) {
		this.wrappers.forEach(wrapper => wrapper.initailize());
		anyMethod();
		this.wrappers.forEach(wrapper => wrapper.close());
	}
}
class Updater{
	constructor(component) {
		this.component = component;
		this.pendingStates = [];
	}
	addState(partcialState) {
		this.pendingStates.push(partcialState);
		batchingStrategy.isBatchingUpdates ? batchingStrategy.dirtyComponents.push(this.component) : this.component.updateComponent();
	}
}
class Component{
	constructor(props) {
		this.props = props;
		this.$updater = new Updater(this);
	}

	setState(partcialState) {
		this.$updater.addState(partcialState);
		// this.render(); // 这里直接调用render不行，是因为render虽然生成了一个新的对象，但是只是内存中的改变了，但是页面中的那DOM没有变
	}

	updateComponent() {
		this.$updater.pendingStates.forEach(partcialState => Object.assign(this.state, partcialState));
		this.$updater.pendingStates.length = 0;
		let oldElement = this.domElement;
		let newElement = this.renderElement();
		oldElement.parentNode.replaceChild(newElement, oldElement);
	}

	createDomFromDomString(domString) {
		let div = document.createElement('div');
		div.innerHTML = domString;
		return div.children[0];
	}

	renderElement() {
		let htmlStr = this.render();
		this.domElement = this.createDomFromDomString(htmlStr);
		this.domElement.component = this;
		return this.domElement;
	}

	mount(parentNode) {
		parentNode.appendChild(this.renderElement());
	}
}
let transaction = new Transaction([
	{
		initailize: function() {
			batchingStrategy.isBatchingUpdates = true; // 点击事件之前，开启批量更新模式
		},
		close: function() {
			batchingStrategy.isBatchingUpdates = false;
			batchingStrategy.batchedUpdates(); // 进行批量更新，把所有的脏组件根据自己的状态和属性重新渲染
		}
	}
])
window.trggle = function(event, method) {
	let component = event.target.component;
	transaction.perform(component[method].bind(component));
}
class Counter extends Component{
	constructor(props) {
		super(props);
		this.state = {number: 0}
	}

	add() {
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
	return `<button onClick="trggle(event, 'add')">${this.props.name} ${this.state.number}</button>`;
	}
}