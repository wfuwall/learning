## node相关知识总结


### git相关知识总结
- 删除已经push上去的node_modules等文件
  - 首先在.gitignore中添加需要删除的文件或者文件夹
  - 执行 git rm -r --cached .
  - 再次git add .  git commit -m'remove node_modules'  git push 提交即可

### 常用的linux指令
- sudo vi /etc/hosts 修改mac电脑的hosts文件
- cat /etc/hosts 查看hosts文件

