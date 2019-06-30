<template>
    <el-tree
      :data="allData"
      :props="defaultProps"
      :default-expand-all="false"
      :render-content="renderContent"
      :expand-on-click-node="false"
    ></el-tree>
</template>
<script>
import _ from 'loadsh'
export default {
  props: {
    data: { // 树形结构数据
      type: Array,
      default: () => ([])
    },
    fileDrop: { // 对文件的操作
      type: Array,
      default: () => ([])
    },
    folderDrop: { // 对文件夹的操作
      type: Array,
      default: () => ([])
    },
    delete: Function // 用户传入的删除操作
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      allData: [], // tree树形结构数据
      currentId: '', // 当前修改项的id
      currentValue: '' // 当前修改项的内容
    }
  },
  watch: {
    data () { // 监听父组件的数据变化，如果有更新，重新渲染
      this.formatTreeList()
    }
  },
  mounted () {
    this.formatTreeList()
  },
  methods: {
    isParent (data) { // 判断是否是文件夹
      return data.type === 'parent'
    },
    remove (id) {
      let list = _.cloneDeep(this.data)
      list = list.filter(item => item.id !== id)
      this.$emit('update:data', list) // 同步父组件的数据
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    handleRemove (data) { // 删除操作
      this.$confirm(`此操作将永久删除${data.name}，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 不能直接将数据删除掉，如果用户传入了删除操作delete方法，就直接调用
        this.delete ? this.delete(data.id).then(() => {
          this.remove(data.id)
        }) : this.remove(data.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleRename (data) { // 重命名操作
      this.currentId = data.id
      this.currentValue = data.name
    },
    cancel () { // 取消修改
      this.currentId = ''
    },
    sure () { // 确定修改
      let list = _.cloneDeep(this.data)
      let current = list.find(item => item.id === this.currentId)
      current.name = this.currentValue
      this.currentId = ''
      this.$emit('update:data', list) // 同步父组件的数据
      this.$message({
        type: 'success',
        message: '修改成功!'
      })
    },
    handelInput (value) { // 监听修改输入
      console.log(value)
      this.currentValue = value
    },
    handleCommand (data, command) { // 点击下拉菜单触发
      if (command === 'rm') {
        this.handleRemove(data)
      } else if (command === 'rn') {
        this.handleRename(data)
      }
    },
    renderContent (h, { node, data, store }) {
      const dropList = this.isParent(data) ? this.folderDrop : this.fileDrop
      return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
          {
            this.isParent(data) ? (node.expanded ? <i class="el-icon-folder-opened"></i> : <i class="el-icon-folder"></i>) : <i class="el-icon-document"></i>
          }
          {
            this.currentId === data.id ? <el-input value={this.currentValue} on-input={this.handelInput}></el-input> : data.name
          }
          {
            this.currentId !== data.id ? (
              <el-dropdown placement="bottom-start" trigger="click" on-command={this.handleCommand.bind(this, data)}>
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  {
                    dropList.map(item => {
                      return <el-dropdown-item command={item.value}>{item.text}</el-dropdown-item>
                    })
                  }
                </el-dropdown-menu>
              </el-dropdown>
            ) : <span>
              <el-button type="text" on-click={this.sure}>确定</el-button>
              <el-button type="text" on-click={this.cancel}>取消</el-button>
            </span>
          }

        </div>
      )
    },
    formatTreeList () {
      // 克隆父组件传递过来的数据,克隆后的数据再进行操作
      const allData = _.cloneDeep(this.data)
      const treeMapList = allData.reduce((memo, current) => {
        memo[current['id']] = current
        return memo
      }, {})
      // 可以看下vue 里的 vuex源码 写递归都是靠reduce
      let result = allData.reduce((arr, current) => {
        let pid = current.pid
        let parent = treeMapList[pid]
        if (parent) {
          parent.children ? parent.children.push(current) : parent.children = [current]
        } else if (!parent && pid === 0) { // 说明是根文件夹
          arr.push(current)
        }
        return arr
      }, [])
      this.allData = result
    }
  }
}
</script>
<style lang='less'>
  .el-tree {
    margin-top: 25px;
  }
  .el-tree .el-tree-node{
    width: 220px;
  }
  .el-tree .el-tree-node__content{
    height: 35px;
  }
  .el-dropdown{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
  .el-tree .el-input__inner{
    height: 30px;
  }
</style>
