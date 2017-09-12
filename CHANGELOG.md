# cloud-cli Change Log

## 1.1.7

`2017-09-12`

- `New` 新增`vue-plugin-template`vue插件模板。



## 1.1.6

`2017-08-24`

- `Fix` 修复mac下`cloud`命令异常问题，究其原因在于`windows`系统环境下用git命令检出的文件，进行提交的时候，会出现**换行符**的问题。因为Windows和Linux的换行符不一样，而Git默认是Linux的。可以用命令`git config --global core.autocrlf false`。

## 1.1.4

`2017-08-17`

- `New` 新增基于webpack搭建纯静态多页面型前端工程方案项目工程模板

