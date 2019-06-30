<template>
  <div>
    <date-picker :value="now"></date-picker>
  </div>
</template>
<script>
import DatePicker from '../components/DatePicker'
export default {
  components: {
    DatePicker
  },
  data() {
    return {
      now: new Date()
    }
  }
};
</script>
<style scoped lang='stylus'></style>
