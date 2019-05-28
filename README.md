# myBlob
我的第一个博客，使用hexo主题搭建
官方文档： https://hexo.io/zh-cn/docs/configuration.html
安装hexo
sudo npm install -g hexo

在blog文件夹目录下执行生成静态页面命令：
$ hexo generate        或者：hexo g


再执行配置命令：

$ hexo deploy            或者：hexo d

直接获取/更新Next主题
git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia
注意：可能卡顿，直接crtl+c关掉就行了

关联git并向远程仓库提交
```
deploy:
  type: git
  repository: https://github.com/x/x.github.io.git
  branch: master
```
设置完，每次hexo g 执行hexo d,和git push一样。 hexo g -d
注意：可能第一次使用找不到git?需要安装hexo插件

``` npm install hexo -deployer-git --save```
注意：直接部署 会把之前的代码冲掉。而且直接上传到github了，没关系，本地还有，使用-f再把本地的push上去。
目前做法是：新建source分支，放开发源码。master放生成的博客。
#### 日常修改
在本地对博客进行修改（添加新博文、修改样式等等）后，通过下面的流程进行管理：
依次执行git add .、git commit -m “…”、git push origin source
然后才执行hexo generate -d发布网站到master分支上。
虽然两个过程顺序调转一般不会有问题，不过逻辑上这样的顺序是绝对没问题的（例如突然死机要重装了，悲催….的情况，调转顺序就有问题了）


配置菜单等
在themes/yalia/_config.ymli

配置CNAME，部署完之后，CNAME丢失。
在source 下新建 weishuping.petterobam.cn



