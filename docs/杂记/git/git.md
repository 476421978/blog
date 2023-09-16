  ### **提交指定 commit ID**
`git cherry-pick `
- 解決冲突，继续合入，用户解决代码冲突后，将修改的文件重新加入暂存区（git add .）然后执行git cherry-pick --continue继续合入操作跳过冲突，继续合入其他提交


执行    `git cherry-pick --skip`
放弃合入，回退到操作前


执行 `git cherry-pick --abort`
退出合入，不回退到操作前


执行 `git cherry-pick --quit`
本地开发分支避免git push 修改太频繁


### **修改最近一次提交**
修改好文件    `git add . ` 进入准备提交状态   ` git commit --amend` 然后将pick改为edit    :wq保存    然后` git push -f` 强制推送


### **修改指定某次commit提交记录**
`git rebase -i HEAD~[commit顺序号]`   将待修改的分支pick改为edit    :wq保存    `git add .` 提交修改文件  ` git commit --amend` 合并记录    `git rebase --continue` 修改完成    `git push -f `强制推送


### **将push的commit多次记录合并**
`git rebase -i [commit合并顺序后一位序号]`    将需要合并的commit pick 改为 s 只保留一位pick记录    :wq保存    message注释只保留合并的commit    :wq保存    `git push -f` 强制推送




### **取消合并**
`git merge --abort`


### **删除分支**
远程：`git push origin -d 分支名`




本地：`git branch -d 分支名`


### **回滚**
- 回滚 reset删除文件、revert产生新的commit提交

    回滚到指定版本(强覆盖) `git reset --hard commit_id `


    回退到指定版本(会保留代码,需要解决合并) `git revert -n commit_id `


### **扩展**
#### 合并两个仓库代码 <http://t.zoukankan.com/zhanqing-p-15330203.html>
