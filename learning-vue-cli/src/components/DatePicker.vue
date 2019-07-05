<template>
  <div v-click-outsite class="date">
    <input
      type="text"
      :value="currentTime"
      class="date-input"
      :class="{'active': isVisible}"/>
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
          <div class="pannel-content-weeks">
            <span v-for="week in weeks" :key="week" class="pannel-content-weeks-item">{{week}}</span>
          </div>
          <div class="pannel-content-days-rows" v-for="row in 6" :key="row">
            <span
              class="pannel-content-days-rows-cell"
              v-for="cell in 7"
              :key="cell"
              :class="{'current-month': isCurrentMonth(cycleDays[(row-1) * 7 + (cell -1)]), 'current-day': isCurrentDay(cycleDays[(row-1) * 7 + (cell -1)])}">
                {{cycleDays[(row-1) * 7 + (cell -1)].getDate()}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as utilsDate from '../utils/date.js'
export default {
  directives: {
    clickOutsite: {
      bind (el, bindings, vnode) { // 指令第一次绑定到元素时调用
        const handler = (e) => {
          if (el.contains(e.target)) {
            if (!vnode.context.isVisible) { // 加判断，防止事件一直触发
              vnode.context.focus()
            }
          } else {
            if (vnode.context.isVisible) {
              vnode.context.blur()
            }
          }
        }
        el.handler = handler
        document.addEventListener('click', handler)
      },
      unbind (el) {
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
      isVisible: false, // 默认选择区域不可见
      weeks: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  computed: {
    currentTime () { // 格式化传过来的当前的时间
      const { year, month, day } = utilsDate.getYearMonthDay(this.value)
      return `${year}-${month + 1}-${day}`
    },
    cycleDays () { // 计算出当月循环的日期
      // 首先获取当前月的1号是周几
      const { year, month } = utilsDate.getYearMonthDay(this.value)
      // 获取指定年月1号是周几
      const currentFirstDay = utilsDate.getDate(year, month, 1)
      const currentWeek = currentFirstDay.getDay()
      // 然后往前推currentWeek天，计算出这个月是从几号开始的
      const startDay = currentFirstDay - currentWeek * 24 * 60 * 60 * 1000
      let arr = []
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 24 * 60 * 60 * 1000))
      }
      return arr
    }
  },
  methods: {
    focus () {
      this.isVisible = true
    },
    blur () {
      this.isVisible = false
    },
    isCurrentMonth (time) { // 判断是否是当月
      const { year, month } = utilsDate.getYearMonthDay(this.value)
      const { year: y, month: m } = utilsDate.getYearMonthDay(time)
      return year === y && month === m
    },
    isCurrentDay (time) { // 判断是否是当月当天
      const { year, month, day } = utilsDate.getYearMonthDay(this.value)
      const { year: y, month: m, day: d } = utilsDate.getYearMonthDay(time)
      return year === y && month === m && day === d
    }
  }
}
</script>
<style scoped lang='less'>
.date{
  &-input{
    border: 1px solid #dcdfe6;
    padding-left: 6px;
    height: 30px;
    line-height: 30px;
    width: 200px;
    font-size: 14px;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    &:hover{
      border-color: #c0c4cc;
    }
    &.active{
      border-color: #409eff;
    }
  }
}
.pannel{
  position: absolute;
  padding: 0 10px;
  width: 307px;
  border: 1px solid #e1e1e1;
  border-radius: 2px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-sizing: border-box;
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
    &-weeks{
      display: flex;
      align-items: center;
      height: 41px;
      border-bottom: 1px solid rgba(128, 128, 128, 0.5);
      &-item{
        width: 41px;
        text-align: center;
      }
    }
    &-days{
      &-rows{
        display: flex;
        justify-content: space-between;
        height: 41px;
        &-cell{
          height: 41px;
          width: 41px;
          line-height: 41px;
          text-align: center;
          color: #c0c4cc;
          box-sizing: border-box;
          &.current-month{
            color: #606266;
          }
          &.current-day{
            border: 1px solid #409eff;
            color: #409eff;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
