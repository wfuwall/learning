import React from 'react';
import ReactDOM from 'react-dom';
// react新版生命周期
class LifeCycle extends React.Component{
	constructor(props) {
		super(props);
		this.state = {messages: []};
		this.wrapper = React.createRef();
	}
	componentDidMount() {
		setInterval(() => {
			this.setState({messages: [this.state.messages.length, ...this.state.messages]});
		}, 1000);
	}
	// 获取更新前的快照
	getSnapshotBeforeUpdate() {
		return this.wrapper.current.scrollHeight; // 返回更新之前内容的高度
	}
	// 前两个参数是固定的， 第三个参数就是getSnapshotBeforeUpdate的返回值
	componentDidUpdate(prevProps, prevState, prevScrollHeight) {
		this.wrapper.current.scrollTop = this.wrapper.current.scrollTop + (this.wrapper.current.scrollHeight - prevScrollHeight);
	}
	render() {
		let style = {
			width: '200px',
			height: '100px',
			border: '1px solid red',
			overflow: 'auto',
		}
		return (
			<ul style={style} ref={this.wrapper}>
				{
					this.state.messages.map(message => {
						return <li key={message}>{message}</li>
					})
				}
			</ul>
		)
	}
}
ReactDOM.render(<LifeCycle />, document.getElementById('root'));