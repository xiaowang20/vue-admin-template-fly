# 基于vue-admin-template二次开发
## 拿到模板后该怎样做
1. npm install -y 
2. npm run dev（老项目使用） || npm run serv(新项目使用)
3. webpack -v (检查是否装有webpack)，没有 npm install -g webpack(全局安装) | npm install --save-dev webpack(本项目安装)
## 开发步骤
### 第一步
#### 开发登录和授权（重要）[学习] https://juejin.cn/post/6844903476661583880
1. **目录结构**
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                   // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json
2. **src中的文件**
- store(存放基本数据)
> 然有些数据还是需要用 vuex 来统一管理的，如登录token,用户信息，或者是一些全局个人偏好设置等，还是用vuex管理更加的方便
- 封装axios
> - 在utils包下request.js中，使用时只需要在api中创建.js文件然后在引用request.js。
> - 这样封装以下的话我们就不用每个请求都手动来塞 token，或者来做一些统一的异常处理，一劳永逸。
> - 然这里只是简单举了个例子，axios还可以执行多个并发请求，拦截器什么的，大家自行去研究吧。
3. **淘宝源**
> npm install --registry=https://registry.npm.taobao.org
4. **webpack使用脚手架（俺不会）**
5. **业务**
> 登录：当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个token，拿到token之后（我会将这个token存贮到cookie中，保证刷新页面后能记住用户登录状态），前端会根据token再去拉取一个 user_info 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。
权限验证：通过token获取用户对应的 role，动态根据用户的 role 算出其对应有权限的路由，通过 router.addRoutes 动态挂载这些路由。
***
1. 登录
   1. login中的index.js中的click登录事件，登录成功则跳转到首页。
   2. store中的user.js中的actions实现登录，登录成功后将token保存到Cookie中
   3. 获取用户信息
      1. permission.js中在全局钩子router.beforeEach中拦截路由。
      2. 判断是否已获得token，在获得token之后我们就要去获取用户的基本信息了。
      3. 模板是写死的，我们要结合后端传来的JSON数据自行编写。
***
2. 授权
   1. router包下的index.js。创建vue实例的时候将vue-router挂载，但这个时候vue-router挂载一些登录或者不用权限的公用的页面。
   其中还存在异步加载的路由，只不过还没有加载，要等到后面登录后，获取角色信息后生成路由。
   2. 在store/peimission.js中(vue-admin-template中没有可以在vue-element-admin中复制)。当用户登录后，获取用role，将role和路由表每个页面的需要的权限作比较，生成最终用户可访问的路由表（GenerateRoutes Action）。这里的代码说白了就是干了一件事，通过用户的权限和之前在router.js里面asyncRouterMap的每一个页面所需要的权限做匹配，最后返回一个该用户能够访问路由有哪些。
   3. 侧边栏
***
问题
1. ES6 新增了不少标识符，但浏览器大多无法直接识别，需要借助 babel 对 ES6 代码进行转义
2. 项目启动时抛出如下错误，表示 … 运算符没能被识别，该运算符属于 ES6 的解构运算符
3. 出现该问题的原因基本上可以定位是项目没有配置 babel 即使package.json 文件中已经引入 babel ，但仍然需要在项目根目录创建一个 .balbelrc 文件进行配置
***

## vue-cli脚手架
***
**配置**
1. npm init -y
2. npm install vue-cli -g
3. vue init webpack --dirname
   - 根据自己需要配置
***