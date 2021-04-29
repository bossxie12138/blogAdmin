# blogAdmin

## 项目介绍
利用react框架写的一个简易博客后台管理系统，喜欢就给个Star支持一下。
[https://github.com/bossxie12138/blogAdmin](https://github.com/bossxie12138/blogAdmin)
线上地址： [https://www.itxlb.cn/backstage](https://www.itxlb.cn/backstage)
游客登录用户名密码输入guest003
另外还有一个仓库，放置了博客前台展示应用代码：[https://github.com/bossxie12138/blogsite](https://github.com/bossxie12138/blogsite)

## 博客架构
架构说明
`react.js redux antd mysql node egg.js axios `

## 网站使用技术

- 前端：React(17.x) redux antd-design axios Less
- 后端：node框架egg.js和mysql （目前前后端分离，这里只负责写接口，和平常的ajax获取接口一样，这里就不开放源码了）
- 网站目的：业余学习，记录技术文章，学以致用
- 网站功能
    - 文章发表
    - 修改文章
    - 添加分类
    - 个人信息修改
    - 用户留言回复
    - 添加收藏
    - 文章删除
    - 可视化数据面板统计

## 安装教程

1. 快速开始

**将项目克隆到本地**


2. 运行
```bash
yarn install
yarn start
```
3. 打包
```bash
yarn build
```


### 项目配置

#### 按需加载配置以及less支持
`config-overrides.js`文件

```js
const { 
  override,
  fixBabelImports,
  addLessLoader
 } = require('customize-cra')

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true
   }),
   addLessLoader({
     javascriptEnabled: true,
     cssModules: {
       localIndentName: "[path][name]-[local]-[hash:5]"
     },
     modifyVars: { '@primary-color': '#722ed1' }
   })
 )

```
`setupProxy.js`跨域配置
```js
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', { 
    target: 'http://127.0.0.1:7001',// 目标服务器地址，这里用到egg所以端口是7001
    secure: false,
    changeOrigin: true,
    pathRewrite: {
    '/api': '/'
    }
  }))
}

```



## 遗留问题

1. draft.js暂不支持代码高亮
2. BrowserRouter在生产环境出现404
3. 用户留言回复后信息回显问题
4. 文章图片上传功能尚未完成
5. 增加主题换肤
6. 全屏模式下按ESC或者F12出现BUG


### 待学习修改
1. 使用marked+highlight.js重构代码高亮问题
2. eslint
3. webpack配置

## 关于作者 / About

- github:[https://github.com/bossxie12138](https://github.com/bossxie12138)
- 个人博客:[https://www.itxlb.cn](https://www.itxlb.cn)
