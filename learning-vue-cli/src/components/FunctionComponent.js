// 封装一个函数式组件
export default {
  functional: true, // 函数式组件，只有render方法，不能写template
  render (h, context) {
    // context 就是当前组件的上下文
    console.dir(context)
    let t = 'h' + context.props.type
    return <t>{context.slots().default}</t>
  }
}
