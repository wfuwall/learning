<template>
  <my-tree
    :data.sync="treeList"
    :fileDrop="fileDrop"
    :folderDrop="folderDrop"
    :delete="deleteFn"
    v-if="treeList.length"
  ></my-tree>
</template>
<script>
import { getTreeList } from '../api.js'
import MyTree from '../components/MyTree'
export default {
  data () {
    return {
      treeList: [], // 获取到的树列表
      fileDrop: [ // 对文件的操作
        { value: 'rm', text: '删除文件' }
      ],
      folderDrop: [ // 对文件夹的操作
        { value: 'rm', text: '删除文件' },
        { value: 'rn', text: '修改名字' }
      ]
    }
  },
  mounted () {
    this.getTreeList()
  },
  methods: {
    async getTreeList () {
      let { data } = await getTreeList()
      // 扁平的数据如何变成多层数据 递归数据
      if (data.code === 0) {
        let { parent, child } = data.data
        // 添加type，区分是文件夹还是文件
        parent.forEach(item => {
          item.type = 'parent'
        })
        this.treeList = [...parent, ...child]
      }
    },
    deleteFn () { // 这个方法必须返回一个promise
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 3000)
      })
    }
  },
  components: {
    MyTree
  }
}
</script>
<style scoped lang="less">

</style>
