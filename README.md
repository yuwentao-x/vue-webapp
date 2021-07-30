# 路由怎么安装和使用的？
```js
npm i vue-router -S
```
在项目根目录创建router.js文件
```js
// 引入vue
import Vue from "vue"
// 引入vue-router
import VueRouter from "vue-router"
// 挂载VueRouter
Vue.use(VueRouter)

// 设置路由对应的组件
const Home = ()=>import('@/pages/home/Home.vue')
const Find = ()=>import('@/pages/find/Find.vue')
const Cart = ()=>import('@/pages/cart/Cart.vue')
const User = ()=>import('@/pages/user/User.vue')
const GoodDetail = ()=>import('@/pages/good/GoodDetail.vue')
const Login = ()=>import('@/pages/user/Login.vue')
const Regist = ()=>import('@/pages/user/Regist.vue')

// 创建Vue-router实例
export default new VueRouter({
    // 设置路由模式，默认是hash模式
    mode: 'hash',
    routes: [
        { path: '/', components: { alive: Home }},
        { path: '/find', component: Find },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
        { path: '/login', component: Login },
        { path: '/regist', component: Regist },
        { path: '/good/detail/:id', component: GoodDetail },
    ]
})
```
在项目main.js中挂载router
```js
import router from "./router"

new Vue({
    store,
    router,
    render: h => h(APP)
}).$mount('#app')
```
> hash模式 vs history模式
+ hash 模式采用的是锚点技术，使用的单页面应用渲染，路由跳转实际上是组件之间的跳转，优点是页面美观，交互流畅
+ history 模式采用的是location.href.history技术来实现的，路由地址更为美观，但须后端配合，进行使用
```js
location / {
    try_files $uri $uri / index.html;
}
```

> 路由传参
+ 通过$route传参(高耦合)
    + path: '/user/:id',组件通过$route.params.id获取参数
    + 缺点：高耦合
+ 通过props传参
```js
const User = {
    props: ['id'],
    template: '<div>User {{id}}</div>'
}
const router = new VueRouter({
    routes: [
        { path: '/user/:id', component: User, props: true },
        // 对于包含命名视图的路由，你必须分别为每个命名视图添加 props 选项
        { 
            path: '/user/:id', 
            components: { default: User, sidebar: Sidebar },
            props: { default: true, sidebar: false }
        }
    ]
})
```

# Vuex怎么安装和使用的？
> Vuex 背后的基本思想：通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。
借鉴了 Flux、Redux和 The Elm Architecture。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

> Vuex的安装
```
npm install vuex -S
```
+ 在src文件夹中创建store文件夹
+ Vuex配置
```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import test from './modules/test.js'
import good from './modules/good'
import tabbar from './modules/tabbar'

export default new Vuex.store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters: {

    },
    modules: {
        test,
        good,
        tabbar
    }
})
```
+ Vuex modules模块书写
```js
import { fetchGoodList } from '@/utils/api'

export default {
    namespaced: true,
    state: {
        goodObj: {}
    },
    mutations: {
        updateGoodObj:function(state,payload){
            state.goodObj[payload.k]=payload.v
            // 深拷贝
            state.goodObj = JSON.parse(JSON.stringify(state.goodObj))
        },
        deleteGoodObj:function(state){
            state.goodObj = {}
        }
    },
    actions: {
        fetchList(store,payload){
            fetchGoodList(payload).then(res=>{
                let params = {
                    k: payload.index,
                    v: res.list
                }
                store.commit('updateGoodObj', params)
            })
        }
    }
}
```
+ Vuex的挂载
```js
// 在main.js中挂载store
import store from "./store/"

new Vue({
    store,
    router,
    render: h => h(APP),
}).$mount('#app')
```
> Vuex的使用
+ state
```js
// Vuex 通过 store 选项，提供了一种机制将状态从根组件"注入"到每一个子组件中（需调用Vue.use(Vuex)） 
const app = new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: { Counter },
    template: `
        <div class='app'>
            <counter></counter>
        </div>
    `
})
```
通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过this.$store 访问到。
```js
const Couter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count(){
            return this.$store.state.count
        }
    }
}
```
当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性
```js
import { mapState } from 'Vuex'
computed: {
    ...mapState('模块名', ['state名'])
}
```
+ Getters

就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来且只有当它的依赖值发生了改变才会被重新计算。Getter 接受 state 作为其第一个参数
```js
const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    }
})
```
```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```
Getter 也可以接受其他 getter 作为第二个参数
```js
getters： {
    // ...
    doneTodosCount: (state,getters)=> {
        return getters.doneTodos.length
    }
}
```
```js
store.getters.doneTodosCount // -> 1
```
我们可以很容易地在任何组件中使用它：
```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```
+ 通过方法访问

通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```
```js
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```
+ getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。
+ getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

> Mutations

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```
你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
```js
store.commit('increment')
```
+ 提交载荷（Payload）

你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：
```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```
```js
store.commit('increment', {
  amount: 10
})
```
> actions 
+ Action 类似于 mutation，不同在于：
    + Action 提交的是 mutation，而不是直接变更状态。
    + Action 可以包含任意异步操作。
    
Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。

实践中，我们会经常用到 ES2015 的 参数解构 (opens new window)来简化代码（特别是我们需要调用 commit 很多次的时候）：
```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
    amount: 10
})

// 以对象形式分发
store.dispatch({
    type: 'incrementAsync',
    amount: 10
})
```


# 怎么支持Sass的？
> 安装插件
```
    npm i sass-loder -D
    npm i node-sass -D
```
> 设置编译类型
```
/* 在Vue文件中的style标签的lang属性中设置"scss" */
<style lang="scss">

    
</style>
```

# REM布局怎么搞的？
+ rem.js通过设置根字体,来使用rem进行自适应布局,1rem=1/10*width
+ 引入rem.js文件，在编辑器中安装 cssrem 插件，并设置转化尺寸为 75。

把根字体设成屏幕的十分之一，满屏就是10rem，写样式用px自动转换成rem，rem是一种相对布局，实际上是一种等比缩放，屏幕越大，效果越大

# Vant-UI怎么安装的？（注意babel.config.js文件的配置）
> npm安装
```
npm i vant -S
```
> 引入组件
+ 安装插件 
```
npm i babel-plugin-import -D
```
+ 在 babel.config.js 中配置
```js
module.exports = {
    plugins: [
        [
            'import',
            {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
            }, 
            'vant'
        ]
    ]
};
```

移动端一般不用click事件，click事件有300ms的延迟，原因是PC端通过300ms的延迟判断是单击还是双击事件，移动端使用touch事件


# 项目总结

本项目为webApp开发，项目开发使用的是vue全家桶+vant，开发团队一共两个人，前端1人，后端1人，开发时间将近2个月，最后成功上线。

在此项目中，包括商品展示模块，购物车模块，个人中心模块，订单模块等等。

使用的是vue响应式开发，能实现数据和页面进行同步更新，并且本项目使用的是单页面应用开发，根据一切皆组件的原理，页面的切换实际上就是组件的创建和销毁，这种开发方式使得内容的改变不需要重新加载整个页面，用户的体验也会更好。

本项目通过Vue全家桶开发技术，使用vue脚手架来快速搭建项目，路由使用是vue-router，它和vue.js核心深度集成，让构建单页面应用易如反掌。状态管理工具使用的是Vuex，它的两个主要优点是能实现组件之间数据共享和实现应用中的数据缓存，极大的促进了开发人员的工作效率，也便于开发人员后期进行维护简单化。

项目布局采用的是REM布局，通过引入rem.js文件，开发时在编辑器中安装cssrem插件，并设置转化尺寸为75，有利于响应式开发，根据识别不同用户的不同设备来适配屏幕，给予用户最好的视觉效果体验。

开发时使用sass来进行编译，sass为CSS增加一些编程的特性，无需考虑浏览器的兼容性问题，可以在css中使用变量、简单的逻辑程序、函数等等在编程语言中一些基本特性。

本项目开发中还使用了Vuex状态管理模式，Vue组件如果调用某个Vuex的方法过程中需要向后端请求时或者说出现异步操作时，需要 dispatch Vuex 中actions 的方法，以保证数据的同步。可以说，action 的存在就是为了让mutations 中的方法能在异步操作中起作用。如果没有异步操作，那么我们就可以直接在组件内提交状态中的 Mutations 中自己编写的方法来达成对 state 成员的操作。不建议在组件中直接对 state 中的成员进行操作，这是因为直接修改的话不能被 VueDevtools 所监控到。最后被修改后的 state 成员会被渲染到组件的原位置当中去。

本项目使用了大量的 vant UI组件库中的组件，例如 Button 按钮，Image 图片，Toast 轻提示，Checkbox 复选框，Form 表单，Filed 输入框，Search 搜索，Dialog 弹出框，PullRefresh 下拉刷新，swipe 轮播，NavBar 导航栏，TabBar 标签栏，SubmitBar 提交订单栏等等组件。

本项目经过了 SEO 优化处理，SEO 优化的原则是尽量减少js、css功能，尽可能多地使用静态html。本着优化原则，数据能用静态渲染就用静态渲染，大量使用h1-h6 标签和 html5 语义化标签 header、footer、article、nav、aside等等，尽量不使用 div。标签尽可能的加上 title 属性，图片也加上 alt 属性，在meta 标签中加入大量元数据和关键词，以便爬虫能够获取到数据。 

本项目使用的是 BSR 客户端渲染，前后端分离，视图与数据的组装是在客户端完成的，使用 BSR 技术的优势有：前后端分离，代码更容易维护；数据化应用，交互更加丰富；在TOB产品上应用更广泛；前端工程师在项目中来讲价值更高。劣势便是对SEO 不太友好，大量使用动态渲染，爬虫获取不到数据。而 SSR 服务器渲染，采用前后端不分离，视图和数据的组装都是在服务端完成的。优势便是有利于 SEO 优化，在Toc产品上应用相对广泛。劣势便有对客户端的压力比较小，服务器的压力较大，前后端不分离，对后端的要求非常高。

Vue-router 采用路由懒加载的方式，背后的原理：webpack代码分割功能+异步组件。把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，这是一个非常高效的方法，缩短了页面的加载时间，极大提高了用户的体验感。还使用了路由守卫来阻止未登录用户进入需要权限的页面。先判断哪些页面需要被守卫，再通过token判断用户是否登录，登录则可进入需要权限的页面，未登录则进入登录页面，不让访问需要权限的页面。
```js
const Home = ()=>import('./home/Home.vue')
```
token是后端根据用户登录信息生成的加密字符串，用于鉴权（识别用户身份），它是固定长度的，由三个部分组成，分别是加密算法、用户信息和密钥。后端验证token成功，才会查询数据给你想要的数据。前端登录成功时通过下述方法传递token到后端：
```js
config.headers.Authorization = localStorage.getItem('token')
```
当token失效（后端验证它失败时），后端一般会提示前端token失败。此时，前端要在响应拦截器重定向到登录页。

本项目设置的路由模式为history 模式，history 模式采用的是location.href.history技术来实现的，路由地址更为美观，但须后端配合，进行使用，因为我们的项目是一个单页面应用，所以在路由跳转的时候，就会出现访问不到静态资源而出现 404 的情况，这时候就需要服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面
```js
location / {
    try_files $uri $uri / index.html;
}
```

下拉刷新：下拉刷新时会触发 refresh 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成。

触底加载：触底时触发load事件, 加载状态中 loading 为 true，加载状态结束后设置 loading 为false，当所有数据都加载完成后设置 finished 为 true。


埋点分为三类:
+ 1、手动埋点：也叫代码埋点，即纯手动写代码，调用埋点 SDK 的函数，在需要埋点的业务逻辑功能位置调用接口，上报埋点数据。
    + 优势：1、可自定义属性，自定义事件。2、可以细化需要。3、相比其他埋点方式减少服务器压力。3、相比其他埋点方式减少服务器压力。
    + 缺陷：1、工程量大的话，手动埋点会出现疏漏，不方便审查。2、需要变更要重新埋点，成本高。3、每次需求变更都要重新发布版本，对先上系统稳定性有一定危害。
+ 2、可视化埋点：将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等等，最后输出的代码耦合了业务代码和埋点代码。缺点就是可以埋点的控件有限，不能手动定制。
+ 3、无埋点：前端自动采集全部事件，上报埋点数据，由后端来过滤和计算出有用的数据。

本项目还使用了<keep-alive>内置组件，主要用于保留组件状态或避免重新渲染。<keep-alive>包裹动态组件时，会缓存不活动的组件实例，而不是销毁他们。需要被缓存的页面，建议使用视图命名来解决。优点是前端只要一次加载埋点脚本，缺点是流量和采集的数据过于庞大，服务器性能压力山大。

本项目在开发过程中，也遇到不少困难。与后端的接口处理问题上，便有许多问题需要共同协商才能解决。登录模块，个人信息模块，购物车模块，商品提交模块，看似简简单单的表单和表格以及一些登录验证，交互确是极其的繁多，需要不断的请求后端接口获取数据和修改数据，而返回的数据是否复杂，是否是前端需要的正确的数据，便是一个需要不断沟通协商的难题。以及不断的通过响应式开发进行更新页面，此时考验的便是对组件灵活使用的熟练程度，恰当的运用组件能让整个项目的开发运行如行云流水般。开发中还存在UI还原度高和交互体验要求高的困难，和产品经理的密切交流便显得格外重要，需要不断的进行沟通交流，使得能够尽可能的展现出一个更优秀、更完美的webApp。