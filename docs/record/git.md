# Git学习小结

## 初始化仓库

```shell
git init <directory>
# 参数说明
# directory：本地目录
```

## 从Git仓库拷贝项目

```shell
git clone <repo> <directory>
# 参数说明
# repo：Git仓库
# directory：本地目录
```

## 配置

```shell
配置文件所在：系统配置（git安装目录下）|用户自定义配置（用户主目录下）
git config
# 参数说明
# --list 以列表的形式显示
# -e 针对当前仓库
# --global 针对系统上所有仓库
git config --global user.name 'whong'
git config --global user.email 'whif@foxmail.com'
# 配置用户名和邮箱用于标识提交者
```

##  添加文件到暂存区

```shell
git add
# 参数说明
# [file1] [file2] 添加一个或多个文件到暂存区
# [dir] 添加指定目录到暂存区，包括子目录
# . 添加当前目录下的所有文件到暂存区
```

## 查看仓库当前状态

```shell
git status
# 参数说明
# -s 获取简短输出
```

## 比较文件差异

```shell
git diff [file] # 显示暂存区和工作区的差异
git diff --cached [file] # 显示暂存区和上一次提交(commit)的差异
```

## 添加到本地仓库

```shell
git commit -m [message] # 提交暂存区到本地仓库中
git commit [file1] [file2] ... -m [message] # 提交暂存区的指定文件到仓库区
git commit -a # 设置修改文件后不需要执行 git add 命令，直接从工作区来提交
```

## 移动或重命名一个文件、目录或软连接

```shell
git mv [file] [newfile]
git mv -f [file] [newfile] # 强制
```

## 删除文件

```shell
git rm <file>	# 从暂存区和工作区中删除
git rm -f <file>	# 强制
git rm --cached <file>	# 只从暂存区中删除
git rm –r * 	# 递归删除整个目录中的所有子目录和文件
```

## 撤销修改

```shell
# 把文件在工作区的修改撤销，让其回到最近一次git commit或git add时的状态
git checkout -- <file> 

# 把暂存区的修改撤销掉，重新放回工作区
git reset HEAD <file>  
```

## 回退版本

```shell
git reset [--soft | --mixed | --hard] [HEAD]
# 参数说明
# --mixed 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。
	git reset HEAD^            # 回退所有内容到上一个版本  
	git reset HEAD^ hello.php  # 回退 hello.php 文件的版本到上一个版本  
	git reset 052e             # 回退到指定版本
# --soft 参数用于回退到某个版本
	git reset --soft HEAD~3 	# 回退上上上一个版本
# --hard 参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交
	git reset –hard HEAD~3  # 回退上上上一个版本  
	git reset –hard bae128  # 回退到某个版本回退点之前的所有信息。 
	git reset --hard origin/master    # 将本地的状态回退到和远程的一样 
```

## 查看提交历史

```shell
git log
git log --oneline # 查看历史记录的简洁的版本
git log --graph # 查看历史中什么时候出现了分支、合并(拓扑图)
git log --reverse --oneline # 逆向显示所有日志

git log -1
git log --author=Linus --oneline -5 # 查找指定用户的提交日志并指定显示行数
# 指定日期，可以执行几个选项：--since 和 --before，也可以用 --until 和 --after
# --no-merges 选项以隐藏合并提交
git log --oneline --before={3.weeks.ago} --after={2010-04-18} --no-merges 

git log --oneline --decorate --graph

git reflog  # 查看命令历史，可用来帮助回到未来的某个版本
```

## 查看指定文件的修改记录

```shell
git blame <file>
```

## 管理远程仓库

```shell
git remote -v # 显示所有远程仓库
git remote show [remote] # 显示某个远程仓库的信息
git remote add [name] [url] # 关联远程仓库，name为该远程仓库在本地的代号，一般是origin
git remote rm name  # 删除远程仓库
git remote rename old_name new_name  # 修改仓库名
```

## 分支管理

```shell
git branch # 列出分支
git branch (branchname) # 创建分支

# 切换分支
git checkout (branchname)
git switch (branchname)

# 创建新分支并立即切换到该分支下
git checkout -b (branchname)
git checkout -b (branchname) <originBrunch> # 与远程分支建立链接
git switch -c (branchname)
git switch -c (branchname) <originBrunch> # 与远程分支建立链接

# 分支合并（Fast-forward模式：直接把<当前分支>指向<合并分支>的当前提交）
git merge # 合并所有分支
git merge (branchname) # 合并指定分支到当前分支

# 分支合并（非Fast-forward模式）
# 禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
# 合并时，加上--no-ff参数，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。
git merge --no-ff -m "merge with no-ff" <branchname>

git branch -d (branchname) # 删除分支
git branch -D (branchname) # 强行删除分支(删除一个没有合并过的分支)
```

## 从远程库获取代码并合并到本地

```shell
# 将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中
git fetch (remote_repo_name)

#  git pull = git fetch + git merge

git pull <远程主机名> <远程分支名>:<本地分支名>
git pull origin master:branch	 # 将远程主机 origin 的 master 分支拉取过来，与本地的 branch 分支合并
git pull origin master	 # 如果远程分支是与当前分支合并，则冒号后面的部分可以省略
```

## 将本地的分支上传到远程并合并

```shell
git push <远程主机名> <本地分支名>:<远程分支名> # 如果本地分支名与远程分支名相同,则冒号后面的部分可以省略
git push --force origin master # 如果本地版本与远程版本有差异，但又要强制推送可以使用 --force 参数
```

## Git 标签

```shell
git tag # 查看所有标签
git tag <tagname>  # 创建新标签（默认标签是打在最新提交的commit上）
git tag <tagname> <commitId>  #为历史commit创建标签

git tag -a <tagname> -m <info>  # -a指定标签名  -m标签说明信息 
git show <tagname>  # 显示此标签下的信息

git push origin <tagname>  # 推送某个标签到远程
git push origin --tags#  一次性推送全部尚未推送到远程的本地标签

git tag -d <tagname> # 删除本地标签
git push origin :refs/tags/<tagname>  # 删除一个远程标签
```

## 存储现场

```bash
git stash  # 把当前工作现场“储藏”起来
git stash list  # 查看stash

git stash apply # 恢复但不删除stash
git stash drop # 删除stash

git stash pop # 恢复的同时把stash删除

# 可以多次stash，恢复时，先查看，然后恢复指定的stash
git stash list
git stash apply stash@{0}
```

## Bug修复

```bash
# 在master分支上修复的bug，想要合并到当前dev分支，可以用如下命令，把bug提交的修改“复制”到当前分支，避免重复劳动。
git cherry-pick <commitId>
```

## 冲突

1. 用`git push origin <branch-name>`推送自己的修改；

2. 如果推送失败，则因为远程分支比你的本地存在差异，需要先用`git pull`试图合并；如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送！

## 其他

1. [Git教程 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/896043488029600)
2. [Git Book 中文版 - rebase (liuhui998.com)](http://gitbook.liuhui998.com/4_2.html)
