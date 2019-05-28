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

配置菜单等
在themes/landscape/_config.ymli


