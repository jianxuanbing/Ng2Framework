# Angular2 Framework 
包含技术点：
* 文件和应用组织：Angular 2
* 构建系统：Webpack、TyepScript
* 测试系统：Jasmine、Karma

# 快速开始
**确保 Node的版本>=5.0 且 Npm的版本>=3**
>克隆/下载仓库,然后编辑 `app.ts` 里面的 [`/src/app/app.ts`](/src/app/app.ts)
```bash
# 克隆我的仓库
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/jianxuanbing/Ng2Framework.git

# 更改我们的仓库目录
cd ng2Framework

# 安装仓库中的npm的配置信息
npm install
npm install [name] -g
npm install [name] --save
npm install [name] --save-dev

# 如因墙的原因可使用cnpm进行安装
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
cnpm install [name]

# 启动服务器
npm start

# 使用热模块替换(热插拔)
npm run server:dev:hmr
```
前往 [http://0.0.0.0:9060](http://0.0.0.0:9060) 或者 [http://localhost:9060](http://localhost:9060) 进行浏览

# 目录内容
* [文件结构](#文件结构)
* [入门指南](#getting-started)
    * [依赖关系](#dependencies)
    * [安装](#installing)
    * [运行应用程序](#running-the-app)
* [配置](#configuration)
* [贡献](#contributing)
* [TypeScript](#typescript)
* [@Types](#types)
* [常见问题](#frequently-asked-questions)
* [支持、问题或反馈](#support-questions-or-feedback)
* [许可证](#license)
* [参考文献](#reference)

## 文件结构
我们使用组件的方式启动。这是开发ng应用程序的新标准，以确保我们的行为逻辑的可维护的代码封装。一个组件式一个包含的应用通常在单个文件或文件夹。
文件：style、template、specs、e2e、组件类。如下面文件目录：
```
ng2Framework/
 ├──config/                    * 存放配置文件的目录
 |   ├──helpers.js             * 配置文件的辅助函数
 |   ├──spec-bundle.js         * 忽略这个设置我们的ng2测试环境
 |   ├──karma.conf.js          * karma 配置单元测试
 |   ├──protractor.conf.js     * protractor 配置端到端的测试
 │   ├──webpack.dev.js         * webpack 开发环境配置
 │   ├──webpack.prod.js        * webpack 生产环境配置
 │   └──webpack.test.js        * webpack 测试环境配置
 │
 ├──doc/                       * 文档资料:目录
 ├──src/                       * 源文件:目录
 |   ├──main.browser.ts        * 入口文件浏览器环境
 │   │
 |   ├──index.html             * 索引页,用于生成索引页面
 │   │
 |   ├──polyfills.ts           * 填充物 配置文件
 │   │
 |   ├──vendor.ts              * 提供者 配置文件
 │   │
 │   ├──app/                   * 应用:目录
 │   |   ├──components/        * 通用组件:目录
 │   |   ├──containers/        * 容器组件:目录
 │   |   ├──models/            * 模型以及数据类:目录
 │   |   ├──services/          * 服务:目录
 │   |   ├──utils/             * 工具类:目录
 │   │   ├──app.spec.ts        * 简单的测试 app.ts 组件
 │   │   ├──app.e2e.ts         * 简单的端到端测试/
 │   │   └──app.ts             * App.ts:简单版本的应用程序组件
 │   │
 │   └──assets/                * 静态资源:目录
 │       ├──css/               * 通用样式文件:目录
 │       ├──images/            * 图片文件:目录
 │       ├──fonts/             * 字体文件:目录
 │       ├──icon/              * 图标:目录
 │       ├──service-worker.js  * 忽略这个,Web应用程序服务工人没有完成
 │       ├──robots.txt         * 搜索引擎抓取你的网站
 │       └──humans.txt         * 开发商
 │
 │
 ├──tslint.json                * typescript 线配置
 ├──typedoc.json               * typescript 文档生成配置
 ├──tsconfig.json              * typescript 配置
 ├──package.json               * 搭建环境需要的npm依赖项
 └──webpack.config.js          * webpack 主配置文件,存放webpack相关的配置

```


# 入门指南
## 依赖关系
你需要运行这个程序：
* `node` 和 `npm` (`brew install node`)
* 确保你运行最新版本的 Node `v4.x.x`+ (或 `v5.x.x`) 和 NPM `3.x.x`+

> 如果你安装了 `nvm` ，强烈推荐(`brew install node`) 你能执行 `nvm install --lts && nvm use` 在 `$` 运行最新的Node。

一旦你有了这些，你应该安装这些全局变量 `npm install --global`：
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)
* `typescript` (`npm install --global typescript`)

## 安装
* `fork` 分支仓库
* `clone` 克隆仓库
* `npm install webpack-dev-server rimraf webpack -g` 安装必须的全局依赖关系
* `npm install` 安装所有依赖
* `npm run server` 启动开发服务器

## 运行应用程序
在您安装所有的依赖项后，现在可以运行应用程序。
运行 `npm run server` 命令启动本地服务使用 `webpack-dev-server` ，构建在内存当中。
服务地址默认为：`http://0.0.0.0:9060`(或如果你喜欢IPV6，你可以使用 `express` 服务器，那么地址为：`http://[::1]:9060/`)。

### 服务器
```bash
# 开发环境
npm run server

# 生产环境
npm run build:prod
npm run server:prod
```

## 其他命令

### 构建文件
```bash
# 开发环境
npm run build:dev

# 生产环境
npm run build:prod
```

### 热插拔
```bash
npm run server:dev:hmr
```

### 监听自动构建文件
```bash
npm run watch
```

### 运行测试
```bash
npm run test
```

### 监听运行测试
```bash
npm run watch:test
```

### 运行端到端测试
```bash
# 确保你有另一个终端的服务器在运行
npm run e2e
```

### 运行网页驱动（端到端）
```bash
npm run webdriver:update
npm run webdriver:start
```

### 运行分离器的元素浏览器（端到端）
```bash
npm run webdriver:start
# 运行另一个终端
npm run e2e:live
```

### 构建Docker
```bash
npm run build:docker
```

# 配置

# 贡献

# TypeScript

# @Types

# 常见问题

# 支持、问题或反馈

# 许可证

# 参考文献
* ng2+webpack+typescript：[https://github.com/AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)