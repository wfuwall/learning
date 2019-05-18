# vue-summary
Summary of the vue learning process

### vue 数据更新的特点
- 数据变化后更新视图的操作是异步执行的
- vue2.0 数据更新是通过 Object.defienProperty 数据劫持更行的，但是这个方法不支持数组，所以vue内部把数组的push等方法重写了，但是数组依然不能通过长度修改，也不能通过数组的索引进行更改
- 对象新增加的属性，vue是监控不到的，需要使用vm.$set( target, key, value )方法

### vue 实例上的方法
- vm.$el  Vue 实例使用的根 DOM 元素
- vm.$options 当前 Vue 实例的初始化选项
- vm.$nextTick([callback]) 将 回调延迟到下次 DOM 更新循环之后执行
- vm.$watch() 观察 Vue 实例变化做某些操作

### vue 指令
- v-once 只渲染元素和组件一次
- v-show 控制的是样式 不支持template
- v-if 控制的是dom元素
- v-for vue2.5以上要求必须在循环时使用key属性，但是key属性不能放在template标签上。 key可以用来区分元素，尽量不要使用index作为key，可能会在数据变化时产生问题，导致性能消耗更大。
- v-model 是@input + :value 的一个语法糖
- v-bind 可以简写成 :
- v-on 可以简写成 @
- v-slot 可以简写成 #
- 自定义指令

### vue修饰符
- .number 转化为数字类型
- .trim  去掉前空格
- 键盘修饰符 .ctrl .esc .enter 
- 鼠标修饰符
- Vue.config.keyCodes = {} 配置一个键盘code别名

### computed watch和methods
- computed有缓存，methods没有
- computed不支持异步， watch可以有异步逻辑

### vue生命周期
- beforeCreate 初始化自己的生命周期，并绑定自己的事件。data数据还没有绑定上
- created 可以获取数据和调用方法
- beforeMount 第一次调用渲染函数之前
- mounted  渲染后，可以获取真实的DOM，因为页面已经渲染完了
- beforeUpdate 更新前
- Updated  更新后， 在这个函数中一般不要操作数据，可能会导致死循环
- beforeDestroy 销毁前 主要做一些解绑操作
- destroyed 销毁后

### 组件化
- 组件的定义方式有两种：全局组件和局部组件
- 组件化的优点：方便协作、维护、复用

### vue组件间的通信
- props和$emit
- $attrs和$listeners 
  - 当组件没有声明任何的props时, $attrs包含了所有传递的属性（class和style除外）
  ```
  <my-button :content="content" :color="color" :class="{'a': true}"></my-button>
  ```
  - $listeners 可以获取 (不含 .native 修饰器的) v-on绑定的事件监听器
  ```
  <my-button @click="clickFn" @mouseup="mouseupFn"></my-button>
  ```
- $parent和$children
  - $parent 获取当前组件的父级实例
  - $children 获取当前组件的直接子组件
- provide和inject 可以解决跨组件传递 （只有在写一些底层库的时候才使用，其他情况下尽量不要使用）  
- $ref  
  - 不能给多个元素设置相同的ref， 只识别一个
  - 如果遇到循环，就是多个元素， 数组的形式
  - 如果给组件增加ref，就可以获取组件的实例，调用组件上的方法 （一些常见的库，就是通过这种方式，暴露一些方法）
- vuex
- eventBus
> 如果想在父级中 绑定原生事件给组件 需要加.native 不加就认为是一个普通属性
