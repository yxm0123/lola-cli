# lola-cli
用于从github上拉取模板到本地的脚手架工具 

1.下载到全局
```
npm i @lola/lola-cli -g
npm uninstall -g @lola/lola-cli // 卸载
```

2.使用初始化项目
```
lola-cli create <project>
project 是创建的项目名称
```

3.选择相应的模板类型
```
   vue3-component-template //基于vue3的组件模板
   vue3-component-project //基于vue3的项目模板
   vue-tools              // 工具类 单纯的js代码
```

4.拉取的模板已经将依赖包node_modules安装完毕


5.执行命令
```
    cd your project
    yarn serve 启动
```
