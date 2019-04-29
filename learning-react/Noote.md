### react
- jsx 是一种把javascript和HTML混合在一起写的语法糖 JavaScript + XML
- jsx 是用来描述页面上的元素长什么样子的， 将组件的结构、数据甚至样式都聚合在一起定义组件
- JSX中属性不能包含关键字，像class需要写成className,for需要写成htmlFor,并且属性名需要采用驼峰命名法！
- React render的时候只会重新渲染变化的地方，其他不变的地方并不会重新render，因此并不会引起大量的回流和重绘，这就是DOM diff
```
<h1 id="myTitle" className="title">hello<span>world</span></h1>
```
- jsx可以通过babel转义成createElement语法, 与上面的代码等价
```
React.createElement('h1', {id: 'myTitle', className: 'title'}, 'hello', React.createElement('span', {}, 'world'))
```
- React.createElement() 的返回值就是react元素，是一个普通对象（就是我们常说的虚拟DOM，存放在内存中）。
	- 对象属性type是标签名，
	- 属性props的来源有两种，一种书标签上的id，className等属性，一种是children可以使不同字符串或者数组（是由标签有多少子元素决定的）

### react组件
- 组件就是把页面分成若干个独立的部分，单独编写，单独维护
- 组件的特点
	- 一个返回react元素的函数就是一个合法的react组件
	- 组件有且只能有一个react根元素
	- 组件的名称必须以大写字母开头
- 函数组件
	- 收集属性对象 props
	- 把属性对象传递给函数组件获取返回值，也就是一个react元素
- 类组件
	- 收集属性对象 props
	- 把属性对象传给构造函数，并返回一个类的实例
	- 最后调用类的render方法，获取返回值，也就是react元素