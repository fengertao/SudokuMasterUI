# Sudoku Master

### 依赖模块

<span style="color: rgb(184,49,47);">项目是用 create-react-app 创建的，主要还是列出新加的功能依赖包</span>

<span style="color: rgb(184,49,47);">点击名称可跳转相关网站 😄😄</span>

-   [react](https://facebook.github.io/react/)
-   [react-router](https://react-guide.github.io/react-router-cn/)(<span style="color: rgb(243,121,52);">react 路由，4.x 的版本，如果还使用 3.x 的版本，请切换分支（ps:分支不再维护）</span>)
-   [redux](https://redux.js.org/)(基础用法，但是封装了通用 action 和 reducer，demo 中主要用于权限控制（ps：目前可以用 16.x 的 context api 代替），可以简单了解下)
-   [antd](https://ant.design/index-cn)(<span style="color: rgb(243,121,52);">蚂蚁金服开源的 react ui 组件框架</span>)
-   [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http 请求模块，可用于前端任何场景，很强大 👍</span>)
-   [echarts-for-react](https://github.com/hustcc/echarts-for-react)(<span style="color: rgb(243,121,52);">可视化图表，别人基于 react 对 echarts 的封装，足够用了</span>)
-   [recharts](http://recharts.org/#/zh-CN/)(<span style="color: rgb(243,121,52);">另一个基于 react 封装的图表，个人觉得是没有 echarts 好用</span>)
-   [nprogress](https://github.com/rstacruz/nprogress)(<span style="color: rgb(243,121,52);">顶部加载条，蛮好用 👍</span>)
-   [react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)(<span style="color: rgb(243,121,52);">别人基于 react 的富文本封装，如果找到其他更好的可以替换</span>)
-   [react-draggable](https://github.com/mzabriskie/react-draggable)(<span style="color: rgb(243,121,52);">拖拽模块，找了个简单版的</span>)
-   [screenfull](https://github.com/sindresorhus/screenfull.js/)(<span style="color: rgb(243,121,52);">全屏插件</span>)
-   [photoswipe](https://github.com/dimsemenov/photoswipe)(<span style="color: rgb(243,121,52);">图片弹层查看插件，不依赖 jQuery，还是蛮好用 👍</span>)
-   [animate.css](http://daneden.me/animate)(<span style="color: rgb(243,121,52);">css 动画库</span>)
-   [react-loadable](https://github.com/jamiebuilds/react-loadable)(代码拆分，按需加载，预加载，样样都行，具体见其文档，推荐使用)
-   其他小细节省略

### 安装运行

##### 1.克隆本项目源码

##### 2.在同级目录克隆 SudokuMasterServ 源码

##### 3.yarn 或者 npm 安装相关包文件

```bash
yarn install
```

##### 4.启动项目

```bash
yarn start
```

##### 5.打包 UI 项目

```bash
# Support bash only
yarn deploy
```

##### 6.前后台一起打包

```bash
cd ../SudokuMasterServ
mvn clean install
cd target
ls -l SudokuMasterServ*.jar
```
