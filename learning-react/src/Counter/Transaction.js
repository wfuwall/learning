// 一个所谓的事务transaction 就是将需要执行的method使用wrapper封装起来，再通过Transaction提供的perform方法执行, wrappers包装器是在创建阶段注入进去的
function setState() {
	console.log('setState');
}
class Transaction {
	constructor(wrappers) {
		this.wrappers = wrappers; // [{initialize, close}]
	}
	perform(anyMethod) {
		this.wrappers.forEach(wrapper => wrapper.initialize());
		anyMethod();
		this.wrappers.forEach(wrapper => wrapper.close());
	}
}

let transaction = new Transaction([
	{
		initialize: function() {
			console.log('initialize1');
		},
		close: function() {
			console.log('close1');
		}
	},
	{
		initialize: function() {
			console.log('initialize2');
		},
		close: function() {
			console.log('close2');
		}
	}
])

transaction.perform(setState);