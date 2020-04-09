# cnode-electron-demo

> An electron-vue project

## 安装项目依赖
接下来需要进入项目目录，执行下面的命令安装项目依赖
```sh
cd cnode-electron-demo
```
建议单独先把`electron`装上，然后在安装全部依赖    
我安装的时候直接`yarn install`    
结果不出预料，肯定是一大堆报错了，停在安装`electron`的位置一直不动，重试几次都无果，安装`electron`的时候，需要下载一个`electron`的`zip`包，    
例如我下载的是`Mac OS X`版本的`electron-v8.2.0-darwin-x64.zip`    

**第一种方法：淘宝镜像**

如果是国内的网络环境，用淘宝的镜像源来安装

```sh
yarn add electron@8.2.0 -D --electron-mirror=https://npm.taobao.org/mirrors/electron/
# or
npm install electron@8.2.0 -D --electron-mirror=https://npm.taobao.org/mirrors/electron/

```

**第二种方法：直接把`electron`的`zip`包下载到本地**
   
直接浏览器打开淘宝那个镜像源：[https://npm.taobao.org/mirrors/electron/](https://npm.taobao.org/mirrors/electron/)，把你要安装的`electron`对应的版本`zip`包下载到本地，放在用户目录下的一个名为`.electron`的隐藏文件夹中，    
因为我以前安装`electron`的时候下载成功过，发现下载下来的`zip`包就是存在这个文件夹下的。    
准备好`zip`包之后回到终端执行安装命令，后边那串镜像地址的参数带不带上，自己随意吧

```sh
yarn add electron@8.2.0 -D
# or
npm install electron@8.2.0 -D
```

搞定了`electron`之后，然后安装其它的依赖。

```sh
npm install 
# or
yarn install 
```

项目依赖安装完毕就可以运行一下看看了

```sh
npm run dev
# or
yarn dev
```

启动成功！哈哈~ 我太天真了

## 填坑之路

接下来就是跟着报错信息，一步步的填坑，很不幸的事，填坑填的太忘我，坑的报错都忘了截图，下面附上我添加和更改代码的地方

### 渲染进程中的`process` 
遇到报错：`process is not define `或者` require is not define `之类的 大概是这样，你需要在主进程的文件中找到创建窗口的代码，在参数配置中把    `webPreferences`对象中的`nodeIntegration`设置为`true`，意思就是让渲染进程可以运行`nodejs`代码

> **加号部分是添加的代码，是不是很贴心~❤~**

> 文件位置：`src > main > index.js  `  

```js
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 768,
    useContentSize: true,
    width: 1024,
+   webPreferences: {
+     nodeIntegration: true
+   }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
```

只加一个配置还不能正常运行，从终端打印的信息中我发现了这个词`allowRendererProcessReuse`   
来看张从`Electron`的`issues`截取的图片

![](https://user-gold-cdn.xitu.io/2020/4/9/1715fa72bb26faef?w=1346&h=436&f=png&s=96720)

还是这个文件滑到顶部你就看到了，把下边加号部分代码加上

```js
  import { app, BrowserWindow } from 'electron'
  // 我理解的是electron官方不推荐使用默认值false
+ app.allowRendererProcessReuse = true
```

我觉得大概意思就是从`electron 9`版本开始就默认为`true`了，之后的版本将会逐渐不允许更改这个值，我是用的`8`版本那我就给它设置成`true`吧，这样终端就不会打印那个提示了  

还不行？继续`Google`吧，我找到有人说要给`webpack`的配置文件的插件里加点料，上代码

> 位置：.electron-vue > webpack.renderer.config.js

```js
// 文件名：webpack.renderer.config.js > plugins 插件那部分的配置
new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.ejs'),
+     templateParameters(compilation, assets, options) {
+       return {
+         compilation: compilation,
+         webpack: compilation.getStats().toJson(),
+         webpackConfig: compilation.options,
+         htmlWebpackPlugin: {
+           files: assets,
+           options: options
+         },
+         process,
+       };
+     },
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      nodeModules: process.env.NODE_ENV !== 'production'
        ? path.resolve(__dirname, '../node_modules')
        : false
    }),
```

这样就可以了。

### 终端中的 `devtron`红色信息

看到有这个报错需要改个主进程文件的代码

> 减号是取掉的代码，加号是添加的代码  

> 文件位置：`src > main > index.dev.js`

```js 
// Install `electron-debug` with `devtron`
-  require('electron-debug')({ showDevTools: true })
+  require('electron-debug')()

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
})
```

这样我们启动项目的时候控制台就不会自动打开了；  
如果你需要自动打开控制台的，可以在开窗口的位置通过`BrowserWindow`的`webContents`的`openDevTools()`方法打开控制台  
这里一并把防闪屏优化的代码也加上了，如果你不需要也可以不加

> **带加号的是新增代码，别漏掉哦~**

> 文件位置：`src > main > index.js`  

```js

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    // 防闪屏优化
    // 先不显示窗口，下面会监听ready-to-show事件，触发事件时再显示
+   show: false,
    height: 768,
    useContentSize: true,
    width: 1024,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // 防闪屏优化，触发事件时显示窗口
+ mainWindow.on('ready-to-show', () => mainWindow.show())
  // Open dev tools initially when in development mode
  // 人话就是在开发环境打开控制台
+ if (process.env.NODE_ENV === 'development') {
+   mainWindow.webContents.once('dom-ready', () => mainWindow.webContents.openDevTools())
+ }
}

```

`OK！`开发使用的控制台就搞定了。

### 使用`vuex-electron`多进程间数据同步（即窗口之间的数据同步）

模版中默认是使用了这个插件的，如果你不需要多窗口间同步数据，那你就给去掉，否则你组件内使用`dispatch`会无效果  

> 文件位置：`src > renderer > store > index.js`

```js
import {
  createPersistedState,
- createSharedMutations // 注释或去掉
} from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
-   createSharedMutations() // 注释或去掉
  ],
  strict: process.env.NODE_ENV !== 'production'
})

```

如果保留插件的话需要怎么改代码  

> 文件位置：`src > main > index.js`

```js
  import { app, BrowserWindow } from 'electron'
  // 注意：这是我存放store文件夹的位置，如果你和我的不一样，要记得把路径层级改对哦
+ import './../renderer/store'
  app.allowRendererProcessReuse = true
```
[vuex-electron参考文档](https://github.com/vue-electron/vuex-electron#installation)

文档中第`3`条这样写到：  
3.In case if you enabled createSharedMutations() plugin you need to create an instance of store in the main process. To do it just add this line into your main process (for example src/main.js):

```js
import './path/to/your/store'
```

在知乎上看到一篇专门写这个问题的帖子，下边是地址  
[https://zhuanlan.zhihu.com/p/66244402](https://zhuanlan.zhihu.com/p/66244402)

> 吐槽：折腾了我好久，翻了好久`vuex`官网照着各种改代码尝试，`dispatch`就是不好使，最后`Google`到原来是这么回事😔😭

就这么简单，哈哈~ 你说气人不！  

好了，可以愉快敲代码了

## 生成安装包

```sh
npm run build
# or
yarn build
```

如果打包卡在一个地方不动了或者有报错了，可以尝试把`electron-builder`升级到最新版本

```sh
npm i electron-builder@latest -D
# or
yarn add electron-builder@latest -D
```

打包输出对应操作系统平台的安装包，

> 输出位置：`build`

![安装包输出位置](https://user-gold-cdn.xitu.io/2020/4/10/1715ff114bc5e3b1?w=574&h=312&f=png&s=31416)

我是`Mac`电脑生成的是`cnode-electron-demo-0.0.1.dmg`的安装包。  

> 项目界面截图--列表页：

![列表页截图](https://user-gold-cdn.xitu.io/2020/4/10/171601970a40a121?w=2048&h=1580&f=png&s=297878)

> 项目界面截图--详情页：

![详情页截图](https://user-gold-cdn.xitu.io/2020/4/10/171601b8967b4b4d?w=2048&h=1580&f=png&s=332851)

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[45a3e22](https://github.com/SimulatedGREG/electron-vue/tree/45a3e224e7bb8fc71909021ccfdcfec0f461f634) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
