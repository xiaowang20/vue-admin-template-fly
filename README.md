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
4. 路由挂在只与后端表中的name字段有关。
***

## vue-cli脚手架
***
**配置**
1. npm init -y
2. npm install vue-cli -g
3. vue init webpack --dirname
   - 根据自己需要配置
***

### 第二步
#### 开发员工详情
1. **要注意使用axios传参问题**
- 使用vue有两种传参形式：data和params
- 因为params是添加到url的请求字符串中的，用于get请求。
>例：http://127.0.0.1:8110/admin/core/userInfo/list/1/5?mobile=12345678912
- 而data是添加到请求体（body）中的， 用于post请求。
> 如果前端请求的方式是 post，并且后端的HTTP请求为 @PostMapping，那么后端的参数上面要写 @RequestBody ，而且前端传递参数的时候要写 data，因为是 Json 传参。 因为用post请求使用data传参的时候，参数是放在请求体中的，所以地址栏上也不显示具体的参数。
- 
2. **在index.vue中编写模板**
- 开发员工详情需要：
   - 表格
   - 分页插件
- vue的生命周期也是很重要的。
   - created ：在模板渲染成HTML或模板编译进入路由前调用。
   > 使用：即通常初始化某些属性值
   - mounted : 在模板渲染成HTML之后调用。
   > 使用:你会发现在created中无法对chart进行一些初始化配置，一定要等这个html渲染完后才可以进行。（使用组件时调用）
   - methods : 混入到vue实例中，方法中的this可以指向data中的数据。
   - watch : Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个 property。
   > 就是监听数据，如果方法数据改变，就动态传值
- 遇到问题
   - 传值问题
   > - 需要的JSON数据要与后台的数据一致
   > - list集合中套list集合目前我还不知道怎么做，只能是将后台数据封装成一个list。
   > - 分页插件问题，当前页事件不能够触发。
   >   - 这个问题很搞心态，复制的一模一样，传值也是一丝不苟。但就是TMD触发不了，搞了两天。后来将复制的@符号改成v-on:就行了。 后来又将@改回来，竟然又可以用了。真几把无语。社会真复杂，免费的东西真是好呀。。。。
3. **导入、导出问题**
- 注意跨域问题
- 导入时，因为有跨域问题，不能使用自动导入，而要使用http-request钩子，手动导入。