<template>
  <div v-click-outsite>
    <input type="text" :value="currentTime">
    <div class="pannel" v-if="isVisible">
      <div class="pannel-nav">
        <span>&lt;</span>
        <span>&lt;&lt;</span>
        <span>xxx年</span>
        <span>xxx月</span>
        <span>&gt;&gt;</span>
        <span>&gt;</span>
      </div>
      <div class="pannel-content">
        <div class="pannel-content-days">
          <div class="pannel-content-days-rows" v-for="row in 6" :key="row">
            <span class="pannel-content-days-rows-cell" v-for="cell in 7">
                {{cycleDays[(row-1) * 7 + (cell -1)].getDate()}}
            </span>
          </div>
        </div>
      </div>
      <div class="pannel-footer">
        今天
      </div>
    </div>
  </div>
</template>
<script>
import * as utilsDate from '../utils/date.js';
export default {
  directives: {
    clickOutsite: {
      bind(el, bindings, vnode) { // 指令第一次绑定到元素时调用
        const handler = (e) => {
          if (el.contains(e.target)) {
            if (!vnode.context.isVisible) { // 加判断，防止事件一直触发
              vnode.context.focus();
            }
          } else {
            if (vnode.context.isVisible) {
              vnode.context.blur();
            }
          }
        }
        el.handler = handler;
        document.addEventListener('click', handler);
      },
      unbind(el) {
        document.removeEventListener('click', el.handler)
      }
    }
  },
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  data () {
    return {
      isVisible: false // 默认不可见
    };
  },
  computed: {
    currentTime() { // 格式化传过来的当前的时间
      const {year, month, day} = utilsDate.getYearMonthDay(this.value);
      return `${year}-${month + 1}-${day}`;
    },
    cycleDays() { // 计算出当月循环的日期
      // 首先获取当前月的1号是周几
      const {year, month} = utilsDate.getYearMonthDay(this.value);
      // 获取指定年月1号是周几
      const currentFirstDay = utilsDate.getDate(year, month, 1);
      const currentWeek = currentFirstDay.getDay();
      // 然后往前推currentWeek天，计算出这个月是从几号开始的
      const startDay = currentFirstDay - currentWeek * 24 * 60 * 60 * 1000;
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 24 * 60 * 60 * 1000));
      }
      return arr
    }
  },
  methods: {
    focus() {
      this.isVisible = true;
    },
    blur() {
      this.isVisible = false;
    }
  }
};
</script>
<style scoped lang='less'>
.pannel{
  position: absolute;
  width: 224px;
  border: 1px solid #e1e1e1;
  border-radius: 2px;
  &-nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 32px;
    user-select: none;
    box-sizing: border-box;
  }
  &-content{
    &-days{
      &-rows{
        display: flex;
        justify-content: space-between;
        height: 32px;
        &-cell{
          height: 32px;
          width: 32px;
          line-height: 32px;
          text-align: center;
        }
      }
    }
  }
  &-footer{
    display: flex;
    align-items: center;
    height: 32px;
  }
}
</style>
