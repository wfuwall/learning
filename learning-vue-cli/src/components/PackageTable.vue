<template>
  <Table border :columns="formatColumns" :data="data"></Table>
</template>
<script>
export default {
  props: ['columns', 'data'],
  data () {
    return {
      formatColumns: [],
      currentIndex: -1,
      currentValue: ''
    }
  },
  mounted () {
    this.formatColumns = this.columns.map(item => {
      if (item.edit) {
        item.render = (h, { row, column, index }) => {
          return this.currentIndex !== index
            ? <div>
              <span>{row[column['key']]}</span>
              <i-button size="small" on-click={() => this.edit(index)}>编辑</i-button>
            </div>
            : <div class="input-wrapper">
              <i-input type="text" value={row[column['key']]} on-input={(value) => this.input(value)}/>
              <i-button size="small" on-click={this.save.bind(this, { row, column, index })}>保存</i-button>
            </div>
        }
      }
      return item
    })
  },
  methods: {
    edit (index) {
      this.currentIndex = index
    },
    save ({ row, column, index }) {
      if (this.currentValue) {
        row[column['key']] = this.currentValue
        this.currentValue = ''
      }
      this.currentIndex = -1
    },
    input (value) {
      this.currentValue = value
    }
  }
}
</script>
<style>
  .input-wrapper{
    display: flex;
  }
</style>
