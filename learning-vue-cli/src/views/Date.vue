<template>
  <div>
    <!-- v-model 其实就是 :value 和 @input的语法糖 -->
    <date-picker v-model="now"></date-picker>
  </div>
</template>
<script>
import DatePicker from '../components/DatePicker'
export default {
  components: {
    DatePicker
  },
  data () {
    return {
      now: new Date()
    }
  }
}
</script>
<style scoped lang='stylus'></style>
